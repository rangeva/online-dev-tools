
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/layout/HeroSection";
import CategoryTabs from "@/components/layout/CategoryTabs";
import ToolsGrid from "@/components/layout/ToolsGrid";
import ToolHeader from "@/components/layout/ToolHeader";
import { FeedbackForm } from "@/components/FeedbackForm";
import SEOBreadcrumbs from "@/components/SEOBreadcrumbs";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { tools } from "@/data/toolsData";
import { usePageMeta } from "@/hooks/usePageMeta";

const Index = () => {
  const { toolId, category } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(category || "all");

  const { selectedTool } = usePageMeta(toolId, activeCategory);

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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <AppSidebar />
        <SidebarInset>
          <Header />
          
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
            <div className="container mx-auto px-4 py-8">
              <SEOBreadcrumbs />
              
              <HeroSection 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />

              <CategoryTabs 
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />

              <ToolsGrid filteredTools={filteredTools} />
            </div>
          )}
          
          <FeedbackForm />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
