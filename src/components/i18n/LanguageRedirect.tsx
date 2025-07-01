
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '@/contexts/I18nContext';
import { getLanguageFromPath, createMultilingualUrl } from '@/utils/multilingualRouting';
import { detectBrowserLanguage } from '@/i18n/config';

export const LanguageRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useI18n();

  useEffect(() => {
    const { language: urlLanguage, cleanPath } = getLanguageFromPath(location.pathname);
    
    // If we're on the root path without language prefix, redirect to language-specific URL
    if (!urlLanguage && location.pathname === '/') {
      const detectedLanguage = detectBrowserLanguage();
      if (detectedLanguage !== 'en') {
        const newUrl = createMultilingualUrl('/', detectedLanguage);
        navigate(newUrl, { replace: true });
      }
    }
  }, [location.pathname, navigate]);

  return null;
};
