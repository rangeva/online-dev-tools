
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Globe, Type, RefreshCw, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TextToUnicode = () => {
  const [textInput, setTextInput] = useState("");
  const [unicodeInput, setUnicodeInput] = useState("");
  const [textResult, setTextResult] = useState("");
  const [unicodeResult, setUnicodeResult] = useState("");
  const [unicodeFormat, setUnicodeFormat] = useState("U+");
  const { toast } = useToast();

  const textToUnicode = () => {
    try {
      let result = "";
      for (let i = 0; i < textInput.length; i++) {
        const codePoint = textInput.codePointAt(i);
        if (codePoint !== undefined) {
          const hex = codePoint.toString(16).toUpperCase().padStart(4, '0');
          switch (unicodeFormat) {
            case "U+":
              result += `U+${hex} `;
              break;
            case "\\u":
              result += `\\u${hex} `;
              break;
            case "&#x":
              result += `&#x${hex}; `;
              break;
            case "0x":
              result += `0x${hex} `;
              break;
            default:
              result += `U+${hex} `;
          }
          // Handle surrogate pairs
          if (codePoint > 0xFFFF) {
            i++; // Skip the next character as it's part of the surrogate pair
          }
        }
      }
      setUnicodeResult(result.trim());
      toast({
        title: "Success",
        description: "Text converted to Unicode successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert text to Unicode",
        variant: "destructive"
      });
    }
  };

  const unicodeToText = () => {
    try {
      const unicodePattern = /(?:U\+|\\u|&#x|0x)([0-9A-Fa-f]+);?/g;
      let result = "";
      let match;
      
      while ((match = unicodePattern.exec(unicodeInput)) !== null) {
        const codePoint = parseInt(match[1], 16);
        result += String.fromCodePoint(codePoint);
      }
      
      if (result === "") {
        throw new Error("No valid Unicode sequences found");
      }
      
      setTextResult(result);
      toast({
        title: "Success",
        description: "Unicode converted to text successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid Unicode format. Use formats like U+0041, \\u0041, &#x41;, or 0x41",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard"
    });
  };

  const clearAll = () => {
    setTextInput("");
    setUnicodeInput("");
    setTextResult("");
    setUnicodeResult("");
  };

  const swapInputs = () => {
    const tempText = textInput;
    const tempUnicode = unicodeInput;
    setTextInput(textResult);
    setUnicodeInput(unicodeResult);
    setTextResult(tempText);
    setUnicodeResult(tempUnicode);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <CardTitle>Text to Unicode</CardTitle>
          </div>
          <CardDescription>
            Parse and convert text to unicode and vice-versa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="text-to-unicode" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text-to-unicode">Text to Unicode</TabsTrigger>
              <TabsTrigger value="unicode-to-text">Unicode to Text</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text-to-unicode" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="unicode-format">Unicode Format</Label>
                <Select value={unicodeFormat} onValueChange={setUnicodeFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="U+">U+ Format (U+0041)</SelectItem>
                    <SelectItem value="\\u">JavaScript Format (\\u0041)</SelectItem>
                    <SelectItem value="&#x">HTML Entity (&#x41;)</SelectItem>
                    <SelectItem value="0x">Hex Format (0x41)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="text-input">Text Input</Label>
                <Textarea
                  id="text-input"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Enter text to convert to Unicode..."
                  className="min-h-[120px]"
                />
              </div>
              <Button onClick={textToUnicode} className="w-full">
                <Globe className="h-4 w-4 mr-2" />
                Convert to Unicode
              </Button>
              {unicodeResult && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Unicode Output</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(unicodeResult)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={unicodeResult}
                    readOnly
                    className="min-h-[120px] font-mono text-sm"
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="unicode-to-text" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="unicode-input">Unicode Input</Label>
                <Textarea
                  id="unicode-input"
                  value={unicodeInput}
                  onChange={(e) => setUnicodeInput(e.target.value)}
                  placeholder="Enter Unicode (U+0041, \\u0041, &#x41;, or 0x41)..."
                  className="min-h-[120px] font-mono text-sm"
                />
              </div>
              <Button onClick={unicodeToText} className="w-full">
                <Type className="h-4 w-4 mr-2" />
                Convert to Text
              </Button>
              {textResult && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Text Output</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(textResult)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={textResult}
                    readOnly
                    className="min-h-[120px]"
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex flex-wrap gap-3">
            <Button onClick={swapInputs} variant="outline" className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Swap Inputs/Outputs
            </Button>
            <Button onClick={clearAll} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Clear All
            </Button>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <div><strong>Tips:</strong></div>
            <div>• Supports multiple Unicode formats: U+, \\u, &#x, and 0x</div>
            <div>• Handles emoji and special characters correctly</div>
            <div>• Automatically detects format when converting Unicode to text</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TextToUnicode;
