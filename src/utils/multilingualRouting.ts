
import { SupportedLanguage } from '@/types/i18n';

export const createMultilingualUrl = (path: string, language: SupportedLanguage): string => {
  if (language === 'en') {
    return path;
  }
  return `/${language}${path}`;
};

export const getLanguageFromPath = (pathname: string): { language: SupportedLanguage | null; cleanPath: string } => {
  const segments = pathname.split('/').filter(Boolean);
  const supportedLanguages = ['en', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'ko', 'zh'];
  
  if (segments.length > 0 && supportedLanguages.includes(segments[0])) {
    return {
      language: segments[0] as SupportedLanguage,
      cleanPath: '/' + segments.slice(1).join('/')
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
    // Add all tool routes
    '/tool/word-counter',
    '/tool/text-diff',
    '/tool/case-converter',
    '/tool/regex-tester',
    '/tool/add-prefix-suffix',
    '/tool/line-break-manager',
    '/tool/find-replace',
    '/tool/remove-duplicate-lines',
    '/tool/remove-empty-lines',
    '/tool/remove-extra-spaces',
    '/tool/html-minifier',
    '/tool/html-beautifier',
    '/tool/html-to-markdown',
    '/tool/html-to-jsx',
    '/tool/html-previewer',
    '/tool/html-to-plain-text',
    '/tool/html-entity-coder',
    '/tool/html-wysiwyg-editor',
    '/tool/url-encoder',
    '/tool/base64-encoder',
    '/tool/jwt-decoder',
    '/tool/date-time-converter',
    '/tool/integer-base-converter',
    '/tool/roman-numeral-converter',
    '/tool/base64-string-encoder',
    '/tool/color-converter',
    '/tool/text-to-nato-alphabet',
    '/tool/text-to-ascii-binary',
    '/tool/text-to-unicode',
    '/tool/yaml-to-json-converter',
    '/tool/yaml-to-toml',
    '/tool/json-to-yaml-converter',
    '/tool/json-to-toml-converter',
    '/tool/list-converter',
    '/tool/toml-to-json-converter',
    '/tool/toml-to-yaml-converter',
    '/tool/xml-to-json-converter',
    '/tool/json-to-xml-converter',
    '/tool/markdown-to-html-converter',
    '/tool/temperature-converter',
    '/tool/epoch-converter',
    '/tool/cron-editor',
    '/tool/timezone-lookup',
    '/tool/json-formatter',
    '/tool/xml-formatter',
    '/tool/yaml-converter',
    '/tool/hash-generator',
    '/tool/htpasswd-generator',
    '/tool/strong-password-generator',
    '/tool/credential-format-detector',
    '/tool/uuid-generator',
    '/tool/lorem-generator',
    '/tool/fake-data-generator',
    '/tool/random-phone-generator',
    '/tool/random-email-generator',
    '/tool/iso-generator',
    '/tool/qr-code-generator',
    '/tool/wifi-qr-generator',
    '/tool/color-palette-generator',
    '/tool/html-color-codes',
    '/tool/camera-recorder',
    '/tool/painting-drawing-tool',
    '/tool/image-format-converter',
    '/tool/website-rank-tracker',
    '/tool/tokenizer'
  ];

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
