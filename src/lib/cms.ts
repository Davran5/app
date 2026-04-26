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
export type CmsSectionMediaMap = Record<string, string>;

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
  sectionMedia: CmsSectionMediaMap;
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

export interface SectionMediaFieldMeta {
  id: string;
  pageId: string;
  sectionId: string;
  label: string;
  description: string;
  defaultUrl: string;
}

interface ContentFieldRegistration {
  pageId: string;
  sectionId: string;
  patterns: string[];
}

export const CMS_STORAGE_KEY = 'krantas.cms.v1';
export const CMS_EXPORT_VERSION = 7;

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
  footer: 'Footer',
  cookieConsent: 'Cookie Banner',
  cta: 'Shared CTA',
  homeHero: 'Hero',
  homeStats: 'Stats',
  homeIntro: 'Intro Cards',
  homeAbout: 'About Preview',
  homeEquipment: 'Equipment',
  homeFeatured: 'Featured Products',
  homeProduction: 'Production',
  productsPage: 'Products Overview',
  productsUi: 'Product UI',
  productsData: 'Product Content',
  catalog: 'Catalog',
  categories: 'Category Content',
  specLabels: 'Specification Labels',
  customSolutionsHero: 'Hero',
  customSolutionsIntro: 'Introduction',
  customSolutionsMetal: 'Metal Structures',
  customSolutionsCapabilities: 'Capabilities',
  customSolutionsProduction: 'Production',
  customSolutionsCta: 'CTA',
  servicesIntro: 'Introduction',
  servicesItems: 'Service Items',
  servicesFacilities: 'Facilities',
  servicesSupport: 'Support Block',
  aboutHero: 'Hero',
  aboutStory: 'Story',
  aboutMission: 'Mission',
  aboutHistory: 'History',
  aboutChairman: 'Chairman',
  aboutTeam: 'Team',
  aboutPartners: 'Partners',
  newsHero: 'Hero',
  newsList: 'Article List',
  careersHero: 'Hero',
  careersIntro: 'Why Work With Us',
  careersTeam: 'Team',
  careersPositions: 'Open Positions',
  careersApplication: 'Application Form',
  contactsHero: 'Hero',
  contactsShared: 'Shared Contact Info',
  contactsHeadquarters: 'Headquarters',
  contactsTelegram: 'Telegram',
  contactsForm: 'Contact Form',
  distributors: 'Dealer Network',
  notFound: '404 Page',
};

const TRANSLATION_SECTION_DESCRIPTIONS: Record<string, string> = {
  nav: 'Header and navigation labels used across the site.',
  footer: 'Footer links, legal links, and shared contact details.',
  cookieConsent: 'Cookie and privacy consent copy.',
  cta: 'Shared call-to-action copy used on multiple public pages.',
  homeHero: 'Homepage hero copy and primary action labels.',
  homeStats: 'Homepage metrics and headline numbers.',
  homeIntro: 'Homepage introduction cards and summaries.',
  homeAbout: 'Homepage about preview block.',
  homeEquipment: 'Equipment showcase on the homepage.',
  homeFeatured: 'Homepage featured products copy.',
  homeProduction: 'Homepage production block and process labels.',
  productsPage: 'Products overview page messaging.',
  productsUi: 'Reusable product page labels such as features and specifications.',
  productsData: 'Localized product names, descriptions, features, and specs.',
  catalog: 'Catalog page headings, filters, and CTA copy.',
  categories: 'Localized category names and descriptions used in the catalog.',
  specLabels: 'Localized labels for product specifications.',
  customSolutionsHero: 'Global banner content for Custom Solutions.',
  customSolutionsIntro: 'Custom Solutions intro section.',
  customSolutionsMetal: 'Metal structures section.',
  customSolutionsCapabilities: 'Capabilities grid and capability descriptions.',
  customSolutionsProduction: 'Production backbone section.',
  customSolutionsCta: 'Custom Solutions call-to-action block.',
  servicesIntro: 'Services intro headline and stat labels.',
  servicesItems: 'Service tabs and their detailed copy.',
  servicesFacilities: 'Facilities cards on the Services page.',
  servicesSupport: 'Services support and inquiry labels.',
  aboutHero: 'About page banner content.',
  aboutStory: 'Company story block.',
  aboutMission: 'Mission section displayed on the About page.',
  aboutHistory: 'Growth and Progress timeline.',
  aboutChairman: 'Chairman message block.',
  aboutTeam: 'Leadership/team section and team member stories.',
  aboutPartners: 'Partners section.',
  newsHero: 'News page banner content.',
  newsList: 'News list controls and article CTA labels.',
  careersHero: 'Careers page banner content.',
  careersIntro: 'Careers intro messaging.',
  careersTeam: 'Careers team section heading.',
  careersPositions: 'Open positions list labels.',
  careersApplication: 'Application form labels and placeholders.',
  contactsHero: 'Contacts page banner content.',
  contactsShared: 'Shared contact labels reused across the site.',
  contactsHeadquarters: 'Contacts page office and service center details.',
  contactsTelegram: 'Telegram button labels.',
  contactsForm: 'Contact form labels, placeholders, and inquiry options.',
  distributors: 'Dealer map content, location labels, and map UI strings.',
  notFound: '404 page messaging, recovery actions, and error-state labels.',
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
    sectionIds: [
      'homeHero',
      'homeStats',
      'homeIntro',
      'homeAbout',
      'homeEquipment',
      'homeFeatured',
      'homeProduction',
    ],
  },
  {
    id: 'products',
    label: 'Products',
    description: 'Products overview and product-specific content.',
    sectionIds: ['productsPage', 'productsUi', 'productsData'],
  },
  {
    id: 'catalog',
    label: 'Catalog',
    description: 'Catalog listing pages, category text, and specification labels.',
    sectionIds: ['catalog', 'categories', 'specLabels'],
  },
  {
    id: 'customSolutions',
    label: 'Custom Solutions',
    description: 'Custom solutions page content and engineering sections.',
    sectionIds: [
      'customSolutionsHero',
      'customSolutionsIntro',
      'customSolutionsMetal',
      'customSolutionsCapabilities',
      'customSolutionsProduction',
      'customSolutionsCta',
    ],
  },
  {
    id: 'services',
    label: 'Services',
    description: 'Service page sections and support-related copy.',
    sectionIds: ['servicesIntro', 'servicesItems', 'servicesFacilities', 'servicesSupport'],
  },
  {
    id: 'about',
    label: 'About',
    description: 'Company story, leadership, history, and mission text.',
    sectionIds: [
      'aboutHero',
      'aboutStory',
      'aboutMission',
      'aboutHistory',
      'aboutChairman',
      'aboutTeam',
      'aboutPartners',
    ],
  },
  {
    id: 'news',
    label: 'News',
    description: 'Newsroom labels and article-related page copy.',
    sectionIds: ['newsHero', 'newsList'],
  },
  {
    id: 'careers',
    label: 'Careers',
    description: 'Career page messaging, openings, and hiring content.',
    sectionIds: ['careersHero', 'careersIntro', 'careersTeam', 'careersPositions', 'careersApplication'],
  },
  {
    id: 'contacts',
    label: 'Contacts',
    description: 'Contact page labels, address details, and inquiry copy.',
    sectionIds: ['contactsHero', 'contactsShared', 'contactsHeadquarters', 'contactsTelegram', 'contactsForm'],
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

const CONTENT_FIELD_REGISTRY: ContentFieldRegistration[] = [
  { pageId: 'global', sectionId: 'nav', patterns: ['nav.*'] },
  { pageId: 'global', sectionId: 'footer', patterns: ['footer.*'] },
  { pageId: 'global', sectionId: 'cookieConsent', patterns: ['cookieConsent.*'] },
  { pageId: 'global', sectionId: 'cta', patterns: ['cta.*'] },
  {
    pageId: 'home',
    sectionId: 'homeHero',
    patterns: [
      'home.since',
      'home.title',
      'home.subtitle',
      'home.exploreCatalog',
      'home.contactUs',
      'home.inquiryForm',
    ],
  },
  { pageId: 'home', sectionId: 'homeStats', patterns: ['stats.*'] },
  {
    pageId: 'home',
    sectionId: 'homeIntro',
    patterns: ['intro.*'],
  },
  { pageId: 'home', sectionId: 'homeAbout', patterns: ['aboutHome.*'] },
  {
    pageId: 'home',
    sectionId: 'homeEquipment',
    patterns: [
      'equipment.title',
      'equipment.heading',
      'equipment.viewAll',
      'equipment.customSolutions',
      'equipment.customDesc',
      'home.build.explore',
    ],
  },
  {
    pageId: 'home',
    sectionId: 'homeFeatured',
    patterns: ['products.title', 'products.heading', 'products.viewAll'],
  },
  {
    pageId: 'home',
    sectionId: 'homeProduction',
    patterns: ['production.*', 'home.process.explore'],
  },
  { pageId: 'products', sectionId: 'productsPage', patterns: ['productsPage.*'] },
  {
    pageId: 'products',
    sectionId: 'productsUi',
    patterns: ['products.specs', 'products.features', 'products.inquiry'],
  },
  { pageId: 'products', sectionId: 'productsData', patterns: ['productsData.*'] },
  { pageId: 'catalog', sectionId: 'catalog', patterns: ['catalog.*'] },
  { pageId: 'catalog', sectionId: 'categories', patterns: ['categories.*'] },
  { pageId: 'catalog', sectionId: 'specLabels', patterns: ['specLabels.*'] },
  {
    pageId: 'customSolutions',
    sectionId: 'customSolutionsHero',
    patterns: ['customSolutionsPage.heroTitle', 'customSolutionsPage.heroIntro'],
  },
  { pageId: 'customSolutions', sectionId: 'customSolutionsIntro', patterns: ['customSolutionsPage.intro.*'] },
  {
    pageId: 'customSolutions',
    sectionId: 'customSolutionsMetal',
    patterns: ['customSolutionsPage.metalStructures.*'],
  },
  {
    pageId: 'customSolutions',
    sectionId: 'customSolutionsCapabilities',
    patterns: ['customSolutionsPage.capabilities.title', 'customSolutionsPage.capabilities.subtitle', 'customSolutionsPage.capabilities.items.*'],
  },
  { pageId: 'customSolutions', sectionId: 'customSolutionsProduction', patterns: ['customSolutionsPage.production.*'] },
  { pageId: 'customSolutions', sectionId: 'customSolutionsCta', patterns: ['customSolutionsPage.cta.*'] },
  {
    pageId: 'services',
    sectionId: 'servicesIntro',
    patterns: ['services.introHeadline', 'services.introP1', 'services.introP2', 'services.stats.*'],
  },
  { pageId: 'services', sectionId: 'servicesItems', patterns: ['services.items.*'] },
  { pageId: 'services', sectionId: 'servicesFacilities', patterns: ['services.facilities', 'services.subtitle', 'services.facilitiesList.*'] },
  { pageId: 'services', sectionId: 'servicesSupport', patterns: ['services.supportCenter', 'services.supportDesc', 'services.inquiryForm'] },
  { pageId: 'about', sectionId: 'aboutHero', patterns: ['about.heroTitle', 'about.heroIntro'] },
  { pageId: 'about', sectionId: 'aboutStory', patterns: ['about.story', 'about.storyP1', 'about.storyP2', 'about.storyP3', 'about.storyP4'] },
  { pageId: 'about', sectionId: 'aboutMission', patterns: ['mission.*'] },
  { pageId: 'about', sectionId: 'aboutHistory', patterns: ['about.history', 'about.historyEvents.*'] },
  {
    pageId: 'about',
    sectionId: 'aboutChairman',
    patterns: ['about.chairman', 'about.chairmanQuote', 'about.chairmanName', 'about.chairmanTitle'],
  },
  {
    pageId: 'about',
    sectionId: 'aboutTeam',
    patterns: ['about.family', 'about.familyDesc', 'about.joinFamily', 'about.team', 'about.teamSubtitle', 'about.teamRoles.*', 'about.teamMemberStories.*'],
  },
  { pageId: 'about', sectionId: 'aboutPartners', patterns: ['about.partners', 'about.partnersDesc'] },
  { pageId: 'news', sectionId: 'newsHero', patterns: ['blog.heroIntro'] },
  { pageId: 'news', sectionId: 'newsList', patterns: ['blog.latest', 'blog.readOriginal', 'blog.newestFirst', 'blog.oldestFirst'] },
  { pageId: 'careers', sectionId: 'careersHero', patterns: ['careers.heroIntro'] },
  { pageId: 'careers', sectionId: 'careersIntro', patterns: ['careers.whyWork', 'careers.subtitle'] },
  { pageId: 'careers', sectionId: 'careersTeam', patterns: ['careers.team'] },
  {
    pageId: 'careers',
    sectionId: 'careersPositions',
    patterns: ['careers.openPositions', 'careers.apply', 'careers.experienceLabel', 'careers.ageLabel', 'careers.requirementsLabel', 'careers.fullTime'],
  },
  {
    pageId: 'careers',
    sectionId: 'careersApplication',
    patterns: [
      'careers.applyPopupTitle',
      'careers.fullName',
      'careers.email',
      'careers.phone',
      'careers.message',
      'careers.submit',
      'careers.namePlaceholder',
      'careers.emailPlaceholder',
      'careers.phonePlaceholder',
      'careers.agePlaceholder',
      'careers.experiencePlaceholder',
      'careers.messagePlaceholder',
    ],
  },
  { pageId: 'contacts', sectionId: 'contactsHero', patterns: ['contacts.heroIntro'] },
  { pageId: 'contacts', sectionId: 'contactsShared', patterns: ['contacts.title', 'contacts.address', 'contacts.phone', 'contacts.email'] },
  { pageId: 'contacts', sectionId: 'contactsHeadquarters', patterns: ['contacts.headquarters.*'] },
  { pageId: 'contacts', sectionId: 'contactsTelegram', patterns: ['contacts.telegramService', 'contacts.telegramKrantas'] },
  {
    pageId: 'contacts',
    sectionId: 'contactsForm',
    patterns: [
      'contacts.formTitle',
      'contacts.inquiryForm',
      'contacts.name',
      'contacts.emailLabel',
      'contacts.messageLabel',
      'contacts.send',
      'contacts.companyLabel',
      'contacts.organizationPlaceholder',
      'contacts.areaOfInterestLabel',
      'contacts.selectAreaPlaceholder',
      'contacts.phoneLabel',
      'contacts.emailPlaceholder',
      'contacts.successMessage',
      'contacts.subjectOptions.*',
    ],
  },
  { pageId: 'findDealer', sectionId: 'distributors', patterns: ['distributors.*'] },
  { pageId: 'notFound', sectionId: 'notFound', patterns: ['notFound.*'] },
];

const LEGACY_TRANSLATION_SECTION_TO_PAGE: Record<string, string> = {
  nav: 'global',
  footer: 'global',
  cookieConsent: 'global',
  cta: 'global',
  home: 'home',
  stats: 'home',
  intro: 'home',
  aboutHome: 'home',
  equipment: 'home',
  production: 'home',
  products: 'products',
  productsPage: 'products',
  productsData: 'products',
  catalog: 'catalog',
  categories: 'catalog',
  specLabels: 'catalog',
  customSolutionsPage: 'customSolutions',
  services: 'services',
  about: 'about',
  mission: 'about',
  blog: 'news',
  careers: 'careers',
  contacts: 'contacts',
  distributors: 'findDealer',
  notFound: 'notFound',
};

function matchesEditableTranslationPattern(path: string, pattern: string) {
  if (pattern.endsWith('.*')) {
    return path.startsWith(pattern.slice(0, -1));
  }

  return path === pattern;
}

function getContentFieldRegistration(path: string) {
  return CONTENT_FIELD_REGISTRY.find((entry) =>
    entry.patterns.some((pattern) => matchesEditableTranslationPattern(path, pattern)),
  );
}

export function isEditableTranslationPath(path: string) {
  return Boolean(getContentFieldRegistration(path));
}

export function getEditableTranslationEntries(language: Language) {
  return getTranslationEntries(language).filter((entry) => isEditableTranslationPath(entry.path));
}

const SECTION_MEDIA_FIELDS: SectionMediaFieldMeta[] = [
  {
    id: 'home.aboutHome.factoryImage',
    pageId: 'home',
    sectionId: 'homeAbout',
    label: 'Factory Image',
    description: 'Main image in the Home about section.',
    defaultUrl: '/about_factory.jpg',
  },
  {
    id: 'home.equipment.customSolutionsImage',
    pageId: 'home',
    sectionId: 'homeEquipment',
    label: 'Custom Solutions Card',
    description: 'Large image for the custom solutions equipment card.',
    defaultUrl: '/cust_sol.jpg',
  },
  {
    id: 'home.equipment.metalStructuresImage',
    pageId: 'home',
    sectionId: 'homeEquipment',
    label: 'Metal Structures Card',
    description: 'Image used for the metal structures equipment card.',
    defaultUrl: '/cover_ms.jpeg',
  },
  {
    id: 'home.production.facilityImage',
    pageId: 'home',
    sectionId: 'homeProduction',
    label: 'Production Facility Image',
    description: 'Main image in the full-cycle production section.',
    defaultUrl: '/full_cycle.jpeg',
  },
  {
    id: 'services.services.introImage',
    pageId: 'services',
    sectionId: 'servicesIntro',
    label: 'Intro Image',
    description: 'Lead image at the top of the services page.',
    defaultUrl: '/serv.jpeg',
  },
  {
    id: 'services.services.afterSalesImage',
    pageId: 'services',
    sectionId: 'servicesItems',
    label: 'After-Sales Image',
    description: 'Visual for the after-sales service item.',
    defaultUrl: '/welding.jpeg',
  },
  {
    id: 'services.services.qualityImage',
    pageId: 'services',
    sectionId: 'servicesItems',
    label: 'Quality Image',
    description: 'Visual for the quality service item.',
    defaultUrl: '/tech_cnc.jpg',
  },
  {
    id: 'services.services.localizationImage',
    pageId: 'services',
    sectionId: 'servicesItems',
    label: 'Localization Image',
    description: 'Visual for the localization service item.',
    defaultUrl: '/assembly_line.jpeg',
  },
  {
    id: 'services.services.manufacturingImage',
    pageId: 'services',
    sectionId: 'servicesItems',
    label: 'Manufacturing Image',
    description: 'Visual for the manufacturing service item.',
    defaultUrl: '/about_factory.jpg',
  },
  {
    id: 'services.services.engineeringImage',
    pageId: 'services',
    sectionId: 'servicesItems',
    label: 'Engineering Image',
    description: 'Visual for the engineering service item.',
    defaultUrl: '/products/LE Truck-Mounted Crane, 25 t.jpeg',
  },
  {
    id: 'services.services.facilityWarehouseImage',
    pageId: 'services',
    sectionId: 'servicesFacilities',
    label: 'Warehouse Facility Image',
    description: 'Image for the warehouse facility card.',
    defaultUrl: '/warehouse.jpeg',
  },
  {
    id: 'services.services.facilityServiceImage',
    pageId: 'services',
    sectionId: 'servicesFacilities',
    label: 'Service Facility Image',
    description: 'Image for the service station facility card.',
    defaultUrl: '/welding.jpeg',
  },
  {
    id: 'services.services.facilitySparePartsImage',
    pageId: 'services',
    sectionId: 'servicesFacilities',
    label: 'Spare Parts Facility Image',
    description: 'Image for the spare parts facility card.',
    defaultUrl: '/spare.jpeg',
  },
  {
    id: 'customSolutions.customSolutionsPage.introImage',
    pageId: 'customSolutions',
    sectionId: 'customSolutionsIntro',
    label: 'Intro Image',
    description: 'Lead image at the top of the custom solutions page.',
    defaultUrl: '/our_vis.jpeg',
  },
  {
    id: 'customSolutions.customSolutionsPage.metalStructuresImage',
    pageId: 'customSolutions',
    sectionId: 'customSolutionsMetal',
    label: 'Metal Structures Image',
    description: 'Image for the metal structures section.',
    defaultUrl: '/cover_ms.jpeg',
  },
  {
    id: 'customSolutions.customSolutionsPage.chassisImage',
    pageId: 'customSolutions',
    sectionId: 'customSolutionsCapabilities',
    label: 'Chassis Capability Image',
    description: 'Image for the chassis modification capability.',
    defaultUrl: '/chassis_mod.jpeg',
  },
  {
    id: 'customSolutions.customSolutionsPage.complexesImage',
    pageId: 'customSolutions',
    sectionId: 'customSolutionsCapabilities',
    label: 'Transport Complexes Image',
    description: 'Image for the transport engineering capability.',
    defaultUrl: '/spec_eng.jpeg',
  },
  {
    id: 'customSolutions.customSolutionsPage.hydraulicsImage',
    pageId: 'customSolutions',
    sectionId: 'customSolutionsCapabilities',
    label: 'Hydraulics Image',
    description: 'Image for the hydraulics and electronics capability.',
    defaultUrl: '/hyd_ele.jpeg',
  },
  {
    id: 'customSolutions.customSolutionsPage.containersImage',
    pageId: 'customSolutions',
    sectionId: 'customSolutionsCapabilities',
    label: 'Containers Image',
    description: 'Image for the non-standard containers capability.',
    defaultUrl: '/non_stan.jpeg',
  },
  {
    id: 'customSolutions.customSolutionsPage.productionManufacturingImage',
    pageId: 'customSolutions',
    sectionId: 'customSolutionsProduction',
    label: 'Production Backbone Main Image',
    description: 'Large production-floor image in the production backbone section.',
    defaultUrl: '/man_floor.jpeg',
  },
  {
    id: 'customSolutions.customSolutionsPage.productionCncImage',
    pageId: 'customSolutions',
    sectionId: 'customSolutionsProduction',
    label: 'Production CNC Image',
    description: 'CNC image in the production backbone section.',
    defaultUrl: '/cnc.jpeg',
  },
  {
    id: 'customSolutions.customSolutionsPage.productionWeldingImage',
    pageId: 'customSolutions',
    sectionId: 'customSolutionsProduction',
    label: 'Production Welding Image',
    description: 'Welding image in the production backbone section.',
    defaultUrl: '/welding.jpeg',
  },
  {
    id: 'customSolutions.customSolutionsPage.productionAssemblyImage',
    pageId: 'customSolutions',
    sectionId: 'customSolutionsProduction',
    label: 'Production Assembly Image',
    description: 'Assembly image in the production backbone section.',
    defaultUrl: '/assembly_line.jpeg',
  },
  {
    id: 'about.about.storyImage',
    pageId: 'about',
    sectionId: 'aboutStory',
    label: 'Story Image',
    description: 'Main factory history image in the About story section.',
    defaultUrl: '/hq.jpeg',
  },
  {
    id: 'about.about.chairmanImage',
    pageId: 'about',
    sectionId: 'aboutChairman',
    label: 'Chairman Portrait',
    description: 'Portrait image in the chairman message section.',
    defaultUrl: '/chairman_portrait.jpeg',
  },
  {
    id: 'careers.careers.introImage',
    pageId: 'careers',
    sectionId: 'careersIntro',
    label: 'Why Work Image',
    description: 'Lead image in the careers introduction section.',
    defaultUrl: '/work.jpeg',
  },

  // ── Home hero ──
  {
    id: 'home.hero.videoPoster',
    pageId: 'home',
    sectionId: 'homeHero',
    label: 'Hero Video Poster',
    description: 'Poster image shown while the hero video loads.',
    defaultUrl: '/hero-poster.webp',
  },

  // ── Home category covers ──
  {
    id: 'home.categories.liftingEquipmentCover',
    pageId: 'home',
    sectionId: 'homeEquipment',
    label: 'Lifting Equipment Cover',
    description: 'Cover image for the lifting equipment category card.',
    defaultUrl: '/cover_le.jpg',
  },
  {
    id: 'home.categories.agriculturalCover',
    pageId: 'home',
    sectionId: 'homeEquipment',
    label: 'Agricultural Cover',
    description: 'Cover image for the agricultural machinery category card.',
    defaultUrl: '/cover_am.jpg',
  },
  {
    id: 'home.categories.tankTrucksCover',
    pageId: 'home',
    sectionId: 'homeEquipment',
    label: 'Tank Trucks Cover',
    description: 'Cover image for the tank trucks category card.',
    defaultUrl: '/cover_tt.jpg',
  },
  {
    id: 'home.categories.specialPurposeCover',
    pageId: 'home',
    sectionId: 'homeEquipment',
    label: 'Special Purpose Cover',
    description: 'Cover image for the special purpose vehicles category card.',
    defaultUrl: '/cover_spm.jpg',
  },
  {
    id: 'home.categories.overheadGantryCover',
    pageId: 'home',
    sectionId: 'homeEquipment',
    label: 'Overhead & Gantry Cover',
    description: 'Cover image for the overhead and gantry cranes category card.',
    defaultUrl: '/cover_og.jpg',
  },
  {
    id: 'home.categories.dumpTrucksCover',
    pageId: 'home',
    sectionId: 'homeEquipment',
    label: 'Dump Trucks Cover',
    description: 'Cover image for the dump trucks category card.',
    defaultUrl: '/cover_dt.jpg',
  },
  {
    id: 'home.categories.miningTrucksCover',
    pageId: 'home',
    sectionId: 'homeEquipment',
    label: 'Mining Trucks Cover',
    description: 'Cover image for the mining trucks category card.',
    defaultUrl: '/cover_mt.jpeg',
  },

  // ── Global hero/banner background ──
  {
    id: 'global.hero.backgroundImage',
    pageId: 'global',
    sectionId: 'nav',
    label: 'Hero & Banner Background',
    description: 'Shared background image used in the site hero and page banners.',
    defaultUrl: '/hero_cover.png',
  },

  // ── Team member story images ──
  {
    id: 'about.team.sergeyImage',
    pageId: 'about',
    sectionId: 'aboutTeam',
    label: 'Sergey Konstantinovich Photo',
    description: 'Portrait for the Sergey Konstantinovich team story card.',
    defaultUrl: '/Konstantinovich.jpeg',
  },
  {
    id: 'about.team.komilImage',
    pageId: 'about',
    sectionId: 'aboutTeam',
    label: 'Komil Khaitmatov Photo',
    description: 'Portrait for the Komil Khaitmatov team story card.',
    defaultUrl: '/komil.png',
  },
  {
    id: 'about.team.elviraImage',
    pageId: 'about',
    sectionId: 'aboutTeam',
    label: 'Elvira Photo',
    description: 'Portrait for the Elvira team story card.',
    defaultUrl: '/elvira.png',
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

const DEFAULT_NEWS_CONTENT: Record<
  Language,
  Record<number, CmsNewsItemLocalization>
> = {
  en: {
    1: {
      title: 'Presidential Visit to Krantas Group Plant',
      excerpt:
        'President Shavkat Mirziyoyev visited our production facilities, highlighting the importance of industrial localization and the expansion of our special equipment range to over 60 types.',
    },
    2: {
      title: 'Expansion into Military and Special Equipment Production',
      excerpt:
        'Krantas Group announces plans for a $55 million project in Nurafshan to manufacture light armored vehicles and specialized trucks on a new 12-hectare industrial site.',
    },
    3: {
      title: 'Global Debut: Tarlon and Qalqon at IDEX-2023',
      excerpt:
        'We proudly presented our latest light armored vehicles, Tarlon and Qalqon, at the international defense exhibition in the UAE, showcasing Uzbek engineering excellence on a global stage.',
    },
    4: {
      title: 'Strategic Partnership with MAZ and MTZ',
      excerpt:
        'Krantas Group strengthens international ties through discussions with Belarusian partners to start assembling tractors and industrial machinery in Uzbekistan.',
    },
    5: {
      title: 'Enhancing Mining Efficiency at AGMK',
      excerpt:
        "Our high-capacity dump trucks have been delivered to the Almalyk Mining and Metallurgical Complex, supporting the modernization and transport capacity of Uzbekistan's mining industry.",
    },
    6: {
      title: 'Introducing "Arslon": Uzbekistan\'s First Domestic BTR',
      excerpt:
        'Developed to international standards, our new Armored Personnel Carrier "Arslon" has entered state trials, representing a major milestone in domestic defense manufacturing.',
    },
    7: {
      title: 'Significant Infrastructure Development',
      excerpt:
        'A major $1 billion urban mixed development project is proposed for our former Mirzo-Ulugbek factory site, covering 14 hectares and paving the way for modern residential and social infrastructure.',
    },
    8: {
      title: 'Presidents of Uzbekistan and Tajikistan Inaugurate TALCO-KRANTAS Joint Venture',
      excerpt:
        'In a significant step for industrial cooperation, the first phase of the TALCO-KRANTAS joint venture was inaugurated for assembly of special construction and municipal vehicles.',
    },
  },
  ru: {
    1: {
      title: 'Визит Президента на завод Krantas Group',
      excerpt:
        'Президент Шавкат Мирзиёев посетил наши производственные мощности, подчеркнув важность промышленной локализации и расширения ассортимента спецтехники до более чем 60 видов.',
    },
    2: {
      title: 'Расширение производства военной и спецтехники',
      excerpt:
        'Krantas Group объявляет о планах реализации проекта стоимостью 55 млн долларов в Нурафшане по производству легких бронированных машин и специализированных грузовиков.',
    },
    3: {
      title: 'Мировой дебют: Tarlon и Qalqon на IDEX-2023',
      excerpt:
        'Мы с гордостью представили наши новейшие легкие бронированные машины Tarlon и Qalqon на международной оборонной выставке в ОАЭ, продемонстрировав инженерное мастерство Узбекистана.',
    },
    4: {
      title: 'Стратегическое партнерство с МАЗ и МТЗ',
      excerpt:
        'Krantas Group укрепляет международные связи, обсуждая с белорусскими партнерами проект по сборке тракторов и промышленного оборудования в Узбекистане.',
    },
    5: {
      title: 'Поставка сверхтяжелой техники для АГМК',
      excerpt:
        'Наши высокопроизводительные самосвалы были переданы Алмалыкскому горно-металлургическому комбинату, поддерживая модернизацию горнодобывающей промышленности страны.',
    },
    6: {
      title: 'Arslon: Первый отечественный бронетранспортер',
      excerpt:
        'Разработанный по международным стандартам, наш новый БТР «Арслон» поступил на государственные испытания, став важной вехой в отечественном оборонном производстве.',
    },
    7: {
      title: 'Значимое инфраструктурное развитие',
      excerpt:
        'Для нашего бывшего заводского участка в Мирзо-Улугбекском районе площадью 14 гектаров предложен крупный смешанный городской проект стоимостью $1 млрд, открывающий путь к современной жилой и социальной инфраструктуре.',
    },
    8: {
      title: 'Президенты Узбекистана и Таджикистана открыли СП «ТАЛКО-КРАНТАС»',
      excerpt:
        'Важным шагом для промышленного сотрудничества стало открытие первой очереди совместного предприятия TALCO-KRANTAS по сборке специальной строительной и коммунальной техники.',
    },
  },
  uz: {
    1: {
      title: 'O‘zbekiston Prezidentining Krantas zavodiga tashrifi',
      excerpt:
        'Prezident Shavkat Mirziyoyev ishlab chiqarish quvvatlarimiz bilan tanishib, sanoat mahalliylashtirish va maxsus texnikalar qatorini 60 dan ortiq turga kengaytirish muhimligini ta’kidladi.',
    },
    2: {
      title: 'Harbiy va maxsus texnika ishlab chiqarish kengayishi',
      excerpt:
        'Krantas Group Nurafshonda yengil zirhli avtomobillar va maxsus yuk mashinalari ishlab chiqarish bo‘yicha 55 million dollarlik loyihani amalga oshirish rejalarini e’lon qildi.',
    },
    3: {
      title: 'Global debyut: IDEX-2023da Tarlon va Qalqon',
      excerpt:
        'BAAdagi xalqaro mudofaa ko‘rgazmasida biz o‘zimizning so‘nggi yengil zirhli avtomobillarimiz — Tarlon va Qalqonni g‘urur bilan taqdim etib, O‘zbekiston muhandislik salohiyatini namoyish etdik.',
    },
    4: {
      title: 'MAZ va MTZ bilan strategik hamkorlik',
      excerpt:
        'Krantas Group belaruslik hamkorlar bilan O‘zbekistonda traktorlar va sanoat uskunalarini yig‘ish loyihasini muhokama qilib, xalqaro aloqalarni mustahkamlamoqda.',
    },
    5: {
      title: 'OKMK uchun og‘ir texnika yetkazib berish',
      excerpt:
        'Bizning yuqori quvvatli samosvallarimiz Olmaliq kon-metallurgiya kombinatiga yetkazib berildi va mamlakatimiz tog‘-kon sanoatini modernizatsiya qilishga xizmat qilmoqda.',
    },
    6: {
      title: 'Arslon: Birinchi mahalliy zirhli transportyor',
      excerpt:
        'Xalqaro standartlar asosida ishlab chiqilgan yangi "Arslon" zirhli transportyorimiz davlat sinovlaridan o‘tmoqda va mahalliy mudofaa sanoatida muhim qadam bo‘ldi.',
    },
    7: {
      title: 'Muhim infratuzilmaviy rivojlanish',
      excerpt:
        "Mirzo Ulug'bekdagi sobiq zavod hududimizning 14 gektar maydonida zamonaviy turar joy va ijtimoiy infratuzilmani yaratishga qaratilgan 1 milliard dollarlik yirik aralash shaharsozlik loyihasi taklif qilindi.",
    },
    8: {
      title:
        'O’zbekiston va Tojikiston Prezidentlari «TALCO-KRANTAS» qo’shma korxonasini ochdilar',
      excerpt:
        'Sanoat hamkorligini mustahkamlash yo‘lidagi muhim qadam sifatida TALCO-KRANTAS qo‘shma korxonasining maxsus qurilish va kommunal texnikani yig‘ishga mo‘ljallangan birinchi bosqichi ishga tushirildi.',
    },
  },
  de: {
    1: {
      title: 'Präsidentenbesuch im Krantas Group Werk',
      excerpt:
        'Präsident Shavkat Mirziyoyev besuchte unsere Produktionsanlagen und betonte die Bedeutung der industriellen Lokalisierung und der Erweiterung unseres Spezialgerätesortiments auf über 60 Typen.',
    },
    2: {
      title: 'Erweiterung der Produktion von Militär- und Spezialfahrzeugen',
      excerpt:
        'Die Krantas Group kündigt Pläne für ein 55-Millionen-Dollar-Projekt in Nurafshan an, um leichte gepanzerte Fahrzeuge und Spezial-Lkw auf einem neuen, 12 Hektar großen Industriegelände herzustellen.',
    },
    3: {
      title: 'Globales Debüt: Tarlon und Qalqon auf der IDEX-2023',
      excerpt:
        'Mit Stolz haben wir unsere neuesten leichten gepanzerten Fahrzeuge Tarlon und Qalqon auf der internationalen Verteidigungsmesse in den VAE präsentiert und damit usbekische Ingenieurskunst auf Weltniveau gezeigt.',
    },
    4: {
      title: 'Strategische Partnerschaft mit MAZ und MTZ',
      excerpt:
        'Die Krantas Group stärkt ihre internationalen Beziehungen durch Gespräche mit belarussischen Partnern über die Montage von Traktoren und Industriemaschinen in Usbekistan.',
    },
    5: {
      title: 'Steigerung der Bergbaueffizienz bei AGMK',
      excerpt:
        'Unsere Hochleistungskipper wurden an den Bergbau- und Metallurgiekombinat Almalyk übergeben und unterstützen die Modernisierung der Bergbaukapazitäten Usbekistans.',
    },
    6: {
      title: 'Arslon: Der erste einheimische Schützenpanzer Usbekistans',
      excerpt:
        'Unser neuer, nach internationalen Standards entwickelter Schützenpanzer „Arslon“ hat die staatliche Erprobung aufgenommen – ein Meilenstein für die heimische Verteidigungsindustrie.',
    },
    7: {
      title: 'Bedeutendes Renovierungs- und Infrastrukturprojekt für Tashkent',
      excerpt:
        'Für unseren (noch) aktuellen Standort Mirzo-Ulugbek arbeiten wir mit Spezialisten aus aller Welt an einem Konzept für ein "mixed development project". Internationale Architekten arbeiten am anspruchsvollen Entwurf von Wohnungen, Hotels und Büros mit einer Investitionssumme von mehr als 1 Milliarde US$.',
    },
    8: {
      title:
        'Präsidenten von Usbekistan und Tadschikistan eröffnen Joint Venture TALCO-KRANTAS',
      excerpt:
        'In einem bedeutenden Schritt hin zur industriellen Zusammenarbeit wurde die erste Phase des Joint Ventures TALCO-KRANTAS zur Montage von Spezialfahrzeugen eingeweiht.',
    },
  },
};

function createDefaultNewsItems(): CmsNewsItem[] {
  return DEFAULT_NEWS_META.map((meta) => {
    const localizations = (['en', 'ru', 'uz', 'de'] as Language[]).reduce<
      Record<Language, CmsNewsItemLocalization>
    >((acc, language) => {
      const post = DEFAULT_NEWS_CONTENT[language][meta.translationId];

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
    sectionMedia: {},
    translationOverrides: cloneCmsValue(EMPTY_TRANSLATION_OVERRIDES),
    seo: cloneCmsValue(DEFAULT_SEO),
  };
}

function normalizeSectionMedia(raw: unknown): CmsSectionMediaMap {
  if (!isRecord(raw)) {
    return {};
  }

  const validIds = new Set(SECTION_MEDIA_FIELDS.map((field) => field.id));

  return Object.fromEntries(
    Object.entries(raw).flatMap(([key, value]) =>
      typeof value === 'string' && value.trim() && validIds.has(key) ? [[key, value]] : [],
    ),
  );
}

function normalizeTranslationOverrides(raw: unknown): TranslationOverrideMap {
  const normalized = cloneCmsValue(EMPTY_TRANSLATION_OVERRIDES);

  if (!isRecord(raw)) {
    return normalized;
  }

  (Object.keys(normalized) as Language[]).forEach((language) => {
    const languageOverrides = raw[language];
    const validPaths = new Set(getEditableTranslationEntries(language).map((entry) => entry.path));
    if (!isRecord(languageOverrides)) {
      return;
    }

    Object.entries(languageOverrides).forEach(([path, value]) => {
      if (typeof value === 'string' && validPaths.has(path)) {
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

function normalizeNewsItems(raw: unknown, defaultNewsItems = createDefaultNewsItems()): CmsNewsItem[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  const defaultNewsById = new Map(defaultNewsItems.map((newsItem) => [newsItem.id, newsItem]));

  return raw.flatMap((item, index) => {
    if (!isRecord(item)) {
      return [];
    }

    const id = typeof item.id === 'string' && item.id.trim() ? item.id : `news-${index + 1}`;
    const defaultItem = defaultNewsById.get(id);
    const localizationsRaw = isRecord(item.localizations) ? item.localizations : {};
    const localizations = (['en', 'ru', 'uz', 'de'] as Language[]).reduce<
      Record<Language, CmsNewsItemLocalization>
    >((acc, language) => {
      const normalized = normalizeNewsItemLocalization(localizationsRaw[language]);
      const fallback = defaultItem?.localizations[language] ?? createEmptyNewsItemLocalization();

      acc[language] = {
        title: normalized.title || fallback.title,
        excerpt: normalized.excerpt || fallback.excerpt,
      };
      return acc;
    }, {
      en: createEmptyNewsItemLocalization(),
      ru: createEmptyNewsItemLocalization(),
      uz: createEmptyNewsItemLocalization(),
      de: createEmptyNewsItemLocalization(),
    });

    return [
      {
        id,
        isActive:
          typeof item.isActive === 'boolean'
            ? item.isActive
            : defaultItem?.isActive ?? true,
        date: typeof item.date === 'string' && item.date ? item.date : defaultItem?.date ?? '',
        author:
          typeof item.author === 'string' && item.author
            ? item.author
            : defaultItem?.author ?? '',
        image:
          typeof item.image === 'string' && item.image
            ? item.image
            : defaultItem?.image ?? '',
        imagePosition: {
          x:
            isRecord(item.imagePosition) &&
            typeof item.imagePosition.x === 'number' &&
            Number.isFinite(item.imagePosition.x)
              ? Math.min(100, Math.max(0, item.imagePosition.x))
              : defaultItem?.imagePosition.x ?? 50,
          y:
            isRecord(item.imagePosition) &&
            typeof item.imagePosition.y === 'number' &&
            Number.isFinite(item.imagePosition.y)
              ? Math.min(100, Math.max(0, item.imagePosition.y))
              : defaultItem?.imagePosition.y ?? 50,
        },
        link: typeof item.link === 'string' && item.link ? item.link : defaultItem?.link ?? '',
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
  const normalizedNewsItems = Array.isArray(raw.newsItems)
    ? normalizeNewsItems(raw.newsItems, defaults.newsItems)
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
    newsItems: normalizedNewsItems.length > 0 ? normalizedNewsItems : defaults.newsItems,
    leads: Array.isArray(raw.leads) ? normalizeLeads(raw.leads) : defaults.leads,
    mediaItems: normalizeMediaItems(raw.mediaItems),
    sectionMedia: normalizeSectionMedia(raw.sectionMedia),
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

  if (requested?.title.trim()) {
    return requested;
  }

  const english = newsItem.localizations.en;

  if (english?.title.trim()) {
    return english;
  }

  const fallback = (['ru', 'uz', 'de'] as Language[])
    .map((fallbackLanguage) => newsItem.localizations[fallbackLanguage])
    .find((localization) => localization?.title.trim());

  return fallback ?? requested ?? english;
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
  const registration = getContentFieldRegistration(path);

  return registration?.sectionId ?? path.split('.').filter(Boolean)[0] ?? 'misc';
}

export function getTranslationPageId(path: string) {
  const registration = getContentFieldRegistration(path);

  if (registration) {
    return registration.pageId;
  }

  const sectionId = getTranslationSectionId(path);
  return TRANSLATION_SECTION_TO_PAGE[sectionId] ?? LEGACY_TRANSLATION_SECTION_TO_PAGE[sectionId] ?? 'global';
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
  const sectionIds = Array.from(
    new Set([
      ...getEditableTranslationEntries(language).map((entry) => getTranslationSectionId(entry.path)),
      ...Object.keys(overrides)
        .filter((path) => isEditableTranslationPath(path))
        .map(getTranslationSectionId),
      ...SECTION_MEDIA_FIELDS.map((field) => field.sectionId),
    ]),
  );

  const orderedSectionIds = [
    ...TRANSLATION_PAGE_DEFINITIONS.flatMap((page) =>
      page.sectionIds.filter((sectionId) => sectionIds.includes(sectionId)),
    ),
    ...sectionIds
      .filter(
        (sectionId) =>
          !TRANSLATION_PAGE_DEFINITIONS.some((page) => page.sectionIds.includes(sectionId)),
      )
      .sort(),
  ];

  return orderedSectionIds.map(getTranslationSectionMeta);
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
  const pageIds = Array.from(
    new Set([
      ...getEditableTranslationEntries(language).map((entry) => getTranslationPageId(entry.path)),
      ...Object.keys(overrides)
        .filter((path) => isEditableTranslationPath(path))
        .map((path) => getTranslationPageId(path)),
      ...SECTION_MEDIA_FIELDS.map((field) => field.pageId),
    ]),
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
      ...getEditableTranslationEntries(language).map((entry) => getTranslationSectionId(entry.path)),
      ...Object.keys(overrides)
        .filter((path) => isEditableTranslationPath(path))
        .map(getTranslationSectionId),
      ...SECTION_MEDIA_FIELDS.filter((field) => field.pageId === pageId).map((field) => field.sectionId),
    ].filter((sectionId) => (TRANSLATION_SECTION_TO_PAGE[sectionId] ?? getTranslationPageId(sectionId)) === pageId),
  );

  const pageMeta = getTranslationPageMeta(pageId);
  const orderedSectionIds = [
    ...pageMeta.sectionIds.filter((sectionId) => availableSectionIds.has(sectionId)),
    ...Array.from(availableSectionIds).filter((sectionId) => !pageMeta.sectionIds.includes(sectionId)).sort(),
  ];

  return orderedSectionIds.map(getTranslationSectionMeta);
}

export function getSectionMediaFieldsForPage(pageId: string) {
  return SECTION_MEDIA_FIELDS.filter((field) => field.pageId === pageId);
}

export function getSectionMediaFieldsForSection(pageId: string, sectionId: string) {
  return SECTION_MEDIA_FIELDS.filter(
    (field) => field.pageId === pageId && field.sectionId === sectionId,
  );
}

export function resolveSectionMediaUrl(
  sectionMedia: CmsSectionMediaMap,
  fieldId: string,
  fallbackUrl: string,
) {
  const overrideUrl = sectionMedia[fieldId];

  return typeof overrideUrl === 'string' && overrideUrl.trim() ? overrideUrl : fallbackUrl;
}

export function getTranslationFieldMeta(path: string): TranslationFieldMeta {
  const segments = path.split('.').filter(Boolean);
  const sectionId = getTranslationSectionId(path);
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
