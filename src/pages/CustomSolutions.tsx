import { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';
import { useLanguage } from '../contexts/LanguageContext';

export default function CustomSolutions() {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);

  const customizationTypes = [
    {
      id: 'chassis',
      title: t.customSolutionsPage.capabilities.items.chassis.title,
      description: t.customSolutionsPage.capabilities.items.chassis.description,
      image: '/chassis_mod.jpeg',
      capabilities: t.customSolutionsPage.capabilities.items.chassis.capabilities
    },
    {
      id: 'complexes',
      title: t.customSolutionsPage.capabilities.items.complexes.title,
      description: t.customSolutionsPage.capabilities.items.complexes.description,
      image: '/spec_eng.jpeg',
      capabilities: t.customSolutionsPage.capabilities.items.complexes.capabilities
    },
    {
      id: 'hydraulics',
      title: t.customSolutionsPage.capabilities.items.hydraulics.title,
      description: t.customSolutionsPage.capabilities.items.hydraulics.description,
      image: '/hyd_ele.jpeg',
      capabilities: t.customSolutionsPage.capabilities.items.hydraulics.capabilities
    },
    {
      id: 'containers',
      title: t.customSolutionsPage.capabilities.items.containers.title,
      description: t.customSolutionsPage.capabilities.items.containers.description,
      image: '/non_stan.jpeg',
      capabilities: t.customSolutionsPage.capabilities.items.containers.capabilities
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f8f8' }}>
      <Hero title={t.customSolutionsPage.heroTitle} description={t.customSolutionsPage.heroIntro} />

      <div className="relative z-10 -mt-12 lg:-mt-16">

        {/* Introduction with Image */}
        <section className="pt-12 lg:pt-16 pb-10 lg:pb-14 bg-white relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display text-4xl lg:text-6xl font-medium text-[#0B0C0E] mb-8 whitespace-pre-line">
                  {t.customSolutionsPage.intro.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {t.customSolutionsPage.intro.desc1}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {t.customSolutionsPage.intro.desc2}
                </p>
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-4xl font-display font-bold text-[#244d85]">500+</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">{t.customSolutionsPage.intro.stats.projects}</div>
                  </div>
                  <div className="w-px h-12 bg-gray-200" />
                  <div>
                    <div className="text-4xl font-display font-bold text-[#244d85]">75+</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">{t.customSolutionsPage.intro.stats.experience}</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/our_vis.jpeg"
                  alt="Manufacturing Facility"
                  className="w-full h-[320px] lg:h-[380px] object-cover shadow-2xl"
                />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#244d85] opacity-20" />
              </div>
            </div>
          </div>
        </section>

        {/* Metal Structures Section */}
        <section className="py-12 lg:py-16 bg-[#f8f8f8] relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                <img
                  src="/cover_ms.jpeg"
                  alt="Metal Structures"
                  className="w-full h-[240px] lg:h-[300px] object-cover shadow-2xl"
                />
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#244d85] opacity-10" />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="font-display text-4xl lg:text-6xl font-medium text-[#0B0C0E] mb-8">
                  {t.customSolutionsPage.metalStructures?.title}
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {t.customSolutionsPage.metalStructures?.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Customization Services - Image Grid */}
        <section className="py-10 lg:py-14 bg-white relative">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-6xl font-medium text-[#0B0C0E] mb-6">
                {t.customSolutionsPage.capabilities.title}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t.customSolutionsPage.capabilities.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {customizationTypes.map((type) => (
                <div
                  key={type.id}
                  className="group relative overflow-hidden bg-white"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={type.image}
                      alt={type.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="font-display text-2xl lg:text-3xl font-medium text-white mb-3">
                        {type.title}
                      </h3>
                      <p className="text-gray-300 text-base leading-relaxed">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Production Backbone */}
        <section className="py-10 lg:py-14" style={{ backgroundColor: '#f8f8f8' }}>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="mb-16">
              <h2 className="font-display text-4xl lg:text-6xl font-medium text-[#0B0C0E] mb-6">
                {t.customSolutionsPage.production.title}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl">
                {t.customSolutionsPage.production.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-2 relative group overflow-hidden">
                <img
                  src="/man_floor.jpeg"
                  alt="Production Facility"
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-display text-2xl font-medium mb-2">{t.customSolutionsPage.production.items.manufacturing.title}</h3>
                  <p className="text-gray-200">{t.customSolutionsPage.production.items.manufacturing.desc}</p>
                </div>
              </div>
              <div className="relative group overflow-hidden h-[500px]">
                <img
                  src="/cnc.jpeg"
                  alt="CNC Operations"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-display text-2xl font-medium mb-2">{t.customSolutionsPage.production.items.cnc.title}</h3>
                  <p className="text-gray-200">{t.customSolutionsPage.production.items.cnc.desc}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative group overflow-hidden">
                <img
                  src="/welding.jpeg"
                  alt="Welding"
                  className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-display text-2xl font-medium mb-2">{t.customSolutionsPage.production.items.welding.title}</h3>
                  <p className="text-gray-200">{t.customSolutionsPage.production.items.welding.desc}</p>
                </div>
              </div>
              <div className="md:col-span-2 relative group overflow-hidden">
                <img
                  src="/assembly_line.jpeg"
                  alt="Assembly"
                  className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-display text-2xl font-medium mb-2">{t.customSolutionsPage.production.items.assembly.title}</h3>
                  <p className="text-gray-200">{t.customSolutionsPage.production.items.assembly.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 lg:py-14 bg-[#0B0C0E]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl lg:text-5xl font-medium text-white mb-4">
                {t.customSolutionsPage.cta.title}
              </h2>
              <p className="text-gray-400 mb-8">
                {t.customSolutionsPage.cta.description}
              </p>
              <div className="flex flex-col items-center">
                {!showForm ? (
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center gap-2 bg-[#244d85] text-white px-8 py-4 font-medium
                       transition-all duration-200 hover:bg-[#1E4ECC]"
                  >
                    {t.customSolutionsPage.cta.button}
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
