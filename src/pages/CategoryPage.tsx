import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, X } from 'lucide-react';
import { getCategoryById, getProductsByCategory, categories } from '../data/products';
import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';
import { useLanguage } from '../contexts/LanguageContext';

export default function CategoryPage() {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = getCategoryById(categoryId || '');
  const products = getProductsByCategory(categoryId || '');

  if (!category) {
    return (
      <div className="bg-white min-h-screen pt-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center">
            <h1 className="font-display text-3xl font-medium text-[#0B0C0E] mb-4">Category Not Found</h1>
            <p className="text-gray-500 mb-8">The category you are looking for does not exist.</p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-[#244d85] hover:text-[#1E4ECC] transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Hero
        title={t.categories?.[categoryId as keyof typeof t.categories]?.name || category.name}
        description={t.categories?.[categoryId as keyof typeof t.categories]?.description || category.description}
      />

      <div className="bg-white relative z-10 -mt-12 lg:-mt-16">
        {/* Products */}
        <section className="pt-12 lg:pt-16 pb-12 lg:pb-16">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            {/* Back to Catalog - Above product cards */}
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-[#244d85] hover:text-[#1E4ECC] transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to Catalog
            </Link>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="group bg-white transition-all overflow-hidden shadow-sm hover:shadow-xl"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl font-medium text-[#0B0C0E] mb-2 group-hover:text-[#244d85] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-base text-gray-500 line-clamp-2 mb-4">
                        {product.description}
                      </p>
                      <div className="space-y-1">
                        {Object.entries(product.specs).slice(0, 2).map(([key, value]) => (
                          value && (
                            <div key={key} className="flex justify-between text-base">
                              <span className="text-gray-400">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              <span className="text-[#0B0C0E] font-medium">{value}</span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 mb-4 font-display">No products available in this category yet.</p>
                {!showForm ? (
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center gap-2 text-[#244d85] hover:text-[#1E4ECC] transition-colors font-medium"
                  >
                    Contact us for inquiries
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <div className="w-full mt-8 animate-in fade-in slide-in-from-top-4 duration-500 max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-3 text-left">
                      <h3 className="text-xl font-medium text-[#0B0C0E]">{t.services.inquiryForm || t.contacts.inquiryForm || 'Inquiry Form'}</h3>
                      <button
                        onClick={() => setShowForm(false)}
                        className="text-gray-400 hover:text-[#244d85] transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <ContactForm />
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Other Categories */}
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <h2 className="font-display text-2xl font-medium text-[#0B0C0E] mb-8">
              Other Categories
            </h2>
            <div className="flex flex-wrap gap-3">
              {categories
                .filter((c) => c.id !== categoryId)
                .map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/catalog/${cat.id}`}
                    className="px-4 py-2 bg-white border border-gray-200 text-base text-gray-600 hover:text-[#0B0C0E] hover:border-[#244d85] transition-all"
                  >
                    {cat.name}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
