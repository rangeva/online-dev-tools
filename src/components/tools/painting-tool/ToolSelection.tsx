
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tool, BrushSettings } from "./usePaintingTool";
import { Eraser, Square, Type, Crop, ChevronDown } from "lucide-react";
import { BrushSettingsDropdown } from "./BrushSettingsDropdown";
import { ShapeSelectionDropdown } from "./ShapeSelectionDropdown";
import { useState } from "react";

interface ToolSelectionProps {
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
  brushSettings?: BrushSettings;
  onBrushSettingsChange?: (settings: BrushSettings) => void;
  currentColor?: string;
  onColorChange?: (color: string) => void;
  previewColor?: string;
}

export const ToolSelection = ({ 
  currentTool, 
  onToolChange, 
  brushSettings, 
  onBrushSettingsChange,
  currentColor,
  onColorChange,
  previewColor
}: ToolSelectionProps) => {
  const [eraserDropdownOpen, setEraserDropdownOpen] = useState(false);

  const tools = [
    { tool: 'eraser' as Tool, name: 'Eraser', icon: Eraser },
    { tool: 'select' as Tool, name: 'Select', icon: Square },
    { tool: 'text' as Tool, name: 'Text', icon: Type },
    { tool: 'crop' as Tool, name: 'Crop', icon: Crop },
  ];

  const eraserSizes = [
    { size: 5, label: 'Small (5px)' },
    { size: 10, label: 'Medium (10px)' },
    { size: 20, label: 'Large (20px)' },
    { size: 40, label: 'Extra Large (40px)' },
  ];

  const handleEraserSizeChange = (size: number) => {
    // First activate the eraser tool
    onToolChange('eraser');
    
    // Then update the brush settings
    if (brushSettings && onBrushSettingsChange) {
      onBrushSettingsChange({
        ...brushSettings,
        size: size
      });
    }
    
    // Close the dropdown
    setEraserDropdownOpen(false);
  };

  const handleEraserClick = () => {
    onToolChange('eraser');
    // Don't close dropdown here - let user choose size if they want
  };

  const renderToolButton = (tool: typeof tools[0]) => {
    const isSelected = currentTool === tool.tool;
    
    if (tool.tool === 'eraser' && brushSettings && onBrushSettingsChange) {
      return (
        <DropdownMenu key={tool.tool} open={eraserDropdownOpen} onOpenChange={setEraserDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant={isSelected ? "default" : "ghost"}
              size="sm"
              title={tool.name}
              className={`
                relative transition-all duration-200 
                ${isSelected 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              `}
              onClick={handleEraserClick}
            >
              <tool.icon className="w-4 h-4 mr-1.5" />
              <span className="font-medium">{tool.name}</span>
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg z-50">
            {eraserSizes.map((eraserSize) => (
              <DropdownMenuItem
                key={eraserSize.size}
                onClick={() => handleEraserSizeChange(eraserSize.size)}
                className={`cursor-pointer ${brushSettings.size === eraserSize.size ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
              >
                {eraserSize.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Button
        key={tool.tool}
        variant={isSelected ? "default" : "ghost"}
        size="sm"
        onClick={() => onToolChange(tool.tool)}
        title={tool.name}
        className={`
          relative transition-all duration-200 
          ${isSelected 
            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md' 
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }
        `}
      >
        <tool.icon className="w-4 h-4 mr-1.5" />
        <span className="font-medium">{tool.name}</span>
      </Button>
    );
  };

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-inner border border-gray-200 dark:border-gray-600">
      {/* Brush Settings Dropdown */}
      {brushSettings && onBrushSettingsChange && currentColor && onColorChange && (
        <BrushSettingsDropdown
          brushSettings={brushSettings}
          onBrushSettingsChange={onBrushSettingsChange}
          currentColor={currentColor}
          onColorChange={onColorChange}
          currentTool={currentTool}
          onToolChange={onToolChange}
          previewColor={previewColor}
        />
      )}

      {/* Shape Selection Dropdown */}
      <ShapeSelectionDropdown 
        currentTool={currentTool}
        onToolChange={onToolChange}
      />
      
      {tools.map((tool) => renderToolButton(tool))}
    </div>
  );
};
