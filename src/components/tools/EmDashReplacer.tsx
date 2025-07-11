import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmDashReplacer = () => {
  const [inputHtml, setInputHtml] = useState("");
  const [outputHtml, setOutputHtml] = useState("");
  const [replaceWith, setReplaceWith] = useState("comma");
  const inputRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const replacementOptions = {
    comma: ",",
    space: " ",
    dash: "-",
    colon: ":"
  };

  useEffect(() => {
    if (inputRef.current && inputRef.current.innerHTML !== inputHtml) {
      inputRef.current.innerHTML = inputHtml;
    }
  }, [inputHtml]);

  useEffect(() => {
    if (outputRef.current && outputRef.current.innerHTML !== outputHtml) {
      outputRef.current.innerHTML = outputHtml;
    }
  }, [outputHtml]);

  const updateInputFromEditor = () => {
    if (inputRef.current) {
      setInputHtml(inputRef.current.innerHTML);
    }
  };

  const handleReplace = () => {
    if (!inputHtml.trim() && (!inputRef.current || !inputRef.current.textContent?.trim())) {
      toast({
        title: "Input required",
        description: "Please enter some text to process",
        variant: "destructive",
      });
      return;
    }

    const replacement = replacementOptions[replaceWith as keyof typeof replacementOptions];
    const result = inputHtml.replace(/—/g, replacement);
    setOutputHtml(result);

    toast({
      title: "Success",
      description: "Em dashes have been replaced successfully",
    });
  };

  const copyToClipboard = async () => {
    const textContent = outputRef.current?.textContent || "";
    if (!textContent.trim()) {
      toast({
        title: "Nothing to copy",
        description: "No output text available to copy",
        variant: "destructive",
      });
      return;
    }

    try {
      // Copy both HTML and plain text
      await navigator.clipboard.writeText(textContent);
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
    setInputHtml("");
    setOutputHtml("");
    if (inputRef.current) {
      inputRef.current.innerHTML = "";
    }
    if (outputRef.current) {
      outputRef.current.innerHTML = "";
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Em Dash Replacer</h1>
        <p className="text-muted-foreground">
          Replace Em Dashes (—) in your text with commas, spaces, regular dashes, or colons
        </p>
      </div>

      <Tabs defaultValue="visual" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="visual">Rich Text Editor</TabsTrigger>
          <TabsTrigger value="simple">Simple Text</TabsTrigger>
        </TabsList>

        <TabsContent value="visual" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Input Text</CardTitle>
                <CardDescription>
                  Enter or paste rich text containing Em Dashes (—) that you want to replace. Formatting will be preserved.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  ref={inputRef}
                  contentEditable
                  className="min-h-[200px] p-4 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background whitespace-pre-wrap"
                  onInput={updateInputFromEditor}
                  onPaste={(e) => {
                    // Allow rich paste
                    setTimeout(updateInputFromEditor, 0);
                  }}
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    lineHeight: '1.6'
                  }}
                  dangerouslySetInnerHTML={{ __html: inputHtml }}
                />
                <p className="text-xs text-muted-foreground">
                  You can paste rich text here and formatting will be preserved
                </p>
                
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
                  Text with Em Dashes replaced by your selected character. Formatting is preserved.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  ref={outputRef}
                  className="min-h-[200px] p-4 border border-input rounded-md bg-muted whitespace-pre-wrap"
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    lineHeight: '1.6'
                  }}
                  dangerouslySetInnerHTML={{ __html: outputHtml }}
                />
                
                <Button 
                  variant="outline" 
                  onClick={copyToClipboard}
                  disabled={!outputHtml}
                  className="w-full"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Text to Clipboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="simple" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Input Text</CardTitle>
                <CardDescription>
                  Enter or paste plain text containing Em Dashes (—) that you want to replace
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter text with Em Dashes (—) here..."
                  value={inputHtml.replace(/<[^>]*>/g, '')}
                  onChange={(e) => setInputHtml(e.target.value)}
                  className="min-h-[200px] resize-none whitespace-pre-wrap font-mono"
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
                  value={outputHtml.replace(/<[^>]*>/g, '')}
                  readOnly
                  className="min-h-[200px] resize-none bg-muted whitespace-pre-wrap font-mono"
                />
                
                <Button 
                  variant="outline" 
                  onClick={copyToClipboard}
                  disabled={!outputHtml}
                  className="w-full"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy to Clipboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

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