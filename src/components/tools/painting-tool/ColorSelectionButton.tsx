
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Palette, Pipette, ChevronDown } from "lucide-react";
import { RefObject } from "react";
import { ColorPalette } from "./ColorPalette";
import { InteractiveColorPicker } from "./InteractiveColorPicker";
import { ManualColorInputs } from "./ManualColorInputs";
import { Tool } from "./usePaintingTool";

interface ColorSelectionButtonProps {
  currentColor: string;
  onColorChange: (color: string) => void;
  canvasRef: RefObject<HTMLCanvasElement>;
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
  previewColor?: string;
}

export const ColorSelectionButton = ({ 
  currentColor, 
  onColorChange, 
  canvasRef, 
  currentTool, 
  onToolChange,
  previewColor 
}: ColorSelectionButtonProps) => {
  const handleColorChange = (color: string) => {
    onColorChange(color);
    // Automatically switch to brush tool after color selection (unless using eyedropper)
    if (currentTool !== 'eyedropper') {
      onToolChange('brush');
    }
  };

  const handleEyedropper = () => {
    onToolChange('eyedropper');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded border border-gray-300"
              style={{ backgroundColor: currentColor }}
            />
            <Palette className="w-4 h-4" />
            Color
            <ChevronDown className="w-3 h-3" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-80 p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 z-50"
        align="start"
      >
        <div className="space-y-4">
          {/* Eyedropper Tool */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Eyedropper Tool</div>
            <Button 
              onClick={handleEyedropper} 
              variant={currentTool === 'eyedropper' ? "default" : "outline"} 
              className="w-full"
              size="sm"
            >
              <Pipette className="w-4 h-4 mr-2" />
              {currentTool === 'eyedropper' ? 'Eyedropper Active' : 'Activate Eyedropper'}
            </Button>
            {currentTool === 'eyedropper' && previewColor && (
              <div className="space-y-1">
                <div className="text-xs text-gray-600 dark:text-gray-400">Preview:</div>
                <div 
                  className="w-full h-6 border rounded-md shadow-inner"
                  style={{ backgroundColor: previewColor }}
                />
                <div className="text-xs text-center font-mono text-gray-600 dark:text-gray-400">
                  {previewColor.toUpperCase()}
                </div>
              </div>
            )}
          </div>

          {/* Color Preview */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Selected Color</div>
            <div 
              className="w-full h-8 border rounded-md shadow-inner"
              style={{ backgroundColor: currentColor }}
            />
            <div className="text-xs text-center font-mono text-gray-600 dark:text-gray-400">
              {currentColor.toUpperCase()}
            </div>
          </div>
          
          {/* Interactive Color Picker */}
          <InteractiveColorPicker 
            currentColor={currentColor} 
            onColorChange={handleColorChange} 
          />
          
          <ColorPalette onColorChange={handleColorChange} />
          <ManualColorInputs 
            currentColor={currentColor} 
            onColorChange={handleColorChange} 
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
