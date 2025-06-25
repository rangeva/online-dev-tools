
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Code2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JsonToXmlConverter = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [xmlOutput, setXmlOutput] = useState("");
  const { toast } = useToast();

  const jsonToXml = (obj: any, rootName: string = "root"): string => {
    const convertValue = (value: any, key: string, indent: number = 0): string => {
      const spaces = '  '.repeat(indent);
      
      if (value === null || value === undefined) {
        return `${spaces}<${key}></${key}>`;
      }
      
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return `${spaces}<${key}>${value}</${key}>`;
      }
      
      if (Array.isArray(value)) {
        return value.map(item => convertValue(item, key, indent)).join('\n');
      }
      
      if (typeof value === 'object') {
        const entries = Object.entries(value);
        if (entries.length === 0) {
          return `${spaces}<${key}></${key}>`;
        }
        
        const childElements = entries.map(([childKey, childValue]) => {
          // Handle special keys
          if (childKey === '@attributes') {
            return ''; // Will be handled separately
          }
          if (childKey === '#text') {
            return childValue; // Return text content directly
          }
          
          return convertValue(childValue, childKey, indent + 1);
        }).filter(element => element !== '').join('\n');
        
        // Handle attributes
        let attributes = '';
        if (value['@attributes']) {
          const attrs = Object.entries(value['@attributes'])
            .map(([attrKey, attrValue]) => `${attrKey}="${attrValue}"`)
            .join(' ');
          attributes = attrs ? ` ${attrs}` : '';
        }
        
        // Handle text content
        const textContent = value['#text'];
        if (textContent && !childElements) {
          return `${spaces}<${key}${attributes}>${textContent}</${key}>`;
        }
        
        if (childElements) {
          return `${spaces}<${key}${attributes}>\n${childElements}\n${spaces}</${key}>`;
        } else {
          return `${spaces}<${key}${attributes}></${key}>`;
        }
      }
      
      return `${spaces}<${key}>${value}</${key}>`;
    };
    
    if (typeof obj === 'object' && obj !== null) {
      const entries = Object.entries(obj);
      if (entries.length === 1) {
        const [key, value] = entries[0];
        return `<?xml version="1.0" encoding="UTF-8"?>\n${convertValue(value, key, 0)}`;
      } else {
        const childElements = entries.map(([key, value]) => 
          convertValue(value, key, 1)
        ).join('\n');
        return `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n${childElements}\n</${rootName}>`;
      }
    }
    
    return `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>${obj}</${rootName}>`;
  };

  const convertToXml = () => {
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
      const xmlString = jsonToXml(parsed);
      setXmlOutput(xmlString);
      
      toast({
        title: "Success",
        description: "JSON converted to XML successfully!"
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
    navigator.clipboard.writeText(xmlOutput);
    toast({
      title: "Copied!",
      description: "XML output copied to clipboard"
    });
  };

  const downloadFile = () => {
    const blob = new Blob([xmlOutput], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setJsonInput("");
    setXmlOutput("");
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            <CardTitle>JSON to XML</CardTitle>
          </div>
          <CardDescription>
            Convert JSON to XML
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
                placeholder='{"name": "John Doe", "age": 30, "city": "New York"}'
                className="min-h-[300px] font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>XML Output</Label>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!xmlOutput}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={downloadFile}
                    disabled={!xmlOutput}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                value={xmlOutput}
                readOnly
                className="min-h-[300px] font-mono text-sm"
                placeholder="XML output will appear here..."
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={convertToXml} className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              Convert to XML
            </Button>
            <Button onClick={clearAll} variant="outline">
              Clear All
            </Button>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <div><strong>Tips:</strong></div>
            <div>• Paste valid JSON in the input field</div>
            <div>• Arrays will create multiple elements with the same tag name</div>
            <div>• Special keys: @attributes for XML attributes, #text for text content</div>
            <div>• Use the download button to save the converted XML file</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JsonToXmlConverter;
