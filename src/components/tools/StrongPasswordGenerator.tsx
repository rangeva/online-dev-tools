
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StrongPasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([12]);
  const [options, setOptions] = useState({
    easyToSay: false,
    easyToRead: false,
    allCharacters: true,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const { toast } = useToast();

  const easyToSayChars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const easyToReadChars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ2346789";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const allChars = uppercaseChars + lowercaseChars + numberChars + symbolChars;

  const generatePassword = () => {
    let charset = "";
    
    if (options.easyToSay) {
      charset = easyToSayChars;
    } else if (options.easyToRead) {
      charset = easyToReadChars;
    } else if (options.allCharacters) {
      charset = allChars;
    } else {
      if (options.uppercase) charset += uppercaseChars;
      if (options.lowercase) charset += lowercaseChars;
      if (options.numbers) charset += numberChars;
      if (options.symbols) charset += symbolChars;
    }

    if (!charset) {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive"
      });
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length[0]; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setPassword(newPassword);
  };

  const copyPassword = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      toast({
        title: "Copied!",
        description: "Password copied to clipboard"
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy password",
        variant: "destructive"
      });
    }
  };

  const generateQrCodeUrl = () => {
    if (!password) return "";
    const encodedPassword = encodeURIComponent(password);
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedPassword}`;
  };

  const downloadQrCode = () => {
    if (!password) return;
    
    const qrCodeUrl = generateQrCodeUrl();
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "password-qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOptionChange = (option: string, value: boolean) => {
    const newOptions = { ...options, [option]: value };
    
    // Handle mutual exclusivity for easy options
    if (option === "easyToSay" && value) {
      newOptions.easyToRead = false;
      newOptions.allCharacters = false;
    } else if (option === "easyToRead" && value) {
      newOptions.easyToSay = false;
      newOptions.allCharacters = false;
    } else if (option === "allCharacters" && value) {
      newOptions.easyToSay = false;
      newOptions.easyToRead = false;
    }
    
    setOptions(newOptions);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Strong Password Generator
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Generate secure passwords with customizable options and QR code export
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settings Section */}
        <Card>
          <CardHeader>
            <CardTitle>Customize Your Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Password Length: {length[0]}</Label>
              <Slider
                value={length}
                onValueChange={setLength}
                max={128}
                min={4}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>4</span>
                <span>128</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="easy-to-say">Easy to say</Label>
                <Switch
                  id="easy-to-say"
                  checked={options.easyToSay}
                  onCheckedChange={(value) => handleOptionChange("easyToSay", value)}
                />
              </div>
              <p className="text-xs text-slate-500">Avoids ambiguous characters like 0, O, l, 1</p>

              <div className="flex items-center justify-between">
                <Label htmlFor="easy-to-read">Easy to read</Label>
                <Switch
                  id="easy-to-read"
                  checked={options.easyToRead}
                  onCheckedChange={(value) => handleOptionChange("easyToRead", value)}
                />
              </div>
              <p className="text-xs text-slate-500">Avoids characters that look similar</p>

              <div className="flex items-center justify-between">
                <Label htmlFor="all-characters">All characters</Label>
                <Switch
                  id="all-characters"
                  checked={options.allCharacters}
                  onCheckedChange={(value) => handleOptionChange("allCharacters", value)}
                />
              </div>
              <p className="text-xs text-slate-500">Use all available character types</p>
            </div>

            {!options.easyToSay && !options.easyToRead && !options.allCharacters && (
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label htmlFor="uppercase">Uppercase</Label>
                  <Switch
                    id="uppercase"
                    checked={options.uppercase}
                    onCheckedChange={(value) => handleOptionChange("uppercase", value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="lowercase">Lowercase</Label>
                  <Switch
                    id="lowercase"
                    checked={options.lowercase}
                    onCheckedChange={(value) => handleOptionChange("lowercase", value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="numbers">Numbers</Label>
                  <Switch
                    id="numbers"
                    checked={options.numbers}
                    onCheckedChange={(value) => handleOptionChange("numbers", value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="symbols">Symbols</Label>
                  <Switch
                    id="symbols"
                    checked={options.symbols}
                    onCheckedChange={(value) => handleOptionChange("symbols", value)}
                  />
                </div>
              </div>
            )}

            <Button onClick={generatePassword} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate Password
            </Button>
          </CardContent>
        </Card>

        {/* Generated Password & QR Code Section */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="generated-password">Your Password</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="generated-password"
                  value={password}
                  readOnly
                  placeholder="Click 'Generate Password' to create a password"
                  className="font-mono"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyPassword}
                  disabled={!password}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {password && (
              <div className="space-y-4">
                <div className="text-center">
                  <Label className="text-sm font-medium">QR Code</Label>
                  <div className="mt-2 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg inline-block">
                    <img
                      src={generateQrCodeUrl()}
                      alt="Password QR Code"
                      className="w-48 h-48"
                    />
                  </div>
                </div>

                <Button onClick={downloadQrCode} variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </Button>

                <div className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-800 p-3 rounded-md">
                  <strong>Security Note:</strong> QR codes contain your password in plain text. 
                  Only share or save QR codes in secure locations.
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StrongPasswordGenerator;
