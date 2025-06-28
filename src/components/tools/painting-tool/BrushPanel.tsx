
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrushSettings, Tool } from "./usePaintingTool";
import { Brush, Palette, Pipette } from "lucide-react";

interface BrushPanelProps {
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

export const BrushPanel = ({ 
  brushSettings, 
  onBrushSettingsChange, 
  currentColor, 
  onColorChange,
  currentTool,
  onToolChange,
  previewColor
}: BrushPanelProps) => {
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
    <div className="space-y-4">
      {/* Brush Tool Selection */}
      {onToolChange && (
        <Card className="border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2 text-gray-800 dark:text-gray-200">
              <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                <Brush className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              Brush Tool
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleBrushSelect} 
              variant={currentTool === 'brush' ? "default" : "outline"} 
              className="w-full"
            >
              <Brush className="w-4 h-4 mr-2" />
              {currentTool === 'brush' ? 'Brush Active' : 'Activate Brush'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Color Selection */}
      <Card className="border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-md">
              <Palette className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            Color
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>

      {/* Brush Settings */}
      <Card className="border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-md">
              <Brush className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            Brush Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Brush Style */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Brush Style</Label>
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
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Size</Label>
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
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Opacity</Label>
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
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Flow</Label>
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
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Hardness</Label>
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
        </CardContent>
      </Card>
    </div>
  );
};
