import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { code: 'uz', label: 'UZ' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
] as const;

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLangOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const navItems = {
    left: [
      { label: t.nav.customSolutions, href: '/custom-solutions' },
      { label: t.nav.catalog, href: '/catalog' },
      { label: t.nav.about, href: '/about' },
    ],
    right: [
      { label: t.nav.services, href: '/services' },
      { label: t.nav.blog, href: '/news' },
      { label: t.nav.careers, href: '/careers' },
      { label: t.nav.contacts, href: '/contacts' },
    ],
  };

  // Text color based on background
  const getTextColor = (isActiveLink: boolean) => {
    // Determine color based on scroll state and page
    let colorClass;

    if (isScrolled) {
      // Always blue when scrolled
      colorClass = `text-[#244d85] hover:text-[#1a3a66]`;
    } else {
      // Transparent Background State
      if (isHome) {
        // Home Page: Yellow
        colorClass = `text-[#fdc15e] hover:text-[#fff] drop-shadow-md`;
      } else {
        // Other Pages: Blue (as requested)
        colorClass = `text-[#244d85] hover:text-[#1a3a66]`;
      }
    }

    return `${colorClass} transition-colors ${isActiveLink ? 'font-bold' : 'font-medium'}`;
  };

  const currentLang = languages.find(l => l.code === language) || languages[2];

  // Check if we are on home page
  const isHome = location.pathname === '/';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${!isScrolled
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-sm'
          }`}
      >

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center h-[54px] lg:h-[68px]">
            {/* Left Navigation - Fixed width to balance */}
            <div className="hidden lg:flex items-center justify-end gap-6 w-[calc(50%-135px)] pr-8 h-full">
              {navItems.left.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`flex items-center h-full text-sm transition-colors ${getTextColor(isActive(link.href))}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Center Logo - Fixed width */}
            <div className="flex-shrink-0 w-48 lg:w-72 flex justify-center">
              <Link
                to="/"
                className="transition-all duration-500"
              >
                <img
                  src="/logo.png"
                  alt="KRANTAS"
                  className={`transition-all duration-500 object-contain ${
                    // Center glow effect for logo (using drop-shadow on filter)
                    !isScrolled && isHome
                      ? 'drop-shadow-[0_0_15px_rgba(253,193,94,0.5)]' // Home: Yellow glow
                      : ''
                    } ${isScrolled || location.pathname !== '/'
                      ? 'h-[27px] lg:h-[34px]'
                      : 'h-[41px] lg:h-[60px]'
                    }`}
                />
              </Link>
            </div>

            {/* Right Navigation - Fixed width to balance */}
            <div className="hidden lg:flex items-center justify-start gap-6 w-[calc(50%-135px)] pl-8 h-full">
              {navItems.right.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`flex items-center h-full text-sm transition-colors ${getTextColor(isActive(link.href))}`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Language Selector - Absolute Positioned to prevent layout shift */}
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center"
                onMouseLeave={() => setIsLangOpen(false)}
                onMouseEnter={() => setIsLangOpen(true)}
              >
                <div className={`flex items-center px-4 py-2 transition-all duration-300 rounded-full ${isLangOpen
                  ? (isScrolled || !isHome ? 'bg-[#244d85]/5' : 'bg-white/10')
                  : ''
                  }`}>
                  <button
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${isScrolled || !isHome
                      ? 'text-[#244d85] hover:text-[#1a3a66]'
                      : 'text-[#fdc15e] hover:text-white'
                      }`}
                  >
                    <Globe size={14} />
                    <span className="font-bold">{currentLang.label}</span>
                  </button>

                  <div
                    className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out ${isLangOpen ? 'max-w-[200px] opacity-100 ml-4' : 'max-w-0 opacity-0 ml-0 pointer-events-none'
                      }`}
                  >
                    <div className="flex items-center gap-4 border-l border-gray-300/30 pl-4">
                      {languages.filter(l => l.code !== language).map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as typeof language);
                            setIsLangOpen(false);
                          }}
                          className={`text-xs font-bold transition-colors ${isScrolled || !isHome
                            ? 'text-[#244d85]/60 hover:text-[#244d85]'
                            : 'text-[#fdc15e]/80 hover:text-white'
                            }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                className={`lg:hidden p-2 ml-auto ${isScrolled || !isHome ? 'text-[#244d85]' : 'text-[#fdc15e]'
                  }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>



      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto">
          <div className="flex flex-col p-6 gap-2">
            {[...navItems.left, ...navItems.right].map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-lg font-display font-medium py-3 text-[#244d85] ${isActive(link.href) ? 'font-bold' : ''
                  }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile Language Switcher */}
            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-3">Language</p>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as typeof language)}
                    className={`flex-1 py-3 text-sm font-medium uppercase transition-all ${language === lang.code
                      ? 'bg-[#244d85] text-white shadow-md'
                      : 'bg-gray-100 text-gray-500'
                      }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
