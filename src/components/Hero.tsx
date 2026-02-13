import React from 'react';

interface HeroProps {
    title: string;
    description?: string;
}

const Hero: React.FC<HeroProps> = ({ title, description }) => {
    return (
        <>
            <section className="fixed top-0 left-0 w-full h-[280px] lg:h-[360px] z-0 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover lg:bg-[length:100%_auto] bg-top bg-no-repeat"
                    style={{ backgroundImage: 'url(/hero_cover.jpg)' }}
                />
            </section>
            <div className="relative h-[280px] lg:h-[360px] flex items-start pt-20 lg:pt-24 z-10 pointer-events-none">
                <div className="relative w-full max-w-[1440px] mx-auto px-6 lg:px-12">
                    <div className="max-w-5xl">
                        <h1 className="font-display text-4xl lg:text-6xl xl:text-7xl font-semibold text-[#0B0C0E] mb-4 uppercase tracking-tight leading-tight">
                            {title}
                        </h1>
                        {description && (
                            <p className="font-display text-lg lg:text-xl text-gray-700 max-w-2xl leading-relaxed">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
