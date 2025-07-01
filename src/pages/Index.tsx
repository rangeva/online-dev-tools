
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SimpleHeroSection from "@/components/layout/SimpleHeroSection";
import ToolsGrid from "@/components/layout/ToolsGrid";
import ToolHeader from "@/components/layout/ToolHeader";
import { FeedbackForm } from "@/components/FeedbackForm";
import SEOBreadcrumbs from "@/components/SEOBreadcrumbs";
import { AppSidebar } from "@/components/AppSidebar";
import { tools } from "@/data/toolsData";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslatedTools } from "@/data/translatedToolsData";

const Index = () => {
  console.log('Index - Component rendering');
  
  const { toolId, category } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(category || "all");
  const isMobile = useIsMobile();
  const { toolCategories } = useTranslatedTools();

  console.log('Index - Params:', { toolId, category });
  console.log('Index - Active category:', activeCategory);

  const { selectedTool } = usePageMeta(toolId, activeCategory);

  // Memoize the search change handler to prevent unnecessary re-renders
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  // Update URL when category changes
  useEffect(() => {
    if (category && category !== activeCategory) {
      setActiveCategory(category);
    }
  }, [category]);

  const handleCategoryChange = (newCategory: string) => {
    setActiveCategory(newCategory);
    if (newCategory === "all") {
      navigate("/");
    } else {
      navigate(`/category/${newCategory}`);
    }
  };

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  console.log('Index - Filtered tools count:', filteredTools.length);
  console.log('Index - Selected tool:', selectedTool?.name);

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <main className={`flex-1 ${!isMobile ? 'ml-80' : ''} bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800`}>
        {selectedTool ? (
          <div className="container mx-auto px-4 py-8">
            <SEOBreadcrumbs />
            <ToolHeader toolId={toolId!} />
            
            {/* Tool Component */}
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              <selectedTool.component />
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-6">
            <SEOBreadcrumbs />
            
            <SimpleHeroSection />

            <ToolsGrid filteredTools={filteredTools} />
          </div>
        )}
        
        <FeedbackForm />
      </main>
    </div>
  );
};

export default Index;
