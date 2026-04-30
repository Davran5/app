import { useEffect, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Box,
  CircleGauge,
  Cog,
  Printer,
  Weight,
  type LucideIcon,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useCms } from '../contexts/CmsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation, type Language } from '../data/translations';
import type { Category, Product } from '../data/products';
import { resolveMediaInputUrl } from '../lib/media';

type Translation = ReturnType<typeof getTranslation>;
type BrochureLabels = {
  back: string;
  saveAsPdf: string;
  brochure: string;
  productBrochure: string;
  productNotFound: string;
  backToCatalog: string;
  brandTagline: string;
  brandManufacturing: string;
  workLabel: string;
  footerSummary: string;
  models: string;
  categories: string;
  since: string;
  catalogBand: string;
  continued: string;
};

const brochureLabels: Record<Language, BrochureLabels> = {
  en: {
    back: 'Back',
    saveAsPdf: 'Save as PDF',
    brochure: 'Brochure',
    productBrochure: 'Product brochure',
    productNotFound: 'Product not found',
    backToCatalog: 'Back to catalog',
    brandTagline: 'Industrial Vehicles and Heavy Equipment',
    brandManufacturing: 'Full-cycle industrial manufacturing',
    workLabel: 'Built for real work',
    footerSummary: 'Industrial vehicles, heavy equipment, and custom engineering solutions.',
    models: 'Models',
    categories: 'Categories',
    since: 'Since',
    catalogBand: 'KRANTAS Catalog',
    continued: 'continued',
  },
  ru: {
    back: 'Назад',
    saveAsPdf: 'Сохранить как PDF',
    brochure: 'Брошюра',
    productBrochure: 'Брошюра продукта',
    productNotFound: 'Продукт не найден',
    backToCatalog: 'Назад в каталог',
    brandTagline: 'Промышленные автомобили и тяжелая техника',
    brandManufacturing: 'Промышленное производство полного цикла',
    workLabel: 'Создано для реальной работы',
    footerSummary: 'Промышленные автомобили, тяжелая техника и инженерные решения под заказ.',
    models: 'Модели',
    categories: 'Категории',
    since: 'С',
    catalogBand: 'Каталог KRANTAS',
    continued: 'продолжение',
  },
  uz: {
    back: 'Orqaga',
    saveAsPdf: 'PDF sifatida saqlash',
    brochure: 'Broshyura',
    productBrochure: 'Mahsulot broshyurasi',
    productNotFound: 'Mahsulot topilmadi',
    backToCatalog: 'Katalogga qaytish',
    brandTagline: 'Sanoat transporti va ogir texnika',
    brandManufacturing: 'To‘liq siklli sanoat ishlab chiqarish',
    workLabel: 'Haqiqiy ish sharoitlari uchun',
    footerSummary: 'Sanoat transporti, ogir texnika va maxsus muhandislik yechimlari.',
    models: 'Modellar',
    categories: 'Kategoriyalar',
    since: 'Yildan beri',
    catalogBand: 'KRANTAS katalogi',
    continued: 'davomi',
  },
  de: {
    back: 'Zurück',
    saveAsPdf: 'Als PDF speichern',
    brochure: 'Broschüre',
    productBrochure: 'Produktbroschüre',
    productNotFound: 'Produkt nicht gefunden',
    backToCatalog: 'Zurück zum Katalog',
    brandTagline: 'Industriefahrzeuge und schwere Ausrüstung',
    brandManufacturing: 'Industrielle Fertigung aus einer Hand',
    workLabel: 'Für echte Arbeit gebaut',
    footerSummary: 'Industriefahrzeuge, schwere Ausrüstung und kundenspezifische Engineering-Lösungen.',
    models: 'Modelle',
    categories: 'Kategorien',
    since: 'Seit',
    catalogBand: 'KRANTAS Katalog',
    continued: 'Fortsetzung',
  },
};

const excludedCatalogCategoryIds = new Set(['custom-solutions', 'metal-structures']);
const categoryCoverImages: Record<string, string> = {
  'lifting-equipment': '/cover_le.jpg',
  'dump-trucks': '/cover_dt.jpg',
  'special-purpose': '/cover_spm.jpg',
  agricultural: '/cover_am.jpg',
  'tank-trucks': '/cover_tt.jpg',
  'overhead-gantry': '/cover_og.jpg',
  'mining-trucks': '/cover_mt.jpeg',
};
const pageShellClass =
  'brochure-page relative mx-auto my-8 box-border h-[297mm] w-[210mm] max-w-full overflow-hidden bg-white p-[8mm] shadow-2xl';

function getBrochureLabels(language: Language) {
  return brochureLabels[language] || brochureLabels.en;
}

function getLocalizedProduct(product: Product, t: Translation) {
  const localized = t.productsData?.[product.id as keyof typeof t.productsData];

  return {
    name: localized?.name || product.name,
    description:
      localized?.fullDescription ||
      localized?.description ||
      product.fullDescription ||
      product.description,
    shortDescription: localized?.description || product.description,
    features: localized?.features || product.features,
    specs: localized?.specs || product.specs,
  };
}

function getCategoryName(category: Category | undefined, categoryId: string, t: Translation) {
  return (
    t.categories?.[categoryId as keyof typeof t.categories]?.name ||
    category?.name ||
    categoryId
  );
}

function getCategoryDescription(
  category: Category | undefined,
  categoryId: string,
  t: Translation,
) {
  return (
    t.categories?.[categoryId as keyof typeof t.categories]?.description ||
    category?.description ||
    ''
  );
}

function getSpecLabel(key: string, t: Translation) {
  return (
    t.specLabels?.[key as keyof typeof t.specLabels] ||
    key
      .replace(/([A-Z])/g, ' $1')
      .split(' ')
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  );
}

function getSpecRows(product: Product, t: Translation) {
  const localized = getLocalizedProduct(product, t);

  return Object.entries(localized.specs).filter(
    (entry): entry is [string, string] => typeof entry[1] === 'string' && entry[1].trim().length > 0,
  );
}

function chunkProducts(products: Product[], size: number) {
  const chunks: Product[][] = [];

  for (let index = 0; index < products.length; index += size) {
    chunks.push(products.slice(index, index + size));
  }

  return chunks;
}

function getTopSpecs(product: Product, t: Translation, count = 4) {
  const preferredKeys = [
    'model',
    'loadCapacity',
    'liftingCapacity',
    'tankVolume',
    'platformHeight',
    'craneType',
    'wheelFormula',
    'drive',
  ];
  const specs = getSpecRows(product, t);
  const byKey = new Map(specs);
  const preferredRows = preferredKeys.flatMap((key) => {
    const value = byKey.get(key);
    return value ? ([[key, value]] as [string, string][]) : [];
  });
  const remainingRows = specs.filter(([key]) => !preferredKeys.includes(key));

  return [...preferredRows, ...remainingRows].slice(0, count);
}

function getModel(product: Product, t: Translation) {
  const localized = getLocalizedProduct(product, t);
  const localizedSpecs = localized.specs as Record<string, string | undefined>;

  return localizedSpecs.model || product.specs.model || product.id;
}

function getCategoryHeroImage(product: Product, category: Category | undefined) {
  return categoryCoverImages[product.categoryId] || category?.image || product.image;
}

function getTitleParts(name: string) {
  const match = name.match(/^(.+?)\s+(\d+(?:[.,]\d+)?\s*(?:t|tons?|tonna|m3|m³|m|mm))$/i);

  if (!match) {
    return { main: name, accent: '' };
  }

  return { main: match[1], accent: match[2] };
}

function getSpecIcon(key: string): LucideIcon {
  const normalizedKey = key.toLowerCase();

  if (normalizedKey.includes('capacity') || normalizedKey.includes('load')) {
    return Weight;
  }

  if (normalizedKey.includes('volume') || normalizedKey.includes('tank')) {
    return Box;
  }

  if (normalizedKey.includes('wheel') || normalizedKey.includes('drive')) {
    return CircleGauge;
  }

  return Cog;
}

function PrintToolbar({
  backTo,
  label,
}: {
  backTo: string;
  label: string;
}) {
  const { language } = useLanguage();
  const labels = getBrochureLabels(language);

  return (
    <div className="print:hidden sticky top-0 z-20 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 px-5 py-4">
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#244d85] transition hover:text-[#1E4ECC]"
        >
          <ArrowLeft size={16} />
          {labels.back}
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-neutral-500">{label}</span>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-[#244d85] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1E4ECC]"
          >
            <Printer size={16} />
            {labels.saveAsPdf}
          </button>
        </div>
      </div>
    </div>
  );
}

function BrochurePrintStyles() {
  return (
    <style>{`
      @page {
        size: 210mm 297mm;
        margin: 0mm;
      }

        .brochure-page {
          box-sizing: border-box;
          isolation: isolate;
          background: #ffffff;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

      @media print {
        html,
        body,
        #root {
          width: 210mm !important;
          min-width: 210mm !important;
          margin: 0 !important;
          padding: 0 !important;
          background: #ffffff !important;
        }

        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        main {
          width: 210mm !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        .brochure-page {
          width: 210mm !important;
          height: 297mm !important;
          min-height: 0 !important;
          max-height: 297mm !important;
          margin: 0 !important;
          padding: 8mm !important;
          overflow: hidden !important;
          box-shadow: none !important;
          page-break-after: always;
          break-after: page;
        }

        .brochure-page > footer {
          left: 8mm !important;
          right: 8mm !important;
          bottom: 8mm !important;
        }

        .brochure-page:last-child {
          page-break-after: auto;
          break-after: auto;
        }

        .avoid-break {
          break-inside: avoid;
          page-break-inside: avoid;
        }
      }
    `}</style>
  );
}

function BrandBand({ label = 'KRANTAS Group' }: { label?: string }) {
  const { language } = useLanguage();
  const labels = getBrochureLabels(language);

  return (
    <div className="relative h-[22mm] overflow-hidden bg-[#0B0C0E] px-7 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-[#102033] via-[#101820] to-[#b88608]" />
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#d7a10c]" />
      <div
        className="absolute bottom-1.5 right-48 h-11 w-64 border-t-2 border-[#e4b437]"
        style={{ transform: 'skewX(-32deg)', transformOrigin: 'right bottom' }}
      />
      <div className="relative flex h-full items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center bg-white p-2">
            <img src="/logo.png" alt="KRANTAS" className="max-h-full max-w-full object-contain" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#e4b437]">
              {label}
            </p>
            <p className="mt-1 text-base font-semibold tracking-wide text-white">
              {labels.brandTagline}
            </p>
          </div>
        </div>
        <div className="relative text-right text-[11px] font-bold uppercase tracking-[0.22em] text-white/78">
          krantasgroup.com
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  category,
  t,
}: {
  product: Product;
  category: Category | undefined;
  t: Translation;
}) {
  const localized = getLocalizedProduct(product, t);
  const categoryName = getCategoryName(category, product.categoryId, t);
  const model = getModel(product, t);
  const specs = getTopSpecs(product, t, 3);

  return (
    <article className="avoid-break grid grid-cols-[98px_minmax(0,1fr)] gap-4 border-t border-black/10 py-3">
      <div className="relative flex h-24 items-center justify-center overflow-hidden bg-[#f3f5f8] p-3">
        <div className="absolute left-0 top-0 h-full w-1.5 bg-[#f6b947]" />
        <img
          src={resolveMediaInputUrl(product.image)}
          alt={localized.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-[#244d85]/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#244d85]">
            {categoryName}
          </span>
          <span className="bg-[#0B0C0E] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white">
            {model}
          </span>
        </div>
        <h3 className="mt-2 text-base font-semibold leading-tight text-[#0B0C0E]">
          {localized.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-600">
          {localized.shortDescription}
        </p>
        <div className="mt-2 grid grid-cols-3 gap-x-3 gap-y-1 text-[9px]">
          {specs.map(([key, value]) => (
            <div key={key} className="border-b border-black/[0.06] py-1">
              <span className="block truncate text-neutral-400">{getSpecLabel(key, t)}</span>
              <span className="block truncate font-semibold text-[#0B0C0E]">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function ProductSheet({
  product,
  category,
  t,
  labels,
}: {
  product: Product;
  category: Category | undefined;
  t: Translation;
  labels: BrochureLabels;
}) {
  const localized = getLocalizedProduct(product, t);
  const categoryName = getCategoryName(category, product.categoryId, t);
  const categoryDescription = getCategoryDescription(category, product.categoryId, t);
  const model = getModel(product, t);
  const specs = getSpecRows(product, t);
  const topSpecs = getTopSpecs(product, t, 4);
  const heroImage = getCategoryHeroImage(product, category);
  const titleParts = getTitleParts(localized.name);
  const tableSpecs = specs.slice(0, 7);

  return (
    <article
      className={`${pageShellClass} bg-[#f7f6f1]`}
      style={{
        backgroundImage:
          'radial-gradient(circle at 82% 16%, rgba(216, 163, 20, 0.12), transparent 28%), linear-gradient(135deg, rgba(255,255,255,0.96), rgba(239,241,242,0.72))',
      }}
    >
      <BrandBand />

      <section className="relative h-[128mm] overflow-hidden bg-[#f4f1e7]">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.14] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/94 via-white/88 to-white/96" />
        <div className="absolute bottom-0 right-0 h-4 w-[58%] bg-[#d6a10f]" />
        <div
          className="absolute bottom-4 left-[42%] h-20 w-[42%] border-b-[6px] border-l-[6px] border-[#d6a10f]"
          style={{ transform: 'skewX(18deg)' }}
        />
        <div
          className="absolute -left-9 bottom-0 h-28 w-16 bg-[#d6a10f]"
          style={{ transform: 'skewX(-34deg)' }}
        />

        <div className="relative grid h-full grid-cols-[0.48fr_0.52fr] gap-7 px-8 pb-8 pt-8">
          <div className="relative flex items-end justify-center overflow-hidden">
            <img
              src={resolveMediaInputUrl(product.image)}
              alt={localized.name}
              className="relative z-10 -ml-10 h-[92mm] w-[128mm] translate-y-2 scale-[1.42] object-contain object-center mix-blend-multiply drop-shadow-2xl"
            />
          </div>

          <div className="relative z-10 flex flex-col justify-start pb-[82px] pt-2">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-sm bg-[#d6a10f] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#111317] shadow-sm">
                  {categoryName}
                </span>
                <span className="rounded-sm border border-black/18 bg-white/82 px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#111317]">
                  {model}
                </span>
              </div>
              <h1 className="mt-6 text-[48px] font-black leading-[0.98] text-[#111317]">
                {titleParts.main}
                {titleParts.accent && (
                  <span className="whitespace-nowrap text-[#c59105]"> {titleParts.accent}</span>
                )}
              </h1>
              <p className="mt-4 line-clamp-4 max-w-[440px] text-[16px] leading-relaxed text-[#111317]">
                {localized.description}
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 overflow-hidden rounded-md border border-white/70 shadow-xl">
              {topSpecs.map(([key, value], index) => {
                const SpecIcon = getSpecIcon(key);
                const isDark = index === 3;

                return (
                  <div
                    key={key}
                    className={`min-h-[68px] border-white/80 p-4 ${
                      index % 2 === 0 ? 'border-r' : ''
                    } ${index < 2 ? 'border-b' : ''} ${
                      isDark
                        ? 'bg-[#2c3031] text-white'
                        : 'bg-gradient-to-br from-[#a47705] to-[#d6a10f] text-[#111317]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <SpecIcon
                        size={26}
                        strokeWidth={2.4}
                        className={isDark ? 'text-[#d6a10f]' : 'text-[#111317]'}
                      />
                      <div>
                        <p
                          className={`text-[9px] font-black uppercase leading-tight tracking-[0.03em] ${
                            isDark ? 'text-white/75' : 'text-[#111317]/70'
                          }`}
                        >
                          {getSpecLabel(key, t)}
                        </p>
                        <p className="mt-1 text-[21px] font-black leading-none">{value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-8 pb-[28mm] pt-6">
        <div className="grid grid-cols-[0.42fr_0.58fr] gap-8">
          <div className="avoid-break">
            <div className="border-l-[5px] border-[#d6a10f] pl-5">
              <p className="max-w-[300px] text-[22px] font-black uppercase leading-tight text-[#111317]">
                {labels.workLabel}
              </p>
              <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-[#111317]">
                {categoryDescription || localized.shortDescription}
              </p>
            </div>

            <h2 className="mt-5 text-[23px] font-black uppercase tracking-normal text-[#111317]">
              {t.products.features}
            </h2>
            <div
              className="mt-3 bg-[#dfe3e6] px-8 py-4"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 32px) 100%, 0 100%)',
              }}
            >
              <ul className="space-y-2.5">
                {localized.features.slice(0, 5).map((feature) => (
                  <li key={feature} className="flex gap-4 text-[14px] leading-relaxed text-[#111317]">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#d6a10f] shadow-sm" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="avoid-break">
            <h2 className="text-[23px] font-black uppercase tracking-normal text-[#111317]">
              {t.products.specs}
              <span className="text-[#b48305]">, {model}</span>
            </h2>
            <div className="mt-4 space-y-1">
              {tableSpecs.map(([key, value], index) => (
                <div
                  key={key}
                  className={`grid grid-cols-[0.95fr_1.05fr] items-center rounded px-5 py-2 text-[15px] ${
                    index % 2 === 0 ? 'bg-[#dde1e4]' : 'bg-white/60'
                  }`}
                >
                  <span className="text-[#111317]">{getSpecLabel(key, t)}</span>
                  <span className="font-black text-[#111317]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="absolute bottom-0 left-0 right-0 grid grid-cols-[1fr_auto] items-center border-t border-black/[0.12] bg-white/90 px-8 py-5 text-[#111317]">
        <div>
          <p className="text-[13px] font-black uppercase tracking-normal text-[#111317]">
            KRANTAS Group
          </p>
          <p className="mt-1 text-xs text-[#111317]">
            {labels.footerSummary}
          </p>
        </div>
        <div className="text-right text-xs font-medium text-[#111317]">
          <p>krantasgroup.com</p>
          <p>info@krantas.uz</p>
        </div>
      </footer>
    </article>
  );
}

function ProductBrochurePage() {
  const { language, t } = useLanguage();
  const labels = getBrochureLabels(language);
  const { productId } = useParams<{ productId: string }>();
  const { getProductById, categories } = useCms();
  const product = getProductById(productId || '');
  const category = product
    ? categories.find((categoryItem) => categoryItem.id === product.categoryId)
    : undefined;

  if (!product) {
    return (
      <div className="min-h-screen bg-[#eceff3] px-5 py-10">
        <PrintToolbar backTo="/catalog" label={labels.productBrochure} />
        <div className="mx-auto mt-10 max-w-xl bg-white p-8 text-center shadow-xl">
          <h1 className="text-2xl font-semibold text-[#0B0C0E]">{labels.productNotFound}</h1>
          <Link className="mt-5 inline-flex text-[#244d85]" to="/catalog">
            {labels.backToCatalog}
          </Link>
        </div>
      </div>
    );
  }

  const localized = getLocalizedProduct(product, t);

  return (
    <div className="min-h-screen bg-[#eceff3]">
      <Helmet>
        <title>{localized.name} {labels.brochure} | KRANTAS Group</title>
      </Helmet>
      <BrochurePrintStyles />
      <PrintToolbar backTo={`/product/${product.id}`} label={`${localized.name} ${labels.brochure}`} />
      <ProductSheet product={product} category={category} t={t} labels={labels} />
    </div>
  );
}

function FullCatalogPage() {
  const { language, t } = useLanguage();
  const labels = getBrochureLabels(language);
  const { categories, products } = useCms();
  const visibleCategories = categories.filter(
    (category) => !excludedCatalogCategoryIds.has(category.id),
  );
  const visibleProducts = products.filter(
    (product) => !excludedCatalogCategoryIds.has(product.categoryId),
  );
  const productsByCategory = useMemo(
    () =>
      visibleCategories.map((category) => ({
        category,
        products: visibleProducts.filter((product) => product.categoryId === category.id),
      })),
    [visibleCategories, visibleProducts],
  );

  return (
    <div className="min-h-screen bg-[#eceff3]">
      <Helmet>
        <title>{t.catalog.title} | KRANTAS Group</title>
      </Helmet>
      <BrochurePrintStyles />
      <PrintToolbar backTo="/catalog" label={t.catalog.title} />

      <section className={pageShellClass}>
        <div className="relative flex h-full flex-col overflow-hidden bg-[#0B0C0E] text-white">
          <img
            src="/hero_cover.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-28"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B0C0E] via-[#0B0C0E]/92 to-[#244d85]/70" />
          <div className="absolute right-0 top-0 h-full w-20 bg-[#244d85]/80" />
          <div className="absolute right-20 top-0 h-full w-3 bg-[#f6b947]" />

          <div className="relative flex flex-1 flex-col justify-between p-9">
            <div>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center bg-white p-2">
                  <img src="/logo.png" alt="KRANTAS" className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f6b947]">
                    KRANTAS Group
                  </p>
                  <p className="mt-1 text-sm text-white/75">{labels.brandManufacturing}</p>
                </div>
              </div>

              <h1 className="mt-14 max-w-[600px] text-5xl font-semibold leading-[0.96] text-white">
                {t.catalog.title}
              </h1>
              <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-white/80">
                {t.catalog.heroIntro || t.catalog.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-3.5 text-[#0B0C0E]">
                <p className="text-3xl font-semibold">{visibleProducts.length}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500">
                  {labels.models}
                </p>
              </div>
              <div className="bg-[#244d85] p-3.5 ring-1 ring-white/15">
                <p className="text-3xl font-semibold text-white">{visibleCategories.length}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
                  {labels.categories}
                </p>
              </div>
              <div className="bg-[#f6b947] p-3.5 text-[#0B0C0E]">
                <p className="text-3xl font-semibold">1945</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0B0C0E]/65">
                  {labels.since}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {productsByCategory.flatMap(({ category, products: categoryProducts }) =>
        chunkProducts(categoryProducts, 4).map((productChunk, pageIndex) => (
          <section key={`${category.id}-${pageIndex}`} className={pageShellClass}>
            <BrandBand label={labels.catalogBand} />
            <header className="relative overflow-hidden border-b border-black/10 bg-[#f4f6f9] px-7 py-5">
              <div className="absolute right-0 top-0 h-full w-20 bg-[#244d85]" />
              <div className="absolute right-20 top-0 h-full w-3 bg-[#f6b947]" />
              <div className="relative pr-24">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#244d85]">
                  {categoryProducts.length} {labels.models}
                </p>
                <h2 className="mt-2 text-3xl font-semibold leading-tight text-[#0B0C0E]">
                  {getCategoryName(category, category.id, t)}
                  {pageIndex > 0 ? ` / ${labels.continued}` : ''}
                </h2>
                <p className="mt-2 max-w-[540px] text-xs leading-relaxed text-neutral-600">
                  {getCategoryDescription(category, category.id, t)}
                </p>
              </div>
            </header>

            <div className="px-7 py-2">
              {productChunk.map((product) => (
                <ProductCard key={product.id} product={product} category={category} t={t} />
              ))}
            </div>

            <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-[#0B0C0E] px-7 py-2.5 text-xs text-white/65">
              <span>krantasgroup.com</span>
              <span>{getCategoryName(category, category.id, t)}</span>
            </footer>
          </section>
        )),
      )}
    </div>
  );
}

export default function ProductBrochure() {
  const [searchParams] = useSearchParams();
  const { productId } = useParams<{ productId?: string }>();

  useEffect(() => {
    if (searchParams.get('print') !== '1') {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      window.print();
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, [searchParams]);

  return productId ? <ProductBrochurePage /> : <FullCatalogPage />;
}
