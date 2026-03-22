import {
  categories as baseCategories,
  products as baseProducts,
  type Category,
  type Product,
} from '../data/products';
import {
  distributorLocations as baseDistributorLocations,
  type DistributorLocation,
} from '../data/distributors';
import { translations, type Language } from '../data/translations';
import { ADMIN_PANEL_PATH } from './adminRoute';
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

export interface CmsVacancyLocalization {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  age: string;
  description: string;
  requirements: string[];
}

export interface CmsVacancy {
  id: string;
  isActive: boolean;
  localizations: Record<Language, CmsVacancyLocalization>;
}

export interface CmsNewsItemLocalization {
  title: string;
  excerpt: string;
}

export interface CmsImagePosition {
  x: number;
  y: number;
}

export interface CmsNewsItem {
  id: string;
  isActive: boolean;
  date: string;
  author: string;
  image: string;
  imagePosition: CmsImagePosition;
  link: string;
  localizations: Record<Language, CmsNewsItemLocalization>;
}

export type CmsLeadSource = 'contact' | 'careers';
export type CmsLeadStatus =
  | 'new'
  | 'inReview'
  | 'contacted'
  | 'qualified'
  | 'proposal'
  | 'won'
  | 'lost'
  | 'archived';
export type CmsLeadPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface CmsLeadNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface CmsLead {
  id: string;
  createdAt: string;
  updatedAt: string;
  source: CmsLeadSource;
  status: CmsLeadStatus;
  priority: CmsLeadPriority;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  language: Language;
  originPage: string;
  assignee: string;
  followUpAt: string;
  internalNotes: CmsLeadNote[];
  metadata: Record<string, string>;
}

export interface CmsLeadInput {
  source: CmsLeadSource;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message?: string;
  language: Language;
  originPage: string;
  metadata?: Record<string, string>;
}

export type TranslationOverrideMap = Record<Language, Record<string, string>>;

export interface CmsSnapshot {
  version: number;
  updatedAt: string;
  products: Product[];
  categories: Category[];
  featuredProductIds: string[];
  distributorLocations: DistributorLocation[];
  vacancies: CmsVacancy[];
  newsItems: CmsNewsItem[];
  leads: CmsLead[];
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
export const CMS_EXPORT_VERSION = 6;

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
  notFound: '404 Page',
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
  notFound: '404 page messaging, recovery actions, and error-state labels.',
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
  {
    id: 'notFound',
    label: '404 Page',
    description: 'Not found page content, actions, and recovery messaging.',
    sectionIds: ['notFound'],
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

function createCmsEntityId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
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

export function createEmptyDistributorLocation(): DistributorLocation {
  return {
    id: '',
    name: '',
    address: '',
    city: '',
    coords: { lat: 41.3111, lng: 69.2797 },
    phones: [],
    email: '',
    market: 'uzbekistan',
    kind: 'dealer',
  };
}

export function createEmptyVacancyLocalization(): CmsVacancyLocalization {
  return {
    title: '',
    department: '',
    location: '',
    type: '',
    experience: '',
    age: '',
    description: '',
    requirements: [],
  };
}

export function createEmptyVacancy(): CmsVacancy {
  return {
    id: '',
    isActive: true,
    localizations: {
      en: createEmptyVacancyLocalization(),
      ru: createEmptyVacancyLocalization(),
      uz: createEmptyVacancyLocalization(),
      de: createEmptyVacancyLocalization(),
    },
  };
}

export function createEmptyNewsItemLocalization(): CmsNewsItemLocalization {
  return {
    title: '',
    excerpt: '',
  };
}

export function createEmptyNewsItem(): CmsNewsItem {
  return {
    id: '',
    isActive: true,
    date: '',
    author: '',
    image: '',
    imagePosition: { x: 50, y: 50 },
    link: '',
    localizations: {
      en: createEmptyNewsItemLocalization(),
      ru: createEmptyNewsItemLocalization(),
      uz: createEmptyNewsItemLocalization(),
      de: createEmptyNewsItemLocalization(),
    },
  };
}

export function createLeadFromInput(input: CmsLeadInput): CmsLead {
  const timestamp = new Date().toISOString();

  return {
    id: createCmsEntityId('lead'),
    createdAt: timestamp,
    updatedAt: timestamp,
    source: input.source,
    status: 'new',
    priority: input.source === 'careers' ? 'high' : 'normal',
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim() ?? '',
    company: input.company?.trim() ?? '',
    subject: input.subject.trim(),
    message: input.message?.trim() ?? '',
    language: input.language,
    originPage: input.originPage.trim(),
    assignee: '',
    followUpAt: '',
    internalNotes: [],
    metadata: Object.fromEntries(
      Object.entries(input.metadata ?? {}).filter(
        ([key, value]) => key.trim() && typeof value === 'string' && value.trim(),
      ),
    ),
  };
}

export function slugifyProductId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function createDefaultVacancies(): CmsVacancy[] {
  return [1, 2, 3, 4].map((index) => {
    const localizations = (['en', 'ru', 'uz', 'de'] as Language[]).reduce<
      Record<Language, CmsVacancyLocalization>
    >((acc, language) => {
      const languageTranslation = translations[language] as {
        careers?: {
          fullTime?: string;
          positions?: Record<
            number,
            {
              title?: string;
              department?: string;
              location?: string;
              experience?: string;
              age?: string;
              description?: string;
              requirements?: string[];
            }
          >;
        };
      };
      const position = languageTranslation.careers?.positions?.[index];

      acc[language] = {
        title: position?.title ?? '',
        department: position?.department ?? '',
        location: position?.location ?? '',
        type: languageTranslation.careers?.fullTime ?? '',
        experience: position?.experience ?? '',
        age: position?.age ?? '',
        description: position?.description ?? '',
        requirements: Array.isArray(position?.requirements) ? [...position.requirements] : [],
      };

      return acc;
    }, {
      en: createEmptyVacancyLocalization(),
      ru: createEmptyVacancyLocalization(),
      uz: createEmptyVacancyLocalization(),
      de: createEmptyVacancyLocalization(),
    });

    return {
      id: `vacancy-${index}`,
      isActive: true,
      localizations,
    };
  });
}

function getDefaultFeaturedProductIds(products: Product[], categories: Category[]) {
  return categories
    .filter((category) => category.id !== 'custom-solutions' && category.id !== 'metal-structures')
    .map((category) => products.find((product) => product.categoryId === category.id)?.id)
    .filter((productId): productId is string => Boolean(productId));
}

const DEFAULT_NEWS_META = [
  {
    id: 'news-8',
    translationId: 8,
    date: '2018-09-28',
    author: 'The Times of Central Asia',
    image: 'https://timesca.com/wp-content/uploads/2018/09/mirzi-rahmon-talco-uzpressservice-7f3.jpg',
    link: 'https://timesca.com/presidents-of-tajikistan-and-uzbekistan-launch-jv-in-tajik-city/',
  },
  {
    id: 'news-7',
    translationId: 7,
    date: '2025-05-15',
    author: 'Spot',
    image: 'https://www.spot.uz/media/img/2025/05/dOcWxi17473091207912_l.jpg',
    link: 'https://www.spot.uz/ru/2025/05/15/renovation-krantas/',
  },
  {
    id: 'news-6',
    translationId: 6,
    date: '2024-07-16',
    author: 'Spot',
    image: 'https://www.spot.uz/media/img/2024/07/m5TVxw17211275895782_l.jpg',
    link: 'https://www.spot.uz/ru/2024/07/16/arms-industry/',
  },
  {
    id: 'news-5',
    translationId: 5,
    date: '2024-05-28',
    author: 'AGMK',
    image: 'https://agmk.uz/uploads/news/236088321ac0abe73c75ef80ec63b8b5.JPG',
    link: 'https://agmk.uz/ru/news/okmkga-yana-2-dona-avtogigant-olib-kelindi',
  },
  {
    id: 'news-3',
    translationId: 3,
    date: '2023-02-25',
    author: 'Kun',
    image: 'https://storage.kun.uz/source/9/cgLbGkvOhvDMBmDUvQ4EO3Gqe9uuwjE-.jpg',
    link: 'https://kun.uz/news/2023/02/25/krantas-group-jahon-bozorida-yengil-bronlangan-avtoni-taqdim-etdi',
  },
  {
    id: 'news-2',
    translationId: 2,
    date: '2021-01-12',
    author: 'Gazeta',
    image: 'https://www.gazeta.uz/media/img/2021/01/f11B6V16104622858626_l.jpg',
    link: 'https://www.gazeta.uz/ru/2021/01/12/equipment/',
  },
  {
    id: 'news-1',
    translationId: 1,
    date: '2017-06-29',
    author: 'Gazeta',
    image: 'https://www.gazeta.uz/media/img/2017/04/oBWirl14920003414464_b.jpg?r=1498751454',
    link: 'https://www.gazeta.uz/ru/2017/06/29/krantas/',
  },
] as const;

function createDefaultNewsItems(): CmsNewsItem[] {
  return DEFAULT_NEWS_META.map((meta) => {
    const localizations = (['en', 'ru', 'uz', 'de'] as Language[]).reduce<
      Record<Language, CmsNewsItemLocalization>
    >((acc, language) => {
      const languageTranslation = translations[language] as {
        blog?: {
          posts?: Record<number, { title?: string; excerpt?: string }>;
        };
      };
      const post = languageTranslation.blog?.posts?.[meta.translationId];

      acc[language] = {
        title: post?.title ?? '',
        excerpt: post?.excerpt ?? '',
      };

      return acc;
    }, {
      en: createEmptyNewsItemLocalization(),
      ru: createEmptyNewsItemLocalization(),
      uz: createEmptyNewsItemLocalization(),
      de: createEmptyNewsItemLocalization(),
    });

    return {
      id: meta.id,
      isActive: true,
      date: meta.date,
      author: meta.author,
      image: meta.image,
      imagePosition: { x: 50, y: 50 },
      link: meta.link,
      localizations,
    };
  });
}

export function getDefaultCmsSnapshot(): CmsSnapshot {
  return {
    version: CMS_EXPORT_VERSION,
    updatedAt: new Date().toISOString(),
    products: cloneCmsValue(baseProducts),
    categories: cloneCmsValue(baseCategories),
    featuredProductIds: getDefaultFeaturedProductIds(baseProducts, baseCategories),
    distributorLocations: cloneCmsValue(baseDistributorLocations),
    vacancies: createDefaultVacancies(),
    newsItems: createDefaultNewsItems(),
    leads: [],
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

function normalizeVacancyLocalization(raw: unknown): CmsVacancyLocalization {
  const defaults = createEmptyVacancyLocalization();

  if (!isRecord(raw)) {
    return defaults;
  }

  return {
    title: typeof raw.title === 'string' ? raw.title : defaults.title,
    department: typeof raw.department === 'string' ? raw.department : defaults.department,
    location: typeof raw.location === 'string' ? raw.location : defaults.location,
    type: typeof raw.type === 'string' ? raw.type : defaults.type,
    experience: typeof raw.experience === 'string' ? raw.experience : defaults.experience,
    age: typeof raw.age === 'string' ? raw.age : defaults.age,
    description: typeof raw.description === 'string' ? raw.description : defaults.description,
    requirements: Array.isArray(raw.requirements)
      ? raw.requirements.filter((item): item is string => typeof item === 'string')
      : defaults.requirements,
  };
}

function normalizeVacancies(raw: unknown): CmsVacancy[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.flatMap((item, index) => {
    if (!isRecord(item)) {
      return [];
    }

    const localizationsRaw = isRecord(item.localizations) ? item.localizations : {};
    const localizations = (['en', 'ru', 'uz', 'de'] as Language[]).reduce<
      Record<Language, CmsVacancyLocalization>
    >((acc, language) => {
      acc[language] = normalizeVacancyLocalization(localizationsRaw[language]);
      return acc;
    }, {
      en: createEmptyVacancyLocalization(),
      ru: createEmptyVacancyLocalization(),
      uz: createEmptyVacancyLocalization(),
      de: createEmptyVacancyLocalization(),
    });

    return [
      {
        id: typeof item.id === 'string' && item.id.trim() ? item.id : `vacancy-${index + 1}`,
        isActive: typeof item.isActive === 'boolean' ? item.isActive : true,
        localizations,
      },
    ];
  });
}

function normalizeNewsItemLocalization(raw: unknown): CmsNewsItemLocalization {
  const defaults = createEmptyNewsItemLocalization();

  if (!isRecord(raw)) {
    return defaults;
  }

  return {
    title: typeof raw.title === 'string' ? raw.title : defaults.title,
    excerpt: typeof raw.excerpt === 'string' ? raw.excerpt : defaults.excerpt,
  };
}

function normalizeNewsItems(raw: unknown): CmsNewsItem[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.flatMap((item, index) => {
    if (!isRecord(item)) {
      return [];
    }

    const localizationsRaw = isRecord(item.localizations) ? item.localizations : {};
    const localizations = (['en', 'ru', 'uz', 'de'] as Language[]).reduce<
      Record<Language, CmsNewsItemLocalization>
    >((acc, language) => {
      acc[language] = normalizeNewsItemLocalization(localizationsRaw[language]);
      return acc;
    }, {
      en: createEmptyNewsItemLocalization(),
      ru: createEmptyNewsItemLocalization(),
      uz: createEmptyNewsItemLocalization(),
      de: createEmptyNewsItemLocalization(),
    });

    return [
      {
        id: typeof item.id === 'string' && item.id.trim() ? item.id : `news-${index + 1}`,
        isActive: typeof item.isActive === 'boolean' ? item.isActive : true,
        date: typeof item.date === 'string' ? item.date : '',
        author: typeof item.author === 'string' ? item.author : '',
        image: typeof item.image === 'string' ? item.image : '',
        imagePosition: {
          x:
            isRecord(item.imagePosition) &&
            typeof item.imagePosition.x === 'number' &&
            Number.isFinite(item.imagePosition.x)
              ? Math.min(100, Math.max(0, item.imagePosition.x))
              : 50,
          y:
            isRecord(item.imagePosition) &&
            typeof item.imagePosition.y === 'number' &&
            Number.isFinite(item.imagePosition.y)
              ? Math.min(100, Math.max(0, item.imagePosition.y))
              : 50,
        },
        link: typeof item.link === 'string' ? item.link : '',
        localizations,
      },
    ];
  });
}

function normalizeLeadNote(raw: unknown, index: number): CmsLeadNote | null {
  if (!isRecord(raw)) {
    return null;
  }

  const text = typeof raw.text === 'string' ? raw.text.trim() : '';
  if (!text) {
    return null;
  }

  return {
    id:
      typeof raw.id === 'string' && raw.id.trim()
        ? raw.id
        : createCmsEntityId(`lead-note-${index + 1}`),
    text,
    createdAt:
      typeof raw.createdAt === 'string' && raw.createdAt.trim()
        ? raw.createdAt
        : new Date().toISOString(),
  };
}

function normalizeLeads(raw: unknown): CmsLead[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.flatMap((item, index) => {
    if (!isRecord(item)) {
      return [];
    }

    const source = item.source === 'careers' ? 'careers' : 'contact';
    const status: CmsLeadStatus =
      item.status === 'inReview' ||
      item.status === 'contacted' ||
      item.status === 'qualified' ||
      item.status === 'proposal' ||
      item.status === 'won' ||
      item.status === 'lost' ||
      item.status === 'archived'
        ? item.status
        : 'new';
    const priority: CmsLeadPriority =
      item.priority === 'low' ||
      item.priority === 'high' ||
      item.priority === 'urgent'
        ? item.priority
        : 'normal';
    const language: Language =
      item.language === 'ru' || item.language === 'uz' || item.language === 'de'
        ? item.language
        : 'en';
    const metadata = isRecord(item.metadata)
      ? Object.fromEntries(
          Object.entries(item.metadata).flatMap(([key, value]) =>
            typeof value === 'string' && key.trim() ? [[key, value]] : [],
          ),
        )
      : {};
    const internalNotes = Array.isArray(item.internalNotes)
      ? item.internalNotes
          .map((note, noteIndex) => normalizeLeadNote(note, noteIndex))
          .filter((note): note is CmsLeadNote => Boolean(note))
      : [];

    return [
      {
        id: typeof item.id === 'string' && item.id.trim() ? item.id : `lead-${index + 1}`,
        createdAt:
          typeof item.createdAt === 'string' && item.createdAt.trim()
            ? item.createdAt
            : new Date().toISOString(),
        updatedAt:
          typeof item.updatedAt === 'string' && item.updatedAt.trim()
            ? item.updatedAt
            : typeof item.createdAt === 'string' && item.createdAt.trim()
              ? item.createdAt
              : new Date().toISOString(),
        source,
        status,
        priority,
        name: typeof item.name === 'string' ? item.name : '',
        email: typeof item.email === 'string' ? item.email : '',
        phone: typeof item.phone === 'string' ? item.phone : '',
        company: typeof item.company === 'string' ? item.company : '',
        subject: typeof item.subject === 'string' ? item.subject : '',
        message: typeof item.message === 'string' ? item.message : '',
        language,
        originPage: typeof item.originPage === 'string' ? item.originPage : '',
        assignee: typeof item.assignee === 'string' ? item.assignee : '',
        followUpAt: typeof item.followUpAt === 'string' ? item.followUpAt : '',
        internalNotes,
        metadata,
      },
    ];
  });
}

function normalizeDistributorLocations(raw: unknown): DistributorLocation[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.flatMap((item, index) => {
    if (!isRecord(item) || !isRecord(item.coords)) {
      return [];
    }

    const market = item.market === 'international' ? 'international' : 'uzbekistan';
    const kind =
      item.kind === 'hq' || item.kind === 'dealer' || item.kind === 'service' || item.kind === 'regional'
        ? item.kind
        : 'dealer';
    const regionKey =
      item.regionKey === 'tashkent' ||
      item.regionKey === 'fergana' ||
      item.regionKey === 'jizzakh' ||
      item.regionKey === 'bukhara' ||
      item.regionKey === 'kashkadarya' ||
      item.regionKey === 'navoiy' ||
      item.regionKey === 'namangan'
        ? item.regionKey
        : undefined;
    const countryKey =
      item.countryKey === 'azerbaijan' ||
      item.countryKey === 'kazakhstan' ||
      item.countryKey === 'kyrgyzstan' ||
      item.countryKey === 'tajikistan' ||
      item.countryKey === 'turkmenistan'
        ? item.countryKey
        : undefined;

    return [
      {
        id: typeof item.id === 'string' && item.id.trim() ? item.id : `dealer-${index + 1}`,
        name: typeof item.name === 'string' ? item.name : '',
        address: typeof item.address === 'string' ? item.address : '',
        city: typeof item.city === 'string' ? item.city : '',
        coords: {
          lat:
            typeof item.coords.lat === 'number' && Number.isFinite(item.coords.lat)
              ? item.coords.lat
              : 41.3111,
          lng:
            typeof item.coords.lng === 'number' && Number.isFinite(item.coords.lng)
              ? item.coords.lng
              : 69.2797,
        },
        phones: Array.isArray(item.phones)
          ? item.phones.filter((phone): phone is string => typeof phone === 'string')
          : [],
        email: typeof item.email === 'string' ? item.email : '',
        market,
        kind,
        regionKey,
        countryKey,
      },
    ];
  });
}

function normalizeFeaturedProductIds(raw: unknown, products: Product[]) {
  if (!Array.isArray(raw)) {
    return [];
  }

  const availableProductIds = new Set(products.map((product) => product.id));

  return Array.from(
    new Set(
      raw.filter(
        (productId): productId is string =>
          typeof productId === 'string' && availableProductIds.has(productId),
      ),
    ),
  );
}

export function normalizeCmsSnapshot(raw: unknown): CmsSnapshot {
  const defaults = getDefaultCmsSnapshot();

  if (!isRecord(raw)) {
    return defaults;
  }

  const usedDefaultProducts = !Array.isArray(raw.products) || raw.products.length === 0;
  const usedDefaultCategories = !Array.isArray(raw.categories) || raw.categories.length === 0;
  const products = usedDefaultProducts
    ? defaults.products
    : cloneCmsValue(raw.products as Product[]);
  const categories = usedDefaultCategories
    ? defaults.categories
    : cloneCmsValue(raw.categories as Category[]);
  const hasFeaturedProductIds = Object.prototype.hasOwnProperty.call(raw, 'featuredProductIds');
  const normalizedFeaturedProductIds = hasFeaturedProductIds
    ? normalizeFeaturedProductIds(raw.featuredProductIds, products)
    : [];
  const defaultFeaturedProductIds = getDefaultFeaturedProductIds(products, categories);
  const normalizedDistributorLocations = Array.isArray(raw.distributorLocations)
    ? normalizeDistributorLocations(raw.distributorLocations)
    : [];

  return {
    version: typeof raw.version === 'number' ? raw.version : defaults.version,
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : defaults.updatedAt,
    products,
    categories,
    featuredProductIds: hasFeaturedProductIds
      ? normalizedFeaturedProductIds.length > 0 || (!usedDefaultProducts && !usedDefaultCategories)
        ? normalizedFeaturedProductIds
        : defaultFeaturedProductIds
      : defaultFeaturedProductIds,
    distributorLocations:
      normalizedDistributorLocations.length > 0 ? normalizedDistributorLocations : defaults.distributorLocations,
    vacancies: Array.isArray(raw.vacancies) ? normalizeVacancies(raw.vacancies) : defaults.vacancies,
    newsItems: Array.isArray(raw.newsItems) ? normalizeNewsItems(raw.newsItems) : defaults.newsItems,
    leads: Array.isArray(raw.leads) ? normalizeLeads(raw.leads) : defaults.leads,
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

export function getVacancyLocalization(vacancy: CmsVacancy, language: Language) {
  const requested = vacancy.localizations[language];

  if (
    requested.title ||
    requested.department ||
    requested.location ||
    requested.type ||
    requested.experience ||
    requested.age ||
    requested.description ||
    requested.requirements.length > 0
  ) {
    return requested;
  }

  return vacancy.localizations.en;
}

export function getNewsItemLocalization(newsItem: CmsNewsItem, language: Language) {
  const requested = newsItem.localizations[language];

  if (requested.title || requested.excerpt) {
    return requested;
  }

  return newsItem.localizations.en;
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
