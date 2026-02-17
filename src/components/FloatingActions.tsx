import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function FloatingActions() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="fixed bottom-20 lg:bottom-6 right-6 flex flex-col gap-3 z-50">
            {/* Scroll to Top */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="w-12 h-12 bg-[#0B0C0E] text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center animate-in fade-in slide-in-from-bottom-4"
                    title="Scroll to top"
                    aria-label="Scroll to top"
                >
                    <ChevronUp size={20} />
                </button>
            )}
        </div>
    );
}
