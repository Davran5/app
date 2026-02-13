import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LanguageProvider } from './contexts/LanguageContext';
import CookieConsent from './components/CookieConsent';
import SecurityOverlay from './components/SecurityOverlay';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingActions from './components/FloatingActions';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import CustomSolutions from './pages/CustomSolutions';
import Services from './pages/Services';
import News from './pages/News';
import Careers from './pages/Careers';
import Contacts from './pages/Contacts';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <ScrollToTop />
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/catalog/:categoryId" element={<CategoryPage />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/custom-solutions" element={<CustomSolutions />} />
              <Route path="/services" element={<Services />} />
              <Route path="/news" element={<News />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
          </main>
          <Footer />
          <FloatingActions />
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
      </Router>
    </LanguageProvider>
  );
}

export default App;
