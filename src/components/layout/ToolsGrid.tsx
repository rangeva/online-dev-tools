
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { tools } from "@/data/toolsData";
import { useI18n } from "@/contexts/I18nContext";
import { useTranslatedTools } from "@/data/translatedToolsData";
import { createMultilingualUrl } from "@/utils/multilingualRouting";

interface ToolsGridProps {
  filteredTools: typeof tools;
}

const ToolsGrid = ({ filteredTools }: ToolsGridProps) => {
  const { t, language } = useI18n();
  const { toolCategories, tools: translatedTools } = useTranslatedTools();

  if (filteredTools.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">
          {t('tools.noResults')}
        </h3>
        <p className="text-slate-500 dark:text-slate-500">
          {t('tools.noResultsSubtext')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredTools.map((tool) => {
        const Icon = tool.icon;
        const categoryName = toolCategories.find(cat => cat.id === tool.category)?.name || tool.category;
        const translatedTool = translatedTools.find(t => t.id === tool.id);
        const toolName = translatedTool?.name || tool.name;
        const toolUrl = createMultilingualUrl(`/tool/${tool.id}`, language);
        
        return (
          <Link key={tool.id} to={toolUrl}>
            <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:scale-105 h-full">
              <CardHeader className="pb-2 p-4">
                <div className="flex items-start justify-between">
                  <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                    <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {categoryName}
                  </Badge>
                </div>
                <CardTitle className="text-base font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {toolName}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <CardDescription className="text-slate-600 dark:text-slate-400 text-sm">
                  {tool.description}
                </CardDescription>
                <div className="flex flex-wrap gap-1 mt-2">
                  {tool.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-slate-100 dark:bg-slate-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default ToolsGrid;
