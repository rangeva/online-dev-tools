
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette, Pipette } from "lucide-react";
import { RefObject } from "react";
import { ColorPalette } from "./ColorPalette";
import { CurrentColorDisplay } from "./CurrentColorDisplay";
import { InteractiveColorPicker } from "./InteractiveColorPicker";
import { ManualColorInputs } from "./ManualColorInputs";
import { Tool } from "./usePaintingTool";

interface ColorPanelProps {
  currentColor: string;
  onColorChange: (color: string) => void;
  canvasRef: RefObject<HTMLCanvasElement>;
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
  previewColor?: string;
}

export const ColorPanel = ({ 
  currentColor, 
  onColorChange, 
  canvasRef, 
  currentTool, 
  onToolChange,
  previewColor 
}: ColorPanelProps) => {
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
    <Card className="border-gray-200 dark:border-gray-700 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-md">
            <Palette className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          Color Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Eyedropper Tool */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Eyedropper Tool</Label>
          <Button 
            onClick={handleEyedropper} 
            variant={currentTool === 'eyedropper' ? "default" : "outline"} 
            className="w-full"
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
          <Label className="text-sm font-medium">Selected Color</Label>
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
      </CardContent>
    </Card>
  );
};
