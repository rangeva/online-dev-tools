import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { SupportedLanguage, Translations, TranslationKey, TranslationValues } from '@/types/i18n';
import { I18N_CONFIG, detectBrowserLanguage, getStoredLanguage, setStoredLanguage } from '@/i18n/config';
import { getTranslations } from '@/i18n/translations';
import { getLanguageFromPath } from '@/utils/multilingualRouting';

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
  const location = useLocation();
  
  // Extract language from URL on initial load
  const getInitialLanguage = (): SupportedLanguage => {
    console.log('I18nProvider - Getting initial language');
    console.log('I18nProvider - Current pathname:', location.pathname);
    
    try {
      const { language: urlLanguage } = getLanguageFromPath(location.pathname);
      console.log('I18nProvider - URL language:', urlLanguage);
      
      // If URL has a language, use it
      if (urlLanguage) {
        console.log('I18nProvider - Using URL language:', urlLanguage);
        return urlLanguage;
      }
      
      // Default to English for paths without language prefix
      console.log('I18nProvider - Using default language: en');
      return 'en';
    } catch (error) {
      console.error('I18nProvider - Error getting initial language:', error);
      return I18N_CONFIG.defaultLanguage;
    }
  };

  const [language, setCurrentLanguage] = useState<SupportedLanguage>(getInitialLanguage);
  const [translations, setTranslations] = useState<Translations>(() => {
    const initialLang = getInitialLanguage();
    console.log('I18nProvider - Loading initial translations for:', initialLang);
    return getTranslations(initialLang);
  });

  // Synchronize language with URL changes
  useEffect(() => {
    console.log('I18nProvider - URL effect triggered');
    console.log('I18nProvider - Current pathname:', location.pathname);
    console.log('I18nProvider - Current language state:', language);
    
    try {
      const { language: urlLanguage } = getLanguageFromPath(location.pathname);
      console.log('I18nProvider - URL language from effect:', urlLanguage);
      
      const targetLanguage = urlLanguage || 'en';
      
      if (targetLanguage !== language) {
        console.log('I18nProvider - Updating language state to:', targetLanguage);
        setCurrentLanguage(targetLanguage);
        setTranslations(getTranslations(targetLanguage));
        
        if (I18N_CONFIG.persistLanguage) {
          setStoredLanguage(targetLanguage);
        }
      }
    } catch (error) {
      console.error('I18nProvider - Error in URL effect:', error);
    }
  }, [location.pathname, language]); // Keep language in deps but handle it carefully

  const setLanguage = (newLanguage: SupportedLanguage) => {
    console.log('I18nProvider - Manual language change to:', newLanguage);
    setCurrentLanguage(newLanguage);
    setTranslations(getTranslations(newLanguage));
    
    if (I18N_CONFIG.persistLanguage) {
      setStoredLanguage(newLanguage);
    }
  };

  const t = (key: TranslationKey, values?: TranslationValues): string => {
    try {
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
    } catch (error) {
      console.warn('Translation error for key:', key, error);
      return key;
    }
  };

  const isRTL = false; // TODO: Implement RTL detection based on language

  useEffect(() => {
    console.log('I18nProvider - Setting document attributes for language:', language);
    
    try {
      // Update document language attribute
      document.documentElement.lang = language;
      
      // Update document direction for RTL languages
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    } catch (error) {
      console.error('I18nProvider - Error setting document attributes:', error);
    }
  }, [language, isRTL]);

  console.log('I18nProvider - Rendering with language:', language);

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
