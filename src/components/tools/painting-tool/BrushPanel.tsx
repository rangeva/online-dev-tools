
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrushSettings } from "./usePaintingTool";

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
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Brush Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Brush Style</Label>
          <Select 
            value={brushSettings.style} 
            onValueChange={(value) => updateBrushSetting('style', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="soft">Soft</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
              <SelectItem value="textured">Textured</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Size: {brushSettings.size}px</Label>
          <Slider
            value={[brushSettings.size]}
            onValueChange={([value]) => updateBrushSetting('size', value)}
            max={100}
            min={1}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Opacity: {Math.round(brushSettings.opacity * 100)}%</Label>
          <Slider
            value={[brushSettings.opacity]}
            onValueChange={([value]) => updateBrushSetting('opacity', value)}
            max={1}
            min={0.1}
            step={0.1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Flow: {Math.round(brushSettings.flow * 100)}%</Label>
          <Slider
            value={[brushSettings.flow]}
            onValueChange={([value]) => updateBrushSetting('flow', value)}
            max={1}
            min={0.1}
            step={0.1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Hardness: {Math.round(brushSettings.hardness * 100)}%</Label>
          <Slider
            value={[brushSettings.hardness]}
            onValueChange={([value]) => updateBrushSetting('hardness', value)}
            max={1}
            min={0.1}
            step={0.1}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
};
