
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebarAccordion } from "@/hooks/useSidebarAccordion";
import { SidebarContent } from "./sidebar/SidebarContent";
import { SidebarMobileWrapper } from "./sidebar/SidebarMobileWrapper";
import React from "react";

interface AppSidebarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const AppSidebar = React.memo(({ searchTerm, onSearchChange }: AppSidebarProps) => {
  const isMobile = useIsMobile();
  const { accordionValue, handleAccordionChange } = useSidebarAccordion();

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
      <SidebarContent 
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        accordionValue={accordionValue}
        onAccordionChange={handleAccordionChange}
      />
    </div>
  );
});

AppSidebar.displayName = 'AppSidebar';
