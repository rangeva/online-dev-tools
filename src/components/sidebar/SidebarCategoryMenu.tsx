
import { Link, useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { tools, toolCategories } from "@/data/toolsData";
import { useMemo } from "react";

interface SidebarCategoryMenuProps {
  searchTerm: string;
  accordionValue: string[];
  onAccordionChange: (value: string[]) => void;
  onMobileMenuClose?: () => void;
}

export function SidebarCategoryMenu({ 
  searchTerm, 
  accordionValue, 
  onAccordionChange, 
  onMobileMenuClose 
}: SidebarCategoryMenuProps) {
  const { toolId } = useParams();

  // Memoize the filtered tools to prevent unnecessary re-computations
  const filteredToolsByCategory = useMemo(() => {
    // Group tools by category
    const toolsByCategory = toolCategories.reduce((acc, category) => {
      acc[category.id] = tools.filter(tool => tool.category === category.id);
      return acc;
    }, {} as Record<string, typeof tools>);

    // Filter tools based on search term
    return Object.entries(toolsByCategory).reduce((acc, [categoryId, categoryTools]) => {
      const filteredTools = categoryTools.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      if (filteredTools.length > 0) {
        acc[categoryId] = filteredTools;
      }
      return acc;
    }, {} as Record<string, typeof tools>);
  }, [searchTerm]);

  const handleToolClick = () => {
    // Close mobile menu when a tool is selected
    if (onMobileMenuClose) {
      onMobileMenuClose();
    }
  };

  // Determine if we should use multiple mode when searching
  const useMultipleMode = searchTerm && Object.keys(filteredToolsByCategory).length > 0;
  
  // Determine accordion value based on search
  const currentAccordionValue = useMemo(() => {
    if (useMultipleMode) {
      // If searching and there are results, open all categories with results
      return Object.keys(filteredToolsByCategory);
    }
    return accordionValue[0] || "";
  }, [useMultipleMode, filteredToolsByCategory, accordionValue]);

  const AccordionComponent = useMultipleMode ? 
    ({ children }: { children: React.ReactNode }) => (
      <Accordion 
        type="multiple" 
        className="w-full" 
        value={currentAccordionValue as string[]}
        onValueChange={(value) => onAccordionChange(value)}
      >
        {children}
      </Accordion>
    ) : 
    ({ children }: { children: React.ReactNode }) => (
      <Accordion 
        type="single" 
        className="w-full" 
        value={currentAccordionValue as string}
        onValueChange={(value) => onAccordionChange(value ? [value] : [])}
        collapsible
      >
        {children}
      </Accordion>
    );

  return (
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full">
        <div className="p-2">
          <AccordionComponent>
            {Object.entries(filteredToolsByCategory).map(([categoryId, categoryTools]) => {
              const category = toolCategories.find(cat => cat.id === categoryId);
              if (!category) return null;

              const Icon = category.icon;

              return (
                <AccordionItem key={categoryId} value={categoryId} className="border-b-0">
                  <AccordionTrigger className="flex items-center gap-2 px-3 py-3 hover:no-underline bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md mb-1">
                    <div className="flex items-center gap-2 flex-1">
                      <Icon className="h-4 w-4" />
                      <span className="font-medium text-sm">{category.name}</span>
                      <Badge variant="secondary" className="ml-auto mr-2">
                        {categoryTools.length}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="w-full text-sm ml-4">
                      <ul className="flex w-full min-w-0 flex-col gap-1">
                        {categoryTools.map((tool) => {
                          const ToolIcon = tool.icon;
                          const isActive = toolId === tool.id;
                          
                          return (
                            <li key={tool.id} className="group/menu-item relative">
                              <Link 
                                to={`/tool/${tool.id}`} 
                                className={`peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground ${isActive ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground' : ''}`}
                                onClick={handleToolClick}
                              >
                                <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                                  <ToolIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm">{tool.name}</div>
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </AccordionComponent>

          {Object.keys(filteredToolsByCategory).length === 0 && searchTerm && (
            <div className="p-4 text-center text-slate-500 dark:text-slate-400">
              No tools found matching "{searchTerm}"
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
