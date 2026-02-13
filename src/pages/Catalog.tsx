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
    <div className="min-h-screen" style={{ backgroundColor: '#f8f8f8' }}>
      <Hero title={t.catalog.title} description={t.catalog.heroIntro} />
      <div className="relative z-10 -mt-12 lg:-mt-16" style={{ backgroundColor: '#f8f8f8' }}>
        {/* Main Content */}
        <section className="pt-12 lg:pt-16 pb-10 lg:pb-12">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Fixed Sidebar - No icons, smaller height */}
              <div className="lg:w-72 lg:flex-shrink-0">
                <div className="lg:sticky lg:top-24">
                  <h3 className="font-display text-xl lg:text-2xl font-medium text-[#0B0C0E] mb-4">{t.catalog.categories}</h3>

                  <div className="space-y-2">
                    {/* Other Categories - No icons */}
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

              {/* Product Grid - 4 in a row */}
              <div className="flex-1" ref={productGridRef}>
                {/* Title moved to Hero */}

                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-medium text-[#0B0C0E]">
                    {selectedCategory
                      ? t.categories?.[selectedCategory as keyof typeof t.categories]?.name || categories.find(c => c.id === selectedCategory)?.name
                      : t.catalog.showAll}
                  </h2>
                  <span className="text-sm text-gray-500">{filteredProducts.length} products</span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="group bg-white transition-all overflow-hidden shadow-sm hover:shadow-xl"
                    >
                      <div className="overflow-hidden bg-gray-50">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-display text-lg font-medium text-[#0B0C0E] mb-2 group-hover:text-[#244d85] transition-colors line-clamp-2 h-14 flex items-start pt-1">
                          {t.productsData?.[product.id as keyof typeof t.productsData]?.name || product.name}
                        </h3>
                        <div className="space-y-1.5 mt-3 pt-3 border-t border-gray-100">
                          {Object.entries(t.productsData?.[product.id as keyof typeof t.productsData]?.specs || product.specs).slice(0, 3).map(([key, value]) => (
                            value && (
                              <div key={key} className="flex justify-between items-start gap-2 text-[13px] leading-tight">
                                <span className="text-gray-400 font-normal shrink-0">
                                  {t.specLabels?.[key as keyof typeof t.specLabels] || key.replace(/([A-Z])/g, ' $1')
                                    .split(' ')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                    .join(' ')
                                    .trim()}
                                </span>
                                <span className="text-[#0B0C0E] font-medium text-right">
                                  {value}
                                </span>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Black Background */}
        <section className="py-12 lg:py-16 bg-[#0B0C0E]">
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
