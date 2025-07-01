
import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, ChevronRight } from "lucide-react";
import { tools } from "@/data/toolsData";
import { useTranslatedTools } from "@/data/translatedToolsData";
import { useI18n } from "@/contexts/I18nContext";
import { createMultilingualUrl } from "@/utils/multilingualRouting";

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  isCurrentPage?: boolean;
}

const MultilingualBreadcrumbs = () => {
  const location = useLocation();
  const { t, language } = useI18n();
  const { toolCategories } = useTranslatedTools();
  
  // Extract language and clean path
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  const isLanguagePrefixed = ['es', 'fr', 'de', 'pt', 'it', 'ja', 'ko', 'zh'].includes(pathSegments[0]);
  const cleanSegments = isLanguagePrefixed ? pathSegments.slice(1) : pathSegments;

  // Don't show breadcrumbs on home page
  if (cleanSegments.length === 0) {
    return null;
  }

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbItems: BreadcrumbItem[] = [];

    // Always start with home
    breadcrumbItems.push({
      label: t('navigation.home'),
      href: createMultilingualUrl("/", language),
      icon: Home
    });

    // Handle different route patterns
    if (cleanSegments[0] === "tool" && cleanSegments[1]) {
      const toolId = cleanSegments[1];
      const tool = tools.find(t => t.id === toolId);
      
      if (tool) {
        const category = toolCategories.find(cat => cat.id === tool.category);
        
        // Add category breadcrumb
        if (category) {
          breadcrumbItems.push({
            label: category.name,
            href: createMultilingualUrl(`/category/${category.id}`, language)
          });
        }
        
        // Add tool breadcrumb
        breadcrumbItems.push({
          label: tool.name,
          href: createMultilingualUrl(`/tool/${tool.id}`, language),
          isCurrentPage: true
        });
      }
    } else if (cleanSegments[0] === "category" && cleanSegments[1]) {
      const categoryId = cleanSegments[1];
      const category = toolCategories.find(cat => cat.id === categoryId);
      
      if (category) {
        breadcrumbItems.push({
          label: category.name,
          href: createMultilingualUrl(`/category/${categoryId}`, language),
          isCurrentPage: true
        });
      }
    }

    return breadcrumbItems;
  };

  const breadcrumbItems = generateBreadcrumbs();

  // Generate structured data for SEO
  const generateStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": `https://onlinedevtools.io${item.href}`
      }))
    };

    return JSON.stringify(structuredData);
  };

  return (
    <>
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateStructuredData() }}
      />
      
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <div key={item.href} className="flex items-center">
                <BreadcrumbItem>
                  {item.isCurrentPage ? (
                    <BreadcrumbPage className="flex items-center gap-1">
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.label}</span>
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link 
                        to={item.href} 
                        className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                        hrefLang={language}
                      >
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.label}</span>
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbItems.length - 1 && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                )}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  );
};

export default MultilingualBreadcrumbs;
