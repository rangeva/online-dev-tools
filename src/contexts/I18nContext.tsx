
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLanguage, Translations, TranslationKey, TranslationValues } from '@/types/i18n';
import { I18N_CONFIG, detectBrowserLanguage, getStoredLanguage, setStoredLanguage } from '@/i18n/config';
import { getTranslations } from '@/i18n/translations';

interface I18nContextType {
  language: SupportedLanguage;
  translations: Translations;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: TranslationKey, values?: TranslationValues) => string;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setCurrentLanguage] = useState<SupportedLanguage>(() => {
    return getStoredLanguage() || detectBrowserLanguage();
  });

  const [translations, setTranslations] = useState<Translations>(() => {
    return getTranslations(language);
  });

  const setLanguage = (newLanguage: SupportedLanguage) => {
    setCurrentLanguage(newLanguage);
    setTranslations(getTranslations(newLanguage));
    if (I18N_CONFIG.persistLanguage) {
      setStoredLanguage(newLanguage);
    }
  };

  const t = (key: TranslationKey, values?: TranslationValues): string => {
    const keys = key.split('.');
    let translation: any = translations;

    for (const k of keys) {
      if (translation && typeof translation === 'object' && k in translation) {
        translation = translation[k];
      } else {
        // Fallback to English if key not found
        const fallbackTranslations = getTranslations(I18N_CONFIG.fallbackLanguage);
        let fallback: any = fallbackTranslations;
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && fk in fallback) {
            fallback = fallback[fk];
          } else {
            return key; // Return key if translation not found
          }
        }
        translation = fallback;
        break;
      }
    }

    if (typeof translation !== 'string') {
      return key;
    }

    // Simple interpolation
    if (values) {
      return Object.entries(values).reduce((str, [key, value]) => {
        return str.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
      }, translation);
    }

    return translation;
  };

  const isRTL = false; // TODO: Implement RTL detection based on language

  useEffect(() => {
    // Update document language attribute
    document.documentElement.lang = language;
    
    // Update document direction for RTL languages
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  return (
    <I18nContext.Provider value={{
      language,
      translations,
      setLanguage,
      t,
      isRTL
    }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
