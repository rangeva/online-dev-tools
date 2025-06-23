
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface JsonNode {
  key?: string;
  value: any;
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  level: number;
  isCollapsed: boolean;
}

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [formatted, setFormatted] = useState('');
  const [minified, setMinified] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [parsedJson, setParsedJson] = useState<any>(null);
  const [collapsedStates, setCollapsedStates] = useState<{[key: string]: boolean}>({});

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setFormatted(JSON.stringify(parsed, null, 2));
      setMinified(JSON.stringify(parsed));
      setParsedJson(parsed);
      setIsValid(true);
      setError('');
      setCollapsedStates({});
    } catch (err) {
      setError((err as Error).message);
      setIsValid(false);
      setFormatted('');
      setMinified('');
      setParsedJson(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const validateJson = (jsonString: string) => {
    if (!jsonString.trim()) {
      setIsValid(null);
      setError('');
      return;
    }

    try {
      JSON.parse(jsonString);
      setIsValid(true);
      setError('');
    } catch (err) {
      setIsValid(false);
      setError((err as Error).message);
    }
  };

  const toggleCollapse = (path: string) => {
    setCollapsedStates(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const renderJsonValue = (value: any, key?: string, level: number = 0, path: string = ''): React.ReactNode => {
    const currentPath = path + (key ? `.${key}` : '');
    const isCollapsed = collapsedStates[currentPath];
    const indent = level * 20;

    if (value === null) {
      return (
        <div style={{ marginLeft: indent }} className="flex items-center">
          {key && <span className="text-blue-600 mr-2">"{key}":</span>}
          <span className="text-gray-500">null</span>
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <div style={{ marginLeft: indent }} className="flex items-center">
          {key && <span className="text-blue-600 mr-2">"{key}":</span>}
          <span className="text-purple-600">{value.toString()}</span>
        </div>
      );
    }

    if (typeof value === 'number') {
      return (
        <div style={{ marginLeft: indent }} className="flex items-center">
          {key && <span className="text-blue-600 mr-2">"{key}":</span>}
          <span className="text-green-600">{value}</span>
        </div>
      );
    }

    if (typeof value === 'string') {
      return (
        <div style={{ marginLeft: indent }} className="flex items-center">
          {key && <span className="text-blue-600 mr-2">"{key}":</span>}
          <span className="text-red-600">"{value}"</span>
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div style={{ marginLeft: indent }}>
          <Collapsible open={!isCollapsed} onOpenChange={() => toggleCollapse(currentPath)}>
            <CollapsibleTrigger className="flex items-center hover:bg-gray-100 p-1 rounded">
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {key && <span className="text-blue-600 mr-2">"{key}":</span>}
              <span className="text-gray-700">[{value.length} items]</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="border-l-2 border-gray-200 ml-2">
                {value.map((item, index) => (
                  <div key={index}>
                    {renderJsonValue(item, index.toString(), level + 1, currentPath + `[${index}]`)}
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      );
    }

    if (typeof value === 'object') {
      const keys = Object.keys(value);
      return (
        <div style={{ marginLeft: indent }}>
          <Collapsible open={!isCollapsed} onOpenChange={() => toggleCollapse(currentPath)}>
            <CollapsibleTrigger className="flex items-center hover:bg-gray-100 p-1 rounded">
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {key && <span className="text-blue-600 mr-2">"{key}":</span>}
              <span className="text-gray-700">{`{${keys.length} keys}`}</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="border-l-2 border-gray-200 ml-2">
                {keys.map((objKey) => (
                  <div key={objKey}>
                    {renderJsonValue(value[objKey], objKey, level + 1, currentPath + `.${objKey}`)}
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      );
    }

    return null;
  };

  const expandAll = () => {
    setCollapsedStates({});
  };

  const collapseAll = () => {
    const getAllPaths = (obj: any, currentPath: string = ''): string[] => {
      const paths: string[] = [];
      if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
          paths.push(currentPath);
          obj.forEach((item, index) => {
            paths.push(...getAllPaths(item, currentPath + `[${index}]`));
          });
        } else {
          paths.push(currentPath);
          Object.keys(obj).forEach(key => {
            paths.push(...getAllPaths(obj[key], currentPath + (currentPath ? '.' : '') + key));
          });
        }
      }
      return paths;
    };

    if (parsedJson) {
      const allPaths = getAllPaths(parsedJson);
      const newCollapsedStates: {[key: string]: boolean} = {};
      allPaths.forEach(path => {
        if (path) newCollapsedStates[path] = true;
      });
      setCollapsedStates(newCollapsedStates);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">JSON Input</label>
          {isValid !== null && (
            <Badge variant={isValid ? 'default' : 'destructive'}>
              {isValid ? 'Valid JSON' : 'Invalid JSON'}
            </Badge>
          )}
        </div>
        <Textarea
          placeholder='{"name": "example", "value": 123}'
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            validateJson(e.target.value);
          }}
          className="min-h-[120px] font-mono text-sm"
        />
        {error && (
          <div className="text-red-600 text-sm mt-1">{error}</div>
        )}
      </div>

      <Button onClick={formatJson} disabled={!input || !isValid} className="w-full">
        Format & Validate JSON
      </Button>

      {parsedJson && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex justify-between items-center">
              Interactive JSON Viewer
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={expandAll}>
                  Expand All
                </Button>
                <Button variant="outline" size="sm" onClick={collapseAll}>
                  Collapse All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(formatted)}
                >
                  Copy
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 p-3 rounded border text-sm font-mono max-h-96 overflow-auto">
              {renderJsonValue(parsedJson)}
            </div>
          </CardContent>
        </Card>
      )}

      {formatted && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex justify-between items-center">
              Formatted JSON
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(formatted)}
              >
                Copy
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-50 p-3 rounded border text-sm overflow-x-auto max-h-60">
              {formatted}
            </pre>
          </CardContent>
        </Card>
      )}

      {minified && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex justify-between items-center">
              Minified JSON
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(minified)}
              >
                Copy
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 p-3 rounded border text-sm font-mono break-all max-h-40 overflow-y-auto">
              {minified}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JsonFormatter;
