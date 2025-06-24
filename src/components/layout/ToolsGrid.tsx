
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { tools, toolCategories } from "@/data/toolsData";

interface ToolsGridProps {
  filteredTools: typeof tools;
}

const ToolsGrid = ({ filteredTools }: ToolsGridProps) => {
  if (filteredTools.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">
          No tools found
        </h3>
        <p className="text-slate-500 dark:text-slate-500">
          Try adjusting your search or category filter
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTools.map((tool) => {
        const Icon = tool.icon;
        return (
          <Link key={tool.id} to={`/tool/${tool.id}`}>
            <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:scale-105 h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {toolCategories.find(cat => cat.id === tool.category)?.name}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {tool.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  {tool.description}
                </CardDescription>
                <div className="flex flex-wrap gap-1 mt-3">
                  {tool.tags.slice(0, 3).map(tag => (
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
