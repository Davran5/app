import {
  categories as baseCategories,
  products as baseProducts,
  type Category,
  type Product,
} from '../data/products';
import { translations, type Language } from '../data/translations';
import { createUploadedMediaUrl, type UploadedMediaInput } from './media';

export type SeoPageKey =
  | 'home'
  | 'about'
  | 'products'
  | 'catalog'
  | 'productDetail'
  | 'customSolutions'
  | 'services'
  | 'news'
  | 'careers'
  | 'contacts'
  | 'findDealer'
  | 'admin';

export interface SeoSettings {
  title: string;
  description: string;
  keywords: string;
}

export type TranslationOverrideMap = Record<Language, Record<string, string>>;

export interface CmsSnapshot {
  version: number;
  updatedAt: string;
  products: Product[];
  categories: Category[];
  mediaItems: UploadedMediaInput[];
  translationOverrides: TranslationOverrideMap;
  seo: Record<SeoPageKey, SeoSettings>;
}

export interface FlattenedTranslationEntry {
  path: string;
  value: string;
}

export interface TranslationSectionMeta {
  id: string;
  label: string;
  description: string;
}

export interface TranslationPageMeta {
  id: string;
  label: string;
  description: string;
  sectionIds: string[];
}

export interface TranslationFieldMeta {
  path: string;
  pageId: string;
  sectionId: string;
  label: string;
  context: string;
}

export const CMS_STORAGE_KEY = 'krantas.cms.v1';
export const CMS_EXPORT_VERSION = 1;

export const SEO_PAGE_LABELS: Record<SeoPageKey, string> = {
  home: 'Home',
  about: 'About',
  products: 'Products',
  catalog: 'Catalog',
  productDetail: 'Product Detail',
  customSolutions: 'Custom Solutions',
  services: 'Services',
  news: 'News',
  careers: 'Careers',
  contacts: 'Contacts',
  findDealer: 'Find Dealer',
  admin: 'Admin Panel',
};

const EMPTY_TRANSLATION_OVERRIDES: TranslationOverrideMap = {
  en: {},
  ru: {},
  uz: {},
  de: {},
};

export const DEFAULT_SEO: Record<SeoPageKey, SeoSettings> = {
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

const TRANSLATION_SECTION_LABELS: Record<string, string> = {
  nav: 'Navigation',
  distributors: 'Dealer Network',
  cookieConsent: 'Cookie Banner',
  customSolutionsPage: 'Custom Solutions Page',
  home: 'Home Hero',
  stats: 'Home Stats',
  intro: 'Home Intro',
  aboutHome: 'Home About',
  mission: 'Mission',
  equipment: 'Equipment',
  products: 'Featured Products',
  production: 'Production',
  cta: 'Call To Action',
  footer: 'Footer',
  productsPage: 'Products Page',
  catalog: 'Catalog Page',
  services: 'Services Page',
  about: 'About Page',
  contacts: 'Contacts Page',
  careers: 'Careers Page',
  news: 'News Page',
  productDetail: 'Product Detail',
  productsData: 'Product Content',
  categories: 'Category Content',
};

const TRANSLATION_SECTION_DESCRIPTIONS: Record<string, string> = {
  nav: 'Header and navigation labels used across the site.',
  distributors: 'Dealer map content, location labels, and map UI strings.',
  cookieConsent: 'Cookie and privacy consent copy.',
  customSolutionsPage: 'Custom solutions landing page text.',
  home: 'Homepage hero copy and main banner labels.',
  stats: 'Homepage metrics and numbers section.',
  intro: 'Homepage introduction content and support messages.',
  aboutHome: 'Homepage about preview block.',
  mission: 'Homepage mission section.',
  equipment: 'Homepage equipment categories section.',
  products: 'Homepage featured products section.',
  production: 'Production process section and manufacturing copy.',
  cta: 'Primary call-to-action block content.',
  footer: 'Footer links and footer text.',
  productsPage: 'Products overview page.',
  catalog: 'Catalog page and product listing copy.',
  services: 'Services page content.',
  about: 'About page content.',
  contacts: 'Contacts page content.',
  careers: 'Careers page content.',
  news: 'News page content.',
  productDetail: 'Product detail page labels and content.',
  productsData: 'Per-product translated names, descriptions, features, and specs.',
  categories: 'Per-category translated names and descriptions.',
};

const TRANSLATION_PAGE_DEFINITIONS: TranslationPageMeta[] = [
  {
    id: 'global',
    label: 'Global',
    description: 'Shared interface text used across the entire website.',
    sectionIds: ['nav', 'footer', 'cookieConsent', 'cta'],
  },
  {
    id: 'home',
    label: 'Home',
    description: 'Homepage sections from hero to featured content.',
    sectionIds: ['home', 'stats', 'intro', 'aboutHome', 'mission', 'equipment', 'products', 'production'],
  },
  {
    id: 'products',
    label: 'Products',
    description: 'Products overview and product-specific content.',
    sectionIds: ['productsPage', 'productDetail', 'productsData'],
  },
  {
    id: 'catalog',
    label: 'Catalog',
    description: 'Catalog listing pages, category text, and specification labels.',
    sectionIds: ['catalog', 'equipmentSolutions', 'categories', 'specLabels'],
  },
  {
    id: 'customSolutions',
    label: 'Custom Solutions',
    description: 'Custom solutions page content and engineering sections.',
    sectionIds: ['customSolutionsPage'],
  },
  {
    id: 'services',
    label: 'Services',
    description: 'Service page sections and support-related copy.',
    sectionIds: ['services'],
  },
  {
    id: 'about',
    label: 'About',
    description: 'Company story, leadership, history, and mission text.',
    sectionIds: ['about'],
  },
  {
    id: 'news',
    label: 'News',
    description: 'Newsroom labels and article-related page copy.',
    sectionIds: ['blog'],
  },
  {
    id: 'careers',
    label: 'Careers',
    description: 'Career page messaging, openings, and hiring content.',
    sectionIds: ['careers'],
  },
  {
    id: 'contacts',
    label: 'Contacts',
    description: 'Contact page labels, address details, and inquiry copy.',
    sectionIds: ['contacts'],
  },
  {
    id: 'findDealer',
    label: 'Find Dealer',
    description: 'Dealer network UI, map labels, and dealer-page text.',
    sectionIds: ['distributors'],
  },
];

const TRANSLATION_SECTION_TO_PAGE = TRANSLATION_PAGE_DEFINITIONS.reduce<Record<string, string>>(
  (acc, page) => {
    page.sectionIds.forEach((sectionId) => {
      acc[sectionId] = page.id;
    });

    return acc;
  },
  {},
);

const COMMON_TRANSLATION_LABELS: Record<string, string> = {
  cta: 'CTA',
  faq: 'FAQ',
  seo: 'SEO',
  url: 'URL',
  id: 'ID',
  ui: 'UI',
  pdf: 'PDF',
};

export function cloneCmsValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function createEmptyProduct(categoryId = ''): Product {
  return {
    id: '',
    name: '',
    category: '',
    categoryId,
    description: '',
    fullDescription: '',
    image: '',
    gallery: [],
    specs: {},
    features: [],
  };
}

export function createEmptyCategory(): Category {
  return {
    id: '',
    name: '',
    description: '',
    image: '',
  };
}

export function slugifyProductId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function getDefaultCmsSnapshot(): CmsSnapshot {
  return {
    version: CMS_EXPORT_VERSION,
    updatedAt: new Date().toISOString(),
    products: cloneCmsValue(baseProducts),
    categories: cloneCmsValue(baseCategories),
    mediaItems: [],
    translationOverrides: cloneCmsValue(EMPTY_TRANSLATION_OVERRIDES),
    seo: cloneCmsValue(DEFAULT_SEO),
  };
}

function normalizeTranslationOverrides(raw: unknown): TranslationOverrideMap {
  const normalized = cloneCmsValue(EMPTY_TRANSLATION_OVERRIDES);

  if (!isRecord(raw)) {
    return normalized;
  }

  (Object.keys(normalized) as Language[]).forEach((language) => {
    const languageOverrides = raw[language];
    if (!isRecord(languageOverrides)) {
      return;
    }

    Object.entries(languageOverrides).forEach(([path, value]) => {
      if (typeof value === 'string') {
        normalized[language][path] = value;
      }
    });
  });

  return normalized;
}

function normalizeSeo(raw: unknown): Record<SeoPageKey, SeoSettings> {
  const normalized = cloneCmsValue(DEFAULT_SEO);

  if (!isRecord(raw)) {
    return normalized;
  }

  (Object.keys(normalized) as SeoPageKey[]).forEach((pageKey) => {
    const pageValue = raw[pageKey];
    if (!isRecord(pageValue)) {
      return;
    }

    normalized[pageKey] = {
      title: typeof pageValue.title === 'string' ? pageValue.title : normalized[pageKey].title,
      description:
        typeof pageValue.description === 'string'
          ? pageValue.description
          : normalized[pageKey].description,
      keywords:
        typeof pageValue.keywords === 'string'
          ? pageValue.keywords
          : normalized[pageKey].keywords,
    };
  });

  return normalized;
}

function normalizeMediaItems(raw: unknown): UploadedMediaInput[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }

    const id = typeof item.id === 'string' ? item.id : '';
    const name = typeof item.name === 'string' ? item.name : '';
    const url = typeof item.url === 'string' ? item.url : '';
    const dataUrl =
      typeof item.dataUrl === 'string'
        ? item.dataUrl
        : typeof item.url === 'string' && item.url.startsWith('data:')
          ? item.url
          : '';
    const mimeType = typeof item.mimeType === 'string' ? item.mimeType : undefined;

    if (!id || !name || !dataUrl) {
      return [];
    }

    return [
      {
        id,
        name,
        url: url && !url.startsWith('data:') ? url : createUploadedMediaUrl(id, name),
        dataUrl,
        mimeType,
      },
    ];
  });
}

export function normalizeCmsSnapshot(raw: unknown): CmsSnapshot {
  const defaults = getDefaultCmsSnapshot();

  if (!isRecord(raw)) {
    return defaults;
  }

  return {
    version: typeof raw.version === 'number' ? raw.version : defaults.version,
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : defaults.updatedAt,
    products: Array.isArray(raw.products)
      ? cloneCmsValue(raw.products as Product[])
      : defaults.products,
    categories: Array.isArray(raw.categories)
      ? cloneCmsValue(raw.categories as Category[])
      : defaults.categories,
    mediaItems: normalizeMediaItems(raw.mediaItems),
    translationOverrides: normalizeTranslationOverrides(raw.translationOverrides),
    seo: normalizeSeo(raw.seo),
  };
}

export function loadCmsSnapshot(): CmsSnapshot {
  if (typeof window === 'undefined') {
    return getDefaultCmsSnapshot();
  }

  try {
    const rawSnapshot = window.localStorage.getItem(CMS_STORAGE_KEY);
    if (!rawSnapshot) {
      return getDefaultCmsSnapshot();
    }

    return normalizeCmsSnapshot(JSON.parse(rawSnapshot));
  } catch {
    return getDefaultCmsSnapshot();
  }
}

export function saveCmsSnapshot(snapshot: CmsSnapshot) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(snapshot));
}

function isIndexSegment(segment: string) {
  return /^\d+$/.test(segment);
}

export function setValueAtPath(target: unknown, path: string, value: string) {
  if (!path) {
    return target;
  }

  const segments = path.split('.').filter(Boolean);
  let current = target as Record<string, unknown> | unknown[];

  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1;
    const nextSegment = segments[index + 1];
    const key = isIndexSegment(segment) ? Number(segment) : segment;

    if (isLast) {
      (current as Record<string, unknown>)[key as string] = value;
      return;
    }

    const nextValue = (current as Record<string, unknown>)[key as string];

    if (nextValue === undefined || nextValue === null) {
      (current as Record<string, unknown>)[key as string] = isIndexSegment(nextSegment) ? [] : {};
    }

    current = (current as Record<string, unknown>)[key as string] as
      | Record<string, unknown>
      | unknown[];
  });

  return target;
}

export function applyTranslationOverrides<T>(baseTranslation: T, overrides: Record<string, string>) {
  const clonedTranslation = cloneCmsValue(baseTranslation);

  Object.entries(overrides).forEach(([path, value]) => {
    setValueAtPath(clonedTranslation, path, value);
  });

  return clonedTranslation;
}

export function flattenTranslationStrings(
  value: unknown,
  prefix = '',
): FlattenedTranslationEntry[] {
  if (typeof value === 'string') {
    return prefix ? [{ path: prefix, value }] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      flattenTranslationStrings(item, prefix ? `${prefix}.${index}` : `${index}`),
    );
  }

  if (isRecord(value)) {
    return Object.entries(value).flatMap(([key, nestedValue]) =>
      flattenTranslationStrings(nestedValue, prefix ? `${prefix}.${key}` : key),
    );
  }

  return [];
}

export function resolveSeoPageKey(pathname: string): SeoPageKey {
  if (pathname.startsWith('/admin')) return 'admin';
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

export function interpolateSeoValue(
  template: string,
  replacements: Record<string, string | undefined>,
) {
  return template.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_, rawToken) => {
    const token = rawToken.trim();
    return replacements[token] || '';
  });
}

export function getTranslationEntries(language: Language) {
  return flattenTranslationStrings(translations[language]);
}

function humanizeTranslationSection(id: string) {
  return id
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function humanizeTranslationSegment(segment: string) {
  if (isIndexSegment(segment)) {
    return `Item ${Number(segment) + 1}`;
  }

  return segment
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => {
      const lowerWord = word.toLowerCase();
      return COMMON_TRANSLATION_LABELS[lowerWord] ?? `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    })
    .join(' ');
}

export function getTranslationSectionId(path: string) {
  return path.split('.').filter(Boolean)[0] ?? 'misc';
}

export function getTranslationPageId(path: string) {
  const sectionId = getTranslationSectionId(path);
  return TRANSLATION_SECTION_TO_PAGE[sectionId] ?? 'global';
}

export function getTranslationSectionMeta(id: string): TranslationSectionMeta {
  return {
    id,
    label: TRANSLATION_SECTION_LABELS[id] ?? humanizeTranslationSection(id),
    description:
      TRANSLATION_SECTION_DESCRIPTIONS[id] ??
      'Custom translation keys for this section or page.',
  };
}

export function getTranslationSectionList(
  language: Language,
  overrides: Record<string, string> = {},
): TranslationSectionMeta[] {
  const baseSectionIds = Object.keys(translations[language]).filter((key) => key !== 'locale');
  const overrideSectionIds = Object.keys(overrides).map(getTranslationSectionId);
  const sectionIds = Array.from(new Set([...baseSectionIds, ...overrideSectionIds]));

  return sectionIds.map(getTranslationSectionMeta).sort((left, right) => {
    if (left.id === 'productsData') return 1;
    if (right.id === 'productsData') return -1;
    if (left.id === 'categories') return 1;
    if (right.id === 'categories') return -1;
    return left.label.localeCompare(right.label);
  });
}

export function getTranslationPageMeta(id: string): TranslationPageMeta {
  const existingPage = TRANSLATION_PAGE_DEFINITIONS.find((page) => page.id === id);

  if (existingPage) {
    return existingPage;
  }

  return {
    id,
    label: humanizeTranslationSection(id),
    description: 'Custom translation content for this website area.',
    sectionIds: [],
  };
}

export function getTranslationPageList(
  language: Language,
  overrides: Record<string, string> = {},
): TranslationPageMeta[] {
  const baseSectionIds = Object.keys(translations[language]).filter((key) => key !== 'locale');
  const overrideSectionIds = Object.keys(overrides).map(getTranslationSectionId);
  const pageIds = Array.from(
    new Set([...baseSectionIds, ...overrideSectionIds].map((sectionId) => getTranslationPageId(sectionId))),
  );

  return pageIds.sort((left, right) => {
    const leftIndex = TRANSLATION_PAGE_DEFINITIONS.findIndex((page) => page.id === left);
    const rightIndex = TRANSLATION_PAGE_DEFINITIONS.findIndex((page) => page.id === right);

    if (leftIndex === -1 && rightIndex === -1) {
      return left.localeCompare(right);
    }

    if (leftIndex === -1) return 1;
    if (rightIndex === -1) return -1;
    return leftIndex - rightIndex;
  }).map(getTranslationPageMeta);
}

export function getTranslationSectionsForPage(
  pageId: string,
  language: Language,
  overrides: Record<string, string> = {},
): TranslationSectionMeta[] {
  const availableSectionIds = new Set(
    [
      ...Object.keys(translations[language]).filter((key) => key !== 'locale'),
      ...Object.keys(overrides).map(getTranslationSectionId),
    ].filter((sectionId) => getTranslationPageId(sectionId) === pageId),
  );

  const pageMeta = getTranslationPageMeta(pageId);
  const orderedSectionIds = [
    ...pageMeta.sectionIds.filter((sectionId) => availableSectionIds.has(sectionId)),
    ...Array.from(availableSectionIds).filter((sectionId) => !pageMeta.sectionIds.includes(sectionId)).sort(),
  ];

  return orderedSectionIds.map(getTranslationSectionMeta);
}

export function getTranslationFieldMeta(path: string): TranslationFieldMeta {
  const segments = path.split('.').filter(Boolean);
  const sectionId = segments[0] ?? 'misc';
  const pageId = getTranslationPageId(path);
  const fieldSegments = segments.slice(1);
  const label = humanizeTranslationSegment(fieldSegments[fieldSegments.length - 1] ?? sectionId);
  const contextSegments = fieldSegments.slice(0, -1);

  return {
    path,
    pageId,
    sectionId,
    label,
    context: contextSegments.map(humanizeTranslationSegment).join(' / '),
  };
}
