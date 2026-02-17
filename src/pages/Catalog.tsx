import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, X } from 'lucide-react';
import Hero from '../components/Hero';
import { categories, products } from '../data/products';
import { useLanguage } from '../contexts/LanguageContext';
import ContactForm from '../components/ContactForm';

export default function Catalog() {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const productGridRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Scroll to product grid top when category changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
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

  const filteredProducts = selectedCategory
    ? products.filter(p => p.categoryId === selectedCategory)
    : products.filter(p => p.categoryId !== 'custom-solutions' && p.categoryId !== 'metal-structures');

  return (
    <div className="min-h-screen w-full flex-1 flex flex-col" style={{ backgroundColor: '#f8f8f8' }}>
      <Hero title={t.catalog.title} description={t.catalog.heroIntro} />
      <div className="relative z-10 -mt-12 lg:-mt-16 w-full flex-1 flex flex-col" style={{ backgroundColor: '#f8f8f8' }}>
        {/* Main Content */}
        <section className="pt-12 lg:pt-16 pb-10 lg:pb-12">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

            {/* Mobile: Horizontal Scrolling Category Chips */}
            <div className="lg:hidden mb-6 -mx-6 px-6">
              <div className="overflow-x-auto scrollbar-hide pb-2">
                <div className="flex gap-2 min-w-max">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === null
                      ? 'bg-[#244d85] text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {t.catalog.showAll}
                  </button>
                  {categories.filter(c => c.id !== 'custom-solutions' && c.id !== 'metal-structures').map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === category.id
                        ? 'bg-[#244d85] text-white shadow-md'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      {t.categories?.[category.id as keyof typeof t.categories]?.name || category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Desktop: Fixed Sidebar */}
              <div className="hidden lg:block lg:w-72 lg:flex-shrink-0">
                <div className="lg:sticky lg:top-24">
                  <h3 className="font-display text-xl lg:text-2xl font-medium text-[#0B0C0E] mb-4">{t.catalog.categories}</h3>

                  <div className="space-y-2">
                    {categories.filter(c => c.id !== 'custom-solutions' && c.id !== 'metal-structures').map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
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
                    onClick={() => setSelectedCategory(null)}
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                  <h2 className="font-display text-xl md:text-2xl font-medium text-[#0B0C0E]">
                    {selectedCategory
                      ? t.categories?.[selectedCategory as keyof typeof t.categories]?.name || categories.find(c => c.id === selectedCategory)?.name
                      : t.catalog.showAll}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </span>
                </div>

                {/* Product Grid - 1 column on mobile (horizontal cards), 2 on tablet, 3-4 on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {filteredProducts.map((product) => {
                    const specs = Object.entries(t.productsData?.[product.id as keyof typeof t.productsData]?.specs || product.specs);
                    const modelSpec = specs[0]; // First spec is usually the model
                    const otherSpecs = specs.slice(1, 3); // Get next 2 specs for the side

                    return (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="group bg-white md:rounded-lg transition-all overflow-hidden shadow-sm hover:shadow-xl md:block flex"
                      >
                        {/* Product Image - Clean, no overlays */}
                        <div className="relative w-1/2 md:w-full md:aspect-square overflow-hidden bg-gray-50 md:rounded-t-lg flex-shrink-0">
                          <img
                            src={product.image}
                            alt={t.productsData?.[product.id as keyof typeof t.productsData]?.name || product.name}
                            loading="lazy"
                            className="w-full h-full object-contain p-2 md:p-4 transition-transform duration-300 group-hover:scale-105"
                          />

                          {/* Model Name - Bottom Left */}
                          {modelSpec && modelSpec[1] && (
                            <div className="absolute bottom-2 left-2">
                              <p className="text-[#0B0C0E] text-xs font-semibold drop-shadow-sm">
                                {modelSpec[1]}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Product Info - 2 rows of specs on the side */}
                        <div className="p-3 md:p-4 flex-1 flex flex-col justify-center">
                          {/* Exactly 2 rows of information */}
                          <div className="space-y-2">
                            {otherSpecs.map(([key, value]) => (
                              value && (
                                <div key={key} className="flex justify-between items-center gap-2">
                                  <span className="text-gray-400 font-normal text-xs">
                                    {t.specLabels?.[key as keyof typeof t.specLabels] || key.replace(/([A-Z])/g, ' $1')
                                      .split(' ')
                                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                      .join(' ')
                                      .trim()}
                                  </span>
                                  <span className="text-[#0B0C0E] font-medium text-xs">
                                    {value}
                                  </span>
                                </div>
                              )
                            ))}
                          </div>

                          {/* View Details - Small link at bottom */}
                          <div className="mt-3 pt-2 border-t border-gray-100">
                            <span className="text-xs font-medium text-[#244d85] flex items-center gap-1 group-hover:gap-2 transition-all">
                              Details <ChevronRight size={12} />
                            </span>
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
              <h2 className="font-display text-3xl lg:text-5xl font-medium text-white mb-4">
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
