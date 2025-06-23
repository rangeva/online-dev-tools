
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const YamlConverter = () => {
  const [input, setInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [yamlOutput, setYamlOutput] = useState('');
  const [error, setError] = useState('');

  // Simple YAML to JSON converter (basic implementation)
  const yamlToJson = (yaml: string) => {
    try {
      // This is a very basic YAML parser - for production use a proper library
      const lines = yaml.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
      const result: any = {};
      
      for (const line of lines) {
        const match = line.match(/^(\s*)([^:]+):\s*(.*)$/);
        if (match) {
          const [, indent, key, value] = match;
          const cleanKey = key.trim();
          let cleanValue: any = value.trim();
          
          // Parse basic values
          if (cleanValue === 'true' || cleanValue === 'false') {
            cleanValue = cleanValue === 'true';
          } else if (!isNaN(Number(cleanValue)) && cleanValue !== '') {
            cleanValue = Number(cleanValue);
          } else if (cleanValue.startsWith('"') && cleanValue.endsWith('"')) {
            cleanValue = cleanValue.slice(1, -1);
          }
          
          result[cleanKey] = cleanValue;
        }
      }
      
      return JSON.stringify(result, null, 2);
    } catch (err) {
      throw new Error('Invalid YAML format');
    }
  };

  // Simple JSON to YAML converter (basic implementation)
  const jsonToYaml = (json: string) => {
    try {
      const obj = JSON.parse(json);
      
      const convertToYaml = (obj: any, indent = 0): string => {
        const spaces = '  '.repeat(indent);
        let yaml = '';
        
        for (const [key, value] of Object.entries(obj)) {
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            yaml += `${spaces}${key}:\n${convertToYaml(value, indent + 1)}`;
          } else if (Array.isArray(value)) {
            yaml += `${spaces}${key}:\n`;
            for (const item of value) {
              yaml += `${spaces}  - ${item}\n`;
            }
          } else {
            const valueStr = typeof value === 'string' ? `"${value}"` : value;
            yaml += `${spaces}${key}: ${valueStr}\n`;
          }
        }
        
        return yaml;
      };
      
      return convertToYaml(obj);
    } catch (err) {
      throw new Error('Invalid JSON format');
    }
  };

  const convertYamlToJson = () => {
    try {
      const json = yamlToJson(input);
      setJsonOutput(json);
      setError('');
    } catch (err) {
      setError((err as Error).message);
      setJsonOutput('');
    }
  };

  const convertJsonToYaml = () => {
    try {
      const yaml = jsonToYaml(input);
      setYamlOutput(yaml);
      setError('');
    } catch (err) {
      setError((err as Error).message);
      setYamlOutput('');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Input</label>
        <Textarea
          placeholder="Enter YAML or JSON..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[120px] font-mono text-sm"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={convertYamlToJson} disabled={!input} className="flex-1">
          YAML → JSON
        </Button>
        <Button onClick={convertJsonToYaml} disabled={!input} className="flex-1">
          JSON → YAML
        </Button>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-700 font-medium">Conversion Error:</p>
            <p className="text-red-600 text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="json" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="json">JSON Output</TabsTrigger>
          <TabsTrigger value="yaml">YAML Output</TabsTrigger>
        </TabsList>
        
        <TabsContent value="json">
          {jsonOutput && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex justify-between items-center">
                  JSON
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(jsonOutput)}
                  >
                    Copy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-50 p-3 rounded border text-sm overflow-x-auto max-h-60">
                  {jsonOutput}
                </pre>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="yaml">
          {yamlOutput && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex justify-between items-center">
                  YAML
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(yamlOutput)}
                  >
                    Copy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-50 p-3 rounded border text-sm overflow-x-auto max-h-60">
                  {yamlOutput}
                </pre>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-slate-600">
            <p><strong>Note:</strong> This is a basic converter for simple YAML/JSON structures.</p>
            <p>For complex nested objects or arrays, consider using a dedicated library.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YamlConverter;
