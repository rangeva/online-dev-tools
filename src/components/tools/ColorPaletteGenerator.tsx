
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Copy, Shuffle, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ColorPaletteGenerator = () => {
  const { toast } = useToast();
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [paletteType, setPaletteType] = useState("complementary");
  const [palette, setPalette] = useState<string[]>([]);

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  };

  const hslToHex = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const generatePalette = () => {
    const [h, s, l] = hexToHsl(baseColor);
    let colors: string[] = [];

    switch (paletteType) {
      case "complementary":
        colors = [
          baseColor,
          hslToHex((h + 180) % 360, s, l)
        ];
        break;
      case "triadic":
        colors = [
          baseColor,
          hslToHex((h + 120) % 360, s, l),
          hslToHex((h + 240) % 360, s, l)
        ];
        break;
      case "analogous":
        colors = [
          hslToHex((h - 30 + 360) % 360, s, l),
          baseColor,
          hslToHex((h + 30) % 360, s, l),
          hslToHex((h + 60) % 360, s, l)
        ];
        break;
      case "monochromatic":
        colors = [
          hslToHex(h, s, Math.max(10, l - 30)),
          hslToHex(h, s, Math.max(10, l - 15)),
          baseColor,
          hslToHex(h, s, Math.min(90, l + 15)),
          hslToHex(h, s, Math.min(90, l + 30))
        ];
        break;
      case "tetradic":
        colors = [
          baseColor,
          hslToHex((h + 90) % 360, s, l),
          hslToHex((h + 180) % 360, s, l),
          hslToHex((h + 270) % 360, s, l)
        ];
        break;
    }

    setPalette(colors);
  };

  const generateRandomPalette = () => {
    const randomHue = Math.floor(Math.random() * 360);
    const randomSat = 50 + Math.floor(Math.random() * 50);
    const randomLight = 40 + Math.floor(Math.random() * 40);
    const randomColor = hslToHex(randomHue, randomSat, randomLight);
    setBaseColor(randomColor);
    
    const [h, s, l] = hexToHsl(randomColor);
    let colors: string[] = [];

    switch (paletteType) {
      case "complementary":
        colors = [randomColor, hslToHex((h + 180) % 360, s, l)];
        break;
      case "triadic":
        colors = [
          randomColor,
          hslToHex((h + 120) % 360, s, l),
          hslToHex((h + 240) % 360, s, l)
        ];
        break;
      case "analogous":
        colors = [
          hslToHex((h - 30 + 360) % 360, s, l),
          randomColor,
          hslToHex((h + 30) % 360, s, l),
          hslToHex((h + 60) % 360, s, l)
        ];
        break;
      case "monochromatic":
        colors = [
          hslToHex(h, s, Math.max(10, l - 30)),
          hslToHex(h, s, Math.max(10, l - 15)),
          randomColor,
          hslToHex(h, s, Math.min(90, l + 15)),
          hslToHex(h, s, Math.min(90, l + 30))
        ];
        break;
      case "tetradic":
        colors = [
          randomColor,
          hslToHex((h + 90) % 360, s, l),
          hslToHex((h + 180) % 360, s, l),
          hslToHex((h + 270) % 360, s, l)
        ];
        break;
    }

    setPalette(colors);
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Color copied!",
      description: `${color} has been copied to your clipboard.`,
    });
  };

  const copyPalette = () => {
    const paletteText = palette.join(", ");
    navigator.clipboard.writeText(paletteText);
    toast({
      title: "Palette copied!",
      description: "All colors have been copied to your clipboard.",
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Palette Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="base-color">Base Color</Label>
              <div className="flex gap-2">
                <Input
                  id="base-color"
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-20 h-10 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="flex-1"
                  placeholder="#3b82f6"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="palette-type">Palette Type</Label>
              <Select value={paletteType} onValueChange={setPaletteType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select palette type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="complementary">Complementary</SelectItem>
                  <SelectItem value="triadic">Triadic</SelectItem>
                  <SelectItem value="analogous">Analogous</SelectItem>
                  <SelectItem value="monochromatic">Monochromatic</SelectItem>
                  <SelectItem value="tetradic">Tetradic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={generatePalette} className="flex-1">
              Generate Palette
            </Button>
            <Button onClick={generateRandomPalette} variant="outline">
              <Shuffle className="h-4 w-4 mr-2" />
              Random
            </Button>
          </div>

          {palette.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Generated Palette</h3>
                <Button onClick={copyPalette} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy All
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {palette.map((color, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-3 space-y-2">
                      <div
                        className="w-full h-20 rounded border"
                        style={{ backgroundColor: color }}
                      />
                      <div className="space-y-1">
                        <Badge variant="secondary" className="w-full justify-center text-xs">
                          {color.toUpperCase()}
                        </Badge>
                        <Button
                          onClick={() => copyColor(color)}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorPaletteGenerator;
