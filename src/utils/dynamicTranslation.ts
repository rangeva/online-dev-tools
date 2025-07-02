
import { useI18n } from '@/contexts/I18nContext';
import { TranslationKey } from '@/types/i18n';

export const useDynamicTranslation = () => {
  const { t } = useI18n();

  const getTranslatedToolName = (toolId: string): string => {
    try {
      // Try to get the translated tool name
      const translationKey = `toolNames.${toolId}` as TranslationKey;
      const translatedName = t(translationKey);
      
      // If translation key is returned as-is, it means translation doesn't exist
      if (translatedName === translationKey) {
        // Return a formatted version of the tool ID as fallback
        return toolId
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
      
      return translatedName;
    } catch (error) {
      console.warn(`Translation not found for tool: ${toolId}`, error);
      // Fallback: convert kebab-case to Title Case
      return toolId
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  };

  const getTranslatedCategoryName = (categoryId: string): string => {
    try {
      const translationKey = `categories.${categoryId}` as TranslationKey;
      const translatedName = t(translationKey);
      
      // If translation key is returned as-is, it means translation doesn't exist
      if (translatedName === translationKey) {
        return categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
      }
      
      return translatedName;
    } catch (error) {
      console.warn(`Translation not found for category: ${categoryId}`, error);
      return categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
    }
  };

  return {
    getTranslatedToolName,
    getTranslatedCategoryName,
  };
};
