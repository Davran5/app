import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ContactForm from '../components/ContactForm';

export default function Contacts() {
  const { t } = useLanguage();
  const [selectedDept, setSelectedDept] = useState<number | null>(null);
  const [showFormMobile, setShowFormMobile] = useState(false);

  const departments = [
    { name: t.contacts.sales, email: 'info@krantas.uz', phone: '+998 90 330 00 00' },
    { name: t.contacts.service, email: 'info@krantas.uz', phone: '+998 90 330 90 90' },
    { name: t.contacts.parts, email: 'info@krantas.uz', phone: '+998 90 330 90 90' },
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
      <div className="relative z-10 bg-white w-full flex-1 flex flex-col">


        {/* Main Info Section - Grey Shade */}
        <section className="pt-12 lg:pt-16 pb-12 lg:pb-16 bg-gray-50">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
              {/* Contact Details List */}
              <div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0B0C0E] mb-4">
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
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0B0C0E] mb-10 text-left md:text-center">
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

            {/* Telegram Buttons Section */}
            <div className="mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6">
              <a
                href="https://t.me/Krantas_service_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#244d85] text-white rounded-sm hover:bg-[#1a3a63] transition-all shadow-md active:scale-95 group"
              >
                <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                  <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.52-.45-.01-1.33-.26-1.98-.48-.8-.27-1.43-.42-1.37-.89.03-.25.38-.51 1.03-.78 4.04-1.76 6.74-2.92 8.08-3.48 3.85-1.61 4.65-1.89 5.17-1.9.11 0 .37.03.54.17.14.12.18.28.2.45-.01.07.01.2 0 .24z" />
                  </svg>
                </div>
                <span className="font-display font-medium uppercase tracking-wider text-sm">{t.contacts.telegramService}</span>
              </a>

              <a
                href="https://t.me/krantasuz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#244d85] text-[#244d85] rounded-sm hover:bg-[#244d85] hover:text-white transition-all shadow-sm active:scale-95 group"
              >
                <div className="bg-[#244d85]/10 p-2 rounded-full group-hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.52-.45-.01-1.33-.26-1.98-.48-.8-.27-1.43-.42-1.37-.89.03-.25.38-.51 1.03-.78 4.04-1.76 6.74-2.92 8.08-3.48 3.85-1.61 4.65-1.89 5.17-1.9.11 0 .37.03.54.17.14.12.18.28.2.45-.01.07.01.2 0 .24z" />
                  </svg>
                </div>
                <span className="font-display font-medium uppercase tracking-wider text-sm">{t.contacts.telegramKrantas}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-16 lg:py-20 bg-gray-50 overflow-hidden mb-[-1px]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">
              {/* Desktop View Title */}
              <h2 className="hidden md:block font-display text-4xl lg:text-5xl font-semibold text-[#0B0C0E] mb-12 text-center">
                {t.contacts.formTitle}
              </h2>

              {/* Mobile View Accordion Header */}
              <button
                onClick={() => setShowFormMobile(!showFormMobile)}
                className="md:hidden w-full flex items-center justify-between py-6 border-b border-gray-200 mb-8"
              >
                <h2 className="font-display text-3xl font-semibold text-[#0B0C0E]">
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
