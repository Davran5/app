import { Suspense, lazy, useState } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import CookieConsent from './components/CookieConsent';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';
import GlobalBanner from './components/GlobalBanner';
import ImageProtection from './components/ImageProtection';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import SecurityOverlay from './components/SecurityOverlay';
import SeoManager from './components/SeoManager';
import { AnalyticsProvider } from './contexts/AnalyticsContext';
import { CmsProvider } from './contexts/CmsContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const Careers = lazy(() => import('./pages/Careers'));
const Catalog = lazy(() => import('./pages/Catalog'));
const Contacts = lazy(() => import('./pages/Contacts'));
const CustomSolutions = lazy(() => import('./pages/CustomSolutions'));
const FindDealer = lazy(() => import('./pages/FindDealer'));
const News = lazy(() => import('./pages/News'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Products = lazy(() => import('./pages/Products'));
const Services = lazy(() => import('./pages/Services'));

function CategoryRedirect() {
  const { categoryId } = useParams<{ categoryId: string }>();
  return <Navigate to={`/catalog?category=${categoryId}`} replace />;
}

function RouteFallback() {
  return (
    <div className="flex h-full min-h-0 w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#244d85]/15 border-t-[#244d85]" />
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500">
          Loading
        </p>
      </div>
    </div>
  );
}

function AppContent({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (val: boolean) => void;
}) {
  const location = useLocation();
  const isFindDealer = location.pathname === '/find-dealer';
  const isAdmin = location.pathname.startsWith('/admin');
  const isFixedViewportRoute = isFindDealer || isAdmin;

  return (
      <div
        className={`w-full flex flex-col lg:pt-0 ${
          isFixedViewportRoute
            ? 'h-[100dvh] overflow-hidden'
            : 'min-h-[100dvh] supports-[min-height:100dvh]:min-h-[100dvh]'
        } ${
          'bg-white'
        }`}
      >
      <ScrollToTop />
      <SeoManager>
        <AnalyticsProvider>
          {!isAdmin && <ImageProtection />}
          {!isAdmin && (
            <Navigation
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          )}
          {!isAdmin && <GlobalBanner />}
          <main
            className={
              isFindDealer
                ? 'flex-1 min-h-0 w-full overflow-hidden pt-[calc(4rem+env(safe-area-inset-top))] lg:pt-[60px]'
                : isAdmin
                  ? 'flex flex-1 min-h-0 w-full overflow-hidden'
                  : 'flex-1 flex flex-col w-full'
            }
          >
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/catalog/:categoryId" element={<CategoryRedirect />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/custom-solutions" element={<CustomSolutions />} />
                <Route path="/services" element={<Services />} />
                <Route path="/news" element={<News />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/find-dealer" element={<FindDealer />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          {!isAdmin && !isFindDealer && <Footer />}
          {!isAdmin && !isFindDealer && !isMobileMenuOpen && <FloatingActions />}
        </AnalyticsProvider>
      </SeoManager>
      <SecurityOverlay />
      {!isAdmin && <CookieConsent />}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0B0C0E',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <CmsProvider>
      <LanguageProvider>
        <HelmetProvider>
          <Router>
            <AppContent
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </Router>
        </HelmetProvider>
      </LanguageProvider>
    </CmsProvider>
  );
}

export default App;
