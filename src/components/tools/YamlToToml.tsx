
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Settings, RefreshCw, ArrowUpDown, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const YamlToToml = () => {
  const [yamlInput, setYamlInput] = useState("");
  const [tomlInput, setTomlInput] = useState("");
  const [yamlResult, setYamlResult] = useState("");
  const [tomlResult, setTomlResult] = useState("");
  const { toast } = useToast();

  // Simple YAML parser (reusing from previous component)
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

  // JSON to TOML converter
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
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
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

  // Simple TOML parser
  const parseToml = (tomlString: string): any => {
    const lines = tomlString.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
    const result: any = {};
    let currentSection = result;
    let currentPath: string[] = [];
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Handle sections [section]
      if (trimmedLine.startsWith('[') && trimmedLine.endsWith(']')) {
        const sectionName = trimmedLine.slice(1, -1);
        const pathParts = sectionName.split('.');
        
        currentSection = result;
        currentPath = [];
        
        for (const part of pathParts) {
          if (!currentSection[part]) {
            currentSection[part] = {};
          }
          currentSection = currentSection[part];
          currentPath.push(part);
        }
        continue;
      }
      
      // Handle key-value pairs
      if (trimmedLine.includes('=')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        const value = valueParts.join('=').trim();
        const cleanKey = key.trim();
        
        let parsedValue: any = value;
        
        // Parse arrays
        if (value.startsWith('[') && value.endsWith(']')) {
          const arrayContent = value.slice(1, -1);
          if (arrayContent.trim()) {
            parsedValue = arrayContent.split(',').map(item => {
              const trimmed = item.trim();
              if (trimmed.startsWith('"') && trimmed.endsWith('"')) return trimmed.slice(1, -1);
              if (trimmed === 'true') return true;
              if (trimmed === 'false') return false;
              if (!isNaN(Number(trimmed))) return Number(trimmed);
              return trimmed;
            });
          } else {
            parsedValue = [];
          }
        }
        // Parse strings
        else if (value.startsWith('"') && value.endsWith('"')) {
          parsedValue = value.slice(1, -1);
        }
        // Parse booleans and numbers
        else if (value === 'true') parsedValue = true;
        else if (value === 'false') parsedValue = false;
        else if (value === 'null') parsedValue = null;
        else if (!isNaN(Number(value))) parsedValue = Number(value);
        
        currentSection[cleanKey] = parsedValue;
      }
    }
    
    return result;
  };

  const yamlToTomlConvert = () => {
    try {
      const parsed = parseYaml(yamlInput);
      const tomlString = jsonToToml(parsed);
      setTomlResult(tomlString);
      toast({
        title: "Success",
        description: "YAML converted to TOML successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid YAML format. Please check your input.",
        variant: "destructive"
      });
    }
  };

  const tomlToYaml = () => {
    try {
      const parsed = parseToml(tomlInput);
      
      // Convert to YAML (reusing jsonToYaml logic)
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
      
      const yamlString = jsonToYaml(parsed);
      setYamlResult(yamlString);
      toast({
        title: "Success",
        description: "TOML converted to YAML successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid TOML format. Please check your input.",
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
    setTomlInput("");
    setYamlResult("");
    setTomlResult("");
  };

  const swapInputs = () => {
    const tempYaml = yamlInput;
    const tempToml = tomlInput;
    setYamlInput(yamlResult);
    setTomlInput(tomlResult);
    setYamlResult(tempYaml);
    setTomlResult(tempToml);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <CardTitle>YAML to TOML</CardTitle>
          </div>
          <CardDescription>
            Parse and convert YAML to TOML
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="yaml-to-toml" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="yaml-to-toml">YAML to TOML</TabsTrigger>
              <TabsTrigger value="toml-to-yaml">TOML to YAML</TabsTrigger>
            </TabsList>
            
            <TabsContent value="yaml-to-toml" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="yaml-input">YAML Input</Label>
                  <Textarea
                    id="yaml-input"
                    value={yamlInput}
                    onChange={(e) => setYamlInput(e.target.value)}
                    placeholder="title: Example&#10;version: 1.0&#10;database:&#10;  host: localhost&#10;  port: 5432"
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
                        onClick={() => copyToClipboard(tomlResult)}
                        disabled={!tomlResult}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadFile(tomlResult, 'converted.toml')}
                        disabled={!tomlResult}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={tomlResult}
                    readOnly
                    className="min-h-[300px] font-mono text-sm"
                    placeholder="TOML output will appear here..."
                  />
                </div>
              </div>
              <Button onClick={yamlToTomlConvert} className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Convert YAML to TOML
              </Button>
            </TabsContent>

            <TabsContent value="toml-to-yaml" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="toml-input">TOML Input</Label>
                  <Textarea
                    id="toml-input"
                    value={tomlInput}
                    onChange={(e) => setTomlInput(e.target.value)}
                    placeholder='title = "Example"&#10;version = 1.0&#10;&#10;[database]&#10;host = "localhost"&#10;port = 5432'
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
              <Button onClick={tomlToYaml} className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Convert TOML to YAML
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
            <div>• TOML is great for configuration files with its clear syntax</div>
            <div>• Supports nested tables and arrays</div>
            <div>• Use download buttons to save converted files</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YamlToToml;
