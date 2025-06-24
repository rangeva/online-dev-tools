
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { tools, toolCategories } from "@/data/toolsData";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface AppSidebarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const ACCORDION_STATE_COOKIE = "sidebar-accordion-state";

export function AppSidebar({ searchTerm, onSearchChange }: AppSidebarProps) {
  const { toolId } = useParams();
  const [accordionValue, setAccordionValue] = useState<string[]>([]);

  // Initialize accordion state
  useEffect(() => {
    // Try to load saved state from cookie
    const savedState = document.cookie
      .split('; ')
      .find(row => row.startsWith(ACCORDION_STATE_COOKIE + '='));
    
    if (savedState) {
      try {
        const state = JSON.parse(decodeURIComponent(savedState.split('=')[1]));
        setAccordionValue(state);
      } catch (error) {
        // If parsing fails, default to all categories open
        setAccordionValue(toolCategories.map(cat => cat.id));
      }
    } else {
      // Default to all categories open
      setAccordionValue(toolCategories.map(cat => cat.id));
    }
  }, []);

  // Save accordion state to cookie whenever it changes
  const handleAccordionChange = (value: string[]) => {
    setAccordionValue(value);
    // Save to cookie with 30 days expiration
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    document.cookie = `${ACCORDION_STATE_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; expires=${expirationDate.toUTCString()}; path=/`;
  };

  // Group tools by category
  const toolsByCategory = toolCategories.reduce((acc, category) => {
    acc[category.id] = tools.filter(tool => tool.category === category.id);
    return acc;
  }, {} as Record<string, typeof tools>);

  // Filter tools based on search term
  const filteredToolsByCategory = Object.entries(toolsByCategory).reduce((acc, [categoryId, categoryTools]) => {
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

  return (
    <div className="fixed left-0 top-0 z-40 h-screen w-80 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b flex-shrink-0">
          <div className="flex items-center">
            <Link to="/" className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              OnlineDevTools.io
            </Link>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-2">
              <Accordion 
                type="multiple" 
                className="w-full" 
                value={accordionValue}
                onValueChange={handleAccordionChange}
              >
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
                        <div className="w-full text-sm">
                          <ul className="flex w-full min-w-0 flex-col gap-1">
                            {categoryTools.map((tool) => {
                              const ToolIcon = tool.icon;
                              const isActive = toolId === tool.id;
                              
                              return (
                                <li key={tool.id} className="group/menu-item relative">
                                  <Link 
                                    to={`/tool/${tool.id}`} 
                                    className={`peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground ${isActive ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground' : ''}`}
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
              </Accordion>

              {Object.keys(filteredToolsByCategory).length === 0 && searchTerm && (
                <div className="p-4 text-center text-slate-500 dark:text-slate-400">
                  No tools found matching "{searchTerm}"
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
