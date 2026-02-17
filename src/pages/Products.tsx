import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import { useLanguage } from '../contexts/LanguageContext';

export default function Products() {
    const { t } = useLanguage();

    return (
        <div className="w-full flex-1 flex flex-col" style={{ backgroundColor: '#f8f8f8' }}>
            <Hero title={t.productsPage.title} description={t.productsPage.heroIntro} />

            <div className="relative z-10 -mt-12 lg:-mt-16 w-full flex-1 flex flex-col" style={{ backgroundColor: '#f8f8f8' }}>
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-12 lg:pt-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="font-display text-3xl lg:text-5xl font-semibold text-[#0B0C0E] mb-6">
                            {t.productsPage.heading}
                        </h2>
                        <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            {t.productsPage.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Features Section with Images */}
            <section className="pb-10 lg:pb-14 bg-gray-50">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
                        {/* Image Left */}
                        <div className="relative h-[320px] lg:h-[400px] rounded-sm overflow-hidden shadow-2xl">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: 'url(/cust_sol.jpg)' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-[#244d85]/20 to-transparent" />
                        </div>

                        {/* Content Right */}
                        <div>
                            <h3 className="font-display text-2xl lg:text-4xl font-medium text-[#0B0C0E] mb-6">
                                {t.productsPage.customTitle}
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                {t.productsPage.customDesc}
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#244d85]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-[#244d85]"></div>
                                    </div>
                                    <span className="text-gray-700">{t.productsPage.customPoints[1]}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#244d85]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-[#244d85]"></div>
                                    </div>
                                    <span className="text-gray-700">{t.productsPage.customPoints[2]}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#244d85]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-[#244d85]"></div>
                                    </div>
                                    <span className="text-gray-700">{t.productsPage.customPoints[3]}</span>
                                </li>
                            </ul>
                            <Link
                                to="/custom-solutions"
                                className="inline-flex items-center justify-center gap-2 bg-[#244d85] text-white px-8 py-4 font-semibold text-base hover:bg-[#1E4ECC] transition-all duration-300 shadow-lg hover:shadow-xl mt-2"
                            >
                                {t.productsPage.customLink}
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Content Left */}
                        <div className="order-2 lg:order-1">
                            <h3 className="font-display text-2xl lg:text-4xl font-medium text-[#0B0C0E] mb-6">
                                {t.productsPage.catalogTitle}
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                {t.productsPage.catalogDesc}
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#244d85]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-[#244d85]"></div>
                                    </div>
                                    <span className="text-gray-700">{t.productsPage.catalogPoints[1]}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#244d85]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-[#244d85]"></div>
                                    </div>
                                    <span className="text-gray-700">{t.productsPage.catalogPoints[2]}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#244d85]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-[#244d85]"></div>
                                    </div>
                                    <span className="text-gray-700">{t.productsPage.catalogPoints[3]}</span>
                                </li>
                            </ul>
                            <Link
                                to="/catalog"
                                className="inline-flex items-center justify-center gap-2 bg-[#244d85] text-white px-8 py-4 font-semibold text-base hover:bg-[#1E4ECC] transition-all duration-300 shadow-lg hover:shadow-xl mt-2"
                            >
                                {t.productsPage.catalogLink}
                                <ArrowRight size={20} />
                            </Link>
                        </div>

                        {/* Image Right */}
                        <div className="relative h-[320px] lg:h-[400px] rounded-sm overflow-hidden shadow-2xl order-1 lg:order-2">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: 'url(/prod_catalog.jpg)' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-[#244d85]/20 to-transparent" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
