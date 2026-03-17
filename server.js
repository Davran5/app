import 'dotenv/config';
import crypto from 'node:crypto';
import express from 'express';
import { existsSync } from 'node:fs';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = __dirname;

if (process.cwd() !== PROJECT_ROOT) {
  process.chdir(PROJECT_ROOT);
}

function resolveDistDir() {
  const candidateDirs = [
    path.join(PROJECT_ROOT, 'dist'),
    path.join(process.cwd(), 'dist'),
    path.join(PROJECT_ROOT, 'build'),
    path.join(process.cwd(), 'build'),
  ];

  for (const candidateDir of candidateDirs) {
    if (existsSync(path.join(candidateDir, 'index.html'))) {
      return candidateDir;
    }
  }

  throw new Error(
    `Could not find a production build directory. Expected index.html in one of: ${candidateDirs.join(', ')}`,
  );
}

const DIST_DIR = resolveDistDir();
const DIST_INDEX_PATH = path.join(DIST_DIR, 'index.html');
const DIST_ASSETS_DIR = path.join(DIST_DIR, 'assets');
const PRODUCT_SOURCE_PATH = path.resolve(PROJECT_ROOT, 'src', 'data', 'products.ts');
const SEO_STORAGE_PATH = process.env.SEO_STORAGE_PATH
  ? path.resolve(PROJECT_ROOT, process.env.SEO_STORAGE_PATH)
  : path.resolve(PROJECT_ROOT, 'seo-data.json');
const ADMIN_PANEL_PATH = normalizePathname(
  process.env.ADMIN_PANEL_PATH || process.env.VITE_ADMIN_PANEL_PATH || '/control-room',
);
const ADMIN_PASSWORD =
  process.env.ADMIN_PANEL_PASSWORD ||
  process.env.ADMIN_PASSWORD ||
  (process.env.NODE_ENV === 'production' ? '' : 'krantas-admin');
const ADMIN_SESSION_COOKIE = 'krantas_admin_session';
const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;
const ADMIN_LOGIN_MAX_ATTEMPTS = Math.max(1, Number(process.env.ADMIN_LOGIN_MAX_ATTEMPTS || 5));
const ADMIN_LOGIN_LOCKOUT_SECONDS = Math.max(
  60,
  Number(process.env.ADMIN_LOGIN_LOCKOUT_SECONDS || 60 * 15),
);
const ADMIN_ACCESS_DENIED_MESSAGE = 'Access denied.';
const ADMIN_SESSION_TOKEN = ADMIN_PASSWORD
  ? crypto.createHash('sha256').update(`${ADMIN_PASSWORD}:${PROJECT_ROOT}`).digest('hex')
  : '';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT || 3000);

const ROUTE_SEO_DEFAULTS = {
  home: {
    title: 'KRANTAS Group | Industrial Vehicles and Heavy Equipment',
    description:
      'Full-cycle manufacturing of truck cranes, industrial vehicles, agricultural machinery, and custom engineering solutions.',
    keywords: 'Krantas, industrial vehicles, truck cranes, heavy equipment, Uzbekistan',
  },
  about: {
    title: 'About KRANTAS Group',
    description:
      'Learn about KRANTAS Group, our manufacturing heritage, mission, and industrial production capabilities.',
    keywords: 'Krantas about, manufacturing, heavy industry, engineering company',
  },
  products: {
    title: 'Products and Solutions | KRANTAS Group',
    description:
      'Explore KRANTAS standard products and custom-built industrial equipment for construction, mining, transport, and agriculture.',
    keywords: 'Krantas products, industrial machinery, special purpose vehicles',
  },
  catalog: {
    title: '{{categoryName}} Catalog | KRANTAS Group',
    description:
      'Browse the KRANTAS product catalog by category, specifications, and heavy-duty use case.',
    keywords: 'Krantas catalog, {{categoryName}}, heavy equipment catalog',
  },
  productDetail: {
    title: '{{productName}} | KRANTAS Group',
    description:
      'Technical specifications, features, and gallery for {{productName}} from KRANTAS Group.',
    keywords: '{{productName}}, Krantas, technical specifications',
  },
  customSolutions: {
    title: 'Custom Engineering Solutions | KRANTAS Group',
    description:
      'Bespoke industrial equipment, chassis modifications, and engineering services tailored to your operation.',
    keywords: 'custom engineering, chassis modification, industrial solutions, Krantas',
  },
  services: {
    title: 'Services and Support | KRANTAS Group',
    description:
      'After-sales support, quality services, localization, engineering, and manufacturing support from KRANTAS.',
    keywords: 'industrial service, support center, Krantas services',
  },
  news: {
    title: 'News | KRANTAS Group',
    description:
      'Latest KRANTAS company news, production milestones, certifications, and market updates.',
    keywords: 'Krantas news, manufacturing news, industrial updates',
  },
  careers: {
    title: 'Careers | KRANTAS Group',
    description:
      'Join the KRANTAS team and explore career opportunities in engineering, manufacturing, and operations.',
    keywords: 'Krantas careers, engineering jobs, manufacturing jobs',
  },
  contacts: {
    title: 'Contact KRANTAS Group',
    description:
      'Reach KRANTAS Group for product inquiries, service requests, partnerships, and custom engineering consultations.',
    keywords: 'Krantas contact, inquiry, service request, industrial partnership',
  },
  findDealer: {
    title: 'Dealer Network | KRANTAS Group',
    description:
      'Find KRANTAS headquarters, authorized dealers, and regional centers across Central Asia.',
    keywords: 'Krantas dealer, authorized dealer, regional center',
  },
  admin: {
    title: 'Admin Panel | KRANTAS CMS',
    description:
      'Manage products, translations, and SEO settings from the KRANTAS local CMS dashboard.',
    keywords: 'Krantas admin, CMS, SEO settings, product dashboard',
  },
};

let cachedIndexHtml = null;
let cachedSeoStore = null;
let cachedSeoStoreMtimeMs = 0;
let cachedProductPaths = [];
let cachedProductPathsMtimeMs = 0;
const adminLoginAttempts = new Map();

function createEmptySeoStore() {
  return { paths: {} };
}

function normalizePathname(inputPath = '/') {
  const pathOnly = String(inputPath || '/').split('?')[0].split('#')[0] || '/';
  const normalized = pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`;
  return normalized !== '/' ? normalized.replace(/\/+$/, '') : normalized;
}

function normalizeRequestTarget(inputPath = '/') {
  const pathAndQuery = String(inputPath || '/').split('#')[0] || '/';
  const [pathname, ...searchParts] = pathAndQuery.split('?');
  const normalizedPathname = normalizePathname(pathname || '/');
  const search = searchParts.length > 0 ? `?${searchParts.join('?')}` : '';

  return {
    pathname: normalizedPathname,
    requestPath: `${normalizedPathname}${search}`,
  };
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getRequestCookies(req) {
  return Object.fromEntries(
    String(req.headers.cookie || '')
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const separatorIndex = part.indexOf('=');
        const key = separatorIndex >= 0 ? part.slice(0, separatorIndex) : part;
        const value = separatorIndex >= 0 ? part.slice(separatorIndex + 1) : '';

        return [key, decodeURIComponent(value)];
      }),
  );
}

function stringsMatch(left = '', right = '') {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function isAdminPasswordConfigured() {
  return Boolean(ADMIN_PASSWORD);
}

function isAdminAuthenticated(req) {
  if (!isAdminPasswordConfigured()) {
    return false;
  }

  const sessionCookie = getRequestCookies(req)[ADMIN_SESSION_COOKIE];
  return Boolean(sessionCookie) && stringsMatch(sessionCookie, ADMIN_SESSION_TOKEN);
}

function buildAdminSessionCookie(req, clear = false) {
  const parts = [
    `${ADMIN_SESSION_COOKIE}=${clear ? '' : encodeURIComponent(ADMIN_SESSION_TOKEN)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
  ];

  if (req.secure || req.protocol === 'https') {
    parts.push('Secure');
  }

  if (clear) {
    parts.push('Max-Age=0');
    parts.push('Expires=Thu, 01 Jan 1970 00:00:00 GMT');
  } else {
    parts.push(`Max-Age=${ADMIN_SESSION_MAX_AGE_SECONDS}`);
  }

  return parts.join('; ');
}

function getAdminLoginKey(req) {
  const userAgent = String(req.get('user-agent') || '').slice(0, 160);
  return `${req.ip || req.socket?.remoteAddress || 'unknown'}|${userAgent}`;
}

function getAdminLoginAttemptState(req) {
  const key = getAdminLoginKey(req);
  const now = Date.now();
  const existingState = adminLoginAttempts.get(key);

  if (!existingState) {
    return {
      key,
      attempts: 0,
      lockedUntil: 0,
      isLocked: false,
    };
  }

  if (existingState.lockedUntil && existingState.lockedUntil <= now) {
    adminLoginAttempts.delete(key);
    return {
      key,
      attempts: 0,
      lockedUntil: 0,
      isLocked: false,
    };
  }

  return {
    key,
    attempts: existingState.attempts || 0,
    lockedUntil: existingState.lockedUntil || 0,
    isLocked: Boolean(existingState.lockedUntil && existingState.lockedUntil > now),
  };
}

function registerAdminLoginFailure(req) {
  const { key, attempts } = getAdminLoginAttemptState(req);
  const nextAttempts = attempts + 1;
  const shouldLock = nextAttempts >= ADMIN_LOGIN_MAX_ATTEMPTS;

  adminLoginAttempts.set(key, {
    attempts: nextAttempts,
    lockedUntil: shouldLock ? Date.now() + ADMIN_LOGIN_LOCKOUT_SECONDS * 1000 : 0,
  });

  return shouldLock;
}

function clearAdminLoginFailures(req) {
  adminLoginAttempts.delete(getAdminLoginKey(req));
}

function toAbsoluteUrl(value, req) {
  if (!value) {
    return '';
  }

  try {
    return new URL(value, getSiteOrigin(req)).toString();
  } catch {
    return '';
  }
}

function getSiteOrigin(req) {
  const configuredOrigin = process.env.SITE_URL?.trim();

  if (configuredOrigin) {
    return configuredOrigin.replace(/\/+$/, '');
  }

  return `${req.protocol}://${req.get('host')}`;
}

function replaceTemplateTokens(template, replacements) {
  return template.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_, token) => replacements[token.trim()] || '');
}

function humanizeSlug(value = '') {
  return value
    .split('-')
    .filter(Boolean)
    .map((segment) =>
      /^[a-z]{1,3}$/i.test(segment)
        ? segment.toUpperCase()
        : `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`,
    )
    .join(' ');
}

function resolveRouteKey(pathname) {
  if (pathname === ADMIN_PANEL_PATH || pathname.startsWith(`${ADMIN_PANEL_PATH}/`)) return 'admin';
  if (pathname.startsWith('/product/')) return 'productDetail';
  if (pathname.startsWith('/catalog')) return 'catalog';
  if (pathname === '/') return 'home';
  if (pathname === '/about') return 'about';
  if (pathname === '/products') return 'products';
  if (pathname === '/custom-solutions') return 'customSolutions';
  if (pathname === '/services') return 'services';
  if (pathname === '/news') return 'news';
  if (pathname === '/careers') return 'careers';
  if (pathname === '/contacts') return 'contacts';
  if (pathname === '/find-dealer') return 'findDealer';
  return 'home';
}

function buildRouteReplacements(pathname) {
  const productId = pathname.startsWith('/product/') ? pathname.slice('/product/'.length) : '';
  const categoryId = pathname.startsWith('/catalog/') ? pathname.slice('/catalog/'.length) : '';

  return {
    productName: humanizeSlug(productId),
    categoryName: humanizeSlug(categoryId) || 'Product',
  };
}

function normalizeSeoPayload(rawSeo, pathname, req, requestPath = pathname) {
  const routeKey = resolveRouteKey(pathname);
  const routeDefaults = ROUTE_SEO_DEFAULTS[routeKey] || ROUTE_SEO_DEFAULTS.home;
  const replacements = buildRouteReplacements(pathname);

  const title = replaceTemplateTokens(rawSeo.title || routeDefaults.title, replacements).trim();
  const description = replaceTemplateTokens(
    rawSeo.description || routeDefaults.description,
    replacements,
  ).trim();
  const keywords = replaceTemplateTokens(rawSeo.keywords || routeDefaults.keywords, replacements).trim();
  const ogTitle = (rawSeo.ogTitle || title).trim();
  const ogDescription = (rawSeo.ogDescription || description).trim();
  const ogImage = toAbsoluteUrl(rawSeo.ogImage || rawSeo.image || '/og-default.jpg', req);
  const url = toAbsoluteUrl(requestPath, req);
  const robots =
    pathname === ADMIN_PANEL_PATH || pathname.startsWith(`${ADMIN_PANEL_PATH}/`)
      ? 'noindex, nofollow'
      : typeof rawSeo.robots === 'string'
        ? rawSeo.robots.trim()
        : '';

  return {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    url,
    canonicalUrl: url,
    robots,
  };
}

async function readIndexHtml() {
  if (cachedIndexHtml) {
    return cachedIndexHtml;
  }

  cachedIndexHtml = await fs.readFile(DIST_INDEX_PATH, 'utf8');
  return cachedIndexHtml;
}

async function readSeoStore() {
  try {
    const stats = await fs.stat(SEO_STORAGE_PATH);

    if (cachedSeoStore && cachedSeoStoreMtimeMs === stats.mtimeMs) {
      return cachedSeoStore;
    }

    const raw = await fs.readFile(SEO_STORAGE_PATH, 'utf8');
    const parsed = JSON.parse(raw);

    cachedSeoStore =
      parsed && typeof parsed === 'object'
        ? parsed.paths && typeof parsed.paths === 'object'
          ? parsed
          : { paths: parsed }
        : createEmptySeoStore();
    cachedSeoStoreMtimeMs = stats.mtimeMs;

    return cachedSeoStore;
  } catch {
    cachedSeoStore = createEmptySeoStore();
    cachedSeoStoreMtimeMs = 0;
    return cachedSeoStore;
  }
}

async function writeSeoStore(store) {
  const nextStore =
    store && typeof store === 'object' && store.paths && typeof store.paths === 'object'
      ? store
      : createEmptySeoStore();
  const payload = `${JSON.stringify(nextStore, null, 2)}\n`;

  await fs.writeFile(SEO_STORAGE_PATH, payload, 'utf8');

  cachedSeoStore = nextStore;

  try {
    const stats = await fs.stat(SEO_STORAGE_PATH);
    cachedSeoStoreMtimeMs = stats.mtimeMs;
  } catch {
    cachedSeoStoreMtimeMs = 0;
  }
}

async function getKnownProductPaths() {
  try {
    const stats = await fs.stat(PRODUCT_SOURCE_PATH);

    if (cachedProductPaths.length > 0 && cachedProductPathsMtimeMs === stats.mtimeMs) {
      return cachedProductPaths;
    }

    const source = await fs.readFile(PRODUCT_SOURCE_PATH, 'utf8');
    const productsBlock = source.match(
      /export const products(?:\s*:\s*[^=]+)?\s*=\s*\[(?<content>[\s\S]*?)\n\];/,
    );
    const productsContent = productsBlock?.groups?.content ?? '';
    const ids = Array.from(productsContent.matchAll(/\bid:\s*'([^']+)'/g), (match) => match[1]);

    cachedProductPaths = Array.from(new Set(ids)).map((id) => `/product/${id}`);
    cachedProductPathsMtimeMs = stats.mtimeMs;

    return cachedProductPaths;
  } catch {
    cachedProductPaths = [];
    cachedProductPathsMtimeMs = 0;
    return cachedProductPaths;
  }
}

function resolvePatternSeoMatch(pathname, seoRecords) {
  const normalizedPathname = normalizePathname(pathname);

  return Object.entries(seoRecords).find(([storedPath]) => {
    if (typeof storedPath !== 'string' || !storedPath.includes(':')) {
      return false;
    }

    const normalizedStoredPath = normalizePathname(storedPath);
    const pattern = normalizedStoredPath.replace(/:[^/]+/g, '[^/]+');
    const matcher = new RegExp(`^${pattern}$`);

    return matcher.test(normalizedPathname);
  });
}

async function getSeoFromStorage(pathname, req, requestPath = pathname) {
  const store = await readSeoStore();
  const seoRecords = store.paths;

  const exactMatch = seoRecords?.[pathname] || seoRecords?.[`${pathname}/`];
  const matchedEntry =
    exactMatch && typeof exactMatch === 'object'
      ? exactMatch
      : resolvePatternSeoMatch(pathname, seoRecords)?.[1];

  if (!matchedEntry || typeof matchedEntry !== 'object') {
    return null;
  }

  return normalizeSeoPayload(matchedEntry, pathname, req, requestPath);
}

async function getSeoForPath(pathname, req, requestPath = pathname) {
  // Replace this with a real DB lookup once the admin SEO data is persisted server-side.
  const storedSeo = await getSeoFromStorage(pathname, req, requestPath);
  return storedSeo || normalizeSeoPayload({}, pathname, req, requestPath);
}

function stripExistingSeoTags(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta[^>]+name=["']description["'][^>]*>\s*/gi, '')
    .replace(/<meta[^>]+name=["']keywords["'][^>]*>\s*/gi, '')
    .replace(/<meta[^>]+name=["']robots["'][^>]*>\s*/gi, '')
    .replace(/<link[^>]+rel=["']canonical["'][^>]*>\s*/gi, '')
    .replace(/<meta[^>]+property=["']og:title["'][^>]*>\s*/gi, '')
    .replace(/<meta[^>]+property=["']og:description["'][^>]*>\s*/gi, '')
    .replace(/<meta[^>]+property=["']og:image["'][^>]*>\s*/gi, '')
    .replace(/<meta[^>]+property=["']og:url["'][^>]*>\s*/gi, '')
    .replace(/<meta[^>]+property=["']og:type["'][^>]*>\s*/gi, '');
}

function injectSeoIntoHtml(html, seo) {
  const sanitizedHtml = stripExistingSeoTags(html);
  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="keywords" content="${escapeHtml(seo.keywords)}" />`,
    seo.robots ? `<meta name="robots" content="${escapeHtml(seo.robots)}" />` : '',
    `<link rel="canonical" href="${escapeHtml(seo.canonicalUrl || seo.url)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.ogTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.ogDescription)}" />`,
    `<meta property="og:image" content="${escapeHtml(seo.ogImage)}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.url)}" />`,
    '<meta property="og:type" content="website" />',
  ]
    .filter(Boolean)
    .join('\n    ');

  return sanitizedHtml.replace('</head>', `    ${tags}\n  </head>`);
}

function buildRobotsTxt(req) {
  return [
    'User-agent: *',
    'Allow: /',
    `Disallow: ${ADMIN_PANEL_PATH}`,
    '',
    `Sitemap: ${getSiteOrigin(req)}/sitemap.xml`,
    '',
  ].join('\n');
}

function buildSitemapXml(origin, paths) {
  const now = new Date().toISOString();
  const urls = paths
    .map((pathname) => {
      const absoluteUrl = new URL(pathname, origin).toString();

      return [
        '  <url>',
        `    <loc>${escapeHtml(absoluteUrl)}</loc>`,
        `    <lastmod>${now}</lastmod>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n');
}

function shouldServeSpaHtml(req) {
  return req.method === 'GET' && req.accepts('html') && !path.extname(req.path);
}

function requireAdminSession(req, res, next) {
  if (!isAdminPasswordConfigured()) {
    return res.status(503).json({ error: 'Admin password is not configured on the server.' });
  }

  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  return next();
}

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(express.json());
app.use(
  '/assets',
  express.static(DIST_ASSETS_DIR, {
    immutable: true,
    maxAge: '1y',
    index: false,
  }),
);
app.use(
  express.static(DIST_DIR, {
    index: false,
    maxAge: '1h',
  }),
);

app.get('/health', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.status(200).json({
    ok: true,
    app: 'krantas-web',
    cwd: process.cwd(),
    projectRoot: PROJECT_ROOT,
    distDir: DIST_DIR,
    protocol: req.protocol,
    host: req.get('host'),
  });
});

app.get('/api/admin/session', (req, res) => {
  res.set('Cache-Control', 'no-store').json({
    authenticated: isAdminAuthenticated(req),
  });
});

app.post('/api/admin/login', (req, res) => {
  const password = typeof req.body?.password === 'string' ? req.body.password : '';

  if (!isAdminPasswordConfigured()) {
    return res
      .status(503)
      .set('Cache-Control', 'no-store')
      .json({ error: 'Admin access is unavailable.' });
  }

  const attemptState = getAdminLoginAttemptState(req);

  if (attemptState.isLocked) {
    return res
      .status(429)
      .set('Cache-Control', 'no-store')
      .json({ error: ADMIN_ACCESS_DENIED_MESSAGE });
  }

  if (!stringsMatch(password, ADMIN_PASSWORD)) {
    const locked = registerAdminLoginFailure(req);

    return res
      .status(locked ? 429 : 401)
      .set('Cache-Control', 'no-store')
      .json({ error: ADMIN_ACCESS_DENIED_MESSAGE });
  }

  clearAdminLoginFailures(req);
  res
    .set('Set-Cookie', buildAdminSessionCookie(req))
    .set('Cache-Control', 'no-store')
    .json({ ok: true, authenticated: true });
});

app.post('/api/admin/logout', (req, res) => {
  res
    .set('Set-Cookie', buildAdminSessionCookie(req, true))
    .set('Cache-Control', 'no-store')
    .json({ ok: true, authenticated: false });
});

app.get('/api/seo', async (req, res) => {
  const requestPath =
    typeof req.query.path === 'string' && req.query.path.trim() ? req.query.path : '/';
  const normalizedRequest = normalizeRequestTarget(requestPath);
  const seo = await getSeoForPath(normalizedRequest.pathname, req, normalizedRequest.requestPath);

  res.set('Cache-Control', 'no-store');
  res.json(seo);
});

app.post('/api/seo', requireAdminSession, async (req, res, next) => {
  try {
    const routePath =
      typeof req.body?.path === 'string' && req.body.path.trim() ? req.body.path : '';
    const incomingSeo =
      req.body?.seo && typeof req.body.seo === 'object' ? req.body.seo : null;

    if (!routePath || !incomingSeo) {
      return res.status(400).json({
        error: 'Expected a JSON body with "path" and "seo" fields.',
      });
    }

    const normalizedPath = normalizePathname(routePath);
    const currentStore = await readSeoStore();
    const nextSeoRecord = {
      title: typeof incomingSeo.title === 'string' ? incomingSeo.title : '',
      description: typeof incomingSeo.description === 'string' ? incomingSeo.description : '',
      keywords: typeof incomingSeo.keywords === 'string' ? incomingSeo.keywords : '',
      ogTitle:
        typeof incomingSeo.ogTitle === 'string'
          ? incomingSeo.ogTitle
          : typeof incomingSeo.title === 'string'
            ? incomingSeo.title
            : '',
      ogDescription:
        typeof incomingSeo.ogDescription === 'string'
          ? incomingSeo.ogDescription
          : typeof incomingSeo.description === 'string'
            ? incomingSeo.description
            : '',
      ogImage:
        typeof incomingSeo.ogImage === 'string'
          ? incomingSeo.ogImage
          : typeof incomingSeo.image === 'string'
            ? incomingSeo.image
            : '/og-default.jpg',
      image: typeof incomingSeo.image === 'string' ? incomingSeo.image : undefined,
      robots: typeof incomingSeo.robots === 'string' ? incomingSeo.robots : undefined,
      updatedAt: new Date().toISOString(),
    };

    const nextStore = {
      paths: {
        ...currentStore.paths,
        [normalizedPath]: nextSeoRecord,
      },
    };

    await writeSeoStore(nextStore);

    res.status(200).json({
      ok: true,
      path: normalizedPath,
      seo: normalizeSeoPayload(nextSeoRecord, normalizedPath, req, normalizedPath),
    });
  } catch (error) {
    next(error);
  }
});

app.get('/robots.txt', (req, res) => {
  res.set('Cache-Control', 'no-store').type('text/plain').send(buildRobotsTxt(req));
});

app.get('/sitemap.xml', async (req, res, next) => {
  try {
    const staticPaths = [
      '/',
      '/about',
      '/products',
      '/catalog',
      '/custom-solutions',
      '/services',
      '/news',
      '/careers',
      '/contacts',
      '/find-dealer',
    ];
    const productPaths = await getKnownProductPaths();
    const sitemap = buildSitemapXml(getSiteOrigin(req), [...staticPaths, ...productPaths]);

    res.set('Cache-Control', 'no-store').type('application/xml').send(sitemap);
  } catch (error) {
    next(error);
  }
});

app.get(/.*/, async (req, res, next) => {
  if (!shouldServeSpaHtml(req)) {
    return next();
  }

  try {
    const normalizedRequest = normalizeRequestTarget(req.originalUrl || req.path);
    const [indexHtml, seo] = await Promise.all([
      readIndexHtml(),
      getSeoForPath(normalizedRequest.pathname, req, normalizedRequest.requestPath),
    ]);
    const html = injectSeoIntoHtml(indexHtml, seo);

    res.set('Cache-Control', 'no-store').status(200).type('html').send(html);
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((error, req, res, next) => {
  console.error('SEO server error:', error);

  if (res.headersSent) {
    return next(error);
  }

  res.status(500).send('Internal server error');
});

app.listen(PORT, HOST, () => {
  console.log(`SEO server listening on http://${HOST}:${PORT}`);
  console.log(`Project root: ${PROJECT_ROOT}`);
  console.log(`Process cwd: ${process.cwd()}`);
  console.log(`Serving static assets from ${DIST_DIR}`);
  console.log(`Dist index path: ${DIST_INDEX_PATH}`);
});
