
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HtmlColorCodes = () => {
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState("#3b82f6");
  const [customColor, setCustomColor] = useState("#3b82f6");

  const namedColors = [
    { name: "Red", hex: "#FF0000" },
    { name: "Green", hex: "#008000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Orange", hex: "#FFA500" },
    { name: "Purple", hex: "#800080" },
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Brown", hex: "#A52A2A" },
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Gray", hex: "#808080" },
    { name: "Navy", hex: "#000080" },
    { name: "Teal", hex: "#008080" },
    { name: "Lime", hex: "#00FF00" },
    { name: "Aqua", hex: "#00FFFF" },
    { name: "Maroon", hex: "#800000" },
    { name: "Fuchsia", hex: "#FF00FF" },
    { name: "Silver", hex: "#C0C0C0" },
    { name: "Olive", hex: "#808000" },
    { name: "Crimson", hex: "#DC143C" },
    { name: "Gold", hex: "#FFD700" },
    { name: "Indigo", hex: "#4B0082" },
    { name: "Coral", hex: "#FF7F50" },
    { name: "Salmon", hex: "#FA8072" }
  ];

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

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

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${format} color code copied to clipboard.`,
    });
  };

  const getColorFormats = (color: string) => {
    const rgb = hexToRgb(color);
    const hsl = hexToHsl(color);

    return {
      hex: color.toUpperCase(),
      rgb: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "",
      rgba: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` : "",
      hsl: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "",
      hsla: hsl ? `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)` : ""
    };
  };

  const formats = getColorFormats(selectedColor);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            HTML Color Codes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="picker" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="picker">Color Picker</TabsTrigger>
              <TabsTrigger value="named">Named Colors</TabsTrigger>
            </TabsList>

            <TabsContent value="picker" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="color-picker">Pick a Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="color-picker"
                      type="color"
                      value={customColor}
                      onChange={(e) => {
                        setCustomColor(e.target.value);
                        setSelectedColor(e.target.value);
                      }}
                      className="w-20 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={customColor}
                      onChange={(e) => {
                        setCustomColor(e.target.value);
                        setSelectedColor(e.target.value);
                      }}
                      className="flex-1"
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>

                <div className="w-full h-32 rounded border" style={{ backgroundColor: selectedColor }}>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="named" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {namedColors.map((color) => (
                  <Card
                    key={color.name}
                    className={`cursor-pointer hover:shadow-md transition-all ${
                      selectedColor === color.hex ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedColor(color.hex)}
                  >
                    <CardContent className="p-3 space-y-2">
                      <div
                        className="w-full h-16 rounded border"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="text-center">
                        <p className="font-medium text-sm">{color.name}</p>
                        <p className="text-xs text-gray-500">{color.hex}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Color Formats</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">HEX</Badge>
                      <Button
                        onClick={() => copyToClipboard(formats.hex, "HEX")}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      {formats.hex}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">RGB</Badge>
                      <Button
                        onClick={() => copyToClipboard(formats.rgb, "RGB")}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      {formats.rgb}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">RGBA</Badge>
                      <Button
                        onClick={() => copyToClipboard(formats.rgba, "RGBA")}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      {formats.rgba}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">HSL</Badge>
                      <Button
                        onClick={() => copyToClipboard(formats.hsl, "HSL")}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      {formats.hsl}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">HSLA</Badge>
                      <Button
                        onClick={() => copyToClipboard(formats.hsla, "HSLA")}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      {formats.hsla}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default HtmlColorCodes;
