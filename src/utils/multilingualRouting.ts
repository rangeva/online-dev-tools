
import { SupportedLanguage } from "@/types/i18n";
import { I18N_CONFIG } from "@/i18n/config";

// URL patterns for different languages
export interface LocalizedRoute {
  en: string;
  es?: string;
  fr?: string;
  de?: string;
  pt?: string;
  it?: string;
  ja?: string;
  ko?: string;
  zh?: string;
}

// Route translations
export const LOCALIZED_ROUTES: Record<string, LocalizedRoute> = {
  home: {
    en: '/',
    es: '/',
    fr: '/',
    de: '/',
    pt: '/',
    it: '/',
    ja: '/',
    ko: '/',
    zh: '/'
  },
  tool: {
    en: '/tool',
    es: '/herramienta',
    fr: '/outil',
    de: '/werkzeug',
    pt: '/ferramenta',
    it: '/strumento',
    ja: '/ツール',
    ko: '/도구',
    zh: '/工具'
  },
  category: {
    en: '/category',
    es: '/categoria',
    fr: '/categorie',
    de: '/kategorie',
    pt: '/categoria',
    it: '/categoria',
    ja: '/カテゴリ',
    ko: '/카테고리',
    zh: '/分类'
  }
};

// Generate localized URL
export const generateLocalizedUrl = (
  routeKey: string,
  language: SupportedLanguage,
  params?: Record<string, string>
): string => {
  const route = LOCALIZED_ROUTES[routeKey];
  if (!route) return '/';

  let url = route[language] || route.en;

  // Replace parameters
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, value);
    });
  }

  return url;
};

// Parse localized URL to get route information
export const parseLocalizedUrl = (
  pathname: string,
  language: SupportedLanguage
): { routeKey: string; params: Record<string, string> } => {
  // Find matching route
  for (const [routeKey, route] of Object.entries(LOCALIZED_ROUTES)) {
    const localizedPath = route[language] || route.en;
    
    // Simple pattern matching - in a real app you'd use a proper router
    if (pathname.startsWith(localizedPath)) {
      const params: Record<string, string> = {};
      const remainingPath = pathname.substring(localizedPath.length);
      
      if (remainingPath && remainingPath.startsWith('/')) {
        const segments = remainingPath.substring(1).split('/');
        if (segments.length > 0) {
          params.id = segments[0];
        }
      }
      
      return { routeKey, params };
    }
  }
  
  return { routeKey: 'home', params: {} };
};

// Generate alternate URLs for different languages
export const generateAlternateUrls = (
  routeKey: string,
  params?: Record<string, string>
): Record<SupportedLanguage, string> => {
  const alternates: Record<SupportedLanguage, string> = {} as Record<SupportedLanguage, string>;
  
  I18N_CONFIG.supportedLanguages.forEach(lang => {
    alternates[lang as SupportedLanguage] = generateLocalizedUrl(routeKey, lang as SupportedLanguage, params);
  });
  
  return alternates;
};

// URL slug translation utilities
export const translateSlug = (slug: string, fromLang: SupportedLanguage, toLang: SupportedLanguage): string => {
  // This would typically use a translation service or lookup table
  // For now, return the original slug
  return slug;
};

// SEO-friendly URL generation
export const generateSEOUrl = (
  title: string,
  language: SupportedLanguage
): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

// Language detection from URL
export const detectLanguageFromUrl = (pathname: string): SupportedLanguage | null => {
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length > 0) {
    const potentialLang = segments[0] as SupportedLanguage;
    if (I18N_CONFIG.supportedLanguages.includes(potentialLang)) {
      return potentialLang;
    }
  }
  
  return null;
};

// Remove language prefix from URL
export const removeLanguagePrefix = (pathname: string): string => {
  const detectedLang = detectLanguageFromUrl(pathname);
  if (detectedLang) {
    return pathname.substring(`/${detectedLang}`.length) || '/';
  }
  return pathname;
};
