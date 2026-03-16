import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSeoData } from '../components/SeoManager';
import {
  COOKIE_CONSENT_EVENT,
  ensureAnalyticsEventStore,
  ensureGtmLoaded,
  getCookieConsentState,
  isAnalyticsAllowed,
  pushAnalyticsEvent,
} from '../lib/analytics';
import { useLanguage } from './LanguageContext';

interface AnalyticsContextValue {
  isTrackingAllowed: boolean;
  trackEvent: (event: string, payload?: Record<string, unknown>) => void;
  trackEventOnce: (dedupeKey: string, event: string, payload?: Record<string, unknown>) => void;
}

const fallbackAnalyticsContext: AnalyticsContextValue = {
  isTrackingAllowed: false,
  trackEvent: () => undefined,
  trackEventOnce: () => undefined,
};

const AnalyticsContext = createContext<AnalyticsContextValue>(fallbackAnalyticsContext);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { language } = useLanguage();
  const { seo, currentUrl } = useSeoData();
  const [consent, setConsent] = useState(getCookieConsentState);
  const gtmId = import.meta.env.VITE_GTM_ID?.trim() || '';
  const isTrackingAllowed = isAnalyticsAllowed(consent);

  useEffect(() => {
    const syncConsent = () => {
      setConsent(getCookieConsentState());
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, syncConsent as EventListener);
    window.addEventListener('storage', syncConsent);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, syncConsent as EventListener);
      window.removeEventListener('storage', syncConsent);
    };
  }, []);

  useEffect(() => {
    if (!isTrackingAllowed || !gtmId) {
      return;
    }

    ensureGtmLoaded(gtmId);
  }, [gtmId, isTrackingAllowed]);

  const trackEvent = useCallback(
    (event: string, payload: Record<string, unknown> = {}) => {
      if (!isTrackingAllowed) {
        return;
      }

      pushAnalyticsEvent(event, payload);
    },
    [isTrackingAllowed],
  );

  const trackEventOnce = useCallback(
    (dedupeKey: string, event: string, payload: Record<string, unknown> = {}) => {
      if (!isTrackingAllowed) {
        return;
      }

      const eventStore = ensureAnalyticsEventStore();

      if (eventStore.has(dedupeKey)) {
        return;
      }

      eventStore.add(dedupeKey);
      pushAnalyticsEvent(event, payload);
    },
    [isTrackingAllowed],
  );

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}`;

    if (!isTrackingAllowed || window.__krantasLastTrackedPageView === pagePath) {
      return;
    }

    window.__krantasLastTrackedPageView = pagePath;
    ensureAnalyticsEventStore().clear();
    trackEvent('page_view', {
      page_path: pagePath,
      page_location: currentUrl,
      page_title: seo.title || document.title,
      language,
    });
  }, [currentUrl, isTrackingAllowed, language, location.pathname, location.search, seo.title, trackEvent]);

  const value = useMemo(
    () => ({
      isTrackingAllowed,
      trackEvent,
      trackEventOnce,
    }),
    [isTrackingAllowed, trackEvent, trackEventOnce],
  );

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAnalytics() {
  return useContext(AnalyticsContext);
}
