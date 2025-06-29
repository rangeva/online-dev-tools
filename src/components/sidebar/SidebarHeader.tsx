
import { Link } from "react-router-dom";
import { useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SidebarHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onMobileMenuClose?: () => void;
}

export function SidebarHeader({ searchTerm, onSearchChange, onMobileMenuClose }: SidebarHeaderProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
  }, [onSearchChange]);

  return (
    <div className="p-4 border-b flex-shrink-0">
      <div className="flex items-center">
        <Link 
          to="/" 
          className="text-lg font-semibold text-blue-600 dark:text-blue-400"
          onClick={onMobileMenuClose}
        >
          OnlineDevTools.io
        </Link>
      </div>
      <div className="relative mt-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          ref={searchInputRef}
          type="text"
          placeholder="Search tools..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10"
        />
      </div>
    </div>
  );
}
