
import { Label } from "@/components/ui/label";

interface ColorPaletteProps {
  onColorChange: (color: string) => void;
}

const colorPalette = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
  '#FFC0CB', '#A52A2A', '#808080', '#FFD700', '#008000',
  '#000080', '#FF69B4', '#DC143C', '#4B0082', '#2F4F4F',
  '#8B4513', '#228B22', '#4169E1', '#FF1493', '#32CD32',
  '#FF4500', '#9932CC', '#00CED1', '#FFB6C1', '#ADFF2F'
];

export const ColorPalette = ({ onColorChange }: ColorPaletteProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Quick Colors</Label>
      <div className="grid grid-cols-6 gap-2">
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
  );
};
