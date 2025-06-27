
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette } from "lucide-react";
import { RefObject } from "react";
import { ColorPalette } from "./ColorPalette";
import { CurrentColorDisplay } from "./CurrentColorDisplay";
import { EyedropperButton } from "./EyedropperButton";
import { InteractiveColorPicker } from "./InteractiveColorPicker";
import { ManualColorInputs } from "./ManualColorInputs";
import { Tool } from "./usePaintingTool";

interface ColorPanelProps {
  currentColor: string;
  onColorChange: (color: string) => void;
  canvasRef: RefObject<HTMLCanvasElement>;
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
}

export const ColorPanel = ({ 
  currentColor, 
  onColorChange, 
  canvasRef, 
  currentTool, 
  onToolChange 
}: ColorPanelProps) => {
  const handleColorChange = (color: string) => {
    onColorChange(color);
    // Automatically switch to brush tool after color selection (unless using eyedropper)
    if (currentTool !== 'eyedropper') {
      onToolChange('brush');
    }
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
        <CurrentColorDisplay currentColor={currentColor} />
        <ColorPalette onColorChange={handleColorChange} />
        <InteractiveColorPicker 
          currentColor={currentColor} 
          onColorChange={handleColorChange} 
        />
        <ManualColorInputs 
          currentColor={currentColor} 
          onColorChange={handleColorChange} 
        />
        <EyedropperButton 
          currentTool={currentTool}
          onToolChange={onToolChange}
        />
      </CardContent>
    </Card>
  );
};
