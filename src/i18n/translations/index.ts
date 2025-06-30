
import { Translations, SupportedLanguage } from '@/types/i18n';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';
import { pt } from './pt';
import { it } from './it';
import { ja } from './ja';
import { ko } from './ko';
import { zh } from './zh';

export const translations: Record<SupportedLanguage, Translations> = {
  en,
  es,
  fr,
  de,
  pt,
  it,
  ja,
  ko,
  zh
};

export const getTranslations = (language: SupportedLanguage): Translations => {
  return translations[language] || translations.en;
};
