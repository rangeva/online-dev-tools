
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarCategoryMenu } from "./SidebarCategoryMenu";

interface SidebarMobileWrapperProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  accordionValue: string[];
  onAccordionChange: (value: string[]) => void;
}

export function SidebarMobileWrapper({ 
  searchTerm, 
  onSearchChange, 
  accordionValue, 
  onAccordionChange 
}: SidebarMobileWrapperProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="fixed top-4 left-4 z-50 md:hidden bg-white/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 dark:bg-slate-800/90"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0 bg-sidebar border-sidebar-border">
          <div className="flex flex-col h-full">
            <SidebarHeader 
              searchTerm={searchTerm} 
              onSearchChange={onSearchChange}
              onMobileMenuClose={handleMobileMenuClose}
            />
            <SidebarCategoryMenu 
              searchTerm={searchTerm}
              accordionValue={accordionValue}
              onAccordionChange={onAccordionChange}
              onMobileMenuClose={handleMobileMenuClose}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
