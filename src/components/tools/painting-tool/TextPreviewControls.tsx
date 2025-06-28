
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TextSettings } from "./usePaintingTool";

interface TextPreviewControlsProps {
  textSettings: TextSettings;
  onTextSettingsChange: (updates: Partial<TextSettings>) => void;
}

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

export const TextPreviewControls = ({
  textSettings,
  onTextSettingsChange
}: TextPreviewControlsProps) => {
  return (
    <div className="space-y-3">
      {/* Font Size and Color */}
      <div className="grid grid-cols-2 gap-3">
        {/* Font Size */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">Size</label>
          <div className="flex items-center space-x-2">
            <Slider
              value={[textSettings.fontSize]}
              onValueChange={(value) => onTextSettingsChange({ fontSize: value[0] })}
              min={8}
              max={72}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-gray-500 min-w-[2rem]">{textSettings.fontSize}</span>
          </div>
        </div>

        {/* Color Picker */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">Color</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-full h-8 px-2 justify-start"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div 
                  className="w-4 h-4 rounded border mr-2" 
                  style={{ backgroundColor: textSettings.color }}
                />
                <Palette className="w-3 h-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3">
              <div className="space-y-3">
                <Input
                  type="color"
                  value={textSettings.color}
                  onChange={(e) => onTextSettingsChange({ color: e.target.value })}
                  className="w-full h-8"
                />
                <Input
                  type="text"
                  value={textSettings.color}
                  onChange={(e) => onTextSettingsChange({ color: e.target.value })}
                  className="text-sm"
                  placeholder="#000000"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Font Family and Style */}
      <div className="grid grid-cols-2 gap-3">
        {/* Font Family */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">Font</label>
          <Select 
            value={textSettings.fontFamily} 
            onValueChange={(value) => onTextSettingsChange({ fontFamily: value })}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 z-50">
              {fontFamilies.map((font) => (
                <SelectItem key={font} value={font} className="text-xs hover:bg-gray-50">
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Style toggles */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">Style</label>
          <div className="flex items-center gap-1">
            <Toggle
              pressed={textSettings.bold}
              onPressedChange={(pressed) => onTextSettingsChange({ bold: pressed })}
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <span className="font-bold text-xs">B</span>
            </Toggle>
            <Toggle
              pressed={textSettings.italic}
              onPressedChange={(pressed) => onTextSettingsChange({ italic: pressed })}
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <span className="italic text-xs">I</span>
            </Toggle>
          </div>
        </div>
      </div>
    </div>
  );
};
