
export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it' | 'ja' | 'ko' | 'zh';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export interface I18nConfig {
  defaultLanguage: SupportedLanguage;
  fallbackLanguage: SupportedLanguage;
  supportedLanguages: SupportedLanguage[];
  persistLanguage: boolean;
}

export interface Translations {
  common: {
    search: string;
    back: string;
    copy: string;
    clear: string;
    reset: string;
    generate: string;
    convert: string;
    download: string;
    upload: string;
    analyze: string;
    preview: string;
    loading: string;
    error: string;
    success: string;
    close: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    remove: string;
    next: string;
    previous: string;
    settings: string;
    help: string;
    about: string;
  };
  navigation: {
    home: string;
    tools: string;
    categories: string;
    backToTools: string;
  };
  header: {
    title: string;
    subtitle: string;
    badges: {
      free: string;
      noSignup: string;
    };
  };
  hero: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
  };
  categories: {
    text: string;
    encoding: string;
    converters: string;
    generators: string;
    security: string;
    html: string;
    data: string;
    graphics: string;
    marketing: string;
    date: string;
    ai: string;
  };
  toolNames?: {
    [key: string]: string;
  };
  tools: {
    noResults: string;
    noResultsSubtext: string;
    inputLabel: string;
    outputLabel: string;
    resultLabel: string;
    optionsLabel: string;
    previewLabel: string;
    exampleLabel: string;
  };
  language: {
    select: string;
    current: string;
    change: string;
  };
  errors: {
    generic: string;
    invalidInput: string;
    processingFailed: string;
    copyFailed: string;
    uploadFailed: string;
    networkError: string;
  };
  success: {
    copied: string;
    generated: string;
    converted: string;
    uploaded: string;
    saved: string;
  };
}

export type TranslationKey = 
  | `common.${keyof Translations['common']}`
  | `navigation.${keyof Translations['navigation']}`
  | `header.${keyof Translations['header']}`
  | `header.badges.${keyof Translations['header']['badges']}`
  | `hero.${keyof Translations['hero']}`
  | `categories.${keyof Translations['categories']}`
  | `toolNames.${string}`
  | `tools.${keyof Translations['tools']}`
  | `language.${keyof Translations['language']}`
  | `errors.${keyof Translations['errors']}`
  | `success.${keyof Translations['success']}`;

export type TranslationValues = Record<string, string | number>;
