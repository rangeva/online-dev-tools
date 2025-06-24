
import { Link, useParams } from "react-router-dom";
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

export function AppSidebar({ searchTerm, onSearchChange }: AppSidebarProps) {
  const { toolId } = useParams();

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
    <Sidebar className="w-80 h-screen" collapsible="none">
      <SidebarHeader className="p-4 border-b flex-shrink-0">
        <div className="flex items-center">
          <Link to="/" className="text-lg font-semibold text-blue-600 dark:text-blue-400">
            IT Tools
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
      </SidebarHeader>
      
      <SidebarContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-2">
            <Accordion type="multiple" className="w-full">
              {Object.entries(filteredToolsByCategory).map(([categoryId, categoryTools]) => {
                const category = toolCategories.find(cat => cat.id === categoryId);
                if (!category) return null;

                const Icon = category.icon;

                return (
                  <AccordionItem key={categoryId} value={categoryId} className="border-b-0">
                    <AccordionTrigger className="flex items-center gap-2 px-2 py-3 hover:no-underline hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">
                      <div className="flex items-center gap-2 flex-1">
                        <Icon className="h-4 w-4" />
                        <span className="font-medium text-sm">{category.name}</span>
                        <Badge variant="secondary" className="ml-auto mr-2">
                          {categoryTools.length}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <SidebarGroup>
                        <SidebarGroupContent>
                          <SidebarMenu>
                            {categoryTools.map((tool) => {
                              const ToolIcon = tool.icon;
                              const isActive = toolId === tool.id;
                              
                              return (
                                <SidebarMenuItem key={tool.id}>
                                  <SidebarMenuButton asChild isActive={isActive}>
                                    <Link to={`/tool/${tool.id}`} className="flex items-center gap-3 w-full">
                                      <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                                        <ToolIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="font-medium text-sm">{tool.name}</div>
                                      </div>
                                    </Link>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              );
                            })}
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
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
      </SidebarContent>
    </Sidebar>
  );
}
