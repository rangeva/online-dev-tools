
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { Bold, Italic, Type } from "lucide-react";
import { TextSettings } from "./usePaintingTool";

interface TextPanelProps {
  textSettings: TextSettings;
  onTextSettingsChange: (settings: TextSettings) => void;
}

export const TextPanel = ({ textSettings, onTextSettingsChange }: TextPanelProps) => {
  const fontFamilies = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Verdana',
    'Georgia',
    'Comic Sans MS',
    'Impact'
  ];

  const updateTextSettings = (updates: Partial<TextSettings>) => {
    onTextSettingsChange({ ...textSettings, ...updates });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Type className="w-4 h-4" />
          Text Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="font-size" className="text-sm font-medium">Font Size</Label>
          <Input
            id="font-size"
            type="number"
            min="8"
            max="72"
            value={textSettings.fontSize}
            onChange={(e) => updateTextSettings({ fontSize: parseInt(e.target.value) || 16 })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="font-family" className="text-sm font-medium">Font Family</Label>
          <Select value={textSettings.fontFamily} onValueChange={(value) => updateTextSettings({ fontFamily: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50">
              {fontFamilies.map((font) => (
                <SelectItem key={font} value={font} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="text-color" className="text-sm font-medium">Text Color</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
              id="text-color"
              type="color"
              value={textSettings.color}
              onChange={(e) => updateTextSettings({ color: e.target.value })}
              className="w-12 h-8 p-0 border rounded cursor-pointer"
            />
            <Input
              type="text"
              value={textSettings.color}
              onChange={(e) => updateTextSettings({ color: e.target.value })}
              className="flex-1"
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Text Style</Label>
          <div className="flex items-center gap-2 mt-1">
            <Toggle
              pressed={textSettings.bold}
              onPressedChange={(pressed) => updateTextSettings({ bold: pressed })}
              variant="outline"
              size="sm"
            >
              <Bold className="w-4 h-4" />
            </Toggle>
            <Toggle
              pressed={textSettings.italic}
              onPressedChange={(pressed) => updateTextSettings({ italic: pressed })}
              variant="outline"
              size="sm"
            >
              <Italic className="w-4 h-4" />
            </Toggle>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
