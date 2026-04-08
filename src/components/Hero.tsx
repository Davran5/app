import React from 'react';
import { useCms } from '../contexts/CmsContext';

interface HeroProps {
    title: string;
}

const Hero: React.FC<HeroProps> = ({ title }) => {
    const { getSectionMedia } = useCms();
    const heroBg = getSectionMedia('global.hero.backgroundImage', '/hero_cover.png');

    return (
        <>
            <section className="fixed top-0 left-0 w-full h-[280px] lg:h-[360px] z-0 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-top bg-no-repeat"
                    style={{ backgroundImage: `url(${heroBg})` }}
                />
            </section>
            <div className="relative w-full h-[280px] lg:h-[360px] flex items-start pt-20 lg:pt-24 z-10 pointer-events-none">
                <div className="relative w-full max-w-[1440px] mx-auto px-6 lg:px-12">
                    <div className="max-w-5xl">
                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#0B0C0E] mb-6 uppercase tracking-tight leading-[0.95]">
                            {title}
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
