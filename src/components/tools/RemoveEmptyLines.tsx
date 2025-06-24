
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RemoveEmptyLines = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [removeWhitespaceOnly, setRemoveWhitespaceOnly] = useState(true);
  const { toast } = useToast();

  const removeEmptyLines = () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to process",
        variant: "destructive",
      });
      return;
    }

    const lines = inputText.split('\n');
    let filteredLines;
    let removedCount = 0;

    if (removeWhitespaceOnly) {
      // Remove lines that are empty or contain only whitespace
      filteredLines = lines.filter(line => {
        const isEmpty = line.trim() === '';
        if (isEmpty) removedCount++;
        return !isEmpty;
      });
    } else {
      // Remove only completely empty lines
      filteredLines = lines.filter(line => {
        const isEmpty = line === '';
        if (isEmpty) removedCount++;
        return !isEmpty;
      });
    }

    setOutputText(filteredLines.join('\n'));
    
    toast({
      title: "Success",
      description: `Removed ${removedCount} empty lines. ${filteredLines.length} lines remaining.`,
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
    setRemoveWhitespaceOnly(true);
  };

  const getStats = () => {
    if (!inputText) return null;
    
    const lines = inputText.split('\n');
    const totalLines = lines.length;
    const emptyLines = lines.filter(line => line === '').length;
    const whitespaceOnlyLines = lines.filter(line => line.trim() === '' && line !== '').length;
    const nonEmptyLines = lines.filter(line => line.trim() !== '').length;
    
    return { totalLines, emptyLines, whitespaceOnlyLines, nonEmptyLines };
  };

  const stats = getStats();

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Remove Empty Lines</CardTitle>
          <CardDescription>
            Remove/delete all empty lines within your text/list to clean up formatting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="removeWhitespaceOnly"
              checked={removeWhitespaceOnly}
              onCheckedChange={(checked) => setRemoveWhitespaceOnly(checked === true)}
            />
            <Label htmlFor="removeWhitespaceOnly">
              Also remove lines with only whitespace (spaces, tabs)
            </Label>
          </div>

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
                <div>Total lines: {stats.totalLines}</div>
                <div>Empty lines: {stats.emptyLines}</div>
                <div>Whitespace-only lines: {stats.whitespaceOnlyLines}</div>
                <div>Non-empty lines: {stats.nonEmptyLines}</div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={removeEmptyLines} className="flex-1">
              Remove Empty Lines
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
                Result: {outputText.split('\n').length} lines remaining
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RemoveEmptyLines;
