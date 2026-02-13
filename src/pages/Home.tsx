import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Check, X } from 'lucide-react';
import { products, categories } from '../data/products';
import { useLanguage } from '../contexts/LanguageContext';
import ContactForm from '../components/ContactForm';

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
  const [showForm, setShowForm] = useState(false);
  const featuredProducts = products.slice(0, 4);
  const introRef = useRef<HTMLDivElement>(null);
  const [introVisible, setIntroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIntroVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const introItems = [
    {
      title: t.intro.fleetRecovery,
      desc: t.intro.fleetRecoveryDesc,
    },
    {
      title: t.intro.fabrication,
      desc: t.intro.fabricationDesc,
    },
    {
      title: t.intro.advisory,
      desc: t.intro.advisoryDesc,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="fixed top-0 left-0 h-screen w-full flex items-center overflow-hidden bg-black z-0">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-100"
          >
            <source src="/herovid.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Hero Spacer */}
      <div className="h-screen w-full pointer-events-none" />

      {/* Subsequent sections start here */}
      <div className="relative z-10 bg-white">


        {/* Intro Animation Section - White Background */}
        <section ref={introRef} className="pt-10 lg:pt-14 pb-10 lg:pb-14 bg-white overflow-hidden border-t border-gray-200">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="font-display text-3xl lg:text-5xl font-semibold text-[#0B0C0E] mb-6">
                {t.intro.welcomeTitle}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {t.intro.welcomeDesc}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {introItems.map((item, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-1000 ${introVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-20 opacity-0'
                    }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="border-l-2 border-[#244d85] pl-5">
                    <h3 className="font-display text-xl lg:text-2xl font-medium text-[#0B0C0E] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* About Us Section */}
        <div className="py-10 lg:py-14">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <img
                  src="/about_factory.jpg"
                  alt="Krantas Factory"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div>
                <div className="border-l-4 border-[#244d85] pl-6 mb-8">
                  <h2 className="font-display text-3xl lg:text-5xl font-medium text-[#0B0C0E]">
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

        {/* Stats Section */}
        <div className="py-6 lg:py-10 bg-white border-b border-gray-100">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
              {[
                { value: 60, suffix: '+', label: t.stats.equipment },
                { value: 10000, suffix: '+', label: t.stats.projects },
                { value: 600, suffix: '+', label: t.stats.employees },
                { value: 79, suffix: '', label: t.stats.experience },
              ].map((stat, idx) => (
                <div key={idx} className="text-center lg:text-left">
                  <span className="font-display text-5xl lg:text-7xl font-medium text-[#244d85] block mb-2">
                    <CountUp end={stat.value} duration={2500} />
                    {stat.suffix}
                  </span>
                  <span className="text-xl lg:text-2xl text-[#0B0C0E] font-medium block leading-tight">
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
                <span className="font-mono text-base uppercase tracking-[0.14em] text-[#244d85] mb-3 block">
                  {t.equipment.title}
                </span>
                <h2 className="font-display text-3xl lg:text-5xl font-medium text-[#0B0C0E]">
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
                className="sm:col-span-2 lg:col-span-2 lg:row-span-2 group relative overflow-hidden transition-all shadow-sm hover:shadow-xl"
              >
                <div className="absolute inset-0">
                  <img
                    src="/cust_sol.jpg"
                    alt="Customized Solutions"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="relative h-full min-h-[320px] p-6 flex flex-col justify-end">
                  <h3 className="font-display text-2xl lg:text-3xl font-medium text-white mb-2">
                    {t.equipment.customSolutions}
                  </h3>
                  <p className="text-gray-300 mb-4 text-base">
                    {t.equipment.customDesc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#fdc15e] font-medium">
                    {t.home.build.explore}
                    <ChevronRight size={18} />
                  </span>
                </div>
              </Link>

              {/* Other Categories - No icons, smaller cards */}
              {categories.filter(c => c.id !== 'custom-solutions' && c.id !== 'metal-structures').map((category) => (
                <Link
                  key={category.id}
                  to={`/catalog/${category.id}`}
                  className="group transition-all overflow-hidden bg-white shadow-sm hover:shadow-xl"
                >
                  <div className="h-36 overflow-hidden">
                    <img
                      src={
                        ({
                          'lifting-equipment': '/cover_le.jpg',
                          'agricultural': '/cover_am.jpg',
                          'tank-trucks': '/cover_tt.jpg',
                          'special-purpose': '/cover_spm.jpg',
                          'overhead-gantry': '/cover_og.jpg',
                          'dump-trucks': '/cover_dt.jpg',
                          'mining-trucks': '/cover_mt.jpeg',
                          'metal-structures': '/cover_ms.jpeg',
                        } as Record<string, string>)[category.id] || category.image
                      }
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-display text-base font-medium text-[#0B0C0E] mb-1 group-hover:text-[#244d85] transition-colors">
                      {t.categories?.[category.id as keyof typeof t.categories]?.name || category.name}
                    </h3>
                    <p className="text-base text-gray-500 line-clamp-2">
                      {t.categories?.[category.id as keyof typeof t.categories]?.description || category.description}
                    </p>
                  </div>
                </Link>
              ))}

              {/* Metal Structures - Redirect to Custom Solutions as it's an engineering division */}
              <Link
                to="/custom-solutions"
                className="group transition-all overflow-hidden bg-white shadow-sm hover:shadow-xl"
              >
                <div className="h-36 overflow-hidden">
                  <img
                    src="/cover_ms.jpeg"
                    alt="Metal Structures"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-display text-base font-medium text-[#0B0C0E] mb-1 group-hover:text-[#244d85] transition-colors">
                    {t.categories?.['metal-structures']?.name || 'Metal Structures'}
                  </h3>
                  <p className="text-base text-gray-500 line-clamp-2">
                    {t.categories?.['metal-structures']?.description || 'Design and fabrication of industrial metal structures'}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-10 lg:py-14 bg-gray-50">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="font-mono text-base uppercase tracking-[0.14em] text-[#244d85] mb-3 block">
                  {t.products.title}
                </span>
                <h2 className="font-display text-3xl lg:text-5xl font-medium text-[#0B0C0E]">
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

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white transition-all overflow-hidden shadow-sm hover:shadow-xl"
                >
                  <div className="h-52 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-base text-[#244d85] mb-2 block">
                      {t.categories?.[product.categoryId as keyof typeof t.categories]?.name || product.category}
                    </span>
                    <h3 className="font-display text-xl lg:text-2xl font-medium text-[#0B0C0E] mb-2 group-hover:text-[#244d85] transition-colors">
                      {t.productsData?.[product.id as keyof typeof t.productsData]?.name || product.name}
                    </h3>
                    <p className="text-base text-gray-500 line-clamp-2 mb-4">
                      {t.productsData?.[product.id as keyof typeof t.productsData]?.description || product.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(t.productsData?.[product.id as keyof typeof t.productsData]?.specs || product.specs).slice(0, 2).map(([key, value]) => (
                        value && (
                          <span key={key} className="text-base bg-gray-100 px-2 py-1 text-gray-600">
                            <span className="font-semibold">{t.specLabels?.[key as keyof typeof t.specLabels] || key}: </span>
                            {value}
                          </span>
                        )
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Production Section */}
        <section className="py-10 lg:py-14 bg-gray-50">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="/full_cycle.jpeg"
                  alt="Krantas Production Facility"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="border-l-4 border-[#244d85] pl-6 mb-8">
                  <h2 className="font-display text-3xl lg:text-5xl font-medium text-[#0B0C0E]">
                    {t.production.heading}
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t.production.description}
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    t.production.modeling,
                    t.production.cnc,
                    t.production.cutting,
                    t.production.welding,
                    t.production.surface,
                    t.production.assembly,
                  ].map((item: string) => (
                    <div key={item} className="flex items-center gap-3">
                      <Check size={18} className="text-[#244d85]" />
                      <span className="text-gray-600">{item}</span>
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
        <section className="py-10 lg:py-14 bg-[#0B0C0E]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl lg:text-5xl font-medium text-white mb-4">
                {t.cta.title}
              </h2>
              <p className="text-gray-400 mb-8">
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
