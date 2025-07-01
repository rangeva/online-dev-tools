
import { SupportedLanguage } from '@/types/i18n';

// Tool name translations for URLs
export const toolNameTranslations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    'word-counter': 'word-counter',
    'text-diff': 'text-diff',
    'case-converter': 'case-converter',
    'regex-tester': 'regex-tester',
    'date-time-converter': 'date-time-converter',
    'epoch-converter': 'epoch-converter',
    'json-formatter': 'json-formatter',
    'base64-encoder': 'base64-encoder',
    'url-encoder': 'url-encoder',
    'hash-generator': 'hash-generator',
    'uuid-generator': 'uuid-generator',
    'qr-code-generator': 'qr-code-generator',
    'color-converter': 'color-converter',
    'image-format-converter': 'image-format-converter'
  },
  es: {
    'word-counter': 'contador-palabras',
    'text-diff': 'diferencia-texto',
    'case-converter': 'convertidor-mayusculas',
    'regex-tester': 'probador-regex',
    'date-time-converter': 'convertidor-fecha-hora',
    'epoch-converter': 'convertidor-epoch',
    'json-formatter': 'formateador-json',
    'base64-encoder': 'codificador-base64',
    'url-encoder': 'codificador-url',
    'hash-generator': 'generador-hash',
    'uuid-generator': 'generador-uuid',
    'qr-code-generator': 'generador-codigo-qr',
    'color-converter': 'convertidor-color',
    'image-format-converter': 'convertidor-formato-imagen'
  },
  fr: {
    'word-counter': 'compteur-mots',
    'text-diff': 'difference-texte',
    'case-converter': 'convertisseur-casse',
    'regex-tester': 'testeur-regex',
    'date-time-converter': 'convertisseur-date-heure',
    'epoch-converter': 'convertisseur-epoch',
    'json-formatter': 'formateur-json',
    'base64-encoder': 'encodeur-base64',
    'url-encoder': 'encodeur-url',
    'hash-generator': 'generateur-hash',
    'uuid-generator': 'generateur-uuid',
    'qr-code-generator': 'generateur-code-qr',
    'color-converter': 'convertisseur-couleur',
    'image-format-converter': 'convertisseur-format-image'
  },
  de: {
    'word-counter': 'wort-zaehler',
    'text-diff': 'text-unterschied',
    'case-converter': 'gross-kleinschreibung',
    'regex-tester': 'regex-tester',
    'date-time-converter': 'datum-zeit-konverter',
    'epoch-converter': 'epoch-konverter',
    'json-formatter': 'json-formatierer',
    'base64-encoder': 'base64-encoder',
    'url-encoder': 'url-encoder',
    'hash-generator': 'hash-generator',
    'uuid-generator': 'uuid-generator',
    'qr-code-generator': 'qr-code-generator',
    'color-converter': 'farb-konverter',
    'image-format-converter': 'bildformat-konverter'
  },
  pt: {
    'word-counter': 'contador-palavras',
    'text-diff': 'diferenca-texto',
    'case-converter': 'conversor-maiusculas',
    'regex-tester': 'testador-regex',
    'date-time-converter': 'conversor-data-hora',
    'epoch-converter': 'conversor-epoch',
    'json-formatter': 'formatador-json',
    'base64-encoder': 'codificador-base64',
    'url-encoder': 'codificador-url',
    'hash-generator': 'gerador-hash',
    'uuid-generator': 'gerador-uuid',
    'qr-code-generator': 'gerador-codigo-qr',
    'color-converter': 'conversor-cor',
    'image-format-converter': 'conversor-formato-imagem'
  },
  it: {
    'word-counter': 'contatore-parole',
    'text-diff': 'differenza-testo',
    'case-converter': 'convertitore-maiuscole',
    'regex-tester': 'tester-regex',
    'date-time-converter': 'convertitore-data-ora',
    'epoch-converter': 'convertitore-epoch',
    'json-formatter': 'formattatore-json',
    'base64-encoder': 'encoder-base64',
    'url-encoder': 'encoder-url',
    'hash-generator': 'generatore-hash',
    'uuid-generator': 'generatore-uuid',
    'qr-code-generator': 'generatore-codice-qr',
    'color-converter': 'convertitore-colore',
    'image-format-converter': 'convertitore-formato-immagine'
  },
  ja: {
    'word-counter': 'word-counter',
    'text-diff': 'text-diff',
    'case-converter': 'case-converter',
    'regex-tester': 'regex-tester',
    'date-time-converter': 'date-time-converter',
    'epoch-converter': 'epoch-converter',
    'json-formatter': 'json-formatter',
    'base64-encoder': 'base64-encoder',
    'url-encoder': 'url-encoder',
    'hash-generator': 'hash-generator',
    'uuid-generator': 'uuid-generator',
    'qr-code-generator': 'qr-code-generator',
    'color-converter': 'color-converter',
    'image-format-converter': 'image-format-converter'
  },
  ko: {
    'word-counter': 'word-counter',
    'text-diff': 'text-diff',
    'case-converter': 'case-converter',
    'regex-tester': 'regex-tester',
    'date-time-converter': 'date-time-converter',
    'epoch-converter': 'epoch-converter',
    'json-formatter': 'json-formatter',
    'base64-encoder': 'base64-encoder',
    'url-encoder': 'url-encoder',
    'hash-generator': 'hash-generator',
    'uuid-generator': 'uuid-generator',
    'qr-code-generator': 'qr-code-generator',
    'color-converter': 'color-converter',
    'image-format-converter': 'image-format-converter'
  },
  zh: {
    'word-counter': 'word-counter',
    'text-diff': 'text-diff',
    'case-converter': 'case-converter',
    'regex-tester': 'regex-tester',
    'date-time-converter': 'date-time-converter',
    'epoch-converter': 'epoch-converter',
    'json-formatter': 'json-formatter',
    'base64-encoder': 'base64-encoder',
    'url-encoder': 'url-encoder',
    'hash-generator': 'hash-generator',
    'uuid-generator': 'uuid-generator',
    'qr-code-generator': 'qr-code-generator',
    'color-converter': 'color-converter',
    'image-format-converter': 'image-format-converter'
  }
};

// Create reverse mapping for translating back from URL to tool ID
const createReverseMapping = () => {
  const reverseMapping: Record<string, string> = {};
  Object.values(toolNameTranslations).forEach(langMapping => {
    Object.entries(langMapping).forEach(([toolId, translatedName]) => {
      reverseMapping[translatedName] = toolId;
    });
  });
  return reverseMapping;
};

export const reverseToolNameMapping = createReverseMapping();

export const createMultilingualUrl = (path: string, language: SupportedLanguage): string => {
  let translatedPath = path;
  
  // Handle tool URLs
  const toolMatch = path.match(/^\/tool\/(.+)$/);
  if (toolMatch) {
    const toolId = toolMatch[1];
    const translatedToolName = toolNameTranslations[language][toolId] || toolId;
    translatedPath = `/tool/${translatedToolName}`;
  }
  
  if (language === 'en') {
    return translatedPath;
  }
  return `/${language}${translatedPath}`;
};

export const getLanguageFromPath = (pathname: string): { language: SupportedLanguage | null; cleanPath: string; toolId?: string } => {
  const segments = pathname.split('/').filter(Boolean);
  const supportedLanguages = ['en', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'ko', 'zh'];
  
  if (segments.length > 0 && supportedLanguages.includes(segments[0])) {
    const language = segments[0] as SupportedLanguage;
    const remainingPath = '/' + segments.slice(1).join('/');
    
    // Handle translated tool URLs
    const toolMatch = remainingPath.match(/^\/tool\/(.+)$/);
    if (toolMatch) {
      const translatedToolName = toolMatch[1];
      const originalToolId = reverseToolNameMapping[translatedToolName] || translatedToolName;
      return {
        language,
        cleanPath: `/tool/${originalToolId}`,
        toolId: originalToolId
      };
    }
    
    return {
      language,
      cleanPath: remainingPath
    };
  }
  
  // Handle English (default) URLs with potential translated tool names
  const toolMatch = pathname.match(/^\/tool\/(.+)$/);
  if (toolMatch) {
    const toolName = toolMatch[1];
    const originalToolId = reverseToolNameMapping[toolName] || toolName;
    return {
      language: 'en',
      cleanPath: `/tool/${originalToolId}`,
      toolId: originalToolId
    };
  }
  
  return {
    language: 'en',
    cleanPath: pathname
  };
};

export const generateSitemapUrls = () => {
  const baseUrl = 'https://onlinedevtools.io';
  const supportedLanguages = ['en', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'ko', 'zh'];
  
  const routes = [
    '', // home
    '/category/text',
    '/category/html',
    '/category/encoding',
    '/category/convertors',
    '/category/date',
    '/category/data',
    '/category/security',
    '/category/generators',
    '/category/graphics',
    '/category/marketing',
    '/category/ai',
  ];

  // Add tool routes with translations
  const toolIds = Object.keys(toolNameTranslations.en);
  toolIds.forEach(toolId => {
    supportedLanguages.forEach(lang => {
      const translatedName = toolNameTranslations[lang as SupportedLanguage][toolId] || toolId;
      routes.push(`/tool/${translatedName}`);
    });
  });

  const urls: Array<{ loc: string; alternates: Record<string, string> }> = [];

  routes.forEach(route => {
    const alternates: Record<string, string> = {};
    
    supportedLanguages.forEach(lang => {
      const langPrefix = lang === 'en' ? '' : `/${lang}`;
      alternates[lang] = `${baseUrl}${langPrefix}${route}`;
    });

    // Add URL for each language
    supportedLanguages.forEach(lang => {
      const langPrefix = lang === 'en' ? '' : `/${lang}`;
      urls.push({
        loc: `${baseUrl}${langPrefix}${route}`,
        alternates
      });
    });
  });

  return urls;
};
