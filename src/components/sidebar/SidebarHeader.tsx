
import { Input } from "@/components/ui/input";
import { Search, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { AdvancedLanguageSelector } from "@/components/i18n/AdvancedLanguageSelector";
import { useI18n } from "@/contexts/I18nContext";
import React, { useRef } from "react";

interface SidebarHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onMobileMenuClose?: () => void;
}

export const SidebarHeader = React.memo(({ searchTerm, onSearchChange, onMobileMenuClose }: SidebarHeaderProps) => {
  const { t } = useI18n();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
    // Maintain focus after state update
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 0);
  };

  return (
    <div className="p-4 border-b border-sidebar-border">
      {/* Logo and Title */}
      <Link 
        to="/" 
        className="flex items-center space-x-3 mb-4 group"
        onClick={onMobileMenuClose}
      >
        <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
          <Code className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-sidebar-foreground truncate">
            {t('header.title')}
          </h1>
          <p className="text-xs text-sidebar-foreground/70 truncate">
            {t('header.subtitle')}
          </p>
        </div>
      </Link>

      {/* Language Selector */}
      <div className="mb-4">
        <AdvancedLanguageSelector variant="compact" />
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sidebar-foreground/50 h-4 w-4" />
        <Input
          ref={searchInputRef}
          type="text"
          placeholder={t('hero.searchPlaceholder')}
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
        />
      </div>
    </div>
  );
});

SidebarHeader.displayName = 'SidebarHeader';
