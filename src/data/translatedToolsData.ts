
import { tools, toolCategories } from "./toolsData";
import { useI18n } from "@/contexts/I18nContext";

// Translation keys for tool categories
export const categoryTranslationKeys: Record<string, string> = {
  'text': 'categories.text',
  'html': 'categories.html',
  'encoding': 'categories.encoding',
  'convertors': 'categories.converters',
  'date': 'categories.date',
  'data': 'categories.data',
  'security': 'categories.security',
  'generators': 'categories.generators',
  'graphics': 'categories.graphics',
  'marketing': 'categories.marketing',
  'ai': 'categories.ai'
};

// Hook to get translated tools data
export const useTranslatedTools = () => {
  const { t } = useI18n();
  
  const translatedCategories = toolCategories.map(category => ({
    ...category,
    name: t(categoryTranslationKeys[category.id] || category.name)
  }));

  const translatedTools = tools.map(tool => ({
    ...tool,
    name: t(`toolNames.${tool.id}` as any) || tool.name
  }));

  return {
    tools: translatedTools,
    toolCategories: translatedCategories,
    categoryTranslationKeys
  };
};
