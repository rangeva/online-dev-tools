
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '@/contexts/I18nContext';
import { getLanguageFromPath, createMultilingualUrl } from '@/utils/multilingualRouting';
import { detectBrowserLanguage } from '@/i18n/config';

export const LanguageRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage } = useI18n();

  useEffect(() => {
    const { language: urlLanguage, cleanPath } = getLanguageFromPath(location.pathname);
    
    console.log('LanguageRedirect - Current pathname:', location.pathname);
    console.log('LanguageRedirect - URL language:', urlLanguage);
    console.log('LanguageRedirect - Clean path:', cleanPath);
    console.log('LanguageRedirect - Current language state:', language);
    
    // If we're on the root path without language prefix, redirect to language-specific URL
    if (!urlLanguage && location.pathname === '/') {
      const detectedLanguage = detectBrowserLanguage();
      console.log('LanguageRedirect - Detected language:', detectedLanguage);
      
      if (detectedLanguage !== 'en') {
        const newUrl = createMultilingualUrl('/', detectedLanguage);
        console.log('LanguageRedirect - Redirecting to:', newUrl);
        setLanguage(detectedLanguage);
        navigate(newUrl, { replace: true });
      }
    }
    // If URL has a language but it doesn't match current language state, update the state
    else if (urlLanguage && urlLanguage !== language) {
      console.log('LanguageRedirect - Updating language state to:', urlLanguage);
      setLanguage(urlLanguage);
    }
  }, [location.pathname, navigate, language, setLanguage]);

  return null;
};
