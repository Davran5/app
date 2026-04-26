#!/bin/sh
set -eu

cd "$(dirname "$0")"

REMOTE="${REMOTE:-origin}"
BRANCH="${BRANCH:-$(git branch --show-current)}"

if [ -z "$BRANCH" ]; then
  echo "Could not determine the current branch. Set BRANCH=main and run again." >&2
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "Local changes detected. Commit, stash, or discard them before pulling." >&2
  git status --short
  exit 1
fi

echo "Fetching $REMOTE..."
git fetch "$REMOTE"

echo "Pulling $REMOTE/$BRANCH..."
git pull --ff-only "$REMOTE" "$BRANCH"

echo "Done."
