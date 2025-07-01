
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
      if (urlLanguage && urlLanguage !== 'en') {
        console.log('I18nProvider - Using URL language:', urlLanguage);
        return urlLanguage;
      }
      
      // For root path, check stored/detected language but don't auto-redirect
      if (location.pathname === '/') {
        const storedLanguage = getStoredLanguage();
        console.log('I18nProvider - Stored language:', storedLanguage);
        
        // Only use stored language if it's not English (since English is default)
        if (storedLanguage && storedLanguage !== 'en') {
          return storedLanguage;
        }
      }
      
      // Default to English
      console.log('I18nProvider - Using default language: en');
      return 'en';
    } catch (error) {
      console.error('I18nProvider - Error getting initial language:', error);
      return I18N_CONFIG.defaultLanguage;
    }
  };

  const [language, setCurrentLanguage] = useState<SupportedLanguage>(getInitialLanguage);
  const [translations, setTranslations] = useState<Translations>(() => {
    console.log('I18nProvider - Loading initial translations for:', language);
    return getTranslations(language);
  });

  // Synchronize language with URL changes
  useEffect(() => {
    console.log('I18nProvider - URL effect triggered');
    console.log('I18nProvider - Current pathname:', location.pathname);
    console.log('I18nProvider - Current language:', language);
    
    try {
      const { language: urlLanguage } = getLanguageFromPath(location.pathname);
      console.log('I18nProvider - URL language from effect:', urlLanguage);
      
      if (urlLanguage && urlLanguage !== language) {
        console.log('I18nProvider - Language changed from URL:', urlLanguage);
        setCurrentLanguage(urlLanguage);
        setTranslations(getTranslations(urlLanguage));
        
        if (I18N_CONFIG.persistLanguage) {
          setStoredLanguage(urlLanguage);
        }
      }
    } catch (error) {
      console.error('I18nProvider - Error in URL effect:', error);
    }
  }, [location.pathname]); // Removed language from deps

  const setLanguage = (newLanguage: SupportedLanguage) => {
    console.log('I18nProvider - Setting language to:', newLanguage);
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
    console.log('I18nProvider - Setting document attributes');
    console.log('I18nProvider - Language:', language);
    
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
