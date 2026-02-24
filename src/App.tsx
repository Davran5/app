import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LanguageProvider } from './contexts/LanguageContext';
import CookieConsent from './components/CookieConsent';
import SecurityOverlay from './components/SecurityOverlay';
import Navigation from './components/Navigation';
import GlobalBanner from './components/GlobalBanner';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingActions from './components/FloatingActions';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import { Navigate, useParams } from 'react-router-dom';

// Redirects /catalog/:categoryId → /catalog?category=:categoryId
function CategoryRedirect() {
  const { categoryId } = useParams<{ categoryId: string }>();
  return <Navigate to={`/catalog?category=${categoryId}`} replace />;
}
import CustomSolutions from './pages/CustomSolutions';
import Services from './pages/Services';
import News from './pages/News';
import Careers from './pages/Careers';
import Contacts from './pages/Contacts';
import FindDealer from './pages/FindDealer';

function AppContent({ isMobileMenuOpen, setIsMobileMenuOpen }: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (val: boolean) => void
}) {
  const location = useLocation();
  const isFindDealer = location.pathname === '/find-dealer';

  return (
    <div className="min-h-[100dvh] w-full bg-white flex flex-col supports-[min-height:100dvh]:min-h-[100dvh] transition-all duration-300 lg:pt-0">
      <ScrollToTop />
      <Navigation
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <GlobalBanner />
      <main className="flex-1 flex flex-col w-full">
        <Routes>
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
      {!isFindDealer && <Footer />}
      {!isMobileMenuOpen && <FloatingActions />}
      <SecurityOverlay />
      <CookieConsent />
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
    <LanguageProvider>
      <Router>
        <AppContent
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </Router>
    </LanguageProvider>
  );
}

export default App;
