import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmDashReplacer = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [replaceWith, setReplaceWith] = useState("comma");
  const { toast } = useToast();

  const replacementOptions = {
    comma: ",",
    space: " ",
    dash: "-",
    colon: ":"
  };

  const handleReplace = () => {
    if (!inputText.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some text to process",
        variant: "destructive",
      });
      return;
    }

    const replacement = replacementOptions[replaceWith as keyof typeof replacementOptions];
    const result = inputText.replace(/—/g, replacement);
    setOutputText(result);

    toast({
      title: "Success",
      description: "Em dashes have been replaced successfully",
    });
  };

  const copyToClipboard = async () => {
    if (!outputText) {
      toast({
        title: "Nothing to copy",
        description: "No output text available to copy",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy text to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Em Dash Replacer</h1>
        <p className="text-muted-foreground">
          Replace Em Dashes (—) in your text with commas, spaces, regular dashes, or colons
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
            <CardDescription>
              Enter or paste the text containing Em Dashes (—) that you want to replace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter text with Em Dashes (—) here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[200px] resize-none"
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Replace Em Dashes with:</label>
              <Select value={replaceWith} onValueChange={setReplaceWith}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comma">Comma (,)</SelectItem>
                  <SelectItem value="space">Space ( )</SelectItem>
                  <SelectItem value="dash">Regular Dash (-)</SelectItem>
                  <SelectItem value="colon">Colon (:)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleReplace} className="flex-1">
                Replace Em Dashes
              </Button>
              <Button variant="outline" size="icon" onClick={handleClear}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Output Text</CardTitle>
            <CardDescription>
              Text with Em Dashes replaced by your selected character
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Processed text will appear here..."
              value={outputText}
              readOnly
              className="min-h-[200px] resize-none bg-muted"
            />
            
            <Button 
              variant="outline" 
              onClick={copyToClipboard}
              disabled={!outputText}
              className="w-full"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy to Clipboard
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Em Dashes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>Em Dash (—):</strong> A punctuation mark that is longer than a regular hyphen (-) and en dash (–).
            </p>
            <p>
              <strong>Common uses:</strong> To indicate a break in thought, to set off explanatory information, or to replace commas, parentheses, or colons.
            </p>
            <p>
              <strong>Example:</strong> "The weather was beautiful—sunny and warm—perfect for a picnic."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmDashReplacer;