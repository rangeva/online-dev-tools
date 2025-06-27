
import { useState, useCallback, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ColorPickerWidgetProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

export const ColorPickerWidget = ({ currentColor, onColorChange }: ColorPickerWidgetProps) => {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const saturationAreaRef = useRef<HTMLDivElement>(null);

  // Convert hex to HSL
  const hexToHsl = useCallback((hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

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

  // Convert HSL to hex
  const hslToHex = useCallback((h: number, s: number, l: number) => {
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

    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }, []);

  // Update HSL values when current color changes
  useEffect(() => {
    const hsl = hexToHsl(currentColor);
    setHue(hsl.h);
    setSaturation(hsl.s);
    setLightness(hsl.l);
  }, [currentColor, hexToHsl]);

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Color Picker Widget</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Saturation/Lightness Area */}
        <div className="relative">
          <div
            ref={saturationAreaRef}
            className="w-full h-48 cursor-crosshair relative overflow-hidden rounded-md border"
            style={{
              background: `linear-gradient(to right, #ffffff, hsl(${hue}, 100%, 50%)), 
                          linear-gradient(to top, #000000, transparent)`
            }}
            onClick={handleSaturationAreaClick}
            onMouseDown={() => setIsDragging(true)}
          >
            {/* Picker indicator */}
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
          <label className="text-sm font-medium">Hue: {hue}°</label>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={(e) => handleHueChange(parseInt(e.target.value))}
              className="w-full h-4 rounded-lg appearance-none cursor-pointer"
              style={{
                background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
              }}
            />
          </div>
        </div>

        {/* Current Color Display */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Selected Color</label>
          <div 
            className="w-full h-12 border rounded-md shadow-inner"
            style={{ backgroundColor: currentColor }}
          />
          <div className="text-xs text-center font-mono text-gray-600 dark:text-gray-400">
            {currentColor.toUpperCase()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
