
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const UrlEncoder = () => {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');

  const encode = () => {
    try {
      setEncoded(encodeURIComponent(input));
    } catch (error) {
      setEncoded('Error: Invalid input for encoding');
    }
  };

  const decode = () => {
    try {
      setDecoded(decodeURIComponent(input));
    } catch (error) {
      setDecoded('Error: Invalid input for decoding');
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
          placeholder="Enter text or URL to encode/decode..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[80px]"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={encode} disabled={!input} className="flex-1">
          Encode
        </Button>
        <Button onClick={decode} disabled={!input} className="flex-1">
          Decode
        </Button>
      </div>

      {encoded && (
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1">
                <div className="font-medium text-sm text-slate-600 mb-2">Encoded</div>
                <div className="font-mono text-sm bg-slate-50 p-3 rounded border break-all">
                  {encoded}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(encoded)}
              >
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {decoded && (
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1">
                <div className="font-medium text-sm text-slate-600 mb-2">Decoded</div>
                <div className="font-mono text-sm bg-slate-50 p-3 rounded border break-all">
                  {decoded}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(decoded)}
              >
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UrlEncoder;
