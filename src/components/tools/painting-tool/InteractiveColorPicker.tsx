
import { useState, useCallback, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { hslToHex, hexToHsl } from "./colorUtils";

interface InteractiveColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

export const InteractiveColorPicker = ({ currentColor, onColorChange }: InteractiveColorPickerProps) => {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const saturationAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hsl = hexToHsl(currentColor);
    setHue(hsl.h);
    setSaturation(hsl.s);
    setLightness(hsl.l);
  }, [currentColor]);

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
  }, [hue, onColorChange]);

  const handleHueChange = useCallback((newHue: number) => {
    setHue(newHue);
    const newColor = hslToHex(newHue, saturation, lightness);
    onColorChange(newColor);
  }, [saturation, lightness, onColorChange]);

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
  }, [isDragging, hue, onColorChange]);

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
  );
};
