import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Compass,
  Factory,
  Wrench,
} from 'lucide-react';
import { useAnalytics } from '../contexts/AnalyticsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCms } from '../contexts/CmsContext';
import ContactForm from '../components/ContactForm';
import { buildProductAnalyticsItem } from '../lib/analytics';
import { resolveMediaInputUrl, resolveResponsiveMediaInput } from '../lib/media';
import {
  compactMeasurementSpacing,
  getProductSpecRows,
} from '../lib/product-content';

const hiddenHomepageCategoryIds = new Set([
  'cargo-vehicles',
  'firefighting-rescue',
  'municipal-road',
  'trailers-semitrailers',
]);

// Internal CountUp component
function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * end);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={elementRef}>{count.toLocaleString()}</span>;
}

export default function Home() {
  const { t } = useLanguage();
  const { trackEvent } = useAnalytics();
  const { products, categories, featuredProductIds, getSectionMedia } = useCms();
  const [showForm, setShowForm] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIntroVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const introItems = [
    {
      title: t.intro.fleetRecovery,
      desc: t.intro.fleetRecoveryDesc,
      icon: Wrench,
    },
    {
      title: t.intro.fabrication,
      desc: t.intro.fabricationDesc,
      icon: Factory,
    },
    {
      title: t.intro.advisory,
      desc: t.intro.advisoryDesc,
      icon: Compass,
    },
  ];

  const featuredProducts = useMemo(
    () =>
      featuredProductIds
        .map((productId) => products.find((product) => product.id === productId))
        .filter((product): product is NonNullable<typeof product> => Boolean(product)),
    [featuredProductIds, products],
  );

  return (
      <div className="w-full flex-1 flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[42svh] md:h-[100svh] w-full z-0">
        <section className="sticky top-0 left-0 h-[42svh] md:h-[100svh] w-full flex items-end overflow-hidden bg-black">
          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={resolveMediaInputUrl(getSectionMedia('home.hero.videoPoster', '/hero-poster.webp'))}
              disablePictureInPicture
              disableRemotePlayback
              draggable={false}
              onContextMenu={(event) => event.preventDefault()}
              className="h-full w-full object-cover opacity-100"
            >
              <source src="/herovid-desktop.mp4" type="video/mp4" />
            </video>
            {/* Overlay for mobile readability */}
            <div className="absolute inset-0 bg-black/25 md:hidden" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 to-transparent" />
          </div>

          {/* Hero Content - pt-20 to ensure visibility below fixed header */}
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-20 pb-8 md:pb-14">
            <div className="max-w-4xl">
              <span className="font-mono text-sm md:text-base uppercase tracking-[0.2em] text-[#fdc15e] mb-3 block opacity-80">
                {t.home.since}
              </span>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 uppercase tracking-tight leading-[0.95]">
                {t.home.title}
              </h1>
              <p className="font-display text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed font-light hidden sm:block">
                {t.home.subtitle}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Subsequent sections start here - Starts at relative pos to cover sticky video */}
      <div className="relative z-10 bg-white w-full flex-1 flex flex-col shadow-[0_-15px_30px_rgba(0,0,0,0.15)]">


        {/* About Us Section */}
        <div className="py-10 lg:py-14">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="lg:hidden border-l-4 border-[#244d85] pl-6 mb-8">
              <h2 className="font-display text-3xl font-semibold text-[#0B0C0E]">
                {t.aboutHome.heading}
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <img
                  {...resolveResponsiveMediaInput(
                    getSectionMedia('home.aboutHome.factoryImage', '/about_factory.jpg'),
                    '(min-width: 1440px) 672px, (min-width: 1024px) calc((100vw - 160px) / 2), calc(100vw - 48px)',
                  )}
                  alt="Krantas Factory"
                  width={1344}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div>
                <div className="hidden lg:block border-l-4 border-[#244d85] pl-6 mb-8">
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0B0C0E]">
                    {t.aboutHome.heading}
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t.aboutHome.description}
                </p>
                <div className="space-y-3 mb-8">
                  {t.aboutHome.points.map((item: string) => (
                    <div key={item} className="flex items-center gap-3">
                      <Check size={18} className="text-[#244d85]" />
                      <span className="text-base text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-[#244d85] hover:text-[#1E4ECC] transition-colors font-medium"
                >
                  {t.aboutHome.learnMore}
                  <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Intro Section */}
        <section className="bg-gray-50 py-10 lg:py-14 border-b border-gray-100">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div
              className={`transition-all duration-700 ${
                introVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {introItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className={`transform transition-all duration-1000 ${
                        introVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                      }`}
                      style={{ transitionDelay: `${100 + index * 120}ms` }}
                    >
                      <div className="h-full border border-gray-200 bg-white px-5 py-5 shadow-sm transition-all duration-300 hover:border-[#244d85]/25 hover:shadow-md md:px-6 md:py-6">
                        <div className="flex items-start gap-4 md:items-center">
                          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center self-start bg-[#244d85]/10 text-[#244d85] md:self-center">
                            <Icon size={19} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-display text-xl md:text-2xl font-semibold text-[#0B0C0E] leading-tight">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-gray-600 md:text-[15px]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <div className="py-6 lg:py-10 bg-white border-b border-gray-100">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 lg:gap-16">
              {[
                { value: 60, suffix: '+', label: t.stats.equipment },
                { value: 10000, suffix: '+', label: t.stats.projects },
    { value: 1000, suffix: '+', label: t.stats.employees },
                { value: 81, suffix: '', label: t.stats.experience },
              ].map((stat, idx) => (
                <div key={idx} className="text-center lg:text-left">
                  <span className="font-display text-3xl md:text-5xl lg:text-7xl font-medium text-[#244d85] block mb-1 md:mb-2">
                    <CountUp end={stat.value} duration={2500} />
                    {stat.suffix}
                  </span>
                  <span className="text-sm md:text-xl lg:text-2xl text-[#0B0C0E] font-medium block leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What We Build Section */}
        <section className="py-10 lg:py-14">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="font-mono text-sm uppercase tracking-[0.14em] text-[#244d85] mb-3 block">
                  {t.equipment.title}
                </span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0B0C0E]">
                  {t.equipment.heading}
                </h2>
              </div>
              <Link
                to="/catalog"
                className="hidden md:inline-flex items-center gap-2 text-[#244d85] hover:text-[#1E4ECC] transition-colors font-medium"
              >
                {t.equipment.viewAll}
                <ChevronRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Customized Solutions - Featured Large Card */}
              <Link
                to="/custom-solutions"
                className="group sm:col-span-2 lg:col-span-2 lg:row-span-2 flex flex-col md:block md:relative bg-white overflow-hidden transition-all shadow-sm hover:shadow-xl"
              >
                <div className="relative h-48 w-full md:absolute md:inset-0 md:h-full overflow-hidden">
                  <img
                    {...resolveResponsiveMediaInput(
                      getSectionMedia(
                        'home.equipment.customSolutionsImage',
                        '/cust_sol.jpg',
                      ),
                      '(min-width: 1440px) 672px, (min-width: 1024px) 50vw, calc(100vw - 48px)',
                    )}
                    alt="Customized Solutions"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 font-display text-lg font-bold text-white md:hidden">
                    {t.equipment.customSolutions}
                  </h3>
                </div>
                <div className="p-4 flex flex-col flex-grow md:p-6 md:absolute md:inset-0 md:justify-end md:h-full md:min-h-[320px] transition-all">
                  <h3 className="hidden md:block font-display text-2xl lg:text-3xl font-medium text-white mb-2">
                    {t.equipment.customSolutions}
                  </h3>
                  <p className="text-sm text-gray-600 md:text-gray-300 md:mb-4 line-clamp-2 md:line-clamp-none">
                    {t.equipment.customDesc}
                  </p>
                  <span className="hidden md:inline-flex items-center gap-2 text-[#fdc15e] font-medium transition-all group-hover:gap-3">
                    {t.home.build.explore}
                    <ChevronRight size={20} />
                  </span>
                </div>
              </Link>

              {/* Other Categories */}
              {categories.filter(
                (category) =>
                  category.id !== 'custom-solutions' &&
                  category.id !== 'metal-structures' &&
                  !hiddenHomepageCategoryIds.has(category.id),
              ).map((category) => {
                const catName = t.categories?.[category.id as keyof typeof t.categories]?.name || category.name;
                const catDesc = t.categories?.[category.id as keyof typeof t.categories]?.description || category.description;
                const categoryCoverFields: Record<string, string> = {
                  'lifting-equipment': 'home.categories.liftingEquipmentCover',
                  'agricultural': 'home.categories.agriculturalCover',
                  'tank-trucks': 'home.categories.tankTrucksCover',
                  'special-purpose': 'home.categories.specialPurposeCover',
                  'overhead-gantry': 'home.categories.overheadGantryCover',
                  'dump-trucks': 'home.categories.dumpTrucksCover',
                  'mining-trucks': 'home.categories.miningTrucksCover',
                  'drilling-workshops': 'customSolutions.customSolutionsPage.containersImage',
                };
                const defaultCovers: Record<string, string> = {
                  'lifting-equipment': '/cover_le.jpg',
                  'agricultural': '/cover_am.jpg',
                  'tank-trucks': '/cover_tt.jpg',
                  'special-purpose': '/cover_spm.jpg',
                  'overhead-gantry': '/cover_og.jpg',
                  'dump-trucks': '/cover_dt.jpg',
                  'mining-trucks': '/cover_mt.jpeg',
                  'drilling-workshops': '/non_stan.jpeg',
                };
                const fieldId = categoryCoverFields[category.id];
                const catImage = fieldId
                  ? getSectionMedia(fieldId, defaultCovers[category.id] || category.image)
                  : category.image;

                return (
                  <Link
                    key={category.id}
                    to={`/catalog?category=${category.id}`}
                    className="group flex flex-col bg-white overflow-hidden transition-all shadow-sm hover:shadow-xl"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        {...resolveResponsiveMediaInput(
                          catImage,
                          '(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, calc(100vw - 48px)',
                        )}
                        alt={catName}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:hidden" />
                      <h3 className="absolute bottom-3 left-4 font-display text-lg font-bold text-white md:hidden">
                        {catName}
                      </h3>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="hidden md:block font-display text-lg lg:text-xl font-medium text-[#0B0C0E] mb-1">
                        {catName}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 md:line-clamp-none">
                        {catDesc}
                      </p>
                    </div>
                  </Link>
                );
              })}

              {/* Metal Structures Card */}
              <Link
                to="/custom-solutions"
                className="group flex flex-col bg-white overflow-hidden transition-all shadow-sm hover:shadow-xl"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    {...resolveResponsiveMediaInput(
                      getSectionMedia(
                        'home.equipment.metalStructuresImage',
                        '/cover_ms.jpeg',
                      ),
                      '(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, calc(100vw - 48px)',
                    )}
                    alt="Metal Structures"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:hidden" />
                  <h3 className="absolute bottom-3 left-4 font-display text-lg font-bold text-white md:hidden">
                    {t.categories?.['metal-structures']?.name || 'Metal Structures'}
                  </h3>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="hidden md:block font-display text-lg lg:text-xl font-medium text-[#0B0C0E] mb-1">
                    {t.categories?.['metal-structures']?.name || 'Metal Structures'}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 md:line-clamp-none">
                    {t.categories?.['metal-structures']?.description || 'Design and fabrication of industrial metal structures'}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="py-10 lg:py-14 bg-gray-50">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="font-mono text-base uppercase tracking-[0.14em] text-[#244d85] mb-3 block">
                    {t.products.title}
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0B0C0E]">
                    {t.products.heading}
                  </h2>
                </div>
                <Link
                  to="/catalog"
                  className="hidden md:inline-flex items-center gap-2 text-[#244d85] hover:text-[#1E4ECC] transition-colors font-medium"
                >
                  {t.products.viewAll}
                  <ChevronRight size={18} />
                </Link>
              </div>

              <div className="relative overflow-hidden">
                <button
                  id="products-prev"
                  aria-label="Previous"
                  onClick={() => {
                    const el = document.getElementById('products-scroll');
                    if (el) el.scrollBy({ left: -400, behavior: 'smooth' });
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 text-[#244d85] hover:bg-[#244d85] hover:text-white transition-all flex items-center justify-center scale-90 md:scale-100"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  id="products-next"
                  aria-label="Next"
                  onClick={() => {
                    const el = document.getElementById('products-scroll');
                    if (el) el.scrollBy({ left: 400, behavior: 'smooth' });
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 text-[#244d85] hover:bg-[#244d85] hover:text-white transition-all flex items-center justify-center scale-90 md:scale-100"
                >
                  <ChevronRight size={20} />
                </button>

                <div
                  id="products-scroll"
                  className="overflow-x-auto -mx-6 px-6 scrollbar-hide snap-x snap-mandatory select-none"
                  style={{ cursor: 'grab', touchAction: 'pan-x' }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    const el = e.currentTarget;
                    el.style.cursor = 'grabbing';
                    el.style.scrollSnapType = 'none';
                    el.style.scrollBehavior = 'auto';

                    const startX = e.clientX;
                    const startScrollLeft = el.scrollLeft;
                    let hasDragged = false;

                    const onMove = (me: MouseEvent) => {
                      const dx = me.clientX - startX;
                      if (Math.abs(dx) > 4) {
                        hasDragged = true;
                      }
                      el.scrollLeft = startScrollLeft - dx;
                    };

                    const onUp = (upEvent: MouseEvent) => {
                      el.style.cursor = 'grab';

                      const dx = upEvent.clientX - startX;
                      const threshold = 50;

                      if (Math.abs(dx) > threshold) {
                        hasDragged = true;
                        const scrollDir = dx > 0 ? -1 : 1;
                        const cardWidth = el.querySelector('.group')?.clientWidth || 400;
                        el.scrollBy({ left: scrollDir * cardWidth, behavior: 'smooth' });
                      }

                      setTimeout(() => {
                        el.style.scrollSnapType = '';
                        el.style.scrollBehavior = '';
                      }, 400);

                      if (hasDragged) el.setAttribute('data-dragging', '1');
                      window.removeEventListener('mousemove', onMove);
                      window.removeEventListener('mouseup', onUp);
                      setTimeout(() => el.removeAttribute('data-dragging'), 0);
                    };

                    window.addEventListener('mousemove', onMove);
                    window.addEventListener('mouseup', onUp);
                  }}
                >
                  <div className="flex gap-4 min-w-max pb-4">
                    {featuredProducts.map((featuredProduct) => {
                      const localizedProduct =
                        t.productsData?.[featuredProduct.id as keyof typeof t.productsData];
                      const productName = localizedProduct?.name || featuredProduct.name;
                      const specRows = getProductSpecRows(
                        localizedProduct?.specs || featuredProduct.specs,
                      ).slice(0, 2);
                      const otherSpecs = specRows.map((spec) => ({
                        ...spec,
                        label: compactMeasurementSpacing(spec.label),
                        value: compactMeasurementSpacing(spec.value),
                      }));

                        return (
                          <Link
                            key={featuredProduct.id}
                            to={`/product/${featuredProduct.id}`}
                            className="group flex w-[84vw] max-w-[360px] flex-shrink-0 snap-center flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg md:w-[600px] md:max-w-none md:flex-row"
                            onClick={(e) => {
                              const scroll = document.getElementById('products-scroll');
                              if (scroll?.getAttribute('data-dragging')) {
                                e.preventDefault();
                                return;
                              }

                              trackEvent('select_item', {
                                item_list_name: 'homepage_featured_products',
                                ecommerce: {
                                  items: [
                                    buildProductAnalyticsItem({
                                      item_id: featuredProduct.id,
                                      item_name:
                                        productName,
                                      item_category: featuredProduct.category,
                                    }),
                                  ],
                                },
                              });
                            }}
                          >
                          <div className="w-full bg-white px-4 py-3 md:hidden">
                            <p className="line-clamp-2 break-words text-sm font-semibold leading-snug text-[#0B0C0E]">
                              {compactMeasurementSpacing(productName)}
                            </p>
                          </div>

                          <div className="flex min-w-0 flex-1 flex-col md:flex-row">
                          <div className="relative aspect-[16/9] w-full flex-shrink-0 overflow-hidden bg-gray-50 md:aspect-auto md:w-[42%] md:rounded-l-lg">
                            <img
                              src={resolveMediaInputUrl(featuredProduct.image)}
                              alt={
                                productName
                              }
                              loading="lazy"
                              draggable={false}
                              className="w-full h-full object-contain p-3 md:p-6 transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>

                          <div className="flex min-w-0 flex-1 flex-col p-4 md:p-6">
                            <div className="grid grid-cols-2 gap-3">
                              {otherSpecs.map((spec) => (
                                <div
                                  key={spec.key}
                                  className={`min-w-0 border-l-2 border-[#fdc15e] pl-3 ${
                                    spec.value ? '' : 'col-span-2'
                                  }`}
                                >
                                  <span className="line-clamp-2 text-[11px] font-normal leading-snug text-gray-600 md:text-xs">
                                    {spec.label}
                                  </span>
                                  {spec.value && (
                                    <span className="mt-1 block break-words text-sm font-semibold leading-snug text-[#0B0C0E]">
                                      {spec.value}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>

                            <div className="mt-4 flex flex-col border-t border-gray-100 pt-3 md:mt-auto">
                              <p className="hidden break-words text-sm font-semibold leading-snug text-[#0B0C0E] md:block">
                                {compactMeasurementSpacing(productName)}
                              </p>
                              <span className="mt-3 flex items-center gap-1 self-end text-xs font-medium text-[#244d85] transition-all group-hover:gap-2 md:text-sm">
                                Details <ChevronRight size={14} />
                              </span>
                            </div>
                          </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              <Link
                to="/catalog"
                className="md:hidden inline-flex items-center gap-2 text-[#244d85] hover:text-[#1E4ECC] transition-colors font-medium mt-4"
              >
                {t.products.viewAll}
                <ChevronRight size={18} />
              </Link>
            </div>
          </section>
        )}

        {/* Production Section */}
        <section className="py-10 lg:py-14 bg-gray-50">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            {/* Mobile Title - Only visible on small screens */}
            <div className="lg:hidden border-l-4 border-[#244d85] pl-6 mb-8">
              <h2 className="font-display text-3xl font-medium text-[#0B0C0E]">
                {t.production.heading}
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="lg:order-1">
                <img
                  src={resolveMediaInputUrl(
                    getSectionMedia('home.production.facilityImage', '/full_cycle.jpeg'),
                  )}
                  alt="Krantas Production Facility"
                  width={1344}
                  height={768}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="order-2 lg:order-2">
                {/* Desktop Title - Only visible on large screens */}
                <div className="hidden lg:block border-l-4 border-[#244d85] pl-6 mb-8">
                  <h2 className="font-display text-3xl lg:text-5xl font-medium text-[#0B0C0E]">
                    {t.production.heading}
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t.production.description}
                </p>
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-8">
                  {[
                    t.production.modeling,
                    t.production.cnc,
                    t.production.cutting,
                    t.production.welding,
                    t.production.surface,
                    t.production.assembly,
                  ].map((item: string) => (
                    <div key={item}>
                      <span className="text-gray-600 text-[13px] md:text-base leading-tight block">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-[#244d85] hover:text-[#1E4ECC] transition-colors font-medium"
                >
                  {t.home.process.explore}
                  <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-4 lg:py-14 bg-[#0B0C0E] mt-auto mb-[-4px] relative z-20">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl lg:text-5xl font-medium text-white mb-2">
                {t.cta.title}
              </h2>
              <p className="text-gray-400 mb-6">
                {t.cta.description}
              </p>
              <div className="flex flex-col items-center">
                {!showForm ? (
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center gap-2 bg-[#244d85] text-white px-8 py-4 font-medium
                         transition-all duration-200 hover:bg-[#1E4ECC]"
                  >
                    {t.cta.button}
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <div className="w-full mt-12 animate-in fade-in slide-in-from-top-4 duration-500 max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                      <h3 className="text-xl font-medium text-white uppercase tracking-wider">{t.home.inquiryForm}</h3>
                      <button
                        onClick={() => setShowForm(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    <ContactForm dark />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
