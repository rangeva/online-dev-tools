
import { useState, useCallback, RefObject } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ColorPanelProps {
  currentColor: string;
  onColorChange: (color: string) => void;
  canvasRef: RefObject<HTMLCanvasElement>;
}

const colorPalette = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
  '#FFC0CB', '#A52A2A', '#808080', '#FFD700', '#008000',
  '#000080', '#FF69B4', '#DC143C', '#4B0082', '#2F4F4F'
];

export const ColorPanel = ({ currentColor, onColorChange, canvasRef }: ColorPanelProps) => {
  const [hexInput, setHexInput] = useState(currentColor);
  const [rgbInput, setRgbInput] = useState({ r: 0, g: 0, b: 0 });

  const hexToRgb = useCallback((hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }, []);

  const rgbToHex = useCallback((r: number, g: number, b: number) => {
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }, []);

  const handleHexChange = (value: string) => {
    setHexInput(value);
    if (value.match(/^#[0-9A-F]{6}$/i)) {
      onColorChange(value);
      setRgbInput(hexToRgb(value));
    }
  };

  const handleRgbChange = (component: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgbInput, [component]: value };
    setRgbInput(newRgb);
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHexInput(hex);
    onColorChange(hex);
  };

  const handleEyedropper = () => {
    // This would require implementing eyedropper functionality
    // For now, we'll just show a placeholder
    alert('Click anywhere on the canvas to pick a color (feature coming soon)');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Color Picker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Current Color</Label>
          <div 
            className="w-full h-12 border rounded-md"
            style={{ backgroundColor: currentColor }}
          />
        </div>

        <Tabs defaultValue="palette" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="palette">Palette</TabsTrigger>
            <TabsTrigger value="hex">HEX</TabsTrigger>
            <TabsTrigger value="rgb">RGB</TabsTrigger>
          </TabsList>
          
          <TabsContent value="palette" className="space-y-3">
            <div className="grid grid-cols-5 gap-2">
              {colorPalette.map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    onColorChange(color);
                    setHexInput(color);
                    setRgbInput(hexToRgb(color));
                  }}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hex" className="space-y-3">
            <div className="space-y-2">
              <Label>HEX Value</Label>
              <Input
                value={hexInput}
                onChange={(e) => handleHexChange(e.target.value)}
                placeholder="#000000"
                className="font-mono"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="rgb" className="space-y-3">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Red: {rgbInput.r}</Label>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgbInput.r}
                  onChange={(e) => handleRgbChange('r', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label>Green: {rgbInput.g}</Label>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgbInput.g}
                  onChange={(e) => handleRgbChange('g', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label>Blue: {rgbInput.b}</Label>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgbInput.b}
                  onChange={(e) => handleRgbChange('b', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Button onClick={handleEyedropper} variant="outline" className="w-full">
          🎨 Eyedropper Tool
        </Button>
      </CardContent>
    </Card>
  );
};
