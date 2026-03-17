import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCms } from '../contexts/CmsContext';

export default function GlobalBanner() {
    const location = useLocation();
    const { t, language } = useLanguage();
    const { getCategoryById, getProductById } = useCms();
    const path = location.pathname;

    if (path === '/' || path === '/find-dealer') return null;

    const isKnownStaticPage = [
        '/about',
        '/products',
        '/catalog',
        '/custom-solutions',
        '/services',
        '/contacts',
        '/news',
        '/careers',
        '/privacy-policy',
        '/terms-of-service',
    ].includes(path);
    const isCatalogCategoryPage = path.startsWith('/catalog/');
    const isProductPage = path.startsWith('/product/');

    if (!isKnownStaticPage && !isCatalogCategoryPage && !isProductPage) {
        return null;
    }

    const getPageData = () => {
        const params = new URLSearchParams(location.search);
        const categoryId = params.get('category') || path.split('/').pop() || '';

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
        if (path === '/privacy-policy') return { title: t.footer.privacy, desc: '' };
        if (path === '/terms-of-service') return { title: t.footer.terms, desc: '' };

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

    const { title } = getPageData();
    const useCompactMobileTitle = language === 'de' && path === '/custom-solutions';

    return (
        <section
            className="hero-section w-full relative flex items-center justify-start mt-[64px] mb-[-3rem] lg:mt-[60px] lg:mb-0 bg-white overflow-hidden"
        >
            <img
                src="/hero_cover.png"
                alt="Hero"
                className="w-full h-[180px] object-cover object-top block z-0 relative drop-shadow-[-10px_10px_30px_rgba(0,0,0,0.45)] md:h-auto md:object-fill"
            />

            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0) 60%)' }}
            />

            <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full flex flex-col items-start">
                    <h1
                        className={`font-display font-bold uppercase leading-[0.95] text-[#f6b947] ${
                            useCompactMobileTitle
                                ? 'text-[1.55rem] sm:text-[1.8rem] md:text-6xl lg:text-7xl tracking-[-0.05em]'
                                : 'text-4xl md:text-6xl lg:text-7xl tracking-tight'
                        }`}
                    >
                        {title}
                    </h1>
                </div>
            </div>
        </section>
    );
}
