import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Download, Check, X } from 'lucide-react';
import { getProductById } from '../data/products';
import { toast } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';
import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';
export default function ProductDetail() {
  const { t } = useLanguage();
  const { productId } = useParams<{ productId: string }>();
  const [showForm, setShowForm] = useState(false);
  const product = getProductById(productId || '');

  if (!product) {
    return (
      <div className="min-h-screen pt-32" style={{ backgroundColor: '#f8f8f8' }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center">
            <h1 className="font-display text-3xl font-medium text-[#0B0C0E] mb-4">{t.catalog.noProducts}</h1>
            <p className="text-gray-500 mb-8">{t.catalog.noProducts}</p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-[#244d85] hover:text-[#1E4ECC] transition-colors"
            >
              <ArrowLeft size={16} />
              {t.catalog.backToCatalog}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    toast.info('Specification sheet download will be available soon.');
  };

  return (
    <div className="min-h-screen w-full flex-1 flex flex-col" style={{ backgroundColor: '#f8f8f8' }}>
      <Hero title={t.productsData?.[product.id as keyof typeof t.productsData]?.name || product.name} />

      <div className="relative z-10 bg-white -mt-12 lg:-mt-16 w-full flex-1 flex flex-col">
        {/* Breadcrumb */}
        <section className="pt-12 lg:pt-16 pb-6 border-b border-gray-200">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-2 text-base">
              <Link to="/" className="text-gray-400 hover:text-gray-600 transition-colors">{t.nav.home}</Link>
              <ChevronRight size={14} className="text-gray-400" />
              <Link to="/catalog" className="text-gray-400 hover:text-gray-600 transition-colors">{t.nav.catalog}</Link>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-[#0B0C0E]">{t.productsData?.[product.id as keyof typeof t.productsData]?.name || product.name}</span>
            </div>
          </div>
        </section>

        {/* Product Content */}
        <section className="py-10 lg:py-16">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Image */}
              <div className="bg-white p-4 shadow-sm border border-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center">
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {t.productsData?.[product.id as keyof typeof t.productsData]?.fullDescription || product.fullDescription}
                </p>

                {/* Features */}
                <div>
                  <h3 className="font-display text-xl font-medium text-krantas-blue mb-6">{t.products.features}</h3>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-krantas-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={12} className="text-krantas-blue" />
                        </div>
                        <span className="text-gray-600 text-base">{t.productsData?.[product.id as keyof typeof t.productsData]?.features?.[index] || feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        <section className="py-16 bg-gray-50 border-y border-gray-100">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Left: Technical Specifications */}
              <div>
                <h2 className="font-display text-xl lg:text-2xl font-medium text-[#0B0C0E] mb-8 uppercase tracking-wider">
                  {t.products.specs}
                </h2>
                <div className="divide-y divide-gray-200">
                  {Object.entries(product.specs).filter(([key]) =>
                    ['liftingCapacity', 'loadCapacity', 'tankVolume', 'span', 'liftingHeight', 'workingWidth', 'workingDepth', 'hopperCapacity', 'baleSize', 'pickupWidth', 'model'].includes(key)
                  ).map(([key, value]) => {
                    if (!value) return null;
                    const label = key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase());
                    return (
                      <div key={key} className="py-4 flex justify-between items-center text-base">
                        <span className="text-gray-400">{t.specLabels?.[key as keyof typeof t.specLabels] || label}</span>
                        <span className="text-[#0B0C0E] font-medium text-right">{value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Equipment Specifications */}
              <div>
                <h2 className="font-display text-xl lg:text-2xl font-medium text-[#0B0C0E] mb-8 uppercase tracking-wider">
                  {t.specLabels?.equipment || 'Equipment'}
                </h2>
                <div className="divide-y divide-gray-200">
                  {Object.entries(product.specs).filter(([key]) =>
                    !['liftingCapacity', 'loadCapacity', 'tankVolume', 'span', 'liftingHeight', 'workingWidth', 'workingDepth', 'hopperCapacity', 'baleSize', 'pickupWidth', 'model'].includes(key)
                  ).map(([key, value]) => {
                    if (!value) return null;
                    const label = key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase());
                    return (
                      <div key={key} className="py-4 flex justify-between items-center text-base">
                        <span className="text-gray-400">{t.specLabels?.[key as keyof typeof t.specLabels] || label}</span>
                        <span className="text-[#0B0C0E] font-medium text-right">{value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-12 pb-4">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 bg-[#244d85] text-white px-8 py-4 font-medium
                       transition-all duration-200 hover:bg-[#1E4ECC] shadow-sm uppercase tracking-wide text-sm"
              >
                <Download size={18} />
                Download Full Specifications PDF
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-[#0B0C0E] mt-auto mb-[-4px] relative z-20">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl lg:text-5xl font-medium text-white mb-6">
                {t.cta.title}
              </h2>
              <p className="text-gray-400 mb-8">
                {t.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {!showForm ? (
                  <>
                    <button
                      onClick={() => setShowForm(true)}
                      className="inline-flex items-center justify-center gap-2 bg-[#244d85] text-white px-8 py-4 font-medium transition-all duration-200 hover:bg-[#1E4ECC]"
                    >
                      {t.contacts.title}
                      <ChevronRight size={18} />
                    </button>
                    <Link
                      to="/catalog"
                      className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 font-medium transition-all duration-200 hover:bg-white/10"
                    >
                      {t.catalog.showAll}
                    </Link>
                  </>
                ) : (
                  <div className="w-full mt-12 animate-in fade-in slide-in-from-top-4 duration-500">
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
