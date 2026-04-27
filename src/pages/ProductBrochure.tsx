import { useEffect, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';
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
const pageShellClass =
  'brochure-page relative mx-auto my-8 h-[258mm] w-[184mm] max-w-full overflow-hidden bg-white shadow-2xl';

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
        size: A4;
        margin: 10mm;
      }

      .brochure-page {
        box-sizing: border-box;
        isolation: isolate;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      @media print {
        html,
        body,
        #root {
          background: #ffffff !important;
        }

        body {
          margin: 0 !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .brochure-page {
          width: 184mm !important;
          height: 258mm !important;
          min-height: 0 !important;
          max-height: 258mm !important;
          margin: 0 !important;
          overflow: hidden !important;
          box-shadow: none !important;
          page-break-after: always;
          break-after: page;
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
    <div className="relative bg-[#0B0C0E] px-7 py-4 text-white">
      <div className="absolute inset-y-0 right-0 w-24 bg-[#244d85]" />
      <div className="absolute right-24 top-0 h-full w-3 bg-[#f6b947]" />
      <div className="relative flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center bg-white p-2">
            <img src="/logo.png" alt="KRANTAS" className="max-h-full max-w-full object-contain" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#f6b947]">
              {label}
            </p>
            <p className="mt-1 text-sm font-semibold tracking-wide text-white">
              {labels.brandTagline}
            </p>
          </div>
        </div>
        <div className="relative text-right text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
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

  return (
    <article className={pageShellClass}>
      <BrandBand />

      <section className="relative overflow-hidden bg-[#111827] px-7 pb-6 pt-6 text-white">
        <div className="absolute inset-x-0 bottom-0 h-2 bg-[#f6b947]" />
        <div className="absolute right-0 top-0 h-full w-5 bg-[#244d85]" />
        <div className="relative grid grid-cols-[0.92fr_1.08fr] gap-6">
          <div className="flex min-h-[205px] items-center justify-center bg-white p-4 shadow-xl">
            <img
              src={resolveMediaInputUrl(product.image)}
              alt={localized.name}
              className="max-h-[195px] max-w-full object-contain"
            />
          </div>

          <div className="flex flex-col justify-between py-1">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#f6b947] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0B0C0E]">
                  {categoryName}
                </span>
                <span className="border border-white/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                  {model}
                </span>
              </div>
              <h1 className="mt-4 text-3xl font-semibold leading-[1.02] text-white">
                {localized.name}
              </h1>
              <p className="mt-3 line-clamp-5 text-sm leading-relaxed text-white/80">
                {localized.description}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {topSpecs.map(([key, value]) => (
                <div key={key} className="border border-white/15 bg-white/10 p-2.5">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#f6b947]">
                    {getSpecLabel(key, t)}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-7 pb-20 pt-6">
        <div className="grid grid-cols-[0.82fr_1.18fr] gap-6">
          <div className="avoid-break">
            <div className="border-l-4 border-[#f6b947] bg-[#f5f7fa] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#244d85]">
                {labels.workLabel}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-neutral-700">
                {categoryDescription || localized.shortDescription}
              </p>
            </div>

            <h2 className="mt-5 border-b border-black/10 pb-2.5 text-xs font-bold uppercase tracking-[0.18em] text-[#0B0C0E]">
              {t.products.features}
            </h2>
            <ul className="mt-3 space-y-2">
              {localized.features.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-xs leading-relaxed text-neutral-700">
                  <span className="mt-1.5 h-2 w-2 shrink-0 bg-[#244d85]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="avoid-break">
            <div className="flex items-end justify-between border-b border-black/10 pb-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B0C0E]">
                {t.products.specs}
              </h2>
              <span className="text-xs font-semibold text-neutral-400">{model}</span>
            </div>
            <div className="mt-2 divide-y divide-black/10">
              {specs.map(([key, value]) => (
                <div key={key} className="grid grid-cols-[0.9fr_1.1fr] gap-4 py-2 text-xs">
                  <span className="text-neutral-400">{getSpecLabel(key, t)}</span>
                  <span className="font-semibold text-[#0B0C0E]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="absolute bottom-0 left-0 right-0 grid grid-cols-[1fr_auto] items-center bg-[#0B0C0E] px-7 py-3 text-white">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f6b947]">
            KRANTAS Group
          </p>
          <p className="mt-1 text-xs text-white/75">
            {labels.footerSummary}
          </p>
        </div>
        <div className="border-l border-white/15 pl-5 text-right text-xs text-white/70">
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
