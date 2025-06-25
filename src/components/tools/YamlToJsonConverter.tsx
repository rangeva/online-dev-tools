
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, FileText, RefreshCw, ArrowUpDown, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const YamlToJsonConverter = () => {
  const [yamlInput, setYamlInput] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [yamlResult, setYamlResult] = useState("");
  const [jsonResult, setJsonResult] = useState("");
  const { toast } = useToast();

  // Simple YAML parser (basic implementation)
  const parseYaml = (yamlString: string): any => {
    const lines = yamlString.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
    const result: any = {};
    const stack: any[] = [result];
    
    for (const line of lines) {
      const indent = line.length - line.trimStart().length;
      const trimmedLine = line.trim();
      
      if (trimmedLine.includes(':')) {
        const [key, ...valueParts] = trimmedLine.split(':');
        const value = valueParts.join(':').trim();
        
        const cleanKey = key.trim();
        
        if (value) {
          // Try to parse the value
          let parsedValue: any = value;
          if (value === 'true') parsedValue = true;
          else if (value === 'false') parsedValue = false;
          else if (value === 'null') parsedValue = null;
          else if (!isNaN(Number(value)) && value !== '') parsedValue = Number(value);
          else if (value.startsWith('"') && value.endsWith('"')) parsedValue = value.slice(1, -1);
          else if (value.startsWith("'") && value.endsWith("'")) parsedValue = value.slice(1, -1);
          
          stack[stack.length - 1][cleanKey] = parsedValue;
        } else {
          stack[stack.length - 1][cleanKey] = {};
          stack.push(stack[stack.length - 1][cleanKey]);
        }
      } else if (trimmedLine.startsWith('- ')) {
        const item = trimmedLine.substring(2);
        const parent = stack[stack.length - 1];
        if (!Array.isArray(parent)) {
          // Convert to array if needed
          const keys = Object.keys(parent);
          if (keys.length === 0) {
            stack[stack.length - 2][Object.keys(stack[stack.length - 2]).pop()!] = [];
            stack[stack.length - 1] = stack[stack.length - 2][Object.keys(stack[stack.length - 2]).pop()!];
          }
        }
        if (Array.isArray(stack[stack.length - 1])) {
          let parsedItem: any = item;
          if (item === 'true') parsedItem = true;
          else if (item === 'false') parsedItem = false;
          else if (item === 'null') parsedItem = null;
          else if (!isNaN(Number(item)) && item !== '') parsedItem = Number(item);
          
          stack[stack.length - 1].push(parsedItem);
        }
      }
    }
    
    return result;
  };

  // Simple JSON to YAML converter
  const jsonToYaml = (obj: any, indent: number = 0): string => {
    const spaces = '  '.repeat(indent);
    
    if (obj === null) return 'null';
    if (typeof obj === 'boolean') return obj.toString();
    if (typeof obj === 'number') return obj.toString();
    if (typeof obj === 'string') return obj.includes('\n') ? `|\n${obj.split('\n').map(line => spaces + '  ' + line).join('\n')}` : obj;
    
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

  const yamlToJson = () => {
    try {
      const parsed = parseYaml(yamlInput);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonResult(formatted);
      toast({
        title: "Success",
        description: "YAML converted to JSON successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid YAML format. Please check your input.",
        variant: "destructive"
      });
    }
  };

  const jsonToYamlConvert = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const yamlString = jsonToYaml(parsed);
      setYamlResult(yamlString);
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard"
    });
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setYamlInput("");
    setJsonInput("");
    setYamlResult("");
    setJsonResult("");
  };

  const swapInputs = () => {
    const tempYaml = yamlInput;
    const tempJson = jsonInput;
    setYamlInput(yamlResult);
    setJsonInput(jsonResult);
    setYamlResult(tempYaml);
    setJsonResult(tempJson);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <CardTitle>YAML to JSON Converter</CardTitle>
          </div>
          <CardDescription>
            Simply convert YAML to JSON with this online live converter
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="yaml-to-json" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="yaml-to-json">YAML to JSON</TabsTrigger>
              <TabsTrigger value="json-to-yaml">JSON to YAML</TabsTrigger>
            </TabsList>
            
            <TabsContent value="yaml-to-json" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="yaml-input">YAML Input</Label>
                  <Textarea
                    id="yaml-input"
                    value={yamlInput}
                    onChange={(e) => setYamlInput(e.target.value)}
                    placeholder="name: John Doe&#10;age: 30&#10;city: New York"
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
                        onClick={() => copyToClipboard(jsonResult)}
                        disabled={!jsonResult}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadFile(jsonResult, 'converted.json')}
                        disabled={!jsonResult}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={jsonResult}
                    readOnly
                    className="min-h-[300px] font-mono text-sm"
                    placeholder="JSON output will appear here..."
                  />
                </div>
              </div>
              <Button onClick={yamlToJson} className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Convert YAML to JSON
              </Button>
            </TabsContent>

            <TabsContent value="json-to-yaml" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="json-input">JSON Input</Label>
                  <Textarea
                    id="json-input"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='{"name": "John Doe", "age": 30, "city": "New York"}'
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
                        onClick={() => copyToClipboard(yamlResult)}
                        disabled={!yamlResult}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadFile(yamlResult, 'converted.yaml')}
                        disabled={!yamlResult}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={yamlResult}
                    readOnly
                    className="min-h-[300px] font-mono text-sm"
                    placeholder="YAML output will appear here..."
                  />
                </div>
              </div>
              <Button onClick={jsonToYamlConvert} className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Convert JSON to YAML
              </Button>
            </TabsContent>
          </Tabs>

          <div className="flex flex-wrap gap-3">
            <Button onClick={swapInputs} variant="outline" className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Swap Inputs/Outputs
            </Button>
            <Button onClick={clearAll} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Clear All
            </Button>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <div><strong>Tips:</strong></div>
            <div>• Supports basic YAML features including nested objects and arrays</div>
            <div>• Automatically handles data type conversion (strings, numbers, booleans)</div>
            <div>• Use download buttons to save converted files</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YamlToJsonConverter;
