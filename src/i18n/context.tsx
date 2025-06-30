
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, TranslationKey } from './translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | ReactNode>) => string | ReactNode;
  tString: (key: TranslationKey, params?: Record<string, string>) => string;
  availableLanguages: { code: Language; name: string }[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const availableLanguages = [
  { code: 'en' as Language, name: 'English' },
  { code: 'es' as Language, name: 'Español' },
];

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get language from localStorage first
    const saved = localStorage.getItem('preferred-language');
    if (saved && (saved === 'en' || saved === 'es')) {
      return saved as Language;
    }
    
    // Fall back to browser language detection
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('es')) return 'es';
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const t = (key: TranslationKey, params?: Record<string, string | ReactNode>): string | ReactNode => {
    let translation = translations[language][key] || translations.en[key] || key;
    
    if (params && typeof translation === 'string') {
      Object.entries(params).forEach(([paramKey, value]) => {
        if (typeof value === 'string') {
          translation = translation.replace(`{${paramKey}}`, value);
        } else {
          // For ReactNode values, we need to return a ReactNode
          const parts = translation.split(`{${paramKey}}`);
          if (parts.length > 1) {
            return (
              <>
                {parts[0]}
                {value}
                {parts.slice(1).join(`{${paramKey}}`)}
              </>
            );
          }
        }
      });
    }
    
    return translation;
  };

  const tString = (key: TranslationKey, params?: Record<string, string>): string => {
    let translation = translations[language][key] || translations.en[key] || key;
    
    if (params && typeof translation === 'string') {
      Object.entries(params).forEach(([paramKey, value]) => {
        translation = translation.replace(`{${paramKey}}`, value);
      });
    }
    
    return translation as string;
  };

  return (
    <I18nContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      tString,
      availableLanguages 
    }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
