
import { useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { tools, toolCategories } from "@/data/toolsData";
import { useTranslatedTools } from "@/data/translatedToolsData";

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  alternateUrls?: Record<string, string>;
}

export const useMultilingualSEO = (toolId?: string, activeCategory?: string) => {
  const { t, language } = useI18n();
  const { toolCategories: translatedCategories } = useTranslatedTools();
  const selectedTool = toolId ? tools.find(tool => tool.id === toolId) : null;

  const getPageTitle = (): string => {
    if (selectedTool) {
      return t('seo.toolTitle', { toolName: selectedTool.name });
    }
    if (activeCategory && activeCategory !== "all") {
      const categoryName = translatedCategories.find(cat => cat.id === activeCategory)?.name;
      return t('seo.categoryTitle', { categoryName: categoryName || activeCategory });
    }
    return t('seo.homeTitle');
  };

  const getPageDescription = (): string => {
    if (selectedTool) {
      return t('seo.toolDescription', { 
        toolName: selectedTool.name,
        description: selectedTool.description 
      });
    }
    if (activeCategory && activeCategory !== "all") {
      const categoryName = translatedCategories.find(cat => cat.id === activeCategory)?.name;
      return t('seo.categoryDescription', { categoryName: categoryName || activeCategory });
    }
    return t('seo.homeDescription');
  };

  const getKeywords = (): string[] => {
    const baseKeywords = [
      t('seo.keywords.developer'),
      t('seo.keywords.tools'),
      t('seo.keywords.online'),
      t('seo.keywords.free')
    ];

    if (selectedTool) {
      return [...baseKeywords, selectedTool.name, ...selectedTool.tags];
    }

    if (activeCategory && activeCategory !== "all") {
      const categoryName = translatedCategories.find(cat => cat.id === activeCategory)?.name;
      if (categoryName) {
        return [...baseKeywords, categoryName];
      }
    }

    return baseKeywords;
  };

  const getCanonicalUrl = (): string => {
    const baseUrl = 'https://onlinedevtools.io';
    if (selectedTool) {
      return `${baseUrl}/tool/${selectedTool.id}`;
    }
    if (activeCategory && activeCategory !== "all") {
      return `${baseUrl}/category/${activeCategory}`;
    }
    return baseUrl;
  };

  const getAlternateUrls = (): Record<string, string> => {
    const baseUrl = 'https://onlinedevtools.io';
    const supportedLanguages = ['en', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'ko', 'zh'];
    const alternates: Record<string, string> = {};

    const currentPath = selectedTool 
      ? `/tool/${selectedTool.id}`
      : activeCategory && activeCategory !== "all"
      ? `/category/${activeCategory}`
      : '/';

    supportedLanguages.forEach(lang => {
      alternates[lang] = `${baseUrl}${lang === 'en' ? '' : `/${lang}`}${currentPath}`;
    });

    return alternates;
  };

  const updateSEOTags = () => {
    const title = getPageTitle();
    const description = getPageDescription();
    const keywords = getKeywords();
    const canonicalUrl = getCanonicalUrl();
    const alternateUrls = getAlternateUrls();

    // Update document title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('language', language);

    // Open Graph tags
    updateMetaTag('og:title', title, 'og:title');
    updateMetaTag('og:description', description, 'og:description');
    updateMetaTag('og:url', canonicalUrl, 'og:url');
    updateMetaTag('og:type', 'website', 'og:type');
    updateMetaTag('og:locale', language === 'en' ? 'en_US' : `${language}_${language.toUpperCase()}`, 'og:locale');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Update alternate language links
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove());
    
    Object.entries(alternateUrls).forEach(([lang, url]) => {
      const alternate = document.createElement('link');
      alternate.setAttribute('rel', 'alternate');
      alternate.setAttribute('hreflang', lang);
      alternate.setAttribute('href', url);
      document.head.appendChild(alternate);
    });

    // Add x-default alternate
    const xDefault = document.createElement('link');
    xDefault.setAttribute('rel', 'alternate');
    xDefault.setAttribute('hreflang', 'x-default');
    xDefault.setAttribute('href', alternateUrls.en);
    document.head.appendChild(xDefault);
  };

  useEffect(() => {
    updateSEOTags();
  }, [selectedTool, activeCategory, toolId, language, t]);

  return {
    title: getPageTitle(),
    description: getPageDescription(),
    keywords: getKeywords(),
    canonicalUrl: getCanonicalUrl(),
    alternateUrls: getAlternateUrls()
  };
};
