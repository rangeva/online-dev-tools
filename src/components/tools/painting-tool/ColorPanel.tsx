import { useState, useCallback, RefObject, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const saturationAreaRef = useRef<HTMLDivElement>(null);

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

  const hslToHex = useCallback((h: number, s: number, l: number) => {
    const rgb = hslToRgb(h, s, l);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  }, [hslToRgb, rgbToHex]);

  const hexToHsl = useCallback((hex: string) => {
    const rgb = hexToRgb(hex);
    return rgbToHsl(rgb.r, rgb.g, rgb.b);
  }, [hexToRgb, rgbToHsl]);

  useEffect(() => {
    const rgb = hexToRgb(currentColor);
    const hsl = hexToHsl(currentColor);
    setRgbInput(rgb);
    setHslInput(hsl);
    setHexInput(currentColor);
    setHue(hsl.h);
    setSaturation(hsl.s);
    setLightness(hsl.l);
  }, [currentColor, hexToRgb, rgbToHsl, hexToHsl]);

  const handleSaturationAreaClick = useCallback((e: React.MouseEvent) => {
    if (!saturationAreaRef.current) return;
    
    const rect = saturationAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newSaturation = Math.round((x / rect.width) * 100);
    const newLightness = Math.round(100 - (y / rect.height) * 100);
    
    setSaturation(Math.max(0, Math.min(100, newSaturation)));
    setLightness(Math.max(0, Math.min(100, newLightness)));
    
    const newColor = hslToHex(hue, newSaturation, newLightness);
    onColorChange(newColor);
  }, [hue, hslToHex, onColorChange]);

  const handleHueChange = useCallback((newHue: number) => {
    setHue(newHue);
    const newColor = hslToHex(newHue, saturation, lightness);
    onColorChange(newColor);
  }, [saturation, lightness, hslToHex, onColorChange]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !saturationAreaRef.current) return;
    
    const rect = saturationAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newSaturation = Math.round((x / rect.width) * 100);
    const newLightness = Math.round(100 - (y / rect.height) * 100);
    
    setSaturation(Math.max(0, Math.min(100, newSaturation)));
    setLightness(Math.max(0, Math.min(100, newLightness)));
    
    const newColor = hslToHex(hue, newSaturation, newLightness);
    onColorChange(newColor);
  }, [isDragging, hue, hslToHex, onColorChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

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
    onColorChange(hex);
  };

  const handleHslChange = (component: 'h' | 's' | 'l', value: number) => {
    const newHsl = { ...hslInput, [component]: value };
    setHslInput(newHsl);
    const rgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
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
      <CardContent className="space-y-6">
        {/* Current Color Display */}
        <div className="space-y-2">
          <Label>Current Color</Label>
          <div 
            className="w-full h-12 border rounded-md shadow-inner"
            style={{ backgroundColor: currentColor }}
          />
          <div className="text-xs text-center font-mono text-gray-600 dark:text-gray-400">
            {currentColor.toUpperCase()}
          </div>
        </div>

        {/* Eyedropper Button */}
        <Button 
          onClick={handleEyedropper} 
          variant={currentTool === 'eyedropper' ? "default" : "outline"} 
          className="w-full"
        >
          <Pipette className="w-4 h-4 mr-2" />
          {currentTool === 'eyedropper' ? 'Eyedropper Active' : 'Activate Eyedropper'}
        </Button>

        {/* Interactive Color Picker Widget */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Interactive Picker</Label>
          {/* Saturation/Lightness Area */}
          <div className="relative">
            <div
              ref={saturationAreaRef}
              className="w-full h-32 cursor-crosshair relative overflow-hidden rounded-md border"
              style={{
                background: `linear-gradient(to right, #ffffff, hsl(${hue}, 100%, 50%)), 
                            linear-gradient(to top, #000000, transparent)`
              }}
              onClick={handleSaturationAreaClick}
              onMouseDown={() => setIsDragging(true)}
            >
              <div
                className="absolute w-3 h-3 border-2 border-white rounded-full shadow-md pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${saturation}%`,
                  top: `${100 - lightness}%`,
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)'
                }}
              />
            </div>
          </div>

          {/* Hue Slider */}
          <div className="space-y-2">
            <Label className="text-xs">Hue: {hue}°</Label>
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={(e) => handleHueChange(parseInt(e.target.value))}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer"
              style={{
                background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
              }}
            />
          </div>
        </div>

        {/* Color Palette */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Quick Colors</Label>
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
        </div>

        {/* Manual Input Methods */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Manual Input</Label>
          
          {/* HEX Input */}
          <div className="space-y-2">
            <Label className="text-xs">HEX Value</Label>
            <Input
              value={hexInput}
              onChange={(e) => handleHexChange(e.target.value.toUpperCase())}
              placeholder="#000000"
              className="font-mono text-sm"
              maxLength={7}
            />
          </div>
          
          {/* RGB Sliders */}
          <div className="space-y-3">
            <Label className="text-xs">RGB Values</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">R: {rgbInput.r}</span>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgbInput.r}
                  onChange={(e) => handleRgbChange('r', parseInt(e.target.value))}
                  className="flex-1 ml-3 h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">G: {rgbInput.g}</span>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgbInput.g}
                  onChange={(e) => handleRgbChange('g', parseInt(e.target.value))}
                  className="flex-1 ml-3 h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">B: {rgbInput.b}</span>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgbInput.b}
                  onChange={(e) => handleRgbChange('b', parseInt(e.target.value))}
                  className="flex-1 ml-3 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
          
          {/* HSL Sliders */}
          <div className="space-y-3">
            <Label className="text-xs">HSL Values</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">H: {hslInput.h}°</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hslInput.h}
                  onChange={(e) => handleHslChange('h', parseInt(e.target.value))}
                  className="flex-1 ml-3 h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 via-purple-500 to-red-500 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">S: {hslInput.s}%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={hslInput.s}
                  onChange={(e) => handleHslChange('s', parseInt(e.target.value))}
                  className="flex-1 ml-3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">L: {hslInput.l}%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={hslInput.l}
                  onChange={(e) => handleHslChange('l', parseInt(e.target.value))}
                  className="flex-1 ml-3 h-2 bg-gradient-to-r from-black via-gray-500 to-white rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
