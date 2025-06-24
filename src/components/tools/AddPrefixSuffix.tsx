
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddPrefixSuffix = () => {
  const [inputText, setInputText] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [outputText, setOutputText] = useState("");
  const { toast } = useToast();

  const processText = () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to process",
        variant: "destructive",
      });
      return;
    }

    const lines = inputText.split('\n');
    const processedLines = lines.map(line => `${prefix}${line}${suffix}`);
    setOutputText(processedLines.join('\n'));
  };

  const copyToClipboard = async () => {
    if (!outputText) {
      toast({
        title: "Error",
        description: "No output text to copy",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Success",
        description: "Text copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy text to clipboard",
        variant: "destructive",
      });
    }
  };

  const reset = () => {
    setInputText("");
    setPrefix("");
    setSuffix("");
    setOutputText("");
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Prefix/Suffix to Lines</CardTitle>
          <CardDescription>
            Insert a prefix and/or suffix to the content of each line in your text
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prefix">Prefix (optional)</Label>
              <Input
                id="prefix"
                placeholder="Enter prefix to add to each line..."
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="suffix">Suffix (optional)</Label>
              <Input
                id="suffix"
                placeholder="Enter suffix to add to each line..."
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">Input Text</Label>
            <Textarea
              id="input"
              placeholder="Enter your text here (each line will be processed separately)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[200px] font-mono"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={processText} className="flex-1">
              Add Prefix/Suffix
            </Button>
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          {outputText && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="output">Output Text</Label>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                id="output"
                value={outputText}
                readOnly
                className="min-h-[200px] font-mono bg-slate-50 dark:bg-slate-900"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPrefixSuffix;
