
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const CaseConverter = () => {
  const [inputText, setInputText] = useState('');

  const conversions = [
    {
      name: 'camelCase',
      convert: (text: string) => text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
        index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '')
    },
    {
      name: 'PascalCase',
      convert: (text: string) => text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => 
        word.toUpperCase()).replace(/\s+/g, '')
    },
    {
      name: 'snake_case',
      convert: (text: string) => text.toLowerCase().replace(/\s+/g, '_')
    },
    {
      name: 'kebab-case',
      convert: (text: string) => text.toLowerCase().replace(/\s+/g, '-')
    },
    {
      name: 'CONSTANT_CASE',
      convert: (text: string) => text.toUpperCase().replace(/\s+/g, '_')
    },
    {
      name: 'Title Case',
      convert: (text: string) => text.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    },
    {
      name: 'lowercase',
      convert: (text: string) => text.toLowerCase()
    },
    {
      name: 'UPPERCASE',
      convert: (text: string) => text.toUpperCase()
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Enter text to convert..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="min-h-[80px]"
      />

      <div className="grid gap-3">
        {conversions.map((conversion) => (
          <Card key={conversion.name} className="p-3">
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1">
                <div className="font-medium text-sm text-slate-600 mb-1">
                  {conversion.name}
                </div>
                <div className="font-mono text-sm bg-slate-50 p-2 rounded border min-h-[2rem] break-all">
                  {inputText ? conversion.convert(inputText) : 'Preview will appear here...'}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(conversion.convert(inputText))}
                disabled={!inputText}
              >
                Copy
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CaseConverter;
