
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Check, ChevronDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const US_STATES = [
  "Alabama",
  "Alaska", 
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];

interface USStatesDropdownProps {
  onStateSelect: (state: string) => void;
  isLoading: boolean;
}

const USStatesDropdown = ({ onStateSelect, isLoading }: USStatesDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("");

  const handleSelect = (state: string) => {
    setSelectedState(state);
    setOpen(false);
    onStateSelect(state);
  };

  return (
    <div>
      <Label>Quick Select US State</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between mt-2"
            disabled={isLoading}
          >
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {selectedState ? selectedState : "Select a US state..."}
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search US states..." />
            <CommandList>
              <CommandEmpty>No state found.</CommandEmpty>
              <CommandGroup>
                {US_STATES.map((state) => (
                  <CommandItem
                    key={state}
                    value={state}
                    onSelect={() => handleSelect(state)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedState === state ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {state}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default USStatesDropdown;
