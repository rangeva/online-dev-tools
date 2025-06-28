
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrushSettings, Tool } from "./usePaintingTool";
import { Button } from "@/components/ui/button";

interface BrushSettingsMenuProps {
  brushSettings: BrushSettings;
  onBrushSettingsChange: (settings: BrushSettings) => void;
  onToolChange: (tool: Tool) => void;
  onClose?: () => void;
}

export const BrushSettingsMenu = ({ 
  brushSettings, 
  onBrushSettingsChange, 
  onToolChange,
  onClose
}: BrushSettingsMenuProps) => {
  const updateBrushSetting = (key: keyof BrushSettings, value: number | string) => {
    onBrushSettingsChange({
      ...brushSettings,
      [key]: value
    });
  };

  const handleBrushSelect = () => {
    onToolChange('brush');
    onClose?.();
  };

  const handleSliderChange = (key: keyof BrushSettings) => (values: number[]) => {
    updateBrushSetting(key, values[0]);
  };

  return (
    <div className="space-y-4" onPointerDown={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Brush Settings</h3>
        <Button 
          onClick={handleBrushSelect}
          size="sm"
          variant="outline"
          className="text-xs"
        >
          Select Brush
        </Button>
      </div>

      {/* Brush Style */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Brush Style</Label>
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
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Size</Label>
          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-md font-mono text-blue-700 dark:text-blue-300">
            {brushSettings.size}px
          </span>
        </div>
        <div onPointerDown={(e) => e.stopPropagation()}>
          <Slider
            value={[brushSettings.size]}
            onValueChange={handleSliderChange('size')}
            max={100}
            min={1}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      {/* Opacity Control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Opacity</Label>
          <span className="text-xs bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-md font-mono text-purple-700 dark:text-purple-300">
            {Math.round(brushSettings.opacity * 100)}%
          </span>
        </div>
        <div onPointerDown={(e) => e.stopPropagation()}>
          <Slider
            value={[brushSettings.opacity]}
            onValueChange={handleSliderChange('opacity')}
            max={1}
            min={0.1}
            step={0.1}
            className="w-full"
          />
        </div>
      </div>

      {/* Flow Control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Flow</Label>
          <span className="text-xs bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-md font-mono text-green-700 dark:text-green-300">
            {Math.round(brushSettings.flow * 100)}%
          </span>
        </div>
        <div onPointerDown={(e) => e.stopPropagation()}>
          <Slider
            value={[brushSettings.flow]}
            onValueChange={handleSliderChange('flow')}
            max={1}
            min={0.1}
            step={0.1}
            className="w-full"
          />
        </div>
      </div>

      {/* Hardness Control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Hardness</Label>
          <span className="text-xs bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-md font-mono text-orange-700 dark:text-orange-300">
            {Math.round(brushSettings.hardness * 100)}%
          </span>
        </div>
        <div onPointerDown={(e) => e.stopPropagation()}>
          <Slider
            value={[brushSettings.hardness]}
            onValueChange={handleSliderChange('hardness')}
            max={1}
            min={0.1}
            step={0.1}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
