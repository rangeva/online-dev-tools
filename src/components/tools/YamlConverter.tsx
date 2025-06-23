
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle, Copy, Download } from 'lucide-react';
import yaml from 'js-yaml';
import { toast } from 'sonner';

const YamlConverter = () => {
  const [input, setInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [yamlOutput, setYamlOutput] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [inputType, setInputType] = useState<'yaml' | 'json'>('yaml');
  const [yamlOptions, setYamlOptions] = useState({
    indent: 2,
    lineWidth: 80,
    noRefs: false,
    skipInvalid: false,
    flowLevel: -1,
    quotingType: '"' as '"' | "'"
  });

  const validateInput = (text: string, type: 'yaml' | 'json') => {
    if (!text.trim()) {
      setIsValid(null);
      setError('');
      return false;
    }

    try {
      if (type === 'yaml') {
        yaml.load(text);
      } else {
        JSON.parse(text);
      }
      setIsValid(true);
      setError('');
      return true;
    } catch (err) {
      setIsValid(false);
      setError((err as Error).message);
      return false;
    }
  };

  const handleInputChange = (text: string) => {
    setInput(text);
    validateInput(text, inputType);
  };

  const convertYamlToJson = () => {
    try {
      const parsed = yaml.load(input);
      const json = JSON.stringify(parsed, null, 2);
      setJsonOutput(json);
      setError('');
      toast.success('YAML converted to JSON successfully');
    } catch (err) {
      setError(`YAML Error: ${(err as Error).message}`);
      setJsonOutput('');
      toast.error('Failed to convert YAML to JSON');
    }
  };

  const convertJsonToYaml = () => {
    try {
      const parsed = JSON.parse(input);
      const yamlStr = yaml.dump(parsed, {
        indent: yamlOptions.indent,
        lineWidth: yamlOptions.lineWidth,
        noRefs: yamlOptions.noRefs,
        skipInvalid: yamlOptions.skipInvalid,
        flowLevel: yamlOptions.flowLevel,
        quotingType: yamlOptions.quotingType
      });
      setYamlOutput(yamlStr);
      setError('');
      toast.success('JSON converted to YAML successfully');
    } catch (err) {
      setError(`JSON Error: ${(err as Error).message}`);
      setYamlOutput('');
      toast.error('Failed to convert JSON to YAML');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`File downloaded: ${filename}`);
  };

  const loadSampleData = () => {
    const sampleYaml = `# Sample YAML configuration
name: Developer Toolbox
version: "1.0.0"
author:
  name: John Doe
  email: john@example.com
features:
  - yaml-converter
  - json-formatter
  - text-tools
settings:
  theme: dark
  auto_save: true
  notifications:
    email: false
    push: true
database:
  host: localhost
  port: 5432
  name: devtools
  credentials:
    username: admin
    password: "secret123"`;
    
    setInput(sampleYaml);
    setInputType('yaml');
    validateInput(sampleYaml, 'yaml');
  };

  const clearAll = () => {
    setInput('');
    setJsonOutput('');
    setYamlOutput('');
    setError('');
    setIsValid(null);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">YAML ⇄ JSON Converter</h3>
          <p className="text-sm text-muted-foreground">
            Convert between YAML and JSON formats with advanced options
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadSampleData}>
            Load Sample
          </Button>
          <Button variant="outline" size="sm" onClick={clearAll}>
            Clear All
          </Button>
        </div>
      </div>

      {/* Input Section */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-4">
            <label className="block text-sm font-medium">Input</label>
            <div className="flex items-center gap-2">
              <Label htmlFor="input-type" className="text-sm">Type:</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm">YAML</span>
                <Switch
                  id="input-type"
                  checked={inputType === 'json'}
                  onCheckedChange={(checked) => {
                    setInputType(checked ? 'json' : 'yaml');
                    if (input) validateInput(input, checked ? 'json' : 'yaml');
                  }}
                />
                <span className="text-sm">JSON</span>
              </div>
            </div>
          </div>
          {isValid !== null && (
            <Badge variant={isValid ? 'default' : 'destructive'} className="flex items-center gap-1">
              {isValid ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
              {isValid ? 'Valid' : 'Invalid'}
            </Badge>
          )}
        </div>
        <Textarea
          placeholder={inputType === 'yaml' ? 'Enter YAML...' : 'Enter JSON...'}
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          className="min-h-[150px] font-mono text-sm py-3"
        />
        {error && (
          <Alert variant="destructive" className="mt-3">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* YAML Options */}
      {inputType === 'json' && (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">YAML Output Options</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="indent" className="text-sm font-medium">Indentation</Label>
              <select
                id="indent"
                value={yamlOptions.indent}
                onChange={(e) => setYamlOptions({...yamlOptions, indent: Number(e.target.value)})}
                className="w-full mt-1 p-2 border rounded-md text-sm"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={8}>8 spaces</option>
              </select>
            </div>
            <div>
              <Label htmlFor="lineWidth" className="text-sm font-medium">Line Width</Label>
              <select
                id="lineWidth"
                value={yamlOptions.lineWidth}
                onChange={(e) => setYamlOptions({...yamlOptions, lineWidth: Number(e.target.value)})}
                className="w-full mt-1 p-2 border rounded-md text-sm"
              >
                <option value={60}>60 characters</option>
                <option value={80}>80 characters</option>
                <option value={120}>120 characters</option>
                <option value={-1}>No limit</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="noRefs"
                checked={yamlOptions.noRefs}
                onCheckedChange={(checked) => setYamlOptions({...yamlOptions, noRefs: checked})}
              />
              <Label htmlFor="noRefs" className="text-sm">No References</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="skipInvalid"
                checked={yamlOptions.skipInvalid}
                onCheckedChange={(checked) => setYamlOptions({...yamlOptions, skipInvalid: checked})}
              />
              <Label htmlFor="skipInvalid" className="text-sm">Skip Invalid</Label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Convert Buttons */}
      <div className="flex gap-3">
        <Button 
          onClick={convertYamlToJson} 
          disabled={!input || inputType !== 'yaml'} 
          className="flex-1"
        >
          YAML → JSON
        </Button>
        <Button 
          onClick={convertJsonToYaml} 
          disabled={!input || inputType !== 'json'} 
          className="flex-1"
        >
          JSON → YAML
        </Button>
      </div>

      {/* Output Tabs */}
      <Tabs defaultValue="json" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="json">JSON Output</TabsTrigger>
          <TabsTrigger value="yaml">YAML Output</TabsTrigger>
        </TabsList>
        
        <TabsContent value="json">
          {jsonOutput && (
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex justify-between items-center">
                  JSON Output
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(jsonOutput)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(jsonOutput, 'converted.json')}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-50 p-4 rounded border text-sm overflow-x-auto max-h-80 whitespace-pre-wrap">
                  {jsonOutput}
                </pre>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="yaml">
          {yamlOutput && (
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex justify-between items-center">
                  YAML Output
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(yamlOutput)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(yamlOutput, 'converted.yaml')}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-50 p-4 rounded border text-sm overflow-x-auto max-h-80 whitespace-pre-wrap">
                  {yamlOutput}
                </pre>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Info Card */}
      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-slate-600">
            <p><strong>Advanced Features:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Uses js-yaml library for robust parsing and generation</li>
              <li>Real-time validation with detailed error messages</li>
              <li>Configurable YAML output formatting options</li>
              <li>Support for complex nested structures and arrays</li>
              <li>Copy to clipboard and download functionality</li>
              <li>Sample data loader for testing</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YamlConverter;
