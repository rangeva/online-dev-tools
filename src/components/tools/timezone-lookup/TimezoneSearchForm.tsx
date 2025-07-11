
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import USStatesDropdown from './USStatesDropdown';
import CitiesDropdown from './CitiesDropdown';
import { useState } from 'react';

interface TimezoneSearchFormProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const TimezoneSearchForm = ({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  isLoading
}: TimezoneSearchFormProps) => {
  const [selectedState, setSelectedState] = useState("");

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    onSearchQueryChange(state);
  };

  const handleCitySelect = (cityWithState: string) => {
    onSearchQueryChange(cityWithState);
  };

  return (
    <div className="space-y-4">
      <USStatesDropdown onStateSelect={handleStateSelect} isLoading={isLoading} />
      
      <CitiesDropdown 
        selectedState={selectedState}
        onCitySelect={handleCitySelect}
        isLoading={isLoading}
      />
      
      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="location">Enter City, State, or Location</Label>
          <Input
            id="location"
            placeholder="e.g., California, Texas, New York, London, Tokyo..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
        </div>
        <Button 
          onClick={onSearch} 
          disabled={!searchQuery.trim() || isLoading}
          className="mt-6"
        >
          <Search className="w-4 h-4 mr-2" />
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>
    </div>
  );
};

export default TimezoneSearchForm;
