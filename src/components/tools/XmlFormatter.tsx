
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const XmlFormatter = () => {
  const [input, setInput] = useState('');
  const [formatted, setFormatted] = useState('');
  const [minified, setMinified] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  const formatXml = (xml: string, indent = 2): string => {
    let formatted = '';
    let pad = 0;
    
    xml.split(/>\s*</).forEach((node) => {
      if (node.match(/^\/\w/)) pad -= indent;
      formatted += '  '.repeat(pad) + '<' + node + '>\r\n';
      if (node.match(/^<?\w[^>]*[^/]$/)) pad += indent;
    });
    
    return formatted.substring(1, formatted.length - 3);
  };

  const minifyXml = (xml: string): string => {
    return xml.replace(/>\s*</g, '><').trim();
  };

  const validateXml = (xmlString: string): boolean => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlString, 'text/xml');
      const parserError = doc.getElementsByTagName('parsererror');
      return parserError.length === 0;
    } catch {
      return false;
    }
  };

  const processXml = () => {
    if (!input.trim()) return;

    try {
      const isValidXml = validateXml(input);
      
      if (!isValidXml) {
        setError('Invalid XML format');
        setIsValid(false);
        setFormatted('');
        setMinified('');
        return;
      }

      const formattedXml = formatXml(input);
      const minifiedXml = minifyXml(input);
      
      setFormatted(formattedXml);
      setMinified(minifiedXml);
      setIsValid(true);
      setError('');
    } catch (err) {
      setError((err as Error).message);
      setIsValid(false);
      setFormatted('');
      setMinified('');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (!value.trim()) {
      setIsValid(null);
      setError('');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">XML Input</label>
          {isValid !== null && (
            <Badge variant={isValid ? 'default' : 'destructive'}>
              {isValid ? 'Valid XML' : 'Invalid XML'}
            </Badge>
          )}
        </div>
        <Textarea
          placeholder='<root><item>value</item></root>'
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          className="min-h-[120px] font-mono text-sm"
        />
        {error && (
          <div className="text-red-600 text-sm mt-1">{error}</div>
        )}
      </div>

      <Button onClick={processXml} disabled={!input} className="w-full">
        Format & Validate XML
      </Button>

      {formatted && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex justify-between items-center">
              Formatted XML
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
              Minified XML
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

export default XmlFormatter;
