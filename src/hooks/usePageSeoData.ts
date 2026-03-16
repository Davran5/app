import { useEffect, useMemo, useState } from 'react';

export interface SeoPayload {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  robots: string;
}

interface SeoApiResponse {
  title?: string;
  metaTitle?: string;
  description?: string;
  metaDescription?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  image?: string;
  canonicalUrl?: string;
  canonical?: string;
  url?: string;
  robots?: string;
}

export const EMPTY_SEO_PAYLOAD: SeoPayload = {
  title: '',
  description: '',
  keywords: '',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
  canonicalUrl: '',
  robots: '',
};

function readMetaContent(selector: string) {
  if (typeof document === 'undefined') {
    return '';
  }

  return document.head.querySelector<HTMLMetaElement>(selector)?.content ?? '';
}

function readCanonicalUrl() {
  if (typeof document === 'undefined') {
    return '';
  }

  return document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? '';
}

export function getInitialSeo(): SeoPayload {
  if (typeof document === 'undefined') {
    return EMPTY_SEO_PAYLOAD;
  }

  const title = document.title || 'KRANTAS Group';
  const description = readMetaContent('meta[name="description"]');
  const keywords = readMetaContent('meta[name="keywords"]');
  const ogTitle = readMetaContent('meta[property="og:title"]') || title;
  const ogDescription = readMetaContent('meta[property="og:description"]') || description;
  const ogImage = readMetaContent('meta[property="og:image"]');
  const canonicalUrl = readCanonicalUrl() || window.location.href.split('#')[0];
  const robots = readMetaContent('meta[name="robots"]');

  return {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    canonicalUrl,
    robots,
  };
}

export function normalizeSeoApiResponse(payload: SeoApiResponse | null, fallback: SeoPayload) {
  if (!payload) {
    return fallback;
  }

  const nextTitle = payload.title?.trim() || payload.metaTitle?.trim();
  const nextDescription = payload.description?.trim() || payload.metaDescription?.trim();
  const nextKeywords = payload.keywords?.trim();
  const nextOgTitle = payload.ogTitle?.trim() || nextTitle;
  const nextOgDescription = payload.ogDescription?.trim() || nextDescription;
  const nextOgImage = payload.ogImage?.trim() || payload.image?.trim();
  const nextCanonicalUrl = payload.canonicalUrl?.trim() || payload.canonical?.trim() || payload.url?.trim();
  const nextRobots = payload.robots?.trim();

  return {
    title: nextTitle || fallback.title,
    description: nextDescription || fallback.description,
    keywords: nextKeywords || fallback.keywords,
    ogTitle: nextOgTitle || fallback.ogTitle,
    ogDescription: nextOgDescription || fallback.ogDescription,
    ogImage: nextOgImage || fallback.ogImage,
    canonicalUrl: nextCanonicalUrl || fallback.canonicalUrl,
    robots: nextRobots || fallback.robots,
  };
}

export function usePageSeoData(pathname: string, search = '') {
  const [seo, setSeo] = useState<SeoPayload>(getInitialSeo);
  const [isLoading, setIsLoading] = useState(false);

  const requestPath = useMemo(() => `${pathname}${search || ''}`, [pathname, search]);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    void (async () => {
      try {
        const response = await fetch(`/api/seo?path=${encodeURIComponent(requestPath)}`, {
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as SeoApiResponse | null;

        setSeo((currentSeo) => normalizeSeoApiResponse(payload, currentSeo));
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          // Preserve the currently rendered SEO values if the API fails.
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    })();

    return () => controller.abort();
  }, [requestPath]);

  return {
    seo,
    isLoading,
    requestPath,
  };
}
