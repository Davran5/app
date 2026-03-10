import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCms } from '../contexts/CmsContext';

/**
 * GlobalBanner Component
 * 
 * This component acts as the Hero section for all sub-pages. 
 * Requirements:
 * 1. Aspect Ratio: 4 / 1 with min-height: 280px to prevent distortion.
 * 2. Full-width layers for all shapes to ensure exact coordinate mapping.
 * 3. Exact clip-paths for Yellow Background and the three "N" logo pieces.
 * 4. Text Content: relative, z-index 5, 60% width, specific padding.
 */
export default function GlobalBanner() {
    const location = useLocation();
    const { t } = useLanguage();
    const { getCategoryById, getProductById } = useCms();

    // Root homepage and full-screen app pages do not show this banner
    if (location.pathname === '/' || location.pathname === '/find-dealer') return null;

    // Map current route to localized content
    const getPageData = () => {
        const path = location.pathname;
        const params = new URLSearchParams(location.search);
        const categoryId = params.get('category') || path.split('/').pop() || '';

        // Exact matches
        if (path === '/about') return { title: t.about.heroTitle, desc: t.about.heroIntro };
        if (path === '/products') return { title: t.productsPage.title, desc: t.productsPage.heroIntro };
        if (path === '/catalog') {
            const categoryName =
                (categoryId && t.categories?.[categoryId as keyof typeof t.categories]?.name) ||
                getCategoryById(categoryId)?.name ||
                t.catalog.title;
            return { title: categoryId ? categoryName : t.catalog.title, desc: t.catalog.heroIntro };
        }
        if (path === '/custom-solutions') return { title: t.customSolutionsPage.heroTitle, desc: t.customSolutionsPage.heroIntro };
        if (path === '/services') return { title: t.nav.services, desc: t.production.heading };
        if (path === '/contacts') return { title: t.nav.contacts, desc: t.contacts?.heroIntro || '' };
        if (path === '/news') return { title: t.nav.blog, desc: t.blog.heroIntro };
        if (path === '/careers') return { title: t.nav.careers, desc: t.careers.heroIntro };

        // Dynamic path handling
        if (path.startsWith('/catalog/')) {
            const categoryName =
                t.categories?.[categoryId as keyof typeof t.categories]?.name ||
                getCategoryById(categoryId)?.name ||
                t.catalog.title;
            return { title: categoryName, desc: '' };
        }
        if (path.startsWith('/product/')) {
            const productId = path.split('/').pop() || '';
            const productName =
                t.productsData?.[productId as keyof typeof t.productsData]?.name ||
                getProductById(productId)?.name ||
                t.products.title;
            return { title: productName, desc: '' };
        }

        return { title: 'KRANTAS', desc: '' };
    };

    const { title, desc } = getPageData();





    return (
        <section
            className="hero-section w-full relative flex items-center justify-start mt-[64px] mb-[-3rem] lg:mt-[60px] lg:mb-0 bg-white overflow-hidden"
        >
            {/* Background Image - Defines the section height naturally */}
            <img
                src="/hero_cover.png"
                alt="Hero"
                className="w-full h-[180px] object-cover object-top block z-0 relative drop-shadow-[-10px_10px_30px_rgba(0,0,0,0.45)] md:h-auto md:object-fill"
            />

            {/* Dark Fade Overlay - Left to Middle focus */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0) 60%)' }}
            />

            {/* Content Container - Aligned with main site body */}
            <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full flex flex-col items-start">
                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.95] text-[#f6b947]">
                        {title}
                    </h1>
                    {desc && (
                        <p className="text-white text-sm md:text-base lg:text-lg font-medium mt-4 max-w-2xl opacity-90">
                            {desc.split(' ').slice(0, 4).join(' ')}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
