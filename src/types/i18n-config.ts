
import { SupportedLanguage } from './language';

export interface I18nConfig {
  defaultLanguage: SupportedLanguage;
  fallbackLanguage: SupportedLanguage;
  supportedLanguages: SupportedLanguage[];
  persistLanguage: boolean;
}
