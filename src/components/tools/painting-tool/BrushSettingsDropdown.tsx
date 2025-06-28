
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BrushSettings, Tool } from "./usePaintingTool";
import { Brush, Palette, Pipette, ChevronDown } from "lucide-react";

interface BrushSettingsDropdownProps {
  brushSettings: BrushSettings;
  onBrushSettingsChange: (settings: BrushSettings) => void;
  currentColor: string;
  onColorChange: (color: string) => void;
  currentTool?: Tool;
  onToolChange?: (tool: Tool) => void;
  previewColor?: string;
}

const colorPalette = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
  '#FFC0CB', '#A52A2A', '#808080', '#FFD700', '#008000',
  '#000080', '#FF69B4', '#DC143C', '#4B0082', '#2F4F4F'
];

export const BrushSettingsDropdown = ({ 
  brushSettings, 
  onBrushSettingsChange, 
  currentColor, 
  onColorChange,
  currentTool,
  onToolChange,
  previewColor
}: BrushSettingsDropdownProps) => {
  const updateBrushSetting = (key: keyof BrushSettings, value: number | string) => {
    onBrushSettingsChange({
      ...brushSettings,
      [key]: value
    });
  };

  const handleEyedropper = () => {
    if (onToolChange) {
      onToolChange('eyedropper');
    }
  };

  const handleBrushSelect = () => {
    if (onToolChange) {
      onToolChange('brush');
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={currentTool === 'brush' ? "default" : "ghost"}
          size="sm"
          className={`
            relative transition-all duration-200 
            ${currentTool === 'brush' 
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }
          `}
        >
          <Brush className="w-4 h-4 mr-1.5" />
          <span className="font-medium">Brush</span>
          <ChevronDown className="w-3 h-3 ml-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg z-50" align="start">
        <div className="space-y-4">
          {/* Brush Tool Selection */}
          {onToolChange && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Brush Tool</Label>
              <Button 
                onClick={handleBrushSelect} 
                variant={currentTool === 'brush' ? "default" : "outline"} 
                className="w-full"
              >
                <Brush className="w-4 h-4 mr-2" />
                {currentTool === 'brush' ? 'Brush Active' : 'Activate Brush'}
              </Button>
            </div>
          )}

          {/* Eyedropper Tool */}
          {onToolChange && (
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
          )}

          {/* Current Color Display */}
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
          
          {/* Color Palette */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Quick Colors</Label>
            <div className="grid grid-cols-5 gap-2">
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
          
          {/* Manual Color Input */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Custom Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={currentColor}
                onChange={(e) => onColorChange(e.target.value)}
                className="w-12 h-8 p-1 border rounded"
              />
              <Input
                type="text"
                value={currentColor}
                onChange={(e) => onColorChange(e.target.value)}
                placeholder="#000000"
                className="flex-1 text-sm font-mono"
              />
            </div>
          </div>

          {/* Brush Style */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Brush Style</Label>
            <Select 
              value={brushSettings.style} 
              onValueChange={(value) => updateBrushSetting('style', value)}
            >
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="soft">🌟 Soft</SelectItem>
                <SelectItem value="hard">💎 Hard</SelectItem>
                <SelectItem value="textured">🎨 Textured</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Size Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Size</Label>
              <span className="text-sm bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-md font-mono text-blue-700 dark:text-blue-300">
                {brushSettings.size}px
              </span>
            </div>
            <Slider
              value={[brushSettings.size]}
              onValueChange={([value]) => updateBrushSetting('size', value)}
              max={100}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>1px</span>
              <span>100px</span>
            </div>
          </div>

          {/* Opacity Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Opacity</Label>
              <span className="text-sm bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-md font-mono text-purple-700 dark:text-purple-300">
                {Math.round(brushSettings.opacity * 100)}%
              </span>
            </div>
            <Slider
              value={[brushSettings.opacity]}
              onValueChange={([value]) => updateBrushSetting('opacity', value)}
              max={1}
              min={0.1}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>10%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Flow Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Flow</Label>
              <span className="text-sm bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-md font-mono text-green-700 dark:text-green-300">
                {Math.round(brushSettings.flow * 100)}%
              </span>
            </div>
            <Slider
              value={[brushSettings.flow]}
              onValueChange={([value]) => updateBrushSetting('flow', value)}
              max={1}
              min={0.1}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>10%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Hardness Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Hardness</Label>
              <span className="text-sm bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-md font-mono text-orange-700 dark:text-orange-300">
                {Math.round(brushSettings.hardness * 100)}%
              </span>
            </div>
            <Slider
              value={[brushSettings.hardness]}
              onValueChange={([value]) => updateBrushSetting('hardness', value)}
              max={1}
              min={0.1}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>10%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
