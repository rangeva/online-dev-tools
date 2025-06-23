
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [formatted, setFormatted] = useState('');
  const [minified, setMinified] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setFormatted(JSON.stringify(parsed, null, 2));
      setMinified(JSON.stringify(parsed));
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

      {formatted && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex justify-between items-center">
              Formatted JSON
              <div className="flex gap-2">
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
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(minified)}
                >
                  Copy
                </Button>
              </div>
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
