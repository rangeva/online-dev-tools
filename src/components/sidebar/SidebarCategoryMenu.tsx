
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useLocation, useNavigate } from "react-router-dom";
import { tools } from "@/data/toolsData";
import { useTranslatedTools } from "@/data/translatedToolsData";
import { useI18n } from "@/contexts/I18nContext";

interface SidebarCategoryMenuProps {
  searchTerm: string;
  accordionValue: string[];
  onAccordionChange: (value: string[]) => void;
  onMobileMenuClose?: () => void;
}

export function SidebarCategoryMenu({ searchTerm, accordionValue, onAccordionChange, onMobileMenuClose }: SidebarCategoryMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useI18n();
  const { toolCategories } = useTranslatedTools();
  
  const currentPath = location.pathname;
  const isHomePage = currentPath === '/';
  const currentCategory = currentPath.startsWith('/category/') ? currentPath.split('/category/')[1] : null;
  
  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === "all") {
      navigate("/");
    } else {
      navigate(`/category/${categoryId}`);
    }
    onMobileMenuClose?.();
  };

  const handleToolClick = (toolId: string) => {
    navigate(`/tool/${toolId}`);
    onMobileMenuClose?.();
  };

  return (
    <ScrollArea className="flex-1 px-3">
      <div className="space-y-2">
        {/* All Tools Button */}
        <Button
          variant={isHomePage && !currentCategory ? "secondary" : "ghost"}
          className="w-full justify-start text-left"
          onClick={() => handleCategoryClick("all")}
        >
          <span className="flex-1">{t('navigation.tools')}</span>
          <Badge variant="outline" className="ml-2">
            {filteredTools.length}
          </Badge>
        </Button>

        {/* Categories Accordion */}
        <Accordion 
          type="multiple" 
          value={accordionValue}
          onValueChange={onAccordionChange}
          className="w-full"
        >
          {toolCategories.map((category) => {
            const categoryTools = filteredTools.filter(tool => tool.category === category.id);
            const Icon = category.icon;
            const isActive = currentCategory === category.id;
            
            if (categoryTools.length === 0) return null;

            return (
              <AccordionItem key={category.id} value={category.id} className="border-none">
                <AccordionTrigger 
                  className={`hover:no-underline py-2 px-3 rounded-lg hover:bg-accent/50 transition-colors ${
                    isActive ? 'bg-accent text-accent-foreground' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(category.id);
                  }}
                >
                  <div className="flex items-center gap-2 flex-1 text-left">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-accent-foreground' : 'text-muted-foreground'}`} />
                    <span className="flex-1">{category.name}</span>
                    <Badge variant="outline" className="ml-2">
                      {categoryTools.length}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-2">
                  <div className="ml-6 space-y-1">
                    {categoryTools.map((tool) => {
                      const isToolActive = currentPath === `/tool/${tool.id}`;
                      return (
                        <Button
                          key={tool.id}
                          variant={isToolActive ? "secondary" : "ghost"}
                          size="sm"
                          className="w-full justify-start text-left h-8"
                          onClick={() => handleToolClick(tool.id)}
                        >
                          <tool.icon className="h-3 w-3 mr-2 flex-shrink-0" />
                          <span className="truncate">{tool.name}</span>
                        </Button>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </ScrollArea>
  );
}
