
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ColorConverter = () => {
  const [color, setColor] = useState("#ff0000");
  const [results, setResults] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const getColorName = (hex: string): string => {
    const colorNames: Record<string, string> = {
      "#000000": "black",
      "#ffffff": "white",
      "#ff0000": "red",
      "#00ff00": "lime",
      "#0000ff": "blue",
      "#ffff00": "yellow",
      "#ff00ff": "magenta",
      "#00ffff": "cyan",
      "#800000": "maroon",
      "#008000": "green",
      "#000080": "navy",
      "#808000": "olive",
      "#800080": "purple",
      "#008080": "teal",
      "#c0c0c0": "silver",
      "#808080": "gray",
      "#ffa500": "orange",
      "#ffc0cb": "pink",
      "#a52a2a": "brown",
      "#dda0dd": "plum"
    };
    
    return colorNames[hex.toLowerCase()] || "Unknown";
  };

  const convertColor = () => {
    try {
      const rgb = hexToRgb(color);
      if (!rgb) {
        throw new Error("Invalid color");
      }

      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      const colorName = getColorName(color);

      setResults({
        hex: color.toUpperCase(),
        rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
        hsla: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)`,
        cssName: colorName
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid color format. Please enter a valid hex color.",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Color value copied to clipboard"
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            <CardTitle>Color Converter</CardTitle>
          </div>
          <CardDescription>
            Convert color between different formats (hex, rgb, hsl and css name)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="color-input">Color</Label>
              <div className="flex gap-2">
                <Input
                  id="color-input"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-16 h-10 p-1 border rounded"
                />
                <Input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#ff0000"
                  className="font-mono"
                />
              </div>
            </div>
            <Button onClick={convertColor} className="w-full">
              Convert Color
            </Button>
          </div>

          {/* Color Preview */}
          <div className="flex items-center gap-4">
            <div 
              className="w-20 h-20 rounded-lg border-2 border-slate-300 dark:border-slate-600"
              style={{ backgroundColor: color }}
            />
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Color Preview
            </div>
          </div>

          {Object.keys(results).length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Converted Formats</h3>
              <div className="grid gap-3">
                {Object.entries(results).map(([format, value]) => (
                  <div key={format} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm uppercase text-slate-600 dark:text-slate-400">
                        {format}
                      </div>
                      <div className="font-mono text-sm mt-1">{value}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded border border-slate-300 dark:border-slate-600"
                        style={{ backgroundColor: format === 'cssName' ? color : value }}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(value)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorConverter;
