import { getGPCStatus } from '../utils/privacy';

export const COOKIE_CONSENT_STORAGE_KEY = 'krantas_cookie_consent';
export const COOKIE_CONSENT_EVENT = 'krantas:cookie-consent';

export type CookieConsentState = 'all' | 'necessary' | null;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    __krantasAnalyticsEventKeys?: Set<string>;
    __krantasLastTrackedPageView?: string;
  }
}

export interface ProductAnalyticsItem {
  item_id: string;
  item_name: string;
  item_category?: string;
  item_brand?: string;
  item_variant?: string;
}

export function getCookieConsentState(): CookieConsentState {
  if (typeof window === 'undefined') {
    return null;
  }

  const consent = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  return consent === 'all' || consent === 'necessary' ? consent : null;
}

export function isAnalyticsAllowed(consent = getCookieConsentState()) {
  if (typeof window === 'undefined') {
    return false;
  }

  return consent === 'all' && !getGPCStatus();
}

export function notifyCookieConsentChange(consent: Exclude<CookieConsentState, null>) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: consent }));
}

export function ensureDataLayer() {
  if (typeof window === 'undefined') {
    return [];
  }

  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

export function ensureAnalyticsEventStore() {
  if (typeof window === 'undefined') {
    return new Set<string>();
  }

  window.__krantasAnalyticsEventKeys = window.__krantasAnalyticsEventKeys || new Set<string>();
  return window.__krantasAnalyticsEventKeys;
}

export function pushAnalyticsEvent(event: string, payload: Record<string, unknown> = {}) {
  ensureDataLayer().push({
    event,
    ...payload,
  });
}

export function ensureGtmLoaded(gtmId: string) {
  if (typeof document === 'undefined' || !gtmId) {
    return;
  }

  const scriptId = `gtm-script-${gtmId}`;
  if (document.getElementById(scriptId)) {
    return;
  }

  pushAnalyticsEvent('gtm.js', { 'gtm.start': Date.now() });

  const script = document.createElement('script');
  script.id = scriptId;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;

  document.head.appendChild(script);
}

export function buildProductAnalyticsItem(
  product: Partial<ProductAnalyticsItem> & Pick<ProductAnalyticsItem, 'item_id' | 'item_name'>,
) {
  return {
    item_id: product.item_id,
    item_name: product.item_name,
    item_category: product.item_category,
    item_brand: product.item_brand || 'KRANTAS Group',
    item_variant: product.item_variant,
  };
}
