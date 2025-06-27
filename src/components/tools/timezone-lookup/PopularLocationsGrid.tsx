
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { popularLocations } from './timezoneData';

interface PopularLocationsGridProps {
  onQuickSearch: (query: string) => void;
  isLoading: boolean;
}

const PopularLocationsGrid = ({ onQuickSearch, isLoading }: PopularLocationsGridProps) => {
  return (
    <div>
      <Label>Popular Locations</Label>
      <div className="flex flex-wrap gap-2 mt-2">
        {popularLocations.map((location) => (
          <Button
            key={location.query}
            variant="outline"
            size="sm"
            onClick={() => onQuickSearch(location.query)}
            disabled={isLoading}
          >
            <MapPin className="w-3 h-3 mr-1" />
            {location.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PopularLocationsGrid;
