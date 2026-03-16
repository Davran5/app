import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  EMPTY_SEO_PAYLOAD,
  usePageSeoData,
  type SeoPayload,
} from '../hooks/usePageSeoData';

interface SeoManagerProps {
  children: ReactNode;
}

interface SeoContextValue {
  seo: SeoPayload;
  isLoading: boolean;
  requestPath: string;
  currentUrl: string;
}

const SeoDataContext = createContext<SeoContextValue>({
  seo: EMPTY_SEO_PAYLOAD,
  isLoading: false,
  requestPath: '',
  currentUrl: '',
});

// eslint-disable-next-line react-refresh/only-export-components
export function useSeoData() {
  return useContext(SeoDataContext);
}

export default function SeoManager({ children }: SeoManagerProps) {
  const location = useLocation();
  const { seo, isLoading, requestPath } = usePageSeoData(location.pathname, location.search);
  const currentUrl = useMemo(
    () => (typeof window !== 'undefined' ? window.location.href : requestPath),
    [requestPath],
  );
  const shouldRenderHelmet =
    !isLoading ||
    Boolean(
      seo.title ||
        seo.description ||
        seo.keywords ||
        seo.ogTitle ||
        seo.ogDescription ||
        seo.ogImage ||
        seo.canonicalUrl ||
        seo.robots,
    );
  const canonicalUrl = seo.canonicalUrl || currentUrl;

  const contextValue = useMemo(
    () => ({
      seo,
      isLoading,
      requestPath,
      currentUrl,
    }),
    [currentUrl, isLoading, requestPath, seo],
  );

  return (
    <SeoDataContext.Provider value={contextValue}>
      {shouldRenderHelmet ? (
        <Helmet prioritizeSeoTags>
          {seo.title ? <title>{seo.title}</title> : null}
          {seo.description ? <meta name="description" content={seo.description} /> : null}
          {seo.keywords ? <meta name="keywords" content={seo.keywords} /> : null}
          {seo.robots ? <meta name="robots" content={seo.robots} /> : null}
          {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
          {seo.ogTitle ? <meta property="og:title" content={seo.ogTitle} /> : null}
          {seo.ogDescription ? <meta property="og:description" content={seo.ogDescription} /> : null}
          {seo.ogImage ? <meta property="og:image" content={seo.ogImage} /> : null}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={canonicalUrl} />
        </Helmet>
      ) : null}
      {children}
    </SeoDataContext.Provider>
  );
}
