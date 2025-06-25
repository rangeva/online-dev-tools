
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Settings, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JsonToTomlConverter = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [tomlOutput, setTomlOutput] = useState("");
  const { toast } = useToast();

  const jsonToToml = (obj: any, prefix: string = ''): string => {
    let result = '';
    const simpleKeys: string[] = [];
    const complexKeys: string[] = [];
    
    // Separate simple and complex values
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        complexKeys.push(key);
      } else {
        simpleKeys.push(key);
      }
    });
    
    // Handle simple key-value pairs first
    simpleKeys.forEach(key => {
      const value = obj[key];
      
      if (Array.isArray(value)) {
        const arrayStr = value.map(item => {
          if (typeof item === 'string') return `"${item}"`;
          if (typeof item === 'boolean' || typeof item === 'number') return item.toString();
          return `"${item}"`;
        }).join(', ');
        result += `${key} = [${arrayStr}]\n`;
      } else if (typeof value === 'string') {
        result += `${key} = "${value}"\n`;
      } else if (typeof value === 'boolean' || typeof value === 'number') {
        result += `${key} = ${value}\n`;
      } else if (value === null) {
        result += `${key} = null\n`;
      }
    });
    
    // Add a blank line if we have both simple and complex keys
    if (simpleKeys.length > 0 && complexKeys.length > 0) {
      result += '\n';
    }
    
    // Handle complex objects (tables)
    complexKeys.forEach(key => {
      const value = obj[key];
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      result += `[${fullKey}]\n`;
      result += jsonToToml(value, fullKey);
      result += '\n';
    });
    
    return result;
  };

  const convertToToml = () => {
    try {
      if (!jsonInput.trim()) {
        toast({
          title: "Error",
          description: "Please enter some JSON to convert.",
          variant: "destructive"
        });
        return;
      }

      const parsed = JSON.parse(jsonInput);
      const tomlString = jsonToToml(parsed);
      setTomlOutput(tomlString);
      
      toast({
        title: "Success",
        description: "JSON converted to TOML successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid JSON format. Please check your input.",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tomlOutput);
    toast({
      title: "Copied!",
      description: "TOML output copied to clipboard"
    });
  };

  const downloadFile = () => {
    const blob = new Blob([tomlOutput], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.toml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setJsonInput("");
    setTomlOutput("");
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <CardTitle>JSON to TOML</CardTitle>
          </div>
          <CardDescription>
            Parse and convert JSON to TOML
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="json-input">JSON Input</Label>
              <Textarea
                id="json-input"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='{"title": "Example", "version": 1.0, "database": {"host": "localhost", "port": 5432}}'
                className="min-h-[300px] font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>TOML Output</Label>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!tomlOutput}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={downloadFile}
                    disabled={!tomlOutput}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                value={tomlOutput}
                readOnly
                className="min-h-[300px] font-mono text-sm"
                placeholder="TOML output will appear here..."
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={convertToToml} className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Convert to TOML
            </Button>
            <Button onClick={clearAll} variant="outline">
              Clear All
            </Button>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <div><strong>Tips:</strong></div>
            <div>• Paste valid JSON in the input field</div>
            <div>• TOML is great for configuration files with its clear syntax</div>
            <div>• Supports nested tables and arrays</div>
            <div>• Use the download button to save the converted TOML file</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JsonToTomlConverter;
