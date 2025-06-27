
import { RefObject } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tool } from "./usePaintingTool";
import { CurrentColorDisplay } from "./CurrentColorDisplay";
import { EyedropperButton } from "./EyedropperButton";
import { InteractiveColorPicker } from "./InteractiveColorPicker";
import { ColorPalette } from "./ColorPalette";
import { ManualColorInputs } from "./ManualColorInputs";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Color Picker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <CurrentColorDisplay currentColor={currentColor} />
        
        <EyedropperButton 
          currentTool={currentTool}
          onToolChange={onToolChange}
        />

        <InteractiveColorPicker 
          currentColor={currentColor}
          onColorChange={onColorChange}
        />

        <ColorPalette onColorChange={onColorChange} />

        <ManualColorInputs 
          currentColor={currentColor}
          onColorChange={onColorChange}
        />
      </CardContent>
    </Card>
  );
};
