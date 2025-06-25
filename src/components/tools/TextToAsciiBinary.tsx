
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Binary, Type, RefreshCw, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TextToAsciiBinary = () => {
  const [textInput, setTextInput] = useState("");
  const [binaryInput, setBinaryInput] = useState("");
  const [textResult, setTextResult] = useState("");
  const [binaryResult, setBinaryResult] = useState("");
  const { toast } = useToast();

  const textToBinary = () => {
    try {
      const binary = textInput
        .split('')
        .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
        .join(' ');
      setBinaryResult(binary);
      toast({
        title: "Success",
        description: "Text converted to binary successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert text to binary",
        variant: "destructive"
      });
    }
  };

  const binaryToText = () => {
    try {
      const cleanBinary = binaryInput.replace(/\s+/g, '');
      if (cleanBinary.length % 8 !== 0) {
        throw new Error("Binary string length must be divisible by 8");
      }
      
      const text = cleanBinary
        .match(/.{8}/g)
        ?.map(byte => String.fromCharCode(parseInt(byte, 2)))
        .join('') || '';
      
      setTextResult(text);
      toast({
        title: "Success",
        description: "Binary converted to text successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid binary format. Please ensure binary is in 8-bit chunks.",
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
    setBinaryInput("");
    setTextResult("");
    setBinaryResult("");
  };

  const swapInputs = () => {
    const tempText = textInput;
    const tempBinary = binaryInput;
    setTextInput(textResult);
    setBinaryInput(binaryResult);
    setTextResult(tempText);
    setBinaryResult(tempBinary);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Binary className="h-5 w-5" />
            <CardTitle>Text to ASCII Binary</CardTitle>
          </div>
          <CardDescription>
            Convert text to its ASCII binary representation and vice-versa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="text-to-binary" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text-to-binary">Text to Binary</TabsTrigger>
              <TabsTrigger value="binary-to-text">Binary to Text</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text-to-binary" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text-input">Text Input</Label>
                <Textarea
                  id="text-input"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Enter text to convert to binary..."
                  className="min-h-[120px]"
                />
              </div>
              <Button onClick={textToBinary} className="w-full">
                <Binary className="h-4 w-4 mr-2" />
                Convert to Binary
              </Button>
              {binaryResult && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Binary Output</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(binaryResult)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={binaryResult}
                    readOnly
                    className="min-h-[120px] font-mono text-sm"
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="binary-to-text" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="binary-input">Binary Input</Label>
                <Textarea
                  id="binary-input"
                  value={binaryInput}
                  onChange={(e) => setBinaryInput(e.target.value)}
                  placeholder="Enter binary (8-bit chunks, spaces optional)..."
                  className="min-h-[120px] font-mono text-sm"
                />
              </div>
              <Button onClick={binaryToText} className="w-full">
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
            <div>• Each character is converted to an 8-bit binary representation</div>
            <div>• Binary input should be in 8-bit chunks (spaces are optional)</div>
            <div>• Only ASCII characters (0-127) are supported</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TextToAsciiBinary;
