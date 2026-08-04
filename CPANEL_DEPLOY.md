# cPanel Deploy Checklist

## App settings
- Node.js version: `18+`
- Application root: `/repositories/app`
- Application URL: `/`
- Startup file: `server.js`

## Automatic pull, install, build, and restart
After the first cPanel Node.js application setup, deploy future updates with one command:

```bash
cd /home/krantasu/repositories/app && sh ./pull.sh
```

`pull.sh` automatically:
- preserves file-backed CMS, SEO, and audit data
- fetches and fast-forwards the current branch
- activates the matching CloudLinux Node environment
- repairs a missing CloudLinux `node_modules` symlink
- installs dependencies including TypeScript and Vite
- builds and verifies the production assets
- requests a Passenger restart and checks `/health`

Optional overrides:

```bash
BRANCH=main NODE_VENV=/home/krantasu/nodevenv/repositories/app/22 sh ./pull.sh
SKIP_HEALTH_CHECK=1 sh ./pull.sh
```

The script stops only when it finds real source-code changes on the server. Generated `dist` files and runtime data do not block deployment.

## Manual install and build
If an automatic deployment needs diagnosis, run:

```bash
cd /home/krantasu/repositories/app
source /home/krantasu/nodevenv/repositories/app/22/bin/activate
npm install --include=dev --legacy-peer-deps
npm run build
touch tmp/restart.txt
```

CloudLinux NodeJS Selector note:
- `node_modules` in the application root must be a symlink created by NodeJS Selector, not a real directory.
- `pull.sh` automatically moves an incompatible real directory into its timestamped deployment backup.
- For a manual repair, preserve the real directory and let NodeJS Selector recreate the symlink:

```bash
cd /home/krantasu/repositories/app
mv node_modules "tmp/node_modules.backup.$(date +%Y%m%d-%H%M%S)"
```

Then open cPanel NodeJS Selector and run its npm install action, or run `npm run install-force` again after NodeJS Selector has recreated the `node_modules` symlink.

## Required environment variables
Set these in the Node.js app environment in cPanel:

```bash
NODE_ENV=production
SITE_URL=https://krantasgroup.com
DB_HOST=localhost
DB_PORT=3306
DB_NAME=krantasu_krantasweb
DB_USER=krantasu_admin
DB_PASSWORD=your-database-password
ADMIN_PANEL_USERNAME=admin
ADMIN_PANEL_PASSWORD=change-this-password
ADMIN_USERS_JSON=
ADMIN_PANEL_PATH=/control-room
VITE_ADMIN_PANEL_PATH=/control-room
ADMIN_LOGIN_MAX_ATTEMPTS=5
ADMIN_LOGIN_LOCKOUT_SECONDS=900
LEAD_RATE_LIMIT_MAX=10
LEAD_RATE_LIMIT_WINDOW_SECONDS=900
```

Optional:

```bash
SEO_STORAGE_PATH=seo-data.json
MEDIA_STORAGE_PATH=uploads
GOOGLE_MAPS_API_KEY=your_key
GOOGLE_MAPS_MAP_ID=your_map_id
VITE_GTM_ID=GTM-XXXXXXX
```

Uploaded media is stored in `uploads/`, outside the Vite `dist` build. Keep this directory in
server backups; deployments do not overwrite it.

Database notes:
- On cPanel, `DB_HOST=localhost` is typically correct.
- The app now prefers MySQL for CMS and SEO storage when `DB_NAME`, `DB_USER`, and `DB_PASSWORD` are set.
- If database credentials are missing or invalid, the server falls back to `cms-data.json` and `seo-data.json`.

Admin auth notes:
- `ADMIN_PANEL_USERNAME` + `ADMIN_PANEL_PASSWORD` create the default named admin account
- `ADMIN_USERS_JSON` can be used instead to define multiple admin users as a JSON array
- `ADMIN_PANEL_PATH` and `VITE_ADMIN_PANEL_PATH` should match

For live Google Maps:
- prefer `GOOGLE_MAPS_API_KEY` and `GOOGLE_MAPS_MAP_ID` in cPanel so the server can inject them at runtime
- restrict the API key to your production domains
- enable the Maps JavaScript API for that key
- if you use advanced markers in production, set a real `GOOGLE_MAPS_MAP_ID`

## Start or restart
- Restart the Node.js application from cPanel after install/build.

## What must be true
- `dist/index.html` exists in `/repositories/app/dist`
- `dist/index.html` contains asset URLs starting with `/assets/`
- the domain root is routed to the Node.js application, not an old static site

## If the old site still appears
Check the domain document root and remove or rename old fallback files:
- `index.html`
- `index.php`
- `.htaccess` rules that force a different app or static site

If Cloudflare is enabled:
- turn on Development Mode
- purge all cache
- disable Always Online while testing
- temporarily set the DNS record to gray-cloud if needed for direct origin testing

## Health checks
These should work after restart:

- `/health`
- `/robots.txt`
- `/sitemap.xml`
- `/api/seo?path=/`

If `/health` does not return JSON from the Node app, the domain is not reaching the Node application yet.
