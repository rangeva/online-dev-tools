
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toolCategories } from "@/data/toolsData";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <Tabs defaultValue="all" value={activeCategory} onValueChange={onCategoryChange} className="mb-8">
      <TabsList className="flex justify-center w-full max-w-6xl mx-auto h-auto p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm overflow-x-auto">
        {toolCategories.map((category) => {
          const Icon = category.icon;
          return (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex flex-col items-center gap-1 p-3 mx-1 min-w-[110px] flex-shrink-0 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 rounded-md"
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs font-medium text-center leading-tight">{category.name}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default CategoryTabs;
