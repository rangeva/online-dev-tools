
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
    console.log('LanguageRedirect - Starting redirect logic');
    console.log('LanguageRedirect - Current pathname:', location.pathname);
    console.log('LanguageRedirect - Current language state:', language);
    
    try {
      const { language: urlLanguage, cleanPath } = getLanguageFromPath(location.pathname);
      
      console.log('LanguageRedirect - URL language:', urlLanguage);
      console.log('LanguageRedirect - Clean path:', cleanPath);
      
      // Prevent infinite redirects by checking if we're already in the right place
      if (location.pathname === '/') {
        const detectedLanguage = detectBrowserLanguage();
        console.log('LanguageRedirect - Detected language:', detectedLanguage);
        
        // Only redirect non-English languages from root
        if (detectedLanguage !== 'en' && language === 'en') {
          const newUrl = createMultilingualUrl('/', detectedLanguage);
          console.log('LanguageRedirect - Redirecting to:', newUrl);
          setLanguage(detectedLanguage);
          navigate(newUrl, { replace: true });
          return;
        }
      }
      
      // Update language state if URL has different language
      if (urlLanguage && urlLanguage !== language) {
        console.log('LanguageRedirect - Updating language state to:', urlLanguage);
        setLanguage(urlLanguage);
      }
    } catch (error) {
      console.error('LanguageRedirect - Error in redirect logic:', error);
      // Don't redirect on error, just update language state
      if (language !== 'en') {
        setLanguage('en');
      }
    }
  }, [location.pathname, navigate, setLanguage]); // Removed language from deps to prevent loops

  return null;
};
