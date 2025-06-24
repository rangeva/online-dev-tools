
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FindReplace = () => {
  const [inputText, setInputText] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [replaceAll, setReplaceAll] = useState(true);
  const { toast } = useToast();

  const performReplace = () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to process",
        variant: "destructive",
      });
      return;
    }

    if (!findText) {
      toast({
        title: "Error",
        description: "Please enter text to find",
        variant: "destructive",
      });
      return;
    }

    try {
      let result = inputText;
      
      if (useRegex) {
        const flags = caseSensitive ? 'g' : 'gi';
        const regex = new RegExp(findText, replaceAll ? flags : (caseSensitive ? '' : 'i'));
        result = inputText.replace(regex, replaceText);
      } else {
        if (replaceAll) {
          const searchValue = caseSensitive ? findText : findText.toLowerCase();
          const inputValue = caseSensitive ? inputText : inputText.toLowerCase();
          
          if (caseSensitive) {
            result = inputText.split(findText).join(replaceText);
          } else {
            // Case insensitive replacement
            const parts = [];
            let lastIndex = 0;
            let index = inputValue.indexOf(searchValue);
            
            while (index !== -1) {
              parts.push(inputText.substring(lastIndex, index));
              parts.push(replaceText);
              lastIndex = index + findText.length;
              index = inputValue.indexOf(searchValue, lastIndex);
            }
            parts.push(inputText.substring(lastIndex));
            result = parts.join('');
          }
        } else {
          // Replace only first occurrence
          const searchValue = caseSensitive ? findText : findText.toLowerCase();
          const inputValue = caseSensitive ? inputText : inputText.toLowerCase();
          const index = inputValue.indexOf(searchValue);
          
          if (index !== -1) {
            result = inputText.substring(0, index) + replaceText + inputText.substring(index + findText.length);
          }
        }
      }

      setOutputText(result);
      
      // Count replacements
      const originalLength = inputText.length;
      const newLength = result.length;
      const difference = originalLength - newLength + (replaceText.length * (originalLength - newLength + replaceText.length) / findText.length);
      
      toast({
        title: "Success",
        description: `Text replacement completed`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: useRegex ? "Invalid regular expression" : "Failed to perform replacement",
        variant: "destructive",
      });
    }
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
    setFindText("");
    setReplaceText("");
    setOutputText("");
    setCaseSensitive(false);
    setUseRegex(false);
    setReplaceAll(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find and Replace Text</CardTitle>
          <CardDescription>
            Find and replace text matching your search criteria with support for regex and case sensitivity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="findText">Find Text</Label>
              <Input
                id="findText"
                placeholder="Enter text to find..."
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="replaceText">Replace With</Label>
              <Input
                id="replaceText"
                placeholder="Enter replacement text..."
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="caseSensitive"
                checked={caseSensitive}
                onCheckedChange={(checked) => setCaseSensitive(checked === true)}
              />
              <Label htmlFor="caseSensitive">Case Sensitive</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="useRegex"
                checked={useRegex}
                onCheckedChange={(checked) => setUseRegex(checked === true)}
              />
              <Label htmlFor="useRegex">Use Regular Expression</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="replaceAll"
                checked={replaceAll}
                onCheckedChange={(checked) => setReplaceAll(checked === true)}
              />
              <Label htmlFor="replaceAll">Replace All Occurrences</Label>
            </div>
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
          </div>

          <div className="flex gap-2">
            <Button onClick={performReplace} className="flex-1">
              Find & Replace
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

export default FindReplace;
