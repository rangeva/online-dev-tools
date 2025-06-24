
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Download, Wifi, Eye, EyeOff } from "lucide-react";

const WifiQrGenerator = () => {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [security, setSecurity] = useState("WPA");
  const [hidden, setHidden] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [size, setSize] = useState(256);

  const generateWifiString = () => {
    const escapedSsid = ssid.replace(/([\\";,:])/g, '\\$1');
    const escapedPassword = password.replace(/([\\";,:])/g, '\\$1');
    return `WIFI:T:${security};S:${escapedSsid};P:${escapedPassword};H:${hidden ? 'true' : 'false'};;`;
  };

  const generateQrCodeUrl = () => {
    if (!ssid) return "";
    const wifiString = generateWifiString();
    const encodedWifiString = encodeURIComponent(wifiString);
    const fgColor = foregroundColor.replace("#", "");
    const bgColor = backgroundColor.replace("#", "");
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedWifiString}&color=${fgColor}&bgcolor=${bgColor}&ecc=M`;
  };

  const downloadQrCode = () => {
    const qrCodeUrl = generateQrCodeUrl();
    if (!qrCodeUrl) return;
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `wifi-${ssid || 'network'}-qrcode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const securityTypes = [
    { value: "nopass", label: "Open (No Password)" },
    { value: "WEP", label: "WEP" },
    { value: "WPA", label: "WPA/WPA2" },
    { value: "WPA3", label: "WPA3" }
  ];

  const requiresPassword = security !== "nopass";

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          WiFi QR Code Generator
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Generate and download QR codes for quick connections to WiFi networks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="w-5 h-5" />
              WiFi Network Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="ssid">Network Name (SSID) *</Label>
              <Input
                id="ssid"
                value={ssid}
                onChange={(e) => setSsid(e.target.value)}
                placeholder="Enter WiFi network name"
                required
              />
            </div>

            <div>
              <Label htmlFor="security">Security Type</Label>
              <Select value={security} onValueChange={setSecurity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select security type" />
                </SelectTrigger>
                <SelectContent>
                  {securityTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {requiresPassword && (
              <div>
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter WiFi password"
                    className="pr-10"
                    required={requiresPassword}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label htmlFor="hidden">Hidden Network</Label>
              <Switch
                id="hidden"
                checked={hidden}
                onCheckedChange={setHidden}
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-3">QR Code Appearance</h3>
              
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

              <div className="mt-4">
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
            </div>

            <div className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-3 rounded-md">
              <strong>How to use:</strong> After scanning this QR code with a smartphone camera, users will be prompted to join the WiFi network automatically.
            </div>

            <Button 
              onClick={downloadQrCode} 
              className="w-full" 
              disabled={!ssid || (requiresPassword && !password)}
            >
              <Download className="w-4 h-4 mr-2" />
              Download WiFi QR Code
            </Button>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {ssid && (!requiresPassword || password) ? (
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <img
                  src={generateQrCodeUrl()}
                  alt="Generated WiFi QR Code"
                  className="max-w-full h-auto"
                  style={{ maxWidth: `${Math.min(size, 400)}px` }}
                />
                <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
                  <p><strong>Network:</strong> {ssid}</p>
                  <p><strong>Security:</strong> {securityTypes.find(t => t.value === security)?.label}</p>
                  {hidden && <p><strong>Hidden Network:</strong> Yes</p>}
                </div>
              </div>
            ) : (
              <div className="text-slate-500 dark:text-slate-400 text-center py-8">
                <Wifi className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Enter network details to generate WiFi QR code</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WifiQrGenerator;
