
export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it' | 'ja' | 'ko' | 'zh';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

export type TranslationKey = string;

export interface TranslationValues {
  [key: string]: string | number;
}

export interface Translations {
  [key: string]: string | Translations;
}

export interface I18nConfig {
  defaultLanguage: SupportedLanguage;
  fallbackLanguage: SupportedLanguage;
  supportedLanguages: SupportedLanguage[];
  persistLanguage: boolean;
}
