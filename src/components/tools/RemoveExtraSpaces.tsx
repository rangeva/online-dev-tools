
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RemoveExtraSpaces = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const { toast } = useToast();

  const removeLeadingTrailing = () => {
    if (!inputText) {
      toast({
        title: "Error",
        description: "Please enter some text to process",
        variant: "destructive",
      });
      return;
    }

    const lines = inputText.split('\n');
    const trimmedLines = lines.map(line => line.trim());
    setOutputText(trimmedLines.join('\n'));
    
    toast({
      title: "Success",
      description: "Removed leading and trailing spaces from each line",
    });
  };

  const removeExtraSpaces = () => {
    if (!inputText) {
      toast({
        title: "Error",
        description: "Please enter some text to process",
        variant: "destructive",
      });
      return;
    }

    // Replace multiple consecutive spaces with single space
    const result = inputText.replace(/[ \t]+/g, ' ');
    setOutputText(result);
    
    toast({
      title: "Success",
      description: "Removed extra spaces (multiple consecutive spaces collapsed to single space)",
    });
  };

  const removeAllSpaces = () => {
    if (!inputText) {
      toast({
        title: "Error",
        description: "Please enter some text to process",
        variant: "destructive",
      });
      return;
    }

    const result = inputText.replace(/[ \t]/g, '');
    setOutputText(result);
    
    toast({
      title: "Success",
      description: "Removed all spaces and tabs",
    });
  };

  const removeAllWhitespace = () => {
    if (!inputText) {
      toast({
        title: "Error",
        description: "Please enter some text to process",
        variant: "destructive",
      });
      return;
    }

    const result = inputText.replace(/\s/g, '');
    setOutputText(result);
    
    toast({
      title: "Success",
      description: "Removed all whitespace (spaces, tabs, line breaks)",
    });
  };

  const normalizeWhitespace = () => {
    if (!inputText) {
      toast({
        title: "Error",
        description: "Please enter some text to process",
        variant: "destructive",
      });
      return;
    }

    // Trim each line and remove extra spaces
    const lines = inputText.split('\n');
    const processedLines = lines.map(line => line.trim().replace(/\s+/g, ' '));
    setOutputText(processedLines.join('\n'));
    
    toast({
      title: "Success",
      description: "Normalized whitespace (trimmed lines and removed extra spaces)",
    });
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
  };

  const getStats = () => {
    if (!inputText) return null;
    
    const totalChars = inputText.length;
    const spaces = (inputText.match(/[ ]/g) || []).length;
    const tabs = (inputText.match(/[\t]/g) || []).length;
    const lineBreaks = (inputText.match(/[\n]/g) || []).length;
    const allWhitespace = (inputText.match(/\s/g) || []).length;
    
    return { totalChars, spaces, tabs, lineBreaks, allWhitespace };
  };

  const stats = getStats();

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Remove Extra Spaces</CardTitle>
          <CardDescription>
            Remove leading/trailing/extra/all white-spaces from your text with various options
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
            {stats && (
              <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <div>Total characters: {stats.totalChars}</div>
                <div>Spaces: {stats.spaces} | Tabs: {stats.tabs} | Line breaks: {stats.lineBreaks}</div>
                <div>Total whitespace: {stats.allWhitespace}</div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <Button onClick={removeLeadingTrailing} variant="outline">
              Trim Lines
            </Button>
            <Button onClick={removeExtraSpaces} variant="outline">
              Remove Extra Spaces
            </Button>
            <Button onClick={removeAllSpaces} variant="outline">
              Remove All Spaces
            </Button>
            <Button onClick={removeAllWhitespace} variant="outline">
              Remove All Whitespace
            </Button>
            <Button onClick={normalizeWhitespace}>
              Normalize Whitespace
            </Button>
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          {outputText !== undefined && outputText !== inputText && (
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
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Result: {outputText.length} characters
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RemoveExtraSpaces;
