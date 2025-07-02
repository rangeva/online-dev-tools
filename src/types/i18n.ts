
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
    selectLanguage: string;
    popularLanguages: string;
    otherLanguages: string;
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
    dateTimeConverter: {
      title: string;
      description: string;
      visualPicker: string;
      selectDate: string;
      selectTime: string;
      pickDate: string;
      useSelected: string;
      inputDateTime: string;
      inputFormat: string;
      convertDate: string;
      useCurrentTime: string;
      clearAll: string;
      convertedFormats: string;
      formatsAvailable: string;
      tips: string;
      tip1: string;
      tip2: string;
      tip3: string;
      tip4: string;
      dateTimeSelected: string;
      inputUpdated: string;
      currentTimeSet: string;
      currentTimeDescription: string;
      success: string;
      successDescription: string;
      error: string;
      errorDescription: string;
      copied: string;
      copiedDescription: string;
    };
    epochConverter: {
      currentEpochTime: string;
      timestampToHuman: string;
      humanToTimestamp: string;
      dynamicDateList: string;
      secondsConverter: string;
      startEndDates: string;
      batchConvert: string;
      now: string;
      convert: string;
      batchConvertButton: string;
      results: string;
      original: string;
      utcDate: string;
      localDate: string;
      isoFormat: string;
      unixTimestamp: string;
      milliseconds: string;
      description: string;
      date: string;
      inputFormat: string;
      calculate: string;
      year: string;
      month: string;
      day: string;
      start: string;
      end: string;
      total: string;
      seconds: string;
      days: string;
      hours: string;
      minutes: string;
    };
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
  dateTime?: {
    justNow: string;
    minuteAgo: string;
    minutesAgo: string;
    hourAgo: string;
    hoursAgo: string;
    dayAgo: string;
    daysAgo: string;
    fromNow: string;
    ago: string;
  };
  dynamicDates?: {
    now: string;
    oneHourAgo: string;
    oneDayAgo: string;
    oneWeekAgo: string;
    oneMonthAgo: string;
    nextHour: string;
    nextDay: string;
    nextWeek: string;
    nextMonth: string;
  };
  timestampFormats?: {
    seconds: string;
    milliseconds: string;
    microseconds: string;
    nanoseconds: string;
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
  | `tools.dateTimeConverter.${keyof Translations['tools']['dateTimeConverter']}`
  | `tools.epochConverter.${keyof Translations['tools']['epochConverter']}`
  | `language.${keyof Translations['language']}`
  | `errors.${keyof Translations['errors']}`
  | `success.${keyof Translations['success']}`
  | `dateTime.${keyof NonNullable<Translations['dateTime']>}`
  | `dynamicDates.${keyof NonNullable<Translations['dynamicDates']>}`
  | `timestampFormats.${keyof NonNullable<Translations['timestampFormats']>}`;

export type TranslationValues = Record<string, string | number>;
