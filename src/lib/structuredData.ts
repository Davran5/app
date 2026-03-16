import { useMemo } from 'react';
import type { SeoPayload } from '../hooks/usePageSeoData';

type ProductSpecValue = string | number | boolean | null | undefined;

interface JsonLdPropertyValue {
  '@type': 'PropertyValue';
  name: string;
  value: string;
}

interface JsonLdBrand {
  '@type': 'Brand' | 'Organization';
  name: string;
}

interface JsonLdProduct {
  '@context': 'https://schema.org';
  '@type': 'Product';
  '@id'?: string;
  name: string;
  description?: string;
  image?: string[];
  sku?: string;
  mpn?: string;
  model?: string;
  category?: string;
  url?: string;
  brand?: JsonLdBrand;
  manufacturer?: JsonLdBrand;
  additionalProperty?: JsonLdPropertyValue[];
}

export interface ProductStructuredDataInput {
  name?: string | null;
  description?: string | null;
  image?: string | string[] | null;
  category?: string | null;
  sku?: string | null;
  model?: string | null;
  url?: string | null;
  specs?: Record<string, ProductSpecValue> | null;
  specLabels?: Record<string, string | undefined> | null;
  brandName?: string | null;
  manufacturerName?: string | null;
  seo?: Partial<SeoPayload> | null;
}

function sanitizeText(value: unknown) {
  if (typeof value !== 'string') {
    return '';
  }

  let sanitized = '';

  for (const character of value) {
    const code = character.charCodeAt(0);
    sanitized += code < 32 || code === 127 ? ' ' : character;
  }

  return sanitized.replace(/\s+/g, ' ').trim();
}

function toAbsoluteUrl(value: string, baseUrl?: string) {
  const sanitizedValue = sanitizeText(value);

  if (!sanitizedValue) {
    return '';
  }

  try {
    const fallbackBase =
      baseUrl ||
      (typeof window !== 'undefined' && window.location?.origin ? window.location.origin : undefined);

    return fallbackBase
      ? new URL(sanitizedValue, fallbackBase).toString()
      : new URL(sanitizedValue).toString();
  } catch {
    return '';
  }
}

function humanizeSpecKey(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function buildAdditionalProperties(
  specs: ProductStructuredDataInput['specs'],
  specLabels: ProductStructuredDataInput['specLabels'],
) {
  if (!specs) {
    return [];
  }

  return Object.entries(specs).reduce<JsonLdPropertyValue[]>((properties, [key, value]) => {
    if (value === null || value === undefined) {
      return properties;
    }

    const sanitizedValue = sanitizeText(String(value));
    const sanitizedName = sanitizeText(specLabels?.[key] || humanizeSpecKey(key));

    if (!sanitizedName || !sanitizedValue) {
      return properties;
    }

    properties.push({
      '@type': 'PropertyValue',
      name: sanitizedName,
      value: sanitizedValue,
    });

    return properties;
  }, []);
}

function buildImageList(
  image: ProductStructuredDataInput['image'],
  seoImage: string,
  pageUrl: string,
) {
  const rawImages = Array.isArray(image) ? image : image ? [image] : [];
  const images = [...rawImages, seoImage]
    .map((value) => toAbsoluteUrl(String(value || ''), pageUrl))
    .filter(Boolean);

  return [...new Set(images)];
}

export function buildProductJsonLd(input: ProductStructuredDataInput): JsonLdProduct | null {
  const seoTitle = sanitizeText(input.seo?.ogTitle || input.seo?.title);
  const seoDescription = sanitizeText(input.seo?.ogDescription || input.seo?.description);
  const pageUrl = toAbsoluteUrl(input.url || '', input.url || undefined);
  const name = sanitizeText(input.name || seoTitle);
  const description = sanitizeText(seoDescription || input.description);

  if (!name) {
    return null;
  }

  const image = buildImageList(input.image, input.seo?.ogImage || '', pageUrl || input.url || '');
  const additionalProperty = buildAdditionalProperties(input.specs, input.specLabels);
  const brandName = sanitizeText(input.brandName || 'KRANTAS Group');
  const manufacturerName = sanitizeText(input.manufacturerName || brandName);
  const sku = sanitizeText(input.sku);
  const category = sanitizeText(input.category);
  const model = sanitizeText(input.model || (typeof input.specs?.model === 'string' ? input.specs.model : ''));

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': pageUrl ? `${pageUrl}#product` : undefined,
    name,
    description: description || undefined,
    image: image.length > 0 ? image : undefined,
    sku: sku || undefined,
    mpn: sku || undefined,
    model: model || undefined,
    category: category || undefined,
    url: pageUrl || undefined,
    brand: brandName
      ? {
          '@type': 'Brand',
          name: brandName,
        }
      : undefined,
    manufacturer: manufacturerName
      ? {
          '@type': 'Organization',
          name: manufacturerName,
        }
      : undefined,
    additionalProperty: additionalProperty.length > 0 ? additionalProperty : undefined,
  };
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

export function useProductJsonLd(input: ProductStructuredDataInput) {
  return useMemo(() => {
    const jsonLdObject = buildProductJsonLd(input);

    return jsonLdObject ? serializeJsonLd(jsonLdObject) : null;
  }, [input]);
}
