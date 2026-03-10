import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useCms } from '../contexts/CmsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { interpolateSeoValue, resolveSeoPageKey } from '../lib/cms';

function upsertMeta(name: string, content: string, property?: boolean) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement('meta');
    if (property) {
      tag.setAttribute('property', name);
    } else {
      tag.setAttribute('name', name);
    }
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

export default function SeoManager() {
  const location = useLocation();
  const { seo, getProductById, getCategoryById } = useCms();
  const { t } = useLanguage();

  const replacements = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get('category') || location.pathname.split('/').pop() || '';
    const productId = location.pathname.startsWith('/product/')
      ? location.pathname.split('/').pop() || ''
      : '';

    const category = getCategoryById(categoryId);
    const product = getProductById(productId);

    return {
      brand: 'KRANTAS Group',
      categoryName:
        (categoryId && t.categories?.[categoryId as keyof typeof t.categories]?.name) ||
        category?.name ||
        t.catalog.title,
      productName:
        (productId && t.productsData?.[productId as keyof typeof t.productsData]?.name) ||
        product?.name ||
        t.products.title,
    };
  }, [getCategoryById, getProductById, location.pathname, location.search, t]);

  useEffect(() => {
    const pageKey = resolveSeoPageKey(location.pathname);
    const pageSeo = seo[pageKey];
    const title = interpolateSeoValue(pageSeo.title, replacements).trim();
    const description = interpolateSeoValue(pageSeo.description, replacements).trim();
    const keywords = interpolateSeoValue(pageSeo.keywords, replacements).trim();

    document.title = title;
    upsertMeta('description', description);
    upsertMeta('keywords', keywords);
    upsertMeta('og:title', title, true);
    upsertMeta('og:description', description, true);
  }, [location.pathname, replacements, seo]);

  return null;
}
