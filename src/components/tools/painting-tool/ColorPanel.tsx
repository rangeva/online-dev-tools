import { useState, useCallback, RefObject, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pipette } from "lucide-react";
import { Tool } from "./usePaintingTool";

interface ColorPanelProps {
  currentColor: string;
  onColorChange: (color: string) => void;
  canvasRef: RefObject<HTMLCanvasElement>;
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
}

const colorPalette = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
  '#FFC0CB', '#A52A2A', '#808080', '#FFD700', '#008000',
  '#000080', '#FF69B4', '#DC143C', '#4B0082', '#2F4F4F',
  '#8B4513', '#228B22', '#4169E1', '#FF1493', '#32CD32',
  '#FF4500', '#9932CC', '#00CED1', '#FFB6C1', '#ADFF2F'
];

export const ColorPanel = ({ currentColor, onColorChange, canvasRef, currentTool, onToolChange }: ColorPanelProps) => {
  const [hexInput, setHexInput] = useState(currentColor);
  const [rgbInput, setRgbInput] = useState({ r: 0, g: 0, b: 0 });
  const [hslInput, setHslInput] = useState({ h: 0, s: 0, l: 0 });

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

  const rgbToHsl = useCallback((r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }, []);

  const hslToRgb = useCallback((h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }, []);

  useEffect(() => {
    const rgb = hexToRgb(currentColor);
    setRgbInput(rgb);
    setHslInput(rgbToHsl(rgb.r, rgb.g, rgb.b));
    setHexInput(currentColor);
  }, [currentColor, hexToRgb, rgbToHsl]);

  const handleHexChange = (value: string) => {
    setHexInput(value);
    if (value.match(/^#[0-9A-F]{6}$/i)) {
      onColorChange(value);
    }
  };

  const handleRgbChange = (component: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgbInput, [component]: value };
    setRgbInput(newRgb);
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHexInput(hex);
    setHslInput(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    onColorChange(hex);
  };

  const handleHslChange = (component: 'h' | 's' | 'l', value: number) => {
    const newHsl = { ...hslInput, [component]: value };
    setHslInput(newHsl);
    const rgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgbInput(rgb);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setHexInput(hex);
    onColorChange(hex);
  };

  const handleEyedropper = () => {
    onToolChange('eyedropper');
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
            className="w-full h-12 border rounded-md shadow-inner"
            style={{ backgroundColor: currentColor }}
          />
        </div>

        <Button 
          onClick={handleEyedropper} 
          variant={currentTool === 'eyedropper' ? "default" : "outline"} 
          className="w-full"
        >
          <Pipette className="w-4 h-4 mr-2" />
          {currentTool === 'eyedropper' ? 'Eyedropper Active' : 'Activate Eyedropper'}
        </Button>

        <Tabs defaultValue="palette" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="palette">Palette</TabsTrigger>
            <TabsTrigger value="hex">HEX</TabsTrigger>
            <TabsTrigger value="rgb">RGB</TabsTrigger>
            <TabsTrigger value="hsl">HSL</TabsTrigger>
          </TabsList>
          
          <TabsContent value="palette" className="space-y-3">
            <div className="grid grid-cols-6 gap-2">
              {colorPalette.map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded-md border border-gray-300 hover:scale-110 transition-transform shadow-sm"
                  style={{ backgroundColor: color }}
                  onClick={() => onColorChange(color)}
                  title={color}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hex" className="space-y-3">
            <div className="space-y-2">
              <Label>HEX Value</Label>
              <Input
                value={hexInput}
                onChange={(e) => handleHexChange(e.target.value.toUpperCase())}
                placeholder="#000000"
                className="font-mono"
                maxLength={7}
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
                  className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer slider-thumb:bg-red-500"
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
                  className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
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
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="hsl" className="space-y-3">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Hue: {hslInput.h}°</Label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hslInput.h}
                  onChange={(e) => handleHslChange('h', parseInt(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 via-purple-500 to-red-500 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="space-y-2">
                <Label>Saturation: {hslInput.s}%</Label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={hslInput.s}
                  onChange={(e) => handleHslChange('s', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="space-y-2">
                <Label>Lightness: {hslInput.l}%</Label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={hslInput.l}
                  onChange={(e) => handleHslChange('l', parseInt(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-black via-gray-500 to-white rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
