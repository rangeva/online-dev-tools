
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
    // Only handle initial redirect for root path when no language is specified
    if (location.pathname === '/') {
      const detectedLanguage = detectBrowserLanguage();
      console.log('LanguageRedirect - At root, detected language:', detectedLanguage);
      
      // Only redirect non-English languages from root
      if (detectedLanguage !== 'en') {
        const newUrl = createMultilingualUrl('/', detectedLanguage);
        console.log('LanguageRedirect - Redirecting to:', newUrl);
        navigate(newUrl, { replace: true });
        return;
      }
    }
    
    // For all other cases, let I18nProvider handle the language state
  }, [location.pathname, navigate]); // Removed setLanguage and language from deps

  return null;
};
