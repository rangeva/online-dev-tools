
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tool, BrushSettings } from "./usePaintingTool";
import { Brush, Eraser, Pipette, Square, Type, Crop, ChevronDown } from "lucide-react";
import { BrushSettingsMenu } from "./BrushSettingsMenu";

interface ToolSelectionProps {
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
  brushSettings?: BrushSettings;
  onBrushSettingsChange?: (settings: BrushSettings) => void;
}

export const ToolSelection = ({ 
  currentTool, 
  onToolChange, 
  brushSettings, 
  onBrushSettingsChange 
}: ToolSelectionProps) => {
  const tools = [
    { tool: 'eraser' as Tool, name: 'Eraser', icon: Eraser },
    { tool: 'eyedropper' as Tool, name: 'Eyedropper', icon: Pipette },
    { tool: 'select' as Tool, name: 'Select', icon: Square },
    { tool: 'text' as Tool, name: 'Text', icon: Type },
    { tool: 'crop' as Tool, name: 'Crop', icon: Crop },
  ];

  const BrushButton = () => {
    if (brushSettings && onBrushSettingsChange) {
      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
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
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-80 p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 z-50"
            align="start"
            onInteractOutside={(e) => {
              // Prevent closing when clicking on sliders or their components
              const target = e.target as Element;
              if (
                target.closest('[role="slider"]') || 
                target.closest('.slider-container') ||
                target.closest('[data-radix-slider-track]') ||
                target.closest('[data-radix-slider-thumb]') ||
                target.closest('[data-radix-slider-range]')
              ) {
                e.preventDefault();
              }
            }}
            onEscapeKeyDown={(e) => {
              // Only allow escape when not focused on a slider
              const activeElement = document.activeElement;
              if (activeElement && activeElement.closest('[role="slider"]')) {
                e.preventDefault();
              }
            }}
          >
            <div 
              className="slider-container"
              onMouseDown={(e) => e.stopPropagation()}
              onMouseMove={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              <BrushSettingsMenu
                brushSettings={brushSettings}
                onBrushSettingsChange={onBrushSettingsChange}
                onToolChange={onToolChange}
              />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Button
        variant={currentTool === 'brush' ? "default" : "ghost"}
        size="sm"
        onClick={() => onToolChange('brush')}
        title="Brush"
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
      </Button>
    );
  };

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-inner border border-gray-200 dark:border-gray-600">
      <BrushButton />
      {tools.map((tool) => (
        <Button
          key={tool.tool}
          variant={currentTool === tool.tool ? "default" : "ghost"}
          size="sm"
          onClick={() => onToolChange(tool.tool)}
          title={tool.name}
          className={`
            relative transition-all duration-200 
            ${currentTool === tool.tool 
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }
          `}
        >
          <tool.icon className="w-4 h-4 mr-1.5" />
          <span className="font-medium">{tool.name}</span>
        </Button>
      ))}
    </div>
  );
};
