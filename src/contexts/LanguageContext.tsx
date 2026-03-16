import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { type Language, getTranslation } from '../data/translations';
import { useCms } from './CmsContext';
import { applyTranslationOverrides } from '../lib/cms';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: ReturnType<typeof getTranslation>;
}

const fallbackLanguageContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => undefined,
  t: getTranslation('en'),
};

const LanguageContext = createContext<LanguageContextType>(fallbackLanguageContext);
const PREFERRED_LANGUAGE_KEY = 'preferredLang';

function isLanguage(value: string | null): value is Language {
  return value === 'en' || value === 'ru' || value === 'uz' || value === 'de';
}

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
  } catch {
    return 'en';
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { translationOverrides } = useCms();
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      return 'en';
    }

    const savedLanguage = window.localStorage.getItem(PREFERRED_LANGUAGE_KEY);

    if (isLanguage(savedLanguage)) {
      return savedLanguage;
    }

    return detectInitialLanguage();
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(PREFERRED_LANGUAGE_KEY, lang);
    }
  }, []);

  const t = useMemo(
    () => applyTranslationOverrides(getTranslation(language), translationOverrides[language]),
    [language, translationOverrides],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  return useContext(LanguageContext);
}
