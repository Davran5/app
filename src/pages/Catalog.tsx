import { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BookOpen, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { useAnalytics } from '../contexts/AnalyticsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCms } from '../contexts/CmsContext';
import ContactForm from '../components/ContactForm';
import { buildProductAnalyticsItem } from '../lib/analytics';
import { resolveMediaInputUrl } from '../lib/media';
import {
  compactMeasurementSpacing,
  getProductSpecRows,
} from '../lib/product-content';
import { sortProductsByStarred } from '../lib/product-order';

export default function Catalog() {
  const { t } = useLanguage();
  const { trackEvent } = useAnalytics();
  const { categories, products, starredProductIds } = useCms();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showForm, setShowForm] = useState(false);
  const productGridRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const selectedCategory = searchParams.get('category');

  const handleScrollIndicators = () => {
    if (mobileScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = mobileScrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = mobileScrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScrollIndicators);
      handleScrollIndicators();
      return () => el.removeEventListener('scroll', handleScrollIndicators);
    }
  }, []);

  // Update URL when user clicks a filter button
  const handleCategorySelect = (catId: string | null) => {
    if (catId) {
      setSearchParams({ category: catId });
    } else {
      setSearchParams({});
    }
  };

  // Scroll to product grid top when category changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!selectedCategory) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    if (productGridRef.current) {
      const headerOffset = 100; // Offset for fixed header + some padding
      const elementPosition = productGridRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [selectedCategory]);

  const filteredProducts = sortProductsByStarred(
    selectedCategory
      ? products.filter((product) => product.categoryId === selectedCategory)
      : products.filter(
          (product) =>
            product.categoryId !== 'custom-solutions' && product.categoryId !== 'metal-structures',
        ),
    starredProductIds,
  );

  return (
    <div className="min-h-screen w-full flex-1 flex flex-col" style={{ backgroundColor: '#f8f8f8' }}>
      <div className="relative z-10 w-full flex-1 flex flex-col" style={{ backgroundColor: '#f8f8f8' }}>
        {/* Main Content */}
        <section className="pt-12 lg:pt-16 pb-10 lg:pb-12">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

            {/* Mobile: Horizontal Scrolling Category Chips with Navigation Buttons */}
            <div className="lg:hidden mb-10 relative w-full flex items-center h-14">
              <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center pointer-events-none">
                <button
                  onClick={() => mobileScrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' })}
                  className={`pointer-events-auto w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[#244d85] border border-gray-100 transition-all active:scale-95 -translate-x-1 ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={28} />
                </button>
              </div>

              <div
                ref={mobileScrollRef}
                className="flex-1 overflow-x-auto scrollbar-hide py-2 px-6"
              >
                <div className="flex gap-2 min-w-max">
                  <button
                    onClick={() => handleCategorySelect(null)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap shadow-sm ${selectedCategory === null
                      ? 'bg-[#244d85] text-white'
                      : 'bg-white text-gray-600'
                      }`}
                  >
                    {t.catalog.showAll}
                  </button>
                  {categories.filter(c => c.id !== 'custom-solutions' && c.id !== 'metal-structures').map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap shadow-sm ${selectedCategory === category.id
                        ? 'bg-[#244d85] text-white'
                        : 'bg-white text-gray-600'
                        }`}
                    >
                      {t.categories?.[category.id as keyof typeof t.categories]?.name || category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="absolute right-0 top-0 bottom-0 z-20 flex items-center pointer-events-none">
                <button
                  onClick={() => mobileScrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' })}
                  className={`pointer-events-auto w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[#244d85] border border-gray-100 transition-all active:scale-95 translate-x-1 ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  aria-label="Scroll right"
                >
                  <ChevronRight size={28} />
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Desktop: Fixed Sidebar */}
              <div className="hidden lg:block lg:w-72 lg:flex-shrink-0">
                <div className="lg:sticky lg:top-24">
                  <h3 className="font-display text-xl lg:text-2xl font-semibold text-[#0B0C0E] mb-4">{t.catalog.categories}</h3>

                  <div className="space-y-2">
                    {categories.filter(c => c.id !== 'custom-solutions' && c.id !== 'metal-structures').map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(selectedCategory === category.id ? null : category.id)}
                        className={`w-full py-2 text-left transition-all duration-300 transform origin-left text-sm ${selectedCategory === category.id
                          ? 'text-[#244d85] font-medium scale-[1.25] translate-x-2'
                          : 'text-[#0B0C0E] hover:text-[#244d85]'
                          }`}
                      >
                        <span>{t.categories?.[category.id as keyof typeof t.categories]?.name || category.name}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleCategorySelect(null)}
                    className={`w-full mt-3 py-2 text-left transition-all duration-300 transform origin-left text-sm ${selectedCategory === null
                      ? 'text-[#244d85] font-medium scale-[1.25] translate-x-2'
                      : 'text-gray-500 hover:text-[#244d85]'
                      }`}
                  >
                    {t.catalog.showAll}
                  </button>
                </div>
              </div>

              {/* Product Grid */}
              <div className="flex-1" ref={productGridRef}>
                {/* Header with product count */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                  <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-[#0B0C0E]">
                    {selectedCategory
                      ? t.categories?.[selectedCategory as keyof typeof t.categories]?.name || categories.find(c => c.id === selectedCategory)?.name
                      : t.catalog.showAll}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm text-gray-500">
                      {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                    </span>
                    <Link
                      to="/brochure/catalog?print=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-[#244d85] bg-[#244d85] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1E4ECC]"
                    >
                      <BookOpen size={16} />
                      Full Catalog PDF
                    </Link>
                  </div>
                </div>

                {/* Product Grid - 1 column on mobile (horizontal cards), 2 on tablet, 3-4 on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {filteredProducts.map((product) => {
                    const localizedProduct =
                      t.productsData?.[product.id as keyof typeof t.productsData];
                    const productName = localizedProduct?.name || product.name;
                    const specRows = getProductSpecRows(
                      localizedProduct?.specs || product.specs,
                    ).slice(0, 2);
                    const otherSpecs = specRows.map((spec) => ({
                      ...spec,
                      label: compactMeasurementSpacing(spec.label),
                      value: compactMeasurementSpacing(spec.value),
                    }));

                    return (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-xl md:flex-col"
                        onClick={() =>
                          trackEvent('select_item', {
                            item_list_name: selectedCategory || 'catalog',
                            ecommerce: {
                              items: [
                                buildProductAnalyticsItem({
                                  item_id: product.id,
                                  item_name:
                                    productName,
                                  item_category: product.category,
                                }),
                              ],
                            },
                          })
                        }
                      >
                        <div className="w-full bg-white px-3 py-2.5 md:hidden">
                          <p className="line-clamp-2 break-words text-sm font-semibold leading-snug text-[#0B0C0E]">
                            {compactMeasurementSpacing(productName)}
                          </p>
                        </div>

                        <div className="flex min-w-0 flex-1 flex-row md:flex-col">
                        {/* Product Image - Clean, no overlays */}
                        <div className="relative w-[38%] flex-shrink-0 overflow-hidden bg-gray-50 md:aspect-[2/1] md:w-full md:rounded-t-lg">
                          <img
                            src={resolveMediaInputUrl(product.image)}
                            alt={productName}
                            loading="lazy"
                            className="w-full h-full object-contain p-2 md:p-4 transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex min-w-0 flex-1 flex-col p-3 md:p-4">
                          {/* Compact specifications */}
                          <div className="space-y-2">
                            {otherSpecs.map((spec) => (
                              <div
                                key={spec.key}
                                className="flex flex-col items-start gap-0.5 md:grid md:grid-cols-2 md:items-start md:gap-3"
                              >
                                <span
                                  className={
                                    spec.value
                                      ? 'text-[11px] font-normal leading-snug text-gray-600 md:text-xs'
                                      : 'line-clamp-2 text-[11px] font-medium leading-snug text-gray-700 md:col-span-2 md:text-xs'
                                  }
                                >
                                  {spec.label}
                                </span>
                                {spec.value && (
                                  <span className="min-w-0 break-words text-xs font-semibold leading-snug text-[#0B0C0E] md:text-right">
                                    {spec.value}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Full product name with the action on its own row */}
                          <div className="mt-auto flex flex-col border-t border-gray-100 pt-2">
                            <p className="hidden break-words text-xs font-semibold leading-snug text-[#0B0C0E] md:block">
                              {compactMeasurementSpacing(productName)}
                            </p>
                            <span className="mt-2 flex items-center gap-1 self-end text-xs font-medium text-[#244d85] transition-all group-hover:gap-2">
                              Details <ChevronRight size={12} />
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
          </div>
        </section>

        {/* CTA - Black Background */}
        <section className="py-12 lg:py-16 bg-[#0B0C0E] mt-auto mb-[-4px] relative z-20">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4">
                {t.catalog.customSolution}
              </h2>
              <p className="text-gray-400 mb-8">
                {t.catalog.customDesc}
              </p>
              <div className="flex flex-col items-center">
                {!showForm ? (
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center gap-2 bg-[#244d85] text-white px-6 py-3 font-medium
                         transition-all duration-200 hover:bg-[#1E4ECC]"
                  >
                    {t.contacts.title}
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <div className="w-full mt-12 animate-in fade-in slide-in-from-top-4 duration-500 max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                      <h3 className="text-xl font-medium text-white uppercase tracking-wider text-left">{t.home.inquiryForm}</h3>
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
