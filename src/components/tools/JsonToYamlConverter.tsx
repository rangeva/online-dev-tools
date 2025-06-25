
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JsonToYamlConverter = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [yamlOutput, setYamlOutput] = useState("");
  const { toast } = useToast();

  const jsonToYaml = (obj: any, indent: number = 0): string => {
    const spaces = '  '.repeat(indent);
    
    if (obj === null) return 'null';
    if (typeof obj === 'boolean') return obj.toString();
    if (typeof obj === 'number') return obj.toString();
    if (typeof obj === 'string') return obj;
    
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]';
      return obj.map(item => `${spaces}- ${jsonToYaml(item, indent + 1).replace(/^\s+/, '')}`).join('\n');
    }
    
    if (typeof obj === 'object') {
      const entries = Object.entries(obj);
      if (entries.length === 0) return '{}';
      
      return entries.map(([key, value]) => {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          return `${spaces}${key}:\n${jsonToYaml(value, indent + 1)}`;
        } else if (Array.isArray(value)) {
          return `${spaces}${key}:\n${jsonToYaml(value, indent + 1)}`;
        } else {
          return `${spaces}${key}: ${jsonToYaml(value, 0)}`;
        }
      }).join('\n');
    }
    
    return String(obj);
  };

  const convertToYaml = () => {
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
      const yamlString = jsonToYaml(parsed);
      setYamlOutput(yamlString);
      
      toast({
        title: "Success",
        description: "JSON converted to YAML successfully!"
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
    navigator.clipboard.writeText(yamlOutput);
    toast({
      title: "Copied!",
      description: "YAML output copied to clipboard"
    });
  };

  const downloadFile = () => {
    const blob = new Blob([yamlOutput], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.yaml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setJsonInput("");
    setYamlOutput("");
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <CardTitle>JSON to YAML Converter</CardTitle>
          </div>
          <CardDescription>
            Simply convert JSON to YAML with this online live converter
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
                placeholder='{"name": "John", "age": 30, "city": "New York"}'
                className="min-h-[300px] font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>YAML Output</Label>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!yamlOutput}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={downloadFile}
                    disabled={!yamlOutput}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                value={yamlOutput}
                readOnly
                className="min-h-[300px] font-mono text-sm"
                placeholder="YAML output will appear here..."
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={convertToYaml} className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Convert to YAML
            </Button>
            <Button onClick={clearAll} variant="outline">
              Clear All
            </Button>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <div><strong>Tips:</strong></div>
            <div>• Paste valid JSON in the input field</div>
            <div>• YAML is great for configuration files and data serialization</div>
            <div>• Use the download button to save the converted YAML file</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JsonToYamlConverter;
