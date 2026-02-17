import { useState } from 'react';
import { ChevronRight, Phone, X } from 'lucide-react';
import Hero from '../components/Hero';
import { useLanguage } from '../contexts/LanguageContext';
import ContactForm from '../components/ContactForm';

export default function Services() {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState(1);

  const services = [
    {
      id: 1,
      title: t.services.items.afterSales.title,
      shortTitle: t.services.items.afterSales.shortTitle,
      description: t.services.items.afterSales.description,
      stages: [
        t.services.items.afterSales.stages.maintenance,
        t.services.items.afterSales.stages.repairs,
        t.services.items.afterSales.stages.parts,
        t.services.items.afterSales.stages.support,
      ],
      image: '/careers_welder.jpg'
    },
    {
      id: 2,
      title: t.services.items.quality.title,
      shortTitle: t.services.items.quality.shortTitle,
      description: t.services.items.quality.description,
      stages: [
        t.services.items.quality.stages.inspection,
        t.services.items.quality.stages.testing,
        t.services.items.quality.stages.certification,
        t.services.items.quality.stages.documentation,
      ],
      image: '/tech_cnc.jpg'
    },
    {
      id: 3,
      title: t.services.items.localization.title,
      shortTitle: t.services.items.localization.shortTitle,
      description: t.services.items.localization.description,
      stages: [
        t.services.items.localization.stages.analysis,
        t.services.items.localization.stages.adaptation,
        t.services.items.localization.stages.integration,
        t.services.items.localization.stages.training,
      ],
      image: '/production_aerial.jpg'
    },
    {
      id: 4,
      title: t.services.items.manufacturing.title,
      shortTitle: t.services.items.manufacturing.shortTitle,
      description: t.services.items.manufacturing.description,
      stages: [
        t.services.items.manufacturing.stages.design,
        t.services.items.manufacturing.stages.fabrication,
        t.services.items.manufacturing.stages.assembly,
        t.services.items.manufacturing.stages.testing,
      ],
      image: '/about_factory.jpg'
    },
    {
      id: 5,
      title: t.services.items.engineering.title,
      shortTitle: t.services.items.engineering.shortTitle,
      description: t.services.items.engineering.description,
      stages: [
        t.services.items.engineering.stages.consulting,
        t.services.items.engineering.stages.design,
        t.services.items.engineering.stages.prototyping,
        t.services.items.engineering.stages.implementation,
      ],
      image: '/product_crane.jpg'
    },
  ];

  const facilities = [
    {
      title: t.services.facilitiesList.warehouse.title,
      description: t.services.facilitiesList.warehouse.description,
      image: '/warehouse.jpeg'
    },
    {
      title: t.services.facilitiesList.serviceStation.title,
      description: t.services.facilitiesList.serviceStation.description,
      image: '/welding.jpeg'
    },
    {
      title: t.services.facilitiesList.spareParts.title,
      description: t.services.facilitiesList.spareParts.description,
      image: '/spare.jpeg'
    }
  ];

  const activeService = services.find(s => s.id === activeServiceId) || services[0];

  return (
    <div className="bg-white w-full flex-1 flex flex-col">
      <Hero title={t.services.title} description={t.services.heroIntro} />

      <div className="bg-white relative z-10 -mt-12 lg:-mt-16 w-full flex-1 flex flex-col">

        {/* Introductory Section */}
        <section className="pt-12 lg:pt-16 pb-10 lg:pb-14 bg-white relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display text-2xl lg:text-6xl font-medium text-[#0B0C0E] mb-8 whitespace-pre-line">
                  {t.services.introHeadline}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {t.services.introP1}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {t.services.introP2}
                </p>
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-4xl font-display font-bold text-[#244d85]">24/7</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">{t.services.stats.centers}</div>
                  </div>
                  <div className="w-px h-12 bg-gray-200" />
                  <div>
                    <div className="text-4xl font-display font-bold text-[#244d85]">10,000+</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">{t.services.stats.parts}</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/serv.jpeg"
                  alt="Service Facility"
                  className="w-full h-[320px] lg:h-[420px] object-cover shadow-2xl"
                />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#244d85] opacity-20" />
              </div>
            </div>
          </div>
        </section>

        {/* Services Master Section */}
        <section className="pb-16 lg:pb-24 bg-white overflow-hidden border-t border-gray-100 pt-16 lg:pt-24">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

            {/* MOBILE VIEW: Accordion Style Dropdown */}
            <div className="lg:hidden space-y-4">
              <div className="flex flex-col border-t border-gray-100">
                {services.map((service) => (
                  <div key={service.id} className="border-b border-gray-100">
                    <button
                      onClick={() => setActiveServiceId(activeServiceId === service.id ? 0 : service.id)}
                      className={`w-full text-left py-6 flex items-center justify-between transition-all duration-300 ${activeServiceId === service.id ? 'text-[#244d85]' : 'text-gray-400'}`}
                    >
                      <span className="text-lg font-medium uppercase tracking-[0.10em]">
                        {service.shortTitle}
                      </span>
                      <ChevronRight
                        size={20}
                        className={`transition-transform duration-300 ${activeServiceId === service.id ? 'rotate-90 text-[#244d85]' : 'text-gray-300'}`}
                      />
                    </button>

                    {activeServiceId === service.id && (
                      <div className="pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                        <h3 className="font-display text-xl font-medium text-[#0B0C0E] mb-4">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                          {service.description}
                        </p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-4 border-t border-gray-100 pt-6">
                          {service.stages.map((stage: any, index: number) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#244d85] mt-1.5 flex-shrink-0" />
                              <div>
                                <span className="text-[11px] font-bold text-[#0B0C0E] block uppercase tracking-[0.05em] mb-1 leading-tight">{stage.name}</span>
                                <span className="text-[11px] text-gray-500 leading-tight font-light">{stage.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* DESKTOP VIEW: Sidebar + Content Grid */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Column 1: Navigation Sidebar */}
              <div className="lg:col-span-3 bg-gray-50/50 sticky top-24">
                <div className="flex flex-col border-y lg:border-y-0 border-gray-100">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setActiveServiceId(service.id)}
                      className={`text-left px-5 py-6 transition-all duration-300 border-l-4 relative group ${activeServiceId === service.id
                        ? 'bg-white border-[#244d85] text-[#244d85] shadow-sm z-10'
                        : 'bg-transparent border-transparent text-gray-400 hover:text-gray-600 hover:bg-white/50'
                        }`}
                    >
                      <span className="text-xl font-medium uppercase tracking-[0.10em] leading-tight flex items-center justify-between">
                        {service.shortTitle}
                        {activeServiceId === service.id && <ChevronRight size={20} className="text-[#244d85]" />}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Column 2: Narrative Content Area */}
              <div className="lg:col-span-9 flex flex-col justify-start">
                <div className="max-w-4xl">
                  <h2 className="font-display text-2xl lg:text-4xl font-medium text-[#0B0C0E] mb-6 leading-tight">
                    {activeService.title}
                  </h2>
                  <p className="text-gray-600 text-lg lg:text-xl leading-relaxed font-light">
                    {activeService.description}
                  </p>
                </div>

                {/* Stages/Features */}
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 border-t border-gray-100 pt-8 mt-8">
                  {activeService.stages.map((stage: any, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#244d85] mt-2 flex-shrink-0" />
                      <div>
                        <span className="text-base font-bold text-[#0B0C0E] block uppercase tracking-[0.15em] mb-2">{stage.name}</span>
                        <span className="text-base text-gray-500 leading-relaxed font-light">{stage.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Facilities Section */}
        <section className="py-10 lg:py-14 bg-gray-50">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="mb-16">
              <h2 className="font-display text-2xl lg:text-6xl font-medium text-[#0B0C0E] mb-6">
                {t.services.facilities}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl">
                {t.services.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
              {/* Warehouse: col-span-2 */}
              <div className="md:col-span-2 relative group overflow-hidden h-[192px] md:h-[400px]">
                <img
                  src={facilities[0].image}
                  alt={facilities[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-white">
                  <h3 className="font-display text-xl md:text-3xl font-medium mb-1 md:mb-3">{facilities[0].title}</h3>
                  <p className="text-gray-200 text-xs md:text-base leading-relaxed line-clamp-2 md:line-clamp-none">
                    {facilities[0].description}
                  </p>
                </div>
              </div>

              {/* Service Station: col-span-1 */}
              <div className="relative group overflow-hidden h-[192px] md:h-[400px]">
                <img
                  src={facilities[1].image}
                  alt={facilities[1].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-white">
                  <h3 className="font-display text-xl md:text-3xl font-medium mb-1 md:mb-3">{facilities[1].title}</h3>
                  <p className="text-gray-200 text-xs md:text-base leading-relaxed line-clamp-2 md:line-clamp-none">
                    {facilities[1].description}
                  </p>
                </div>
              </div>

              {/* Spare Parts Center: col-span-3 */}
              <div className="md:col-span-3 relative group overflow-hidden h-[192px] md:h-[350px]">
                <img
                  src={facilities[2].image}
                  alt={facilities[2].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-white">
                  <h3 className="font-display text-xl md:text-3xl font-medium mb-1 md:mb-3">{facilities[2].title}</h3>
                  <p className="text-gray-300 text-xs md:text-base leading-relaxed max-w-2xl line-clamp-2 md:line-clamp-none">
                    {facilities[2].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-10 lg:py-14 bg-[#0B0C0E] mt-auto mb-[-4px] relative z-20">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-2xl lg:text-5xl font-medium text-white mb-4">
                {t.services.supportCenter}
              </h2>
              <p className="text-gray-400 mb-8">
                {t.services.supportDesc}
              </p>
              <div className="flex flex-col items-center justify-center">
                {!showForm ? (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="tel:+998712622364"
                      className="inline-flex items-center gap-2 bg-[#244d85] text-white px-6 py-3 font-medium
                             transition-all duration-200 hover:bg-[#1E4ECC]"
                    >
                      <Phone size={18} />
                      +998 71 262 23 64
                    </a>
                    <button
                      onClick={() => setShowForm(true)}
                      className="inline-flex items-center gap-2 bg-white text-[#0B0C0E] px-6 py-3 font-medium
                             transition-all duration-200 hover:bg-gray-100"
                    >
                      {t.contacts.title}
                      <ChevronRight size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="w-full mt-12 animate-in fade-in slide-in-from-top-4 duration-500 max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                      <h3 className="text-xl font-medium text-white uppercase tracking-wider">{t.services.inquiryForm}</h3>
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
