import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';

export default function Contacts() {
  const { t } = useLanguage();
  const [selectedDept, setSelectedDept] = useState<number | null>(null);
  const [showFormMobile, setShowFormMobile] = useState(false);

  const departments = [
    { name: t.contacts.sales, email: 'sales@krantas.uz', phone: '+998 71 262 23 62' },
    { name: t.contacts.support, email: 'support@krantas.uz', phone: '+998 71 262 23 63' },
    { name: t.contacts.service, email: 'service@krantas.uz', phone: '+998 71 262 23 64' },
    { name: t.contacts.parts, email: 'parts@krantas.uz', phone: '+998 71 262 23 65' },
    { name: t.contacts.hr, email: 'hr@krantas.uz', phone: '+998 71 262 23 66' },
    { name: t.contacts.export, email: 'export@krantas.uz', phone: '+998 71 262 23 67' },
  ];

  useEffect(() => {
    if (window.location.hash === '#contact-form') {
      setTimeout(() => {
        const element = document.getElementById('contact-form');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="bg-white min-h-screen w-full flex-1 flex flex-col">
      <Hero title={t.contacts.title} description={t.contacts.heroIntro} />

      <div className="relative z-10 bg-white -mt-12 lg:-mt-16 w-full flex-1 flex flex-col">


        {/* Main Info Section - Grey Shade */}
        <section className="pt-12 lg:pt-16 pb-12 lg:pb-16 bg-gray-50">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
              {/* Contact Details List */}
              <div>
                <h2 className="font-display text-3xl lg:text-5xl font-medium text-[#0B0C0E] mb-4">
                  {t.contacts.headquarters.title}
                </h2>
                <p className="text-[#0B0C0E] text-base mb-10 leading-relaxed max-w-lg">
                  {t.contacts.headquarters.description}
                </p>

                <div className="space-y-8">
                  <div>
                    <h4 className="font-bold text-[#0B0C0E] text-base mb-1">{t.contacts.headquarters.officeLabel}</h4>
                    <p className="text-[#0B0C0E] text-base">{t.contacts.address}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#0B0C0E] text-base mb-1">{t.contacts.headquarters.postalCodeLabel}</h4>
                    <p className="text-[#0B0C0E] text-base">
                      100170,<br />
                      Tashkent, Uzbekistan
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#0B0C0E] text-base mb-1">{t.contacts.headquarters.contactInfoLabel}</h4>
                    <div className="space-y-2">
                      <a
                        href="tel:+998712622361"
                        className="text-[#244d85] text-base hover:text-[#1E4ECC] block font-medium"
                      >
                        +998 71 262 23 61
                      </a>
                      <p className="text-[#0B0C0E] text-base">info@krantas.uz</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-[300px] lg:h-[450px] shadow-lg rounded-sm overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d69986.21928742316!2d69.23010323755233!3d41.3077110733337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef5cbe0dfe09b%3A0x1e35c425100b1289!2sKRANTAS!5e0!3m2!1sen!2s!4v1770980846718!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Krantas Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Departments Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <h2 className="font-display text-2xl lg:text-5xl font-medium text-[#0B0C0E] mb-10 text-center">
              {t.contacts.departments}
            </h2>

            {/* Desktop View: Grid */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 shadow-sm hover:shadow-md transition-all rounded-sm border border-gray-100"
                >
                  <h4 className="font-display text-xl font-medium text-[#0B0C0E] mb-3">{dept.name}</h4>
                  <div className="space-y-1 text-base">
                    <p className="text-gray-600">{dept.email}</p>
                    <p className="text-gray-600">{dept.phone}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile View: Dropdown Accordion */}
            <div className="sm:hidden space-y-4">
              <div className="flex flex-col border-t border-gray-100">
                {departments.map((dept, index) => (
                  <div key={index} className="border-b border-gray-100">
                    <button
                      onClick={() => setSelectedDept(selectedDept === index ? null : index)}
                      className={`w-full text-left py-6 flex items-center justify-between transition-all duration-300 ${selectedDept === index ? 'text-[#244d85]' : 'text-[#0B0C0E]'}`}
                    >
                      <h4 className="font-display text-lg font-medium">
                        {dept.name}
                      </h4>
                      <ChevronRight
                        size={20}
                        className={`transition-transform duration-300 ${selectedDept === index ? 'rotate-90 text-[#244d85]' : 'text-gray-300'}`}
                      />
                    </button>

                    {selectedDept === index && (
                      <div className="pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="space-y-2 text-base">
                          <p className="text-gray-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#244d85]"></span>
                            {dept.email}
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#244d85]"></span>
                            {dept.phone}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-16 lg:py-20 bg-gray-50 overflow-hidden mb-[-1px]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">
              {/* Desktop View Title */}
              <h2 className="hidden lg:block font-display text-5xl font-medium text-[#0B0C0E] mb-12 text-center">
                {t.contacts.formTitle}
              </h2>

              {/* Mobile View Accordion Header */}
              <button
                onClick={() => setShowFormMobile(!showFormMobile)}
                className="lg:hidden w-full flex items-center justify-between py-6 border-b border-gray-200 mb-8"
              >
                <h2 className="font-display text-2xl font-medium text-[#0B0C0E]">
                  {t.contacts.formTitle}
                </h2>
                <ChevronRight
                  size={24}
                  className={`transition-transform duration-300 ${showFormMobile ? 'rotate-90 text-[#244d85]' : 'text-gray-400'}`}
                />
              </button>

              {/* Form Content - Desktop always visible, Mobile conditional */}
              <div className={`${showFormMobile ? 'block animate-in fade-in slide-in-from-top-4 duration-500' : 'hidden lg:block'}`}>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
