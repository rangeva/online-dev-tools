
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Base64StringEncoder = () => {
  const [plainText, setPlainText] = useState("");
  const [encodedText, setEncodedText] = useState("");
  const { toast } = useToast();

  const encode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(plainText)));
      setEncodedText(encoded);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encode text. Please check your input.",
        variant: "destructive"
      });
    }
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(encodedText)));
      setPlainText(decoded);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid Base64 string. Please check your input.",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard"
    });
  };

  const clear = () => {
    setPlainText("");
    setEncodedText("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            <CardTitle>Base64 String Encoder/Decoder</CardTitle>
          </div>
          <CardDescription>
            Simply encode and decode strings into their Base64 representation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Plain Text */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="plain-text">Plain Text</Label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(plainText)}
                    disabled={!plainText}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                id="plain-text"
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                placeholder="Enter text to encode..."
                className="min-h-[200px] font-mono text-sm"
              />
              <Button onClick={encode} disabled={!plainText} className="w-full">
                Encode to Base64
              </Button>
            </div>

            {/* Base64 Encoded */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="encoded-text">Base64 Encoded</Label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(encodedText)}
                    disabled={!encodedText}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                id="encoded-text"
                value={encodedText}
                onChange={(e) => setEncodedText(e.target.value)}
                placeholder="Enter Base64 text to decode..."
                className="min-h-[200px] font-mono text-sm"
              />
              <Button onClick={decode} disabled={!encodedText} className="w-full">
                Decode from Base64
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" onClick={clear}>
              Clear All
            </Button>
          </div>

          {/* Information */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">About Base64</h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Base64 is a binary-to-text encoding scheme that represents binary data in sequences of 24 bits that can be represented by four 6-bit Base64 digits. It's commonly used to encode data that needs to be stored and transferred over media designed for text.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Base64StringEncoder;
