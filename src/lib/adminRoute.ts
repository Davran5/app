const DEFAULT_ADMIN_PANEL_PATH = '/control-room';

function normalizeAdminPath(pathname: string) {
  const trimmed = pathname.trim();

  if (!trimmed) {
    return DEFAULT_ADMIN_PANEL_PATH;
  }

  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeadingSlash === '/' ? DEFAULT_ADMIN_PANEL_PATH : withLeadingSlash.replace(/\/+$/, '');
}

export const ADMIN_PANEL_PATH = normalizeAdminPath(
  import.meta.env.VITE_ADMIN_PANEL_PATH || DEFAULT_ADMIN_PANEL_PATH,
);

export function isAdminRoutePath(pathname: string) {
  return pathname === ADMIN_PANEL_PATH || pathname.startsWith(`${ADMIN_PANEL_PATH}/`);
}
