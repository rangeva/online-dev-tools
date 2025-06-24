
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RemoveDuplicateLines = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [preserveOrder, setPreserveOrder] = useState(true);
  const { toast } = useToast();

  const removeDuplicates = () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to process",
        variant: "destructive",
      });
      return;
    }

    const lines = inputText.split('\n');
    const seen = new Set();
    const uniqueLines = [];
    let duplicateCount = 0;

    lines.forEach(line => {
      let processedLine = trimLines ? line.trim() : line;
      let keyLine = caseSensitive ? processedLine : processedLine.toLowerCase();

      if (!seen.has(keyLine)) {
        seen.add(keyLine);
        uniqueLines.push(line);
      } else {
        duplicateCount++;
      }
    });

    if (!preserveOrder) {
      uniqueLines.sort((a, b) => {
        const lineA = caseSensitive ? a : a.toLowerCase();
        const lineB = caseSensitive ? b : b.toLowerCase();
        return lineA.localeCompare(lineB);
      });
    }

    setOutputText(uniqueLines.join('\n'));
    
    toast({
      title: "Success",
      description: `Removed ${duplicateCount} duplicate lines. ${uniqueLines.length} unique lines remaining.`,
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
    setCaseSensitive(true);
    setTrimLines(true);
    setPreserveOrder(true);
  };

  const getStats = () => {
    if (!inputText) return null;
    
    const lines = inputText.split('\n');
    const totalLines = lines.length;
    const nonEmptyLines = lines.filter(line => line.trim()).length;
    
    return { totalLines, nonEmptyLines };
  };

  const stats = getStats();

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Remove Duplicate Lines</CardTitle>
          <CardDescription>
            Remove/delete all duplicate lines within your text/list while preserving unique content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="caseSensitive"
                checked={caseSensitive}
                onCheckedChange={setCaseSensitive}
              />
              <Label htmlFor="caseSensitive">Case Sensitive</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="trimLines"
                checked={trimLines}
                onCheckedChange={setTrimLines}
              />
              <Label htmlFor="trimLines">Trim Whitespace</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="preserveOrder"
                checked={preserveOrder}
                onCheckedChange={setPreserveOrder}
              />
              <Label htmlFor="preserveOrder">Preserve Original Order</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">Input Text</Label>
            <Textarea
              id="input"
              placeholder="Enter your text here (one item per line)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[200px] font-mono"
            />
            {stats && (
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Total lines: {stats.totalLines} | Non-empty lines: {stats.nonEmptyLines}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={removeDuplicates} className="flex-1">
              Remove Duplicates
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
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Result: {outputText.split('\n').length} unique lines
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RemoveDuplicateLines;
