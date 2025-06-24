
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LineBreakManager = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [wrapLength, setWrapLength] = useState(80);
  const { toast } = useToast();

  const addLineBreaks = () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to process",
        variant: "destructive",
      });
      return;
    }

    const words = inputText.split(/\s+/);
    const lines = [];
    let currentLine = "";

    words.forEach(word => {
      if (currentLine.length + word.length + 1 <= wrapLength) {
        currentLine += (currentLine ? " " : "") + word;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    });
    
    if (currentLine) lines.push(currentLine);
    setOutputText(lines.join('\n'));
  };

  const removeLineBreaks = () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to process",
        variant: "destructive",
      });
      return;
    }

    // Remove line breaks but preserve paragraph breaks (double line breaks)
    const result = inputText
      .split('\n\n')
      .map(paragraph => paragraph.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim())
      .join('\n\n');
    
    setOutputText(result);
  };

  const removeAllLineBreaks = () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to process",
        variant: "destructive",
      });
      return;
    }

    const result = inputText.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    setOutputText(result);
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
    setOutputText("");
    setWrapLength(80);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add/Remove Line Breaks</CardTitle>
          <CardDescription>
            Add new line breaks and/or remove existing line breaks within your text's formatting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="input">Input Text</Label>
            <Textarea
              id="input"
              placeholder="Enter your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[200px] font-mono"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wrapLength">Line Wrap Length (for adding breaks)</Label>
              <Input
                id="wrapLength"
                type="number"
                min="10"
                max="200"
                value={wrapLength}
                onChange={(e) => setWrapLength(Number(e.target.value))}
                className="w-32"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={addLineBreaks}>
                Add Line Breaks
              </Button>
              <Button onClick={removeLineBreaks} variant="outline">
                Remove Line Breaks (Keep Paragraphs)
              </Button>
              <Button onClick={removeAllLineBreaks} variant="outline">
                Remove All Line Breaks
              </Button>
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
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

export default LineBreakManager;
