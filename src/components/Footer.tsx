import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCms } from '../contexts/CmsContext';

export default function Footer() {
  const { t } = useLanguage();
  const { categories } = useCms();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const footerCategories = categories
    .filter((category) => category.id !== 'custom-solutions' && category.id !== 'metal-structures')
    .slice(0, 3);

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
    <footer className="relative z-10 bg-[#0B0C0E] text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-6 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-8">
          <div className="mb-8 hidden text-center lg:col-span-1 lg:mb-0 lg:block lg:text-left">
            <Link to="/" className="mb-4 block font-display text-2xl font-bold">
              KRANTAS
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              {t.footer.description || 'Engineering strength since 1945. Full-cycle manufacturing of industrial vehicles and equipment.'}
            </p>
          </div>

          <div className="hidden text-center lg:block lg:text-left">
            <h4 className="hidden font-display font-medium lg:block">
              {t.footer.navigation || 'Navigation'}
            </h4>

            <button
              onClick={() => toggleSection('nav')}
              className="flex w-full items-center justify-between border-b border-white/10 py-4 lg:hidden"
            >
              <h4 className="font-display font-medium">{t.footer.navigation || 'Navigation'}</h4>
              <ChevronDown
                size={20}
                className={`text-gray-500 transition-transform duration-300 ${
                  openSection === 'nav' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <ul className="hidden lg:mt-4 lg:block lg:space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div
              className={`pb-2 lg:hidden ${
                openSection === 'nav'
                  ? 'block animate-in fade-in slide-in-from-top-2 duration-300'
                  : 'hidden'
              }`}
            >
              <div className="grid grid-cols-2 gap-x-2 gap-y-4 text-center">
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
                    className="px-1 text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden text-center lg:block lg:text-left">
            <h4 className="hidden font-display font-medium lg:block">
              {t.footer.products || 'Products'}
            </h4>

            <button
              onClick={() => toggleSection('products')}
              className="flex w-full items-center justify-between border-b border-white/10 py-4 lg:hidden"
            >
              <h4 className="font-display font-medium">{t.footer.products || 'Products'}</h4>
              <ChevronDown
                size={20}
                className={`text-gray-500 transition-transform duration-300 ${
                  openSection === 'products' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <ul className="hidden lg:mt-4 lg:block lg:space-y-2">
              <li>
                <Link
                  to="/custom-solutions"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {t.productsPage.customTitle}
                </Link>
              </li>
              {footerCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/catalog?category=${category.id}`}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {t.categories?.[category.id as keyof typeof t.categories]?.name || category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/catalog"
                  className="text-sm text-[#244d85] transition-colors hover:text-[#fdc15e]"
                >
                  {t.footer.viewAll}
                </Link>
              </li>
            </ul>

            <div
              className={`pb-2 lg:hidden ${
                openSection === 'products'
                  ? 'block animate-in fade-in slide-in-from-top-2 duration-300'
                  : 'hidden'
              }`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="grid w-full grid-cols-2 gap-x-2 gap-y-4 text-center">
                  <Link
                    to="/custom-solutions"
                    className="text-center text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {t.equipment.customSolutions}
                  </Link>
                  {footerCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/catalog?category=${category.id}`}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {t.categories?.[category.id as keyof typeof t.categories]?.name || category.name}
                    </Link>
                  ))}
                </div>
                <Link
                  to="/catalog"
                  className="text-sm text-[#244d85] transition-colors hover:text-[#fdc15e]"
                >
                  {t.footer.viewAll}
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden text-center lg:col-span-1 lg:block lg:text-left">
            <h4 className="hidden font-display font-medium lg:block">
              {t.footer.contact || 'Contact'}
            </h4>

            <button
              onClick={() => toggleSection('contact')}
              className="flex w-full items-center justify-between border-b border-white/10 py-4 lg:hidden"
            >
              <h4 className="font-display font-medium">{t.footer.contact || 'Contact'}</h4>
              <ChevronDown
                size={20}
                className={`text-gray-500 transition-transform duration-300 ${
                  openSection === 'contact' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <ul className="hidden lg:mt-4 lg:block lg:space-y-4">
              <li>
                <a
                  href={`tel:${t.contacts.phone.replace(/\s/g, '')}`}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {t.contacts.phone}
                </a>
              </li>
              <li>
                <span className="block text-sm text-gray-400">{t.contacts.email}</span>
              </li>
              <li>
                <span className="block text-sm leading-relaxed text-gray-400">
                  {t.contacts.address}
                </span>
              </li>
            </ul>

            <div
              className={`pb-2 lg:hidden ${
                openSection === 'contact'
                  ? 'block animate-in fade-in slide-in-from-top-2 duration-300'
                  : 'hidden'
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <a
                  href={`tel:${t.contacts.phone.replace(/\s/g, '')}`}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {t.contacts.phone}
                </a>
                <span className="text-sm text-gray-400">{t.contacts.email}</span>
                <span className="px-4 text-sm leading-relaxed text-gray-400">
                  {t.contacts.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-0 flex flex-col items-center justify-between gap-4 border-t-0 pt-0 md:flex-row lg:mt-12 lg:border-t lg:border-white/10 lg:pt-6">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} KRANTAS Group. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy-policy"
              className="text-xs text-gray-500 transition-colors hover:text-gray-400"
            >
              {t.footer.privacy}
            </Link>
            <Link
              to="/terms-of-service"
              className="text-xs text-gray-500 transition-colors hover:text-gray-400"
            >
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
