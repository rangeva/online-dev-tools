
import { useI18n } from "@/contexts/I18nContext";
import { SupportedLanguage } from "@/types/i18n";

// Dynamic content types that need translation
export interface DynamicContent {
  id: string;
  type: 'error' | 'success' | 'info' | 'warning';
  messageKey: string;
  context?: Record<string, any>;
  timestamp: number;
}

// Translation cache for dynamic content
const translationCache = new Map<string, Record<SupportedLanguage, string>>();

// Utility to generate cache key
const getCacheKey = (messageKey: string, context?: Record<string, any>): string => {
  return context ? `${messageKey}_${JSON.stringify(context)}` : messageKey;
};

// Hook for dynamic translation with caching
export const useDynamicTranslation = () => {
  const { t, language } = useI18n();

  const translateDynamic = (messageKey: string, context?: Record<string, any>): string => {
    const cacheKey = getCacheKey(messageKey, context);
    
    // Check cache first
    const cached = translationCache.get(cacheKey);
    if (cached && cached[language]) {
      return cached[language];
    }

    // Translate and cache
    const translation = t(messageKey, context);
    
    if (!translationCache.has(cacheKey)) {
      translationCache.set(cacheKey, {} as Record<SupportedLanguage, string>);
    }
    
    const cacheEntry = translationCache.get(cacheKey)!;
    cacheEntry[language] = translation;

    return translation;
  };

  const clearTranslationCache = () => {
    translationCache.clear();
  };

  const preloadTranslations = (messageKeys: string[], languages: SupportedLanguage[]) => {
    // This would typically make API calls to preload translations
    // For now, we'll just mark them as preloaded
    console.log('Preloading translations for:', messageKeys, 'in languages:', languages);
  };

  return {
    translateDynamic,
    clearTranslationCache,
    preloadTranslations
  };
};

// Utility for formatting dynamic content based on language
export const formatDynamicContent = (
  content: DynamicContent,
  translator: (key: string, context?: Record<string, any>) => string
): string => {
  return translator(content.messageKey, content.context);
};

// Language-specific formatting utilities
export const formatNumber = (num: number, language: SupportedLanguage): string => {
  const localeMap: Record<SupportedLanguage, string> = {
    en: 'en-US',
    es: 'es-ES',
    fr: 'fr-FR',
    de: 'de-DE',
    pt: 'pt-BR',
    it: 'it-IT',
    ja: 'ja-JP',
    ko: 'ko-KR',
    zh: 'zh-CN'
  };

  return new Intl.NumberFormat(localeMap[language]).format(num);
};

export const formatDate = (date: Date, language: SupportedLanguage): string => {
  const localeMap: Record<SupportedLanguage, string> = {
    en: 'en-US',
    es: 'es-ES',
    fr: 'fr-FR',
    de: 'de-DE',
    pt: 'pt-BR',
    it: 'it-IT',
    ja: 'ja-JP',
    ko: 'ko-KR',
    zh: 'zh-CN'
  };

  return new Intl.DateTimeFormat(localeMap[language], {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const formatRelativeTime = (date: Date, language: SupportedLanguage): string => {
  const localeMap: Record<SupportedLanguage, string> = {
    en: 'en-US',
    es: 'es-ES',
    fr: 'fr-FR',
    de: 'de-DE',
    pt: 'pt-BR',
    it: 'it-IT',
    ja: 'ja-JP',
    ko: 'ko-KR',
    zh: 'zh-CN'
  };

  const rtf = new Intl.RelativeTimeFormat(localeMap[language], { numeric: 'auto' });
  const diffTime = date.getTime() - Date.now();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (Math.abs(diffDays) < 1) {
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    if (Math.abs(diffHours) < 1) {
      const diffMinutes = Math.ceil(diffTime / (1000 * 60));
      return rtf.format(diffMinutes, 'minute');
    }
    return rtf.format(diffHours, 'hour');
  }

  return rtf.format(diffDays, 'day');
};
