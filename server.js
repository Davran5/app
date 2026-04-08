import 'dotenv/config';
import crypto from 'node:crypto';
import express from 'express';
import mysql from 'mysql2/promise';
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
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const PRODUCT_SOURCE_PATH = path.resolve(PROJECT_ROOT, 'src', 'data', 'products.ts');
const SEO_STORAGE_PATH = process.env.SEO_STORAGE_PATH
  ? path.resolve(PROJECT_ROOT, process.env.SEO_STORAGE_PATH)
  : path.resolve(PROJECT_ROOT, 'seo-data.json');
const CMS_STORAGE_PATH = process.env.CMS_STORAGE_PATH
  ? path.resolve(PROJECT_ROOT, process.env.CMS_STORAGE_PATH)
  : path.resolve(PROJECT_ROOT, 'cms-data.json');
const DATABASE_HOST = process.env.DB_HOST?.trim() || process.env.MYSQL_HOST?.trim() || 'localhost';
const DATABASE_PORT = Number(process.env.DB_PORT || process.env.MYSQL_PORT || 3306);
const DATABASE_NAME = process.env.DB_NAME?.trim() || process.env.MYSQL_DATABASE?.trim() || '';
const DATABASE_USER = process.env.DB_USER?.trim() || process.env.MYSQL_USER?.trim() || '';
const DATABASE_PASSWORD = process.env.DB_PASSWORD ?? process.env.MYSQL_PASSWORD ?? '';
const ADMIN_AUDIT_LOG_PATH = process.env.ADMIN_AUDIT_LOG_PATH
  ? path.resolve(PROJECT_ROOT, process.env.ADMIN_AUDIT_LOG_PATH)
  : path.resolve(PROJECT_ROOT, 'admin-audit.log');
const GOOGLE_MAPS_API_KEY =
  process.env.GOOGLE_MAPS_API_KEY?.trim() || process.env.VITE_GOOGLE_MAPS_API_KEY?.trim() || '';
const GOOGLE_MAPS_MAP_ID =
  process.env.GOOGLE_MAPS_MAP_ID?.trim() || process.env.VITE_GOOGLE_MAPS_MAP_ID?.trim() || '';
const ADMIN_PANEL_PATH = normalizePathname(
  process.env.ADMIN_PANEL_PATH || process.env.VITE_ADMIN_PANEL_PATH || '/control-room',
);
const ADMIN_USERS = getConfiguredAdminUsers();
const ADMIN_SESSION_COOKIE = 'krantas_admin_session';
const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;
const ADMIN_LOGIN_MAX_ATTEMPTS = Math.max(1, Number(process.env.ADMIN_LOGIN_MAX_ATTEMPTS || 5));
const ADMIN_LOGIN_LOCKOUT_SECONDS = Math.max(
  60,
  Number(process.env.ADMIN_LOGIN_LOCKOUT_SECONDS || 60 * 15),
);
const LEAD_RATE_LIMIT_WINDOW_SECONDS = Math.max(
  60,
  Number(process.env.LEAD_RATE_LIMIT_WINDOW_SECONDS || 60 * 15),
);
const LEAD_RATE_LIMIT_MAX = Math.max(1, Number(process.env.LEAD_RATE_LIMIT_MAX || 10));
const ADMIN_ACCESS_DENIED_MESSAGE = 'Access denied.';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT || 3000);
const CMS_DB_STATE_KEY = 'cms_store';
const SEO_DB_STATE_KEY = 'seo_store';

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
  privacyPolicy: {
    title: 'Privacy Policy | KRANTAS Group',
    description:
      'Privacy Policy for the KRANTAS Group website, framed around current Uzbekistan personal data and online communication requirements.',
    keywords: 'Krantas privacy policy, Uzbekistan personal data, website privacy',
  },
  termsOfService: {
    title: 'Terms of Service | KRANTAS Group',
    description:
      'Terms of Service for the KRANTAS Group website, covering website use, intellectual property, and business inquiry terms under Uzbekistan law.',
    keywords: 'Krantas terms of service, website terms, Uzbekistan legal terms',
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
let cachedCmsStore = null;
let cachedCmsStoreMtimeMs = 0;
let cachedProductPaths = [];
let cachedProductPathsMtimeMs = 0;
let databasePoolPromise = null;
let databaseStorageReadyPromise = null;
const adminLoginAttempts = new Map();
const adminSessions = new Map();
const leadSubmissionAttempts = new Map();

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

function createEmptyCmsStore() {
  return {};
}

function isDatabaseConfigured() {
  return Boolean(DATABASE_NAME && DATABASE_USER);
}

async function getDatabasePool() {
  if (!isDatabaseConfigured()) {
    return null;
  }

  if (!databasePoolPromise) {
    databasePoolPromise = (async () => {
      const pool = mysql.createPool({
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        database: DATABASE_NAME,
        user: DATABASE_USER,
        password: DATABASE_PASSWORD,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        charset: 'utf8mb4',
      });

      await pool.query('SELECT 1');
      return pool;
    })();
  }

  try {
    return await databasePoolPromise;
  } catch (error) {
    databasePoolPromise = null;
    throw error;
  }
}

async function ensureDatabaseStorage() {
  if (!isDatabaseConfigured()) {
    return false;
  }

  if (!databaseStorageReadyPromise) {
    databaseStorageReadyPromise = (async () => {
      const pool = await getDatabasePool();

      await pool.query(`
        CREATE TABLE IF NOT EXISTS app_state (
          state_key VARCHAR(64) NOT NULL PRIMARY KEY,
          state_json LONGTEXT NOT NULL,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

      return true;
    })();
  }

  try {
    await databaseStorageReadyPromise;
    return true;
  } catch (error) {
    databaseStorageReadyPromise = null;
    throw error;
  }
}

async function readStateRecordFromDatabase(stateKey) {
  if (!isDatabaseConfigured()) {
    return null;
  }

  await ensureDatabaseStorage();
  const pool = await getDatabasePool();
  const [rows] = await pool.query('SELECT state_json FROM app_state WHERE state_key = ? LIMIT 1', [
    stateKey,
  ]);
  const row = Array.isArray(rows) ? rows[0] : null;

  if (!row || typeof row.state_json !== 'string') {
    return null;
  }

  return JSON.parse(row.state_json);
}

async function writeStateRecordToDatabase(stateKey, value) {
  if (!isDatabaseConfigured()) {
    return false;
  }

  await ensureDatabaseStorage();
  const pool = await getDatabasePool();
  await pool.query(
    `
      INSERT INTO app_state (state_key, state_json, updated_at)
      VALUES (?, ?, UTC_TIMESTAMP())
      ON DUPLICATE KEY UPDATE
        state_json = VALUES(state_json),
        updated_at = UTC_TIMESTAMP()
    `,
    [stateKey, JSON.stringify(value)],
  );

  return true;
}

function getConfiguredAdminUsers() {
  const configuredUsers = [];

  if (process.env.ADMIN_USERS_JSON?.trim()) {
    try {
      const parsed = JSON.parse(process.env.ADMIN_USERS_JSON);

      if (Array.isArray(parsed)) {
        parsed.forEach((item) => {
          if (!item || typeof item !== 'object') {
            return;
          }

          const username = typeof item.username === 'string' ? item.username.trim() : '';
          const password = typeof item.password === 'string' ? item.password.trim() : '';
          const displayName =
            typeof item.displayName === 'string' && item.displayName.trim()
              ? item.displayName.trim()
              : username;
          const role =
            typeof item.role === 'string' && item.role.trim() ? item.role.trim() : 'admin';

          if (!username || !password) {
            return;
          }

          configuredUsers.push({
            username,
            usernameKey: username.toLowerCase(),
            displayName,
            password,
            role,
          });
        });
      }
    } catch (error) {
      console.error('Failed to parse ADMIN_USERS_JSON:', error);
    }
  }

  const fallbackPassword = (
    process.env.ADMIN_PANEL_PASSWORD ||
    process.env.ADMIN_PASSWORD ||
    (process.env.NODE_ENV === 'development' ? 'krantas-admin' : '')
  ).trim();
  const fallbackUsername = (
    process.env.ADMIN_PANEL_USERNAME ||
    process.env.ADMIN_USERNAME ||
    'admin'
  ).trim();

  if (fallbackPassword && !configuredUsers.some((user) => user.usernameKey === fallbackUsername.toLowerCase())) {
    configuredUsers.push({
      username: fallbackUsername,
      usernameKey: fallbackUsername.toLowerCase(),
      displayName: fallbackUsername,
      password: fallbackPassword,
      role: 'admin',
    });
  }

  return configuredUsers;
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeInlineJson(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
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

function isLocalDevelopmentRequest(req) {
  const host = String(req.headers.host || '').toLowerCase();

  return (
    process.env.NODE_ENV !== 'production' &&
    (host.startsWith('localhost:') ||
      host === 'localhost' ||
      host.startsWith('127.0.0.1:') ||
      host === '127.0.0.1')
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

function isObjectRecord(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function getAdminUserByUsername(username = '') {
  const normalizedUsername = String(username).trim().toLowerCase();
  return ADMIN_USERS.find((user) => user.usernameKey === normalizedUsername);
}

function isAdminAccessConfigured() {
  return ADMIN_USERS.length > 0;
}

function getAdminLoginKey(req, username = '') {
  const userAgent = String(req.get('user-agent') || '').slice(0, 160);
  return `${req.ip || req.socket?.remoteAddress || 'unknown'}|${String(username).trim().toLowerCase()}|${userAgent}`;
}

function getAdminLoginAttemptState(req, username = '') {
  const key = getAdminLoginKey(req, username);
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

function registerAdminLoginFailure(req, username = '') {
  const { key, attempts } = getAdminLoginAttemptState(req, username);
  const nextAttempts = attempts + 1;
  const shouldLock = nextAttempts >= ADMIN_LOGIN_MAX_ATTEMPTS;

  adminLoginAttempts.set(key, {
    attempts: nextAttempts,
    lockedUntil: shouldLock ? Date.now() + ADMIN_LOGIN_LOCKOUT_SECONDS * 1000 : 0,
  });

  return shouldLock;
}

function clearAdminLoginFailures(req, username = '') {
  adminLoginAttempts.delete(getAdminLoginKey(req, username));
}

function clearExpiredAdminSessions() {
  const now = Date.now();

  for (const [sessionId, session] of adminSessions.entries()) {
    if (!session?.expiresAt || session.expiresAt <= now) {
      adminSessions.delete(sessionId);
    }
  }
}

function createAdminSession(user) {
  clearExpiredAdminSessions();
  const sessionId = crypto.randomBytes(32).toString('hex');
  const now = Date.now();

  adminSessions.set(sessionId, {
    id: sessionId,
    username: user.username,
    role: user.role,
    displayName: user.displayName,
    createdAt: now,
    expiresAt: now + ADMIN_SESSION_MAX_AGE_SECONDS * 1000,
  });

  return sessionId;
}

function getAdminSession(req) {
  if (!isAdminAccessConfigured()) {
    return null;
  }

  if (isLocalDevelopmentRequest(req)) {
    return {
      username: process.env.ADMIN_PANEL_USERNAME || process.env.ADMIN_USERNAME || 'admin',
      role: 'admin',
      expiresAt: Number.MAX_SAFE_INTEGER,
    };
  }

  clearExpiredAdminSessions();
  const sessionCookie = getRequestCookies(req)[ADMIN_SESSION_COOKIE];

  if (!sessionCookie) {
    return null;
  }

  const session = adminSessions.get(sessionCookie);

  if (!session) {
    return null;
  }

  if (!session.expiresAt || session.expiresAt <= Date.now()) {
    adminSessions.delete(sessionCookie);
    return null;
  }

  return session;
}

function isAdminAuthenticated(req) {
  return Boolean(getAdminSession(req));
}

function destroyAdminSession(sessionId = '') {
  if (sessionId) {
    adminSessions.delete(sessionId);
  }
}

function buildAdminSessionCookie(req, sessionId = '', clear = false) {
  const parts = [
    `${ADMIN_SESSION_COOKIE}=${clear ? '' : encodeURIComponent(sessionId)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
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

function getLeadSubmissionKey(req) {
  return `${req.ip || req.socket?.remoteAddress || 'unknown'}`;
}

function isLeadSubmissionAllowed(req) {
  const key = getLeadSubmissionKey(req);
  const now = Date.now();
  const existingState = leadSubmissionAttempts.get(key);

  if (!existingState || existingState.resetAt <= now) {
    leadSubmissionAttempts.set(key, {
      count: 0,
      resetAt: now + LEAD_RATE_LIMIT_WINDOW_SECONDS * 1000,
    });
    return true;
  }

  return existingState.count < LEAD_RATE_LIMIT_MAX;
}

function registerLeadSubmission(req) {
  const key = getLeadSubmissionKey(req);
  const now = Date.now();
  const existingState = leadSubmissionAttempts.get(key);

  if (!existingState || existingState.resetAt <= now) {
    leadSubmissionAttempts.set(key, {
      count: 1,
      resetAt: now + LEAD_RATE_LIMIT_WINDOW_SECONDS * 1000,
    });
    return;
  }

  leadSubmissionAttempts.set(key, {
    ...existingState,
    count: existingState.count + 1,
  });
}

function sanitizeLeadInput(rawLead) {
  if (!isObjectRecord(rawLead)) {
    return null;
  }

  const source = rawLead.source === 'careers' ? 'careers' : rawLead.source === 'contact' ? 'contact' : '';
  const name = typeof rawLead.name === 'string' ? rawLead.name.trim().slice(0, 140) : '';
  const email = typeof rawLead.email === 'string' ? rawLead.email.trim().slice(0, 180) : '';
  const phone = typeof rawLead.phone === 'string' ? rawLead.phone.trim().slice(0, 80) : '';
  const company = typeof rawLead.company === 'string' ? rawLead.company.trim().slice(0, 160) : '';
  const subject = typeof rawLead.subject === 'string' ? rawLead.subject.trim().slice(0, 180) : '';
  const message = typeof rawLead.message === 'string' ? rawLead.message.trim().slice(0, 4000) : '';
  const language =
    rawLead.language === 'ru' || rawLead.language === 'uz' || rawLead.language === 'de'
      ? rawLead.language
      : rawLead.language === 'en'
        ? 'en'
        : '';
  const originPage =
    typeof rawLead.originPage === 'string' ? normalizePathname(rawLead.originPage).slice(0, 200) : '';
  const metadata = isObjectRecord(rawLead.metadata)
    ? Object.fromEntries(
        Object.entries(rawLead.metadata)
          .filter(([key, value]) => typeof value === 'string' && key.trim())
          .map(([key, value]) => [key.trim().slice(0, 80), value.trim().slice(0, 240)]),
      )
    : {};

  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!source || !name || !emailLooksValid || !subject || !language || !originPage) {
    return null;
  }

  return {
    source,
    name,
    email,
    phone,
    company,
    subject,
    message,
    language,
    originPage,
    metadata,
  };
}

function createCmsEntityId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createLeadRecord(leadInput) {
  const timestamp = new Date().toISOString();

  return {
    id: createCmsEntityId('lead'),
    createdAt: timestamp,
    updatedAt: timestamp,
    source: leadInput.source,
    status: 'new',
    priority: leadInput.source === 'careers' ? 'high' : 'normal',
    name: leadInput.name,
    email: leadInput.email,
    phone: leadInput.phone || '',
    company: leadInput.company || '',
    subject: leadInput.subject,
    message: leadInput.message || '',
    language: leadInput.language,
    originPage: leadInput.originPage,
    assignee: '',
    followUpAt: '',
    internalNotes: [],
    metadata: leadInput.metadata || {},
  };
}

function filterPublicCmsSnapshot(rawSnapshot) {
  if (!isObjectRecord(rawSnapshot)) {
    return createEmptyCmsStore();
  }

  const nextSnapshot = {
    ...rawSnapshot,
    leads: [],
  };

  if (Array.isArray(rawSnapshot.vacancies)) {
    nextSnapshot.vacancies = rawSnapshot.vacancies.filter(
      (vacancy) => isObjectRecord(vacancy) && vacancy.isActive !== false,
    );
  }

  if (Array.isArray(rawSnapshot.newsItems)) {
    nextSnapshot.newsItems = rawSnapshot.newsItems.filter(
      (newsItem) => isObjectRecord(newsItem) && newsItem.isActive !== false,
    );
  }

  for (const key of ['products', 'categories', 'featuredProductIds', 'distributorLocations', 'newsItems']) {
    if (Array.isArray(nextSnapshot[key]) && nextSnapshot[key].length === 0) {
      delete nextSnapshot[key];
    }
  }

  return nextSnapshot;
}

function appendAdminAuditLog(event, req, details = {}) {
  const payload = {
    at: new Date().toISOString(),
    event,
    ip: req.ip || req.socket?.remoteAddress || '',
    method: req.method,
    path: req.originalUrl || req.path,
    username: getAdminSession(req)?.username || undefined,
    ...details,
  };

  void fs.appendFile(ADMIN_AUDIT_LOG_PATH, `${JSON.stringify(payload)}\n`, 'utf8').catch(() => {});
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

function buildContentSecurityPolicy(nonce) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://maps.googleapis.com https://maps.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.cdnfonts.com https://unpkg.com",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com https://fonts.cdnfonts.com",
    "connect-src 'self' https://maps.googleapis.com https://maps.gstatic.com https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
    "media-src 'self' data: blob: https:",
    "worker-src 'self' blob:",
    "frame-src 'self' https://www.google.com https://maps.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    'upgrade-insecure-requests',
  ].join('; ');
}

function applySecurityHeaders(req, res, next) {
  const cspNonce = crypto.randomBytes(16).toString('base64');
  res.locals.cspNonce = cspNonce;
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Content-Security-Policy': buildContentSecurityPolicy(cspNonce),
    'Permissions-Policy':
      'accelerometer=(), autoplay=(self), camera=(), display-capture=(), geolocation=(self), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
  });

  if (req.secure || req.protocol === 'https') {
    res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  next();
}

function getAllowedOrigins(req) {
  const origins = new Set();
  const siteOrigin = getSiteOrigin(req);

  if (siteOrigin) {
    origins.add(siteOrigin);
  }

  try {
    origins.add(new URL(`${req.protocol}://${req.get('host')}`).origin);
  } catch {
    // Ignore malformed host headers and fall back to the configured site origin only.
  }

  return origins;
}

function isAllowedRequestOrigin(candidate, req) {
  if (!candidate) {
    return true;
  }

  try {
    const candidateOrigin = new URL(candidate).origin;
    return getAllowedOrigins(req).has(candidateOrigin);
  } catch {
    return false;
  }
}

function requireSameOrigin(req, res, next) {
  const origin = req.get('origin');
  const referer = req.get('referer');

  if (!isAllowedRequestOrigin(origin, req) || !isAllowedRequestOrigin(referer, req)) {
    return res.status(403).set('Cache-Control', 'no-store').json({ error: 'Forbidden' });
  }

  return next();
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
  if (pathname === '/privacy-policy') return 'privacyPolicy';
  if (pathname === '/terms-of-service') return 'termsOfService';
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
  let shouldSeedDatabaseFromFile = false;

  if (isDatabaseConfigured()) {
    try {
      const databaseStore = await readStateRecordFromDatabase(SEO_DB_STATE_KEY);

      if (databaseStore && typeof databaseStore === 'object') {
        cachedSeoStore =
          databaseStore.paths && typeof databaseStore.paths === 'object'
            ? databaseStore
            : { paths: databaseStore };
        cachedSeoStoreMtimeMs = 0;
        return cachedSeoStore;
      }

      shouldSeedDatabaseFromFile = true;
    } catch (error) {
      console.error('Failed to read SEO store from database, falling back to file storage.', error);
    }
  }

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

    if (shouldSeedDatabaseFromFile) {
      await writeStateRecordToDatabase(SEO_DB_STATE_KEY, cachedSeoStore).catch(() => undefined);
    }

    return cachedSeoStore;
  } catch {
    cachedSeoStore = createEmptySeoStore();
    cachedSeoStoreMtimeMs = 0;

    if (shouldSeedDatabaseFromFile) {
      await writeStateRecordToDatabase(SEO_DB_STATE_KEY, cachedSeoStore).catch(() => undefined);
    }

    return cachedSeoStore;
  }
}

async function writeSeoStore(store) {
  const nextStore =
    store && typeof store === 'object' && store.paths && typeof store.paths === 'object'
      ? store
      : createEmptySeoStore();
  cachedSeoStore = nextStore;
  cachedSeoStoreMtimeMs = 0;

  if (isDatabaseConfigured()) {
    try {
      await writeStateRecordToDatabase(SEO_DB_STATE_KEY, nextStore);
      return;
    } catch (error) {
      console.error('Failed to write SEO store to database, falling back to file storage.', error);
    }
  }

  const payload = `${JSON.stringify(nextStore, null, 2)}\n`;

  await fs.writeFile(SEO_STORAGE_PATH, payload, 'utf8');

  try {
    const stats = await fs.stat(SEO_STORAGE_PATH);
    cachedSeoStoreMtimeMs = stats.mtimeMs;
  } catch {
    cachedSeoStoreMtimeMs = 0;
  }
}

async function readCmsStore() {
  let shouldSeedDatabaseFromFile = false;

  if (isDatabaseConfigured()) {
    try {
      const databaseStore = await readStateRecordFromDatabase(CMS_DB_STATE_KEY);

      if (isObjectRecord(databaseStore)) {
        cachedCmsStore = databaseStore;
        cachedCmsStoreMtimeMs = 0;
        return cachedCmsStore;
      }

      shouldSeedDatabaseFromFile = true;
    } catch (error) {
      console.error('Failed to read CMS store from database, falling back to file storage.', error);
    }
  }

  try {
    const stats = await fs.stat(CMS_STORAGE_PATH);

    if (cachedCmsStore && cachedCmsStoreMtimeMs === stats.mtimeMs) {
      return cachedCmsStore;
    }

    const raw = await fs.readFile(CMS_STORAGE_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    cachedCmsStore = isObjectRecord(parsed) ? parsed : createEmptyCmsStore();
    cachedCmsStoreMtimeMs = stats.mtimeMs;

    if (shouldSeedDatabaseFromFile) {
      await writeStateRecordToDatabase(CMS_DB_STATE_KEY, cachedCmsStore).catch(() => undefined);
    }

    return cachedCmsStore;
  } catch {
    cachedCmsStore = createEmptyCmsStore();
    cachedCmsStoreMtimeMs = 0;

    if (shouldSeedDatabaseFromFile) {
      await writeStateRecordToDatabase(CMS_DB_STATE_KEY, cachedCmsStore).catch(() => undefined);
    }

    return cachedCmsStore;
  }
}

async function writeCmsStore(store) {
  const nextStore = isObjectRecord(store) ? store : createEmptyCmsStore();
  cachedCmsStore = nextStore;
  cachedCmsStoreMtimeMs = 0;

  if (isDatabaseConfigured()) {
    try {
      await writeStateRecordToDatabase(CMS_DB_STATE_KEY, nextStore);
      return;
    } catch (error) {
      console.error('Failed to write CMS store to database, falling back to file storage.', error);
    }
  }

  const payload = `${JSON.stringify(nextStore, null, 2)}\n`;

  await fs.writeFile(CMS_STORAGE_PATH, payload, 'utf8');

  try {
    const stats = await fs.stat(CMS_STORAGE_PATH);
    cachedCmsStoreMtimeMs = stats.mtimeMs;
  } catch {
    cachedCmsStoreMtimeMs = 0;
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
    .replace(/<meta[^>]+property=["']og:type["'][^>]*>\s*/gi, '')
    .replace(/<script[^>]+id=["']krantas-runtime-config["'][\s\S]*?<\/script>\s*/gi, '');
}

function injectRuntimeConfigIntoHtml(html, baseRuntimeConfig, publicCmsSnapshot, cspNonce) {
  const runtimeConfig = {
    ...baseRuntimeConfig,
    cspNonce,
  };
  const runtimeScript = `<script id="krantas-runtime-config" nonce="${escapeHtml(cspNonce)}">window.__KRANTAS_RUNTIME_CONFIG__=${escapeInlineJson(runtimeConfig)};window.__KRANTAS_CMS_PUBLIC__=${escapeInlineJson(publicCmsSnapshot)};window.__KRANTAS_CSP_NONCE__=${escapeInlineJson(cspNonce)};</script>`;

  return html.replace('</head>', `    ${runtimeScript}\n  </head>`);
}

function injectSeoIntoHtml(html, seo, runtimeConfig, publicCmsSnapshot, cspNonce) {
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

  return injectRuntimeConfigIntoHtml(
    sanitizedHtml.replace('</head>', `    ${tags}\n  </head>`),
    runtimeConfig,
    publicCmsSnapshot,
    cspNonce,
  );
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
  return next();
}

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(applySecurityHeaders);
app.use(express.json({ limit: '8mb' }));
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
  const payload = {
    ok: true,
    app: 'krantas-web',
    uptimeSeconds: Math.round(process.uptime()),
    databaseConfigured: isDatabaseConfigured(),
  };

  if (!IS_PRODUCTION) {
    Object.assign(payload, {
      cwd: process.cwd(),
      projectRoot: PROJECT_ROOT,
      distDir: DIST_DIR,
      protocol: req.protocol,
      host: req.get('host'),
      googleMapsConfigured: Boolean(GOOGLE_MAPS_API_KEY),
      googleMapsMapIdConfigured: Boolean(GOOGLE_MAPS_MAP_ID),
    });
  }

  res.status(200).json(payload);
});

app.get('/api/admin/session', (req, res) => {
  const session = getAdminSession(req);
  res.set('Cache-Control', 'no-store').json({
    authenticated: Boolean(session),
    username: session?.username,
  });
});

app.post('/api/admin/login', requireSameOrigin, (req, res) => {
  const username = typeof req.body?.username === 'string' ? req.body.username.trim() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';

  if (!isAdminAccessConfigured()) {
    appendAdminAuditLog('admin.login.unconfigured', req);
    return res
      .status(503)
      .set('Cache-Control', 'no-store')
      .json({ error: 'Admin access is unavailable.' });
  }

  const attemptState = getAdminLoginAttemptState(req, username);

  if (attemptState.isLocked) {
    appendAdminAuditLog('admin.login.locked', req, { username });
    return res
      .status(429)
      .set('Cache-Control', 'no-store')
      .json({ error: ADMIN_ACCESS_DENIED_MESSAGE });
  }

  const user = getAdminUserByUsername(username);

  if (!user || !stringsMatch(password, user.password)) {
    const locked = registerAdminLoginFailure(req, username);
    appendAdminAuditLog('admin.login.failed', req, { username, locked });

    return res
      .status(locked ? 429 : 401)
      .set('Cache-Control', 'no-store')
      .json({ error: ADMIN_ACCESS_DENIED_MESSAGE });
  }

  clearAdminLoginFailures(req, username);
  const sessionId = createAdminSession(user);
  appendAdminAuditLog('admin.login.success', req, {
    username: user.username,
    role: user.role,
  });
  res
    .set('Set-Cookie', buildAdminSessionCookie(req, sessionId))
    .set('Cache-Control', 'no-store')
    .json({ ok: true, authenticated: true, username: user.username, role: user.role });
});

app.post('/api/admin/logout', requireSameOrigin, (req, res) => {
  const sessionId = getRequestCookies(req)[ADMIN_SESSION_COOKIE];
  appendAdminAuditLog('admin.logout', req);
  destroyAdminSession(sessionId);
  res
    .set('Set-Cookie', buildAdminSessionCookie(req, '', true))
    .set('Cache-Control', 'no-store')
    .json({ ok: true, authenticated: false });
});

app.get('/api/cms/public', async (req, res, next) => {
  try {
    const cmsStore = await readCmsStore();
    res.set('Cache-Control', 'no-store').json(filterPublicCmsSnapshot(cmsStore));
  } catch (error) {
    next(error);
  }
});

app.get('/api/admin/cms', requireAdminSession, async (req, res, next) => {
  try {
    const cmsStore = await readCmsStore();
    res.set('Cache-Control', 'no-store').json(cmsStore);
  } catch (error) {
    next(error);
  }
});

app.put('/api/admin/cms', requireSameOrigin, requireAdminSession, async (req, res, next) => {
  try {
    const snapshot = req.body?.snapshot;

    if (!isObjectRecord(snapshot)) {
      return res.status(400).json({ error: 'Expected a "snapshot" object.' });
    }

    const nextSnapshot = {
      ...snapshot,
      updatedAt: new Date().toISOString(),
    };

    await writeCmsStore(nextSnapshot);
    appendAdminAuditLog('admin.cms.saved', req);

    res.set('Cache-Control', 'no-store').json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.post('/api/leads', requireSameOrigin, async (req, res, next) => {
  try {
    if (!isLeadSubmissionAllowed(req)) {
      return res
        .status(429)
        .set('Cache-Control', 'no-store')
        .json({ error: 'Too many requests. Please try again later.' });
    }

    const leadInput = sanitizeLeadInput(req.body?.lead);

    if (!leadInput) {
      return res.status(400).set('Cache-Control', 'no-store').json({ error: 'Invalid lead payload.' });
    }

    const cmsStore = await readCmsStore();
    const currentLeads = Array.isArray(cmsStore.leads) ? cmsStore.leads : [];
    const nextLead = createLeadRecord(leadInput);

    await writeCmsStore({
      ...cmsStore,
      leads: [nextLead, ...currentLeads],
    });

    registerLeadSubmission(req);
    res.set('Cache-Control', 'no-store').json({ ok: true, lead: nextLead });
  } catch (error) {
    next(error);
  }
});

app.get('/api/seo', async (req, res) => {
  const requestPath =
    typeof req.query.path === 'string' && req.query.path.trim() ? req.query.path : '/';
  const normalizedRequest = normalizeRequestTarget(requestPath);
  const seo = await getSeoForPath(normalizedRequest.pathname, req, normalizedRequest.requestPath);

  res.set('Cache-Control', 'no-store');
  res.json(seo);
});

app.post('/api/seo', requireSameOrigin, requireAdminSession, async (req, res, next) => {
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
    appendAdminAuditLog('admin.seo.saved', req, { path: normalizedPath });

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
      '/privacy-policy',
      '/terms-of-service',
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
    const [indexHtml, seo, cmsStore] = await Promise.all([
      readIndexHtml(),
      getSeoForPath(normalizedRequest.pathname, req, normalizedRequest.requestPath),
      readCmsStore(),
    ]);
    const html = injectSeoIntoHtml(
      indexHtml,
      seo,
      {
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        googleMapsMapId: GOOGLE_MAPS_MAP_ID,
      },
      filterPublicCmsSnapshot(cmsStore),
      res.locals.cspNonce || '',
    );

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
  console.log(
    isDatabaseConfigured()
      ? `MySQL storage enabled for database ${DATABASE_NAME} on ${DATABASE_HOST}:${DATABASE_PORT}`
      : 'MySQL storage disabled; using file-backed CMS/SEO storage.',
  );
});
