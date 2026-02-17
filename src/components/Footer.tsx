import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.catalog, href: '/catalog' },
    { label: t.nav.services, href: '/services' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.blog, href: '/news' },
    { label: t.nav.careers, href: '/careers' },
    { label: t.nav.contacts, href: '/contacts' },
  ];

  return (
    <footer className="bg-[#0B0C0E] text-white relative z-10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-6 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-10 lg:gap-8">
          {/* Logo & Description */}
          <div className="hidden lg:block lg:col-span-1 text-center lg:text-left mb-8 lg:mb-0">
            <Link to="/" className="font-display text-2xl font-bold block mb-4">
              KRANTAS
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {t.footer.description || 'Engineering strength since 1945. Full-cycle manufacturing of industrial vehicles and equipment.'}
            </p>
          </div>

          {/* Navigation */}
          <div className="hidden lg:block text-center lg:text-left">
            {/* Desktop Navigation Title */}
            <h4 className="hidden lg:block font-display font-medium mb-4">{t.footer.navigation || 'Navigation'}</h4>

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => toggleSection('nav')}
              className="lg:hidden w-full flex items-center justify-between py-4 border-b border-white/10"
            >
              <h4 className="font-display font-medium">{t.footer.navigation || 'Navigation'}</h4>
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${openSection === 'nav' ? 'rotate-180' : ''} text-gray-500`}
              />
            </button>

            {/* Desktop Navigation */}
            <ul className="hidden lg:space-y-2 lg:block">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Navigation Content */}
            <div className={`lg:hidden ${openSection === 'nav' ? 'block animate-in fade-in slide-in-from-top-2 duration-300' : 'hidden'} pb-2`}>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-center">
                {[
                  { label: t.nav.catalog, href: '/catalog' },
                  { label: t.nav.services, href: '/services' },
                  { label: t.nav.about, href: '/about' },
                  { label: t.nav.blog, href: '/news' },
                  { label: t.nav.careers, href: '/careers' },
                  { label: t.nav.contacts, href: '/contacts' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors px-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="hidden lg:block text-center lg:text-left">
            {/* Desktop Products Title */}
            <h4 className="hidden lg:block font-display font-medium mb-4">{t.footer.products || 'Products'}</h4>

            {/* Mobile Products Toggle */}
            <button
              onClick={() => toggleSection('products')}
              className="lg:hidden w-full flex items-center justify-between py-4 border-b border-white/10"
            >
              <h4 className="font-display font-medium">{t.footer.products || 'Products'}</h4>
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${openSection === 'products' ? 'rotate-180' : ''} text-gray-500`}
              />
            </button>

            {/* Desktop Products */}
            <ul className="hidden lg:space-y-2 lg:block">
              <li>
                <Link to="/custom-solutions" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t.productsPage.customTitle}
                </Link>
              </li>
              <li>
                <Link to="/catalog/dump-trucks" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t.categories['dump-trucks']?.name}
                </Link>
              </li>
              <li>
                <Link to="/catalog/overhead-cranes" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t.categories['overhead-gantry']?.name}
                </Link>
              </li>
              <li>
                <Link to="/catalog/agricultural" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t.categories['agricultural']?.name}
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-sm text-[#244d85] hover:text-[#fdc15e] transition-colors">
                  {t.footer.viewAll}
                </Link>
              </li>
            </ul>

            {/* Mobile Products Content */}
            <div className={`lg:hidden ${openSection === 'products' ? 'block animate-in fade-in slide-in-from-top-2 duration-300' : 'hidden'} pb-2`}>
              <div className="flex flex-col gap-4 items-center">
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-center w-full">
                  <Link to="/custom-solutions" className="text-sm text-gray-400 hover:text-white transition-colors text-center">
                    {t.equipment.customSolutions}
                  </Link>
                  <Link to="/catalog/dump-trucks" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {t.categories['dump-trucks']?.name}
                  </Link>
                  <Link to="/catalog/overhead-cranes" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {t.categories['overhead-gantry']?.name}
                  </Link>
                  <Link to="/catalog/agricultural" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {t.categories['agricultural']?.name}
                  </Link>
                </div>
                <Link to="/catalog" className="text-sm text-[#244d85] hover:text-[#fdc15e] transition-colors">
                  {t.footer.viewAll}
                </Link>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="hidden lg:block lg:col-span-1 text-center lg:text-left">
            {/* Desktop Contact Title */}
            <h4 className="hidden lg:block font-display font-medium mb-4">{t.footer.contact || 'Contact'}</h4>

            {/* Mobile Contact Toggle */}
            <button
              onClick={() => toggleSection('contact')}
              className="lg:hidden w-full flex items-center justify-between py-4 border-b border-white/10"
            >
              <h4 className="font-display font-medium">{t.footer.contact || 'Contact'}</h4>
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${openSection === 'contact' ? 'rotate-180' : ''} text-gray-500`}
              />
            </button>

            {/* Desktop Contact */}
            <ul className="hidden lg:space-y-4 lg:block">
              <li>
                <a href={`tel:${t.contacts.phone.replace(/\s/g, '')}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t.contacts.phone}
                </a>
              </li>
              <li>
                <span className="text-sm text-gray-400 block">{t.contacts.email}</span>
              </li>
              <li>
                <span className="text-sm text-gray-400 block leading-relaxed">
                  {t.contacts.address}
                </span>
              </li>
            </ul>

            {/* Mobile Contact Content */}
            <div className={`lg:hidden ${openSection === 'contact' ? 'block animate-in fade-in slide-in-from-top-2 duration-300' : 'hidden'} pb-2`}>
              <div className="flex flex-col gap-3 items-center">
                <a href={`tel:${t.contacts.phone.replace(/\s/g, '')}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t.contacts.phone}
                </a>
                <span className="text-sm text-gray-400">{t.contacts.email}</span>
                <span className="text-sm text-gray-400 leading-relaxed px-4">
                  {t.contacts.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-0 pt-0 border-t-0 lg:mt-12 lg:pt-6 lg:border-t lg:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} KRANTAS Group. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
              {t.footer.privacy}
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
