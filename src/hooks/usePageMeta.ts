
import { useEffect } from "react";
import { tools, toolCategories } from "@/data/toolsData";

export const usePageMeta = (toolId?: string, activeCategory?: string) => {
  const selectedTool = toolId ? tools.find(tool => tool.id === toolId) : null;

  const getPageTitle = () => {
    if (selectedTool) {
      return `${selectedTool.name} - Developer Toolbox`;
    }
    if (activeCategory && activeCategory !== "all") {
      const categoryName = toolCategories.find(cat => cat.id === activeCategory)?.name;
      return `${categoryName} - Developer Toolbox`;
    }
    return "Developer Toolbox - Essential Online Tools for Developers";
  };

  const getPageDescription = () => {
    if (selectedTool) {
      return selectedTool.description;
    }
    if (activeCategory && activeCategory !== "all") {
      const categoryName = toolCategories.find(cat => cat.id === activeCategory)?.name;
      return `${categoryName} tools for developers - Free online tools with no sign-up required.`;
    }
    return "Collection of essential online tools for developers including text utilities, encoding/decoding, date tools, JSON formatters, security tools and more.";
  };

  useEffect(() => {
    // Update document title
    document.title = getPageTitle();
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', getPageDescription());
    }
    
    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', getPageTitle());
    }
    
    // Update Open Graph description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', getPageDescription());
    }
    
    // Update canonical URL for tool pages
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink && selectedTool) {
      canonicalLink.setAttribute('href', `https://onlinedevtools.io/tool/${selectedTool.id}`);
    } else if (canonicalLink && !selectedTool) {
      canonicalLink.setAttribute('href', 'https://onlinedevtools.io/');
    }
  }, [selectedTool, activeCategory, toolId]);

  return { selectedTool };
};
