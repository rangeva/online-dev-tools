
import { Translations, SupportedLanguage } from '@/types/i18n';
import { en } from './en';

// For now, we'll use English as the base for other languages
// In a real implementation, these would be properly translated
export const translations: Record<SupportedLanguage, Translations> = {
  en,
  es: en, // TODO: Add Spanish translations
  fr: en, // TODO: Add French translations
  de: en, // TODO: Add German translations
  pt: en, // TODO: Add Portuguese translations
  it: en, // TODO: Add Italian translations
  ja: en, // TODO: Add Japanese translations
  ko: en, // TODO: Add Korean translations
  zh: en  // TODO: Add Chinese translations
};

export const getTranslations = (language: SupportedLanguage): Translations => {
  return translations[language] || translations.en;
};
