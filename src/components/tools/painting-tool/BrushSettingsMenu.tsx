
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrushSettings, Tool } from "./usePaintingTool";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BrushSettingsMenuProps {
  brushSettings: BrushSettings;
  onBrushSettingsChange: (settings: BrushSettings) => void;
  onToolChange: (tool: Tool) => void;
}

export const BrushSettingsMenu = ({ 
  brushSettings, 
  onBrushSettingsChange, 
  onToolChange 
}: BrushSettingsMenuProps) => {
  const updateBrushSetting = (key: keyof BrushSettings, value: number | string) => {
    onBrushSettingsChange({
      ...brushSettings,
      [key]: value
    });
  };

  // Prevent modal from closing when clicking inside
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Prevent modal from closing during slider interactions
  const handleSliderInteraction = (e: React.MouseEvent | React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div className="space-y-6" onClick={handleContentClick}>
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          🖌️ Brush Settings
        </DialogTitle>
      </DialogHeader>

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
        <div 
          onMouseDown={handleSliderInteraction}
          onPointerDown={handleSliderInteraction}
          onClick={handleSliderInteraction}
        >
          <Slider
            value={[brushSettings.size]}
            onValueChange={([value]) => updateBrushSetting('size', value)}
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
        <div 
          onMouseDown={handleSliderInteraction}
          onPointerDown={handleSliderInteraction}
          onClick={handleSliderInteraction}
        >
          <Slider
            value={[brushSettings.opacity]}
            onValueChange={([value]) => updateBrushSetting('opacity', value)}
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
        <div 
          onMouseDown={handleSliderInteraction}
          onPointerDown={handleSliderInteraction}
          onClick={handleSliderInteraction}
        >
          <Slider
            value={[brushSettings.flow]}
            onValueChange={([value]) => updateBrushSetting('flow', value)}
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
        <div 
          onMouseDown={handleSliderInteraction}
          onPointerDown={handleSliderInteraction}
          onClick={handleSliderInteraction}
        >
          <Slider
            value={[brushSettings.hardness]}
            onValueChange={([value]) => updateBrushSetting('hardness', value)}
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
