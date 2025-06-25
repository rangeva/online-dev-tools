
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Settings, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TomlToJsonConverter = () => {
  const [tomlInput, setTomlInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const { toast } = useToast();

  const parseTomlValue = (value: string): any => {
    // Handle null
    if (value === 'null') return null;
    
    // Handle boolean
    if (value === 'true') return true;
    if (value === 'false') return false;
    
    // Handle numbers
    if (!isNaN(Number(value)) && value.trim() !== '') {
      return Number(value);
    }
    
    // Handle arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1).trim();
      if (!arrayContent) return [];
      
      const items = arrayContent.split(',').map(item => {
        const trimmed = item.trim();
        if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
          return trimmed.slice(1, -1);
        }
        return parseTomlValue(trimmed);
      });
      return items;
    }
    
    // Handle strings (remove quotes)
    if (value.startsWith('"') && value.endsWith('"')) {
      return value.slice(1, -1);
    }
    
    return value;
  };

  const tomlToJson = (tomlString: string): any => {
    const lines = tomlString.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));
    const result: any = {};
    let currentSection: any = result;
    let currentPath: string[] = [];
    
    lines.forEach(line => {
      // Handle sections
      if (line.startsWith('[') && line.endsWith(']')) {
        const sectionPath = line.slice(1, -1).split('.');
        currentPath = sectionPath;
        
        // Navigate to the correct nested object
        currentSection = result;
        sectionPath.forEach((part, index) => {
          if (index === sectionPath.length - 1) {
            if (!currentSection[part]) {
              currentSection[part] = {};
            }
            currentSection = currentSection[part];
          } else {
            if (!currentSection[part]) {
              currentSection[part] = {};
            }
            currentSection = currentSection[part];
          }
        });
        return;
      }
      
      // Handle key-value pairs
      const equalIndex = line.indexOf('=');
      if (equalIndex > 0) {
        const key = line.substring(0, equalIndex).trim();
        const value = line.substring(equalIndex + 1).trim();
        
        currentSection[key] = parseTomlValue(value);
      }
    });
    
    return result;
  };

  const convertToJson = () => {
    try {
      if (!tomlInput.trim()) {
        toast({
          title: "Error",
          description: "Please enter some TOML to convert.",
          variant: "destructive"
        });
        return;
      }

      const parsed = tomlToJson(tomlInput);
      const jsonString = JSON.stringify(parsed, null, 2);
      setJsonOutput(jsonString);
      
      toast({
        title: "Success",
        description: "TOML converted to JSON successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid TOML format. Please check your input.",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
    toast({
      title: "Copied!",
      description: "JSON output copied to clipboard"
    });
  };

  const downloadFile = () => {
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setTomlInput("");
    setJsonOutput("");
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <CardTitle>TOML to JSON</CardTitle>
          </div>
          <CardDescription>
            Parse and convert TOML to JSON
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="toml-input">TOML Input</Label>
              <Textarea
                id="toml-input"
                value={tomlInput}
                onChange={(e) => setTomlInput(e.target.value)}
                placeholder='title = "Example"
version = 1.0

[database]
host = "localhost"
port = 5432'
                className="min-h-[300px] font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>JSON Output</Label>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!jsonOutput}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={downloadFile}
                    disabled={!jsonOutput}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                value={jsonOutput}
                readOnly
                className="min-h-[300px] font-mono text-sm"
                placeholder="JSON output will appear here..."
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={convertToJson} className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Convert to JSON
            </Button>
            <Button onClick={clearAll} variant="outline">
              Clear All
            </Button>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <div><strong>Tips:</strong></div>
            <div>• Paste valid TOML in the input field</div>
            <div>• Supports sections, arrays, and various data types</div>
            <div>• Use the download button to save the converted JSON file</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TomlToJsonConverter;
