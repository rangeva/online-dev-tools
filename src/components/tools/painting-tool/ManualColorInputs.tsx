
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hexToRgb, rgbToHex, hexToHsl, hslToRgb } from "./colorUtils";

interface ManualColorInputsProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

export const ManualColorInputs = ({ currentColor, onColorChange }: ManualColorInputsProps) => {
  const [hexInput, setHexInput] = useState(currentColor);
  const [rgbInput, setRgbInput] = useState({ r: 0, g: 0, b: 0 });
  const [hslInput, setHslInput] = useState({ h: 0, s: 0, l: 0 });

  useEffect(() => {
    const rgb = hexToRgb(currentColor);
    const hsl = hexToHsl(currentColor);
    setRgbInput(rgb);
    setHslInput(hsl);
    setHexInput(currentColor);
  }, [currentColor]);

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

  return (
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
  );
};
