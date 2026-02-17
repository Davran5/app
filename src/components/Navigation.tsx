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

interface NavigationProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (isOpen: boolean) => void;
}

export default function Navigation({ isMobileMenuOpen: externalIsOpen, setIsMobileMenuOpen: externalSetIsOpen }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [localIsMobileMenuOpen, setLocalIsMobileMenuOpen] = useState(false);
  const isMobileMenuOpen = externalIsOpen ?? localIsMobileMenuOpen;
  const setIsMobileMenuOpen = externalSetIsOpen ?? setLocalIsMobileMenuOpen;

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
      {/* --- DESKTOP NAVIGATION (Unchanged) --- */}
      <nav
        className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${!isScrolled
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-sm'
          }`}
      >
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-center h-[68px]">
            {/* Left Nav */}
            <div className="flex items-center justify-end gap-6 w-[calc(50%-135px)] pr-8 h-full">
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

            {/* Center Logo */}
            <div className="flex-shrink-0 w-72 flex justify-center">
              <Link to="/" className="transition-all duration-500">
                <img
                  src="/logo.png"
                  alt="KRANTAS"
                  loading="lazy"
                  className={`transition-all duration-500 object-contain ${!isScrolled && isHome
                    ? 'drop-shadow-[0_0_15px_rgba(253,193,94,0.5)]'
                    : ''
                    } ${isScrolled || location.pathname !== '/'
                      ? 'h-[34px]'
                      : 'h-[60px]'
                    }`}
                />
              </Link>
            </div>

            {/* Right Nav */}
            <div className="flex items-center justify-start gap-6 w-[calc(50%-135px)] pl-8 h-full">
              {navItems.right.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`flex items-center h-full text-sm transition-colors ${getTextColor(isActive(link.href))}`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Desktop Language Selector */}
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
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE NAVIGATION --- */}



      {/* 2. Mobile Bottom Menu Bar (Fixed) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 pb-[env(safe-area-inset-bottom)]">
        <div className="relative flex justify-center items-center h-16 px-6">

          {/* Centered Logo with Animation */}
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isMobileMenuOpen ? 'scale-150' : 'scale-100'
              }`}
          >
            <img
              src="/logo.png"
              alt="KRANTAS"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Bottom Right Menu Toggle (Absolute) */}
          <div className="absolute right-6 h-full flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center p-2 text-[#244d85] active:bg-gray-50 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Menu Content (Drop-Up) */}
      {/* Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Drop-up Panel */}
      <div
        className={`lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] transform ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'
          } max-h-[85vh] overflow-y-auto`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex flex-col p-6 pb-8">

          {/* Menu Items */}
          <div className="flex flex-col gap-1">
            {[...navItems.left, ...navItems.right].map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-center text-lg font-medium py-3 rounded-lg active:bg-gray-50 text-[#0B0C0E] ${isActive(link.href) ? 'font-bold text-[#244d85] bg-blue-50/50' : ''
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="h-px bg-gray-100 my-6 w-full" />

          {/* Language Switcher */}
          <div className="flex justify-center gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as typeof language)}
                className={`py-2 px-5 text-sm font-bold uppercase transition-all rounded-full ${language === lang.code
                  ? 'bg-[#244d85] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-500'
                  }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
