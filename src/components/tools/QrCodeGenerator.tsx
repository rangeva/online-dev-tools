
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";

const QrCodeGenerator = () => {
  const [text, setText] = useState("https://example.com");
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [size, setSize] = useState(256);
  const [errorCorrection, setErrorCorrection] = useState("L");

  const generateQrCodeUrl = () => {
    const encodedText = encodeURIComponent(text);
    const fgColor = foregroundColor.replace("#", "");
    const bgColor = backgroundColor.replace("#", "");
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}&color=${fgColor}&bgcolor=${bgColor}&ecc=${errorCorrection}`;
  };

  const downloadQrCode = () => {
    const qrCodeUrl = generateQrCodeUrl();
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const errorCorrectionLevels = [
    { value: "L", label: "Low (~7%)", description: "Recovers up to 7% of data" },
    { value: "M", label: "Medium (~15%)", description: "Recovers up to 15% of data" },
    { value: "Q", label: "Quartile (~25%)", description: "Recovers up to 25% of data" },
    { value: "H", label: "High (~30%)", description: "Recovers up to 30% of data" }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          QR Code Generator
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Generate and download a QR code for a URL or plain text with customizable colors and error resistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>QR Code Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="text">Text or URL</Label>
              <Textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or URL to encode"
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="foreground">Foreground Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    id="foreground"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="background">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    id="background"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    placeholder="#ffffff"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="size">Size (pixels)</Label>
                <Input
                  type="number"
                  id="size"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  min="100"
                  max="1000"
                  step="50"
                />
              </div>

              <div>
                <Label htmlFor="errorCorrection">Error Resistance</Label>
                <Select value={errorCorrection} onValueChange={setErrorCorrection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select error correction level" />
                  </SelectTrigger>
                  <SelectContent>
                    {errorCorrectionLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div className="flex flex-col">
                          <span>{level.label}</span>
                          <span className="text-xs text-slate-500">{level.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-3 rounded-md">
              <strong>Error Resistance:</strong> Higher levels allow the QR code to be readable even when damaged or partially obscured, but may result in larger, more complex codes.
            </div>

            <Button onClick={downloadQrCode} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </Button>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {text && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <img
                  src={generateQrCodeUrl()}
                  alt="Generated QR Code"
                  className="max-w-full h-auto"
                  style={{ maxWidth: `${Math.min(size, 400)}px` }}
                />
              </div>
            )}
            {!text && (
              <div className="text-slate-500 dark:text-slate-400 text-center py-8">
                Enter text or URL to generate QR code
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QrCodeGenerator;
