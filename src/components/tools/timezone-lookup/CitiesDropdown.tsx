
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Check, ChevronDown, Building2, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const POPULAR_CITIES_BY_STATE: Record<string, string[]> = {
  "Alabama": ["Birmingham", "Montgomery", "Mobile", "Huntsville", "Tuscaloosa"],
  "Alaska": ["Anchorage", "Fairbanks", "Juneau", "Sitka", "Ketchikan"],
  "Arizona": ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale"],
  "Arkansas": ["Little Rock", "Fort Smith", "Fayetteville", "Springdale", "Jonesboro"],
  "California": ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "San Jose", "Oakland", "Fresno", "Long Beach"],
  "Colorado": ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood"],
  "Connecticut": ["Hartford", "Bridgeport", "New Haven", "Waterbury", "Stamford"],
  "Delaware": ["Wilmington", "Dover", "Newark", "Middletown", "Smyrna"],
  "Florida": ["Miami", "Tampa", "Orlando", "Jacksonville", "Fort Lauderdale", "Tallahassee", "St. Petersburg"],
  "Georgia": ["Atlanta", "Columbus", "Augusta", "Savannah", "Athens"],
  "Hawaii": ["Honolulu", "Hilo", "Kailua-Kona", "Kaneohe", "Waipahu"],
  "Idaho": ["Boise", "Nampa", "Meridian", "Idaho Falls", "Pocatello"],
  "Illinois": ["Chicago", "Aurora", "Peoria", "Rockford", "Elgin"],
  "Indiana": ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel"],
  "Iowa": ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City"],
  "Kansas": ["Wichita", "Overland Park", "Kansas City", "Olathe", "Topeka"],
  "Kentucky": ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington"],
  "Louisiana": ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles"],
  "Maine": ["Portland", "Lewiston", "Bangor", "South Portland", "Auburn"],
  "Maryland": ["Baltimore", "Frederick", "Rockville", "Gaithersburg", "Bowie"],
  "Massachusetts": ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell"],
  "Michigan": ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Lansing"],
  "Minnesota": ["Minneapolis", "Saint Paul", "Rochester", "Duluth", "Bloomington"],
  "Mississippi": ["Jackson", "Gulfport", "Southaven", "Hattiesburg", "Biloxi"],
  "Missouri": ["Kansas City", "St. Louis", "Springfield", "Columbia", "Independence"],
  "Montana": ["Billings", "Missoula", "Great Falls", "Bozeman", "Helena"],
  "Nebraska": ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney"],
  "Nevada": ["Las Vegas", "Henderson", "Reno", "North Las Vegas", "Sparks"],
  "New Hampshire": ["Manchester", "Nashua", "Concord", "Derry", "Rochester"],
  "New Jersey": ["Newark", "Jersey City", "Paterson", "Elizabeth", "Edison"],
  "New Mexico": ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe", "Roswell"],
  "New York": ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany"],
  "North Carolina": ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem"],
  "North Dakota": ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo"],
  "Ohio": ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"],
  "Oklahoma": ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Lawton"],
  "Oregon": ["Portland", "Eugene", "Salem", "Gresham", "Hillsboro"],
  "Pennsylvania": ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading"],
  "Rhode Island": ["Providence", "Warwick", "Cranston", "Pawtucket", "East Providence"],
  "South Carolina": ["Charleston", "Columbia", "North Charleston", "Mount Pleasant", "Rock Hill"],
  "South Dakota": ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown"],
  "Tennessee": ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville"],
  "Texas": ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington"],
  "Utah": ["Salt Lake City", "West Valley City", "Provo", "West Jordan", "Orem"],
  "Vermont": ["Burlington", "Essex", "South Burlington", "Colchester", "Rutland"],
  "Virginia": ["Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Newport News"],
  "Washington": ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue"],
  "West Virginia": ["Charleston", "Huntington", "Morgantown", "Parkersburg", "Wheeling"],
  "Wisconsin": ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine"],
  "Wyoming": ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs"],
  "District of Columbia": ["Washington"]
};

interface CitiesDropdownProps {
  selectedState: string;
  onCitySelect: (city: string) => void;
  isLoading: boolean;
}

const CitiesDropdown = ({ selectedState, onCitySelect, isLoading }: CitiesDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const cities = selectedState ? POPULAR_CITIES_BY_STATE[selectedState] || [] : [];

  useEffect(() => {
    setSelectedCity("");
    setCustomCity("");
    setShowCustomInput(false);
  }, [selectedState]);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setOpen(false);
    setShowCustomInput(false);
    onCitySelect(`${city}, ${selectedState}`);
  };

  const handleCustomCitySubmit = () => {
    if (customCity.trim()) {
      setSelectedCity(customCity);
      setShowCustomInput(false);
      onCitySelect(`${customCity}, ${selectedState}`);
    }
  };

  const handleShowCustomInput = () => {
    setShowCustomInput(true);
    setOpen(false);
  };

  if (!selectedState) return null;

  return (
    <div className="space-y-2">
      <Label>Select City in {selectedState}</Label>
      
      {!showCustomInput ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
              disabled={isLoading}
            >
              <div className="flex items-center">
                <Building2 className="w-4 h-4 mr-2" />
                {selectedCity ? selectedCity : "Select a city..."}
              </div>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search cities..." />
              <CommandList>
                <CommandEmpty>No city found.</CommandEmpty>
                <CommandGroup>
                  {cities.map((city) => (
                    <CommandItem
                      key={city}
                      value={city}
                      onSelect={() => handleCitySelect(city)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedCity === city ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {city}
                    </CommandItem>
                  ))}
                  <CommandItem
                    onSelect={handleShowCustomInput}
                    className="border-t"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Enter custom city name
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="flex gap-2">
          <Input
            placeholder="Enter city name..."
            value={customCity}
            onChange={(e) => setCustomCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCustomCitySubmit()}
          />
          <Button onClick={handleCustomCitySubmit} disabled={!customCity.trim()}>
            Add
          </Button>
          <Button variant="outline" onClick={() => setShowCustomInput(false)}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default CitiesDropdown;
