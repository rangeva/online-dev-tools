
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebarAccordion } from "@/hooks/useSidebarAccordion";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarCategoryMenu } from "./sidebar/SidebarCategoryMenu";
import { SidebarMobileWrapper } from "./sidebar/SidebarMobileWrapper";

interface AppSidebarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function AppSidebar({ searchTerm, onSearchChange }: AppSidebarProps) {
  const isMobile = useIsMobile();
  const { accordionValue, handleAccordionChange } = useSidebarAccordion();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <SidebarHeader 
        searchTerm={searchTerm} 
        onSearchChange={onSearchChange}
      />
      <SidebarCategoryMenu 
        searchTerm={searchTerm}
        accordionValue={accordionValue}
        onAccordionChange={handleAccordionChange}
      />
    </div>
  );

  // Mobile version with Sheet (drawer)
  if (isMobile) {
    return (
      <SidebarMobileWrapper 
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        accordionValue={accordionValue}
        onAccordionChange={handleAccordionChange}
      />
    );
  }

  // Desktop version with fixed sidebar
  return (
    <div className="fixed left-0 top-0 z-40 h-screen w-80 bg-sidebar border-r border-sidebar-border">
      <SidebarContent />
    </div>
  );
}
