import { createContext, useContext, useState, type ReactNode } from 'react';
import { type Language, getTranslation } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: ReturnType<typeof getTranslation>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const detectInitialLanguage = (): Language => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const browserLang = navigator.language.toLowerCase();

    // 1. Uzbekistan
    if (timezone === 'Asia/Tashkent' || browserLang.startsWith('uz')) return 'uz';

    // 2. Germany
    if (timezone.includes('Berlin') || timezone.includes('Busingen') || browserLang.startsWith('de')) return 'de';

    // 3. CIS Countries (Russian speaking)
    const cisTimezones = [
      'Europe/Moscow', 'Europe/Minsk', 'Asia/Almaty', 'Asia/Qyzylorda',
      'Asia/Bishkek', 'Asia/Dushanbe', 'Asia/Ashgabat', 'Asia/Baku', 'Asia/Yerevan',
      'Europe/Chisinau', 'Europe/Kaliningrad', 'Europe/Volgograd', 'Europe/Samara',
      'Asia/Yekaterinburg', 'Asia/Omsk', 'Asia/Novosibirsk', 'Asia/Krasnoyarsk',
      'Asia/Irkutsk', 'Asia/Yakutsk', 'Asia/Vladivostok', 'Asia/Magadan'
    ];
    if (cisTimezones.some(tz => timezone.includes(tz)) || browserLang.startsWith('ru')) return 'ru';

    return 'en';
  } catch (e) {
    return 'en';
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(detectInitialLanguage());
  const t = getTranslation(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
