import { useState } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
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
import { CmsProvider } from './contexts/CmsContext';
import { LanguageProvider } from './contexts/LanguageContext';
import About from './pages/About';
import AdminPanel from './pages/AdminPanel';
import Careers from './pages/Careers';
import Catalog from './pages/Catalog';
import Contacts from './pages/Contacts';
import CustomSolutions from './pages/CustomSolutions';
import FindDealer from './pages/FindDealer';
import Home from './pages/Home';
import News from './pages/News';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import Services from './pages/Services';

function CategoryRedirect() {
  const { categoryId } = useParams<{ categoryId: string }>();
  return <Navigate to={`/catalog?category=${categoryId}`} replace />;
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
      <SeoManager />
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
        </Routes>
      </main>
      {!isAdmin && !isFindDealer && <Footer />}
      {!isAdmin && !isFindDealer && !isMobileMenuOpen && <FloatingActions />}
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
        <Router>
          <AppContent
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </Router>
      </LanguageProvider>
    </CmsProvider>
  );
}

export default App;
