
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tool, BrushSettings } from "./usePaintingTool";
import { Brush, ChevronDown } from "lucide-react";
import { BrushSettingsMenu } from "./BrushSettingsMenu";

interface BrushButtonProps {
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
  brushSettings: BrushSettings;
  onBrushSettingsChange: (settings: BrushSettings) => void;
}

export const BrushButton = ({ 
  currentTool, 
  onToolChange, 
  brushSettings, 
  onBrushSettingsChange 
}: BrushButtonProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={currentTool === 'brush' ? "default" : "ghost"}
          size="sm"
          className={`
            relative transition-all duration-200 
            ${currentTool === 'brush' 
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }
          `}
        >
          <Brush className="w-4 h-4 mr-1.5" />
          <span className="font-medium">Brush</span>
          <ChevronDown className="w-3 h-3 ml-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 z-[100]"
        align="start"
        side="bottom"
        sideOffset={5}
        onPointerDownOutside={(e) => {
          // Don't close on slider interaction
          const target = e.target as Element;
          if (target.closest('[data-radix-slider-root]') || 
              target.closest('[data-radix-slider-track]') || 
              target.closest('[data-radix-slider-range]') || 
              target.closest('[data-radix-slider-thumb]') ||
              target.closest('[data-radix-select-content]') ||
              target.closest('[data-radix-select-item]')) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={() => setIsPopoverOpen(false)}
      >
        <BrushSettingsMenu
          brushSettings={brushSettings}
          onBrushSettingsChange={onBrushSettingsChange}
          onToolChange={onToolChange}
          onClose={() => setIsPopoverOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
};
