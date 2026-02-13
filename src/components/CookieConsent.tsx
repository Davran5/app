import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getGPCStatus, isGDPRRegion } from '../utils/privacy';
import { Shield, Check, X } from 'lucide-react';

export default function CookieConsent() {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [isGPCEnabled, setIsGPCEnabled] = useState(false);
    const [isGDPR, setIsGDPR] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('krantas_cookie_consent');

        const gpc = getGPCStatus();
        const gdpr = isGDPRRegion();

        setIsGPCEnabled(gpc);
        setIsGDPR(gdpr);

        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('krantas_cookie_consent', 'all');
        setIsVisible(false);
    };

    const handleNecessaryOnly = () => {
        localStorage.setItem('krantas_cookie_consent', 'necessary');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-[#0B0C0E]/95 backdrop-blur-md border-t border-white/10 text-white shadow-2xl transition-all duration-500 animate-in slide-in-from-bottom">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                        <Shield className="w-5 h-5 text-[#244d85]" />
                        <h3 className="font-display font-medium text-lg">{t.cookieConsent?.title || 'Cookie Preferences'}</h3>

                        {isGPCEnabled && (
                            <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30 flex items-center gap-1">
                                <Check size={10} /> GPC Enabled
                            </span>
                        )}

                        {isGDPR && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                                EU Region
                            </span>
                        )}
                    </div>

                    <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
                        {t.cookieConsent?.description || 'We use cookies to ensure you get the best experience on our website. Global Privacy Control (GPC) signal detected.'}
                        {isGPCEnabled && " Your Global Privacy Control signal is respected; marketing cookies are disabled by default."}
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    <button
                        onClick={handleNecessaryOnly}
                        className="px-6 py-2.5 rounded text-sm font-medium border border-white/10 hover:bg-white/5 transition-colors flex-1 md:flex-none whitespace-nowrap"
                    >
                        {t.cookieConsent?.necessaryOnly || 'Necessary Only'}
                    </button>
                    <button
                        onClick={handleAcceptAll}
                        className="px-6 py-2.5 rounded text-sm font-medium bg-[#244d85] hover:bg-[#1E4ECC] transition-colors flex-1 md:flex-none whitespace-nowrap shadow-lg shadow-[#244d85]/20"
                    >
                        {t.cookieConsent?.acceptAll || 'Accept All'}
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="md:hidden text-gray-500 p-2"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
