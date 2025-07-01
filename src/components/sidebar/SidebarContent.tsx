
import React from "react";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarCategoryMenu } from "./SidebarCategoryMenu";

interface SidebarContentProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  accordionValue: string[];
  onAccordionChange: (value: string[]) => void;
  onMobileMenuClose?: () => void;
}

export const SidebarContent = React.memo(({ 
  searchTerm, 
  onSearchChange, 
  accordionValue, 
  onAccordionChange, 
  onMobileMenuClose 
}: SidebarContentProps) => {
  return (
    <div className="flex flex-col h-full">
      <SidebarHeader 
        searchTerm={searchTerm} 
        onSearchChange={onSearchChange}
        onMobileMenuClose={onMobileMenuClose}
      />
      <SidebarCategoryMenu 
        searchTerm={searchTerm}
        accordionValue={accordionValue}
        onAccordionChange={onAccordionChange}
        onMobileMenuClose={onMobileMenuClose}
      />
    </div>
  );
});

SidebarContent.displayName = 'SidebarContent';
