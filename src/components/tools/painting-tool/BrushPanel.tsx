
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrushSettings } from "./usePaintingTool";
import { Brush } from "lucide-react";

interface BrushPanelProps {
  brushSettings: BrushSettings;
  onBrushSettingsChange: (settings: BrushSettings) => void;
}

export const BrushPanel = ({ brushSettings, onBrushSettingsChange }: BrushPanelProps) => {
  const updateBrushSetting = (key: keyof BrushSettings, value: number | string) => {
    onBrushSettingsChange({
      ...brushSettings,
      [key]: value
    });
  };

  return (
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
  );
};
