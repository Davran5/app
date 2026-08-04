#!/bin/sh

set -eu

ORIGINAL_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
APP_DIR=${APP_DIR:-$ORIGINAL_DIR}

# Run from a temporary copy so Git can safely update pull.sh during deployment.
if [ "${KRANTAS_PULL_RUNNER:-0}" != "1" ]; then
  mkdir -p "$APP_DIR/tmp"
  RUNNER="$APP_DIR/tmp/.pull-runner-$$.sh"
  sed 's/\r$//' "$0" > "$RUNNER"
  chmod 700 "$RUNNER"
  KRANTAS_PULL_RUNNER=1 APP_DIR="$APP_DIR" exec sh "$RUNNER" "$@"
fi

cd "$APP_DIR"

REMOTE=${REMOTE:-origin}
BRANCH=${BRANCH:-$(git branch --show-current)}
BRANCH=${BRANCH:-main}
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="$APP_DIR/tmp/deploy-backup-$TIMESTAMP"
RUNTIME_FILES="admin-audit.log cms-data.json seo-data.json"
RUNNER_PATH=$0

mkdir -p "$BACKUP_DIR"
chmod 700 "$BACKUP_DIR"

restore_runtime_files() {
  for file in $RUNTIME_FILES; do
    if [ -f "$BACKUP_DIR/$file" ]; then
      cp -p "$BACKUP_DIR/$file" "$APP_DIR/$file"
    fi
  done
}

cleanup() {
  status=$?
  trap - EXIT HUP INT TERM
  restore_runtime_files
  rm -f "$RUNNER_PATH"

  if [ "$status" -ne 0 ]; then
    echo "" >&2
    echo "Deployment failed. Runtime data was restored from:" >&2
    echo "  $BACKUP_DIR" >&2
  fi

  exit "$status"
}

trap cleanup EXIT HUP INT TERM

for file in $RUNTIME_FILES; do
  if [ -f "$file" ]; then
    cp -p "$file" "$BACKUP_DIR/$file"
  fi
done

is_generated_file() {
  case "$1" in
    admin-audit.log|cms-data.json|seo-data.json|pull.sh|dist/*|tmp/*)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

STAGED_FILES=$(git diff --cached --name-only)
if [ -n "$STAGED_FILES" ]; then
  echo "Staged server changes detected. Deployment stopped to protect them:" >&2
  printf '%s\n' "$STAGED_FILES" >&2
  exit 1
fi

CHANGED_FILES=$(
  {
    git diff --name-only
    git ls-files --others --exclude-standard
  } | sort -u
)

BLOCKING_FILES=""
OLD_IFS=$IFS
IFS='
'
for file in $CHANGED_FILES; do
  if [ -n "$file" ] && ! is_generated_file "$file"; then
    BLOCKING_FILES="${BLOCKING_FILES}${file}
"
  fi
done
IFS=$OLD_IFS

if [ -n "$BLOCKING_FILES" ]; then
  echo "Source changes detected on the server. Deployment stopped to protect them:" >&2
  printf '%s' "$BLOCKING_FILES" >&2
  echo "Commit or stash those source changes, then run this script again." >&2
  exit 1
fi

# Generated files may change on the server. Restore their repository versions
# before the fast-forward pull; runtime copies are restored by the exit trap.
for file in admin-audit.log cms-data.json seo-data.json pull.sh; do
  if git ls-files --error-unmatch "$file" >/dev/null 2>&1; then
    git restore --worktree -- "$file"
  fi
done

if [ -n "$(git ls-files dist)" ]; then
  git restore --worktree -- dist
fi

echo "Fetching $REMOTE/$BRANCH..."
git fetch "$REMOTE" "$BRANCH"

echo "Applying the latest commit..."
git merge --ff-only "$REMOTE/$BRANCH"

# Keep live file-backed content available while dependencies and assets build.
restore_runtime_files

activate_node_environment() {
  if [ -n "${NODE_VENV:-}" ]; then
    if [ -f "$NODE_VENV" ]; then
      # shellcheck disable=SC1090
      . "$NODE_VENV"
      return
    fi

    if [ -f "$NODE_VENV/bin/activate" ]; then
      # shellcheck disable=SC1090
      . "$NODE_VENV/bin/activate"
      return
    fi
  fi

  if [ -n "${HOME:-}" ]; then
    APP_RELATIVE=${APP_DIR#"$HOME"/}
    NODE_ACTIVATE=""

    for candidate in "$HOME/nodevenv/$APP_RELATIVE"/*/bin/activate; do
      if [ -f "$candidate" ]; then
        NODE_ACTIVATE=$candidate
      fi
    done

    if [ -n "$NODE_ACTIVATE" ]; then
      # shellcheck disable=SC1090
      . "$NODE_ACTIVATE"
    fi
  fi
}

activate_node_environment

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "Node.js environment was not found." >&2
  echo "Open cPanel Node.js Selector once, configure this application, then rerun ./pull.sh." >&2
  echo "You can also set NODE_VENV=/home/USER/nodevenv/repositories/app/22." >&2
  exit 1
fi

echo "Using Node $(node --version) and npm $(npm --version)."

NODE_BIN=$(command -v node)
NODE_ENV_ROOT=$(CDPATH= cd -- "$(dirname -- "$NODE_BIN")/.." && pwd)

case "$NODE_ENV_ROOT" in
  "${HOME:-/nonexistent}/nodevenv/"*)
    NODE_MODULES_TARGET="$NODE_ENV_ROOT/lib/node_modules"
    mkdir -p "$NODE_MODULES_TARGET"

    if [ -L node_modules ]; then
      CURRENT_NODE_MODULES_TARGET=$(readlink -f node_modules 2>/dev/null || true)

      if [ "$CURRENT_NODE_MODULES_TARGET" != "$NODE_MODULES_TARGET" ]; then
        echo "Replacing the node_modules symlink for the active Node environment."
        mv node_modules "$BACKUP_DIR/node_modules.symlink"
      fi
    fi

    if [ -e node_modules ] && [ ! -L node_modules ]; then
      echo "Moving the incompatible node_modules directory into the deployment backup."
      mv node_modules "$BACKUP_DIR/node_modules.real"
    fi

    if [ ! -L node_modules ]; then
      ln -s "$NODE_MODULES_TARGET" node_modules
    fi
    ;;
esac

if [ -e node_modules ] && [ ! -L node_modules ] && [ -n "${CLOUDLINUX:-1}" ]; then
  echo "node_modules must be the symlink created for the CloudLinux Node environment." >&2
  exit 1
fi

echo "Installing dependencies, including the TypeScript/Vite build tools..."
npm install --include=dev --legacy-peer-deps --no-audit --no-fund

if [ ! -x node_modules/.bin/tsc ] || [ ! -x node_modules/.bin/vite ]; then
  echo "Build tools were not installed. Check the CloudLinux node_modules symlink." >&2
  exit 1
fi

echo "Building production assets..."
npm run build

if [ ! -f dist/index.html ]; then
  echo "Build verification failed: dist/index.html is missing." >&2
  exit 1
fi

MAIN_ASSET=$(grep -o '/assets/index-[^"[:space:]]*\.js' dist/index.html | head -n 1 || true)
if [ -z "$MAIN_ASSET" ] || [ ! -f "dist$MAIN_ASSET" ]; then
  echo "Build verification failed: the JavaScript asset referenced by dist/index.html is missing." >&2
  exit 1
fi

echo "Verified dist$MAIN_ASSET"

# Runtime data must be back in place before Passenger starts the new process.
restore_runtime_files

mkdir -p tmp
touch tmp/restart.txt
echo "Passenger restart requested."

HEALTH_URL=${HEALTH_URL:-https://krantasgroup.com/health}
if [ "${SKIP_HEALTH_CHECK:-0}" != "1" ] && command -v curl >/dev/null 2>&1; then
  echo "Checking $HEALTH_URL..."
  if ! curl -fsS --retry 3 --retry-delay 2 --max-time 20 "$HEALTH_URL" >/dev/null; then
    echo "Warning: deployment completed, but the public health check did not respond yet." >&2
  fi
fi

echo "Deployment complete. Runtime backup: $BACKUP_DIR"
