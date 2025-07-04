
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface HeroSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const HeroSection = ({ searchTerm, onSearchChange }: HeroSectionProps) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
        All-in-One Developer Tools
      </h2>
      <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
        A comprehensive collection of essential online tools for developers. 
        No sign-up required, completely free, and works entirely in your browser.
      </p>
      
      {/* Search Bar */}
      <div className="max-w-md mx-auto relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search tools..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
        />
      </div>
    </div>
  );
};

export default HeroSection;
