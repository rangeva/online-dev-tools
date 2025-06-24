
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
      return `${categoryName} for developers - Free online tools with no sign-up required.`;
    }
    return "Collection of essential online tools for developers including text utilities, encoding/decoding, date tools, JSON formatters, security tools and more.";
  };

  useEffect(() => {
    document.title = getPageTitle();
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', getPageDescription());
    }
  }, [selectedTool, activeCategory]);

  return { selectedTool };
};
