import { Link } from 'react-router-dom';
import { Linkedin, Youtube } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

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
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="font-display text-2xl font-bold block mb-4">
              KRANTAS
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {t.footer.description || 'Engineering strength since 1945. Full-cycle manufacturing of industrial vehicles and equipment.'}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-[#244d85] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-[#244d85] transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-medium mb-4">{t.footer.navigation || 'Navigation'}</h4>
            <ul className="space-y-2">
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
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-medium mb-4">{t.footer.products || 'Products'}</h4>
            <ul className="space-y-2">
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
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-medium mb-4">{t.footer.contact || 'Contact'}</h4>
            <ul className="space-y-4">
              <li>
                <span className="text-sm text-gray-400 block">{t.contacts.phone}</span>
              </li>
              <li>
                <span className="text-sm text-gray-400 block">{t.contacts.email}</span>
              </li>
              <li>
                <span className="text-sm text-gray-400 block">
                  {t.contacts.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
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
