# cPanel Deploy Checklist

## App settings
- Node.js version: `18+`
- Application root: `/repositories/app`
- Application URL: `/`
- Startup file: `server.js`

## Install and build
Run these in the application root:

```bash
cd /repositories/app
npm run install-force
npm run build
```

## Required environment variables
Set these in the Node.js app environment in cPanel:

```bash
NODE_ENV=production
SITE_URL=https://krantasgroup.com
```

Optional:

```bash
SEO_STORAGE_PATH=seo-data.json
VITE_GOOGLE_MAPS_API_KEY=your_key
VITE_GTM_ID=GTM-XXXXXXX
```

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
