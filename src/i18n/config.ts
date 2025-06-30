
import { LanguageConfig, I18nConfig, SupportedLanguage } from '@/types/i18n';

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' }
];

export const I18N_CONFIG: I18nConfig = {
  defaultLanguage: 'en',
  fallbackLanguage: 'en',
  supportedLanguages: SUPPORTED_LANGUAGES.map(lang => lang.code),
  persistLanguage: true
};

export const STORAGE_KEY = 'developer-tools-language';

export const detectBrowserLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return I18N_CONFIG.defaultLanguage;
  
  const browserLang = navigator.language.toLowerCase();
  const langCode = browserLang.split('-')[0] as SupportedLanguage;
  
  return I18N_CONFIG.supportedLanguages.includes(langCode) 
    ? langCode 
    : I18N_CONFIG.defaultLanguage;
};

export const getStoredLanguage = (): SupportedLanguage | null => {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored && I18N_CONFIG.supportedLanguages.includes(stored as SupportedLanguage)
    ? (stored as SupportedLanguage)
    : null;
};

export const setStoredLanguage = (language: SupportedLanguage): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, language);
  }
};
