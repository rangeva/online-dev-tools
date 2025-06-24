
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Download, Shield, Unlock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HtmlEntityCoder = () => {
  const [input, setInput] = useState('');
  const [encodedOutput, setEncodedOutput] = useState('');
  const [decodedOutput, setDecodedOutput] = useState('');
  const { toast } = useToast();

  const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '¡': '&iexcl;',
    '¢': '&cent;',
    '£': '&pound;',
    '¤': '&curren;',
    '¥': '&yen;',
    '¦': '&brvbar;',
    '§': '&sect;',
    '¨': '&uml;',
    '©': '&copy;',
    'ª': '&ordf;',
    '«': '&laquo;',
    '¬': '&not;',
    '®': '&reg;',
    '¯': '&macr;',
    '°': '&deg;',
    '±': '&plusmn;',
    '²': '&sup2;',
    '³': '&sup3;',
    '´': '&acute;',
    'µ': '&micro;',
    '¶': '&para;',
    '·': '&middot;',
    '¸': '&cedil;',
    '¹': '&sup1;',
    'º': '&ordm;',
    '»': '&raquo;',
    '¼': '&frac14;',
    '½': '&frac12;',
    '¾': '&frac34;',
    '¿': '&iquest;',
    ' ': '&nbsp;'
  };

  const encodeHtmlEntities = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to encode",
        variant: "destructive"
      });
      return;
    }

    let encoded = input;
    
    // Encode basic HTML entities
    Object.entries(htmlEntities).forEach(([char, entity]) => {
      encoded = encoded.replace(new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), entity);
    });

    // Encode other special characters to numeric entities
    encoded = encoded.replace(/[\u0080-\uFFFF]/g, (match) => {
      return '&#' + match.charCodeAt(0) + ';';
    });

    setEncodedOutput(encoded);
    
    toast({
      title: "HTML Entities Encoded",
      description: "Text has been encoded with HTML entities"
    });
  };

  const decodeHtmlEntities = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter HTML entities to decode",
        variant: "destructive"
      });
      return;
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = input;
    const decoded = tempDiv.textContent || tempDiv.innerText || '';

    setDecodedOutput(decoded);
    
    toast({
      title: "HTML Entities Decoded",
      description: "HTML entities have been decoded to text"
    });
  };

  const copyToClipboard = async (text: string, type: string) => {
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const downloadFile = (content: string, filename: string) => {
    if (!content) return;

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

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Text Input</label>
          <Textarea
            placeholder="Enter text to encode/decode HTML entities..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-32 text-sm"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={encodeHtmlEntities} disabled={!input.trim()} className="flex-1">
            <Shield className="w-4 h-4 mr-2" />
            Encode Entities
          </Button>
          <Button onClick={decodeHtmlEntities} disabled={!input.trim()} variant="outline" className="flex-1">
            <Unlock className="w-4 h-4 mr-2" />
            Decode Entities
          </Button>
        </div>
      </div>

      {encodedOutput && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">Encoded Output</label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(encodedOutput, "Encoded text")}>
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={() => downloadFile(encodedOutput, "encoded.txt")}>
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
          <Textarea
            value={encodedOutput}
            readOnly
            className="min-h-32 font-mono text-sm bg-slate-50"
          />
        </div>
      )}

      {decodedOutput && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">Decoded Output</label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(decodedOutput, "Decoded text")}>
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={() => downloadFile(decodedOutput, "decoded.txt")}>
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
          <Textarea
            value={decodedOutput}
            readOnly
            className="min-h-32 text-sm bg-slate-50"
          />
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="text-sm text-slate-600">
            <p><strong>Common HTML Entities:</strong></p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-xs font-mono">
              <div>&amp; → &amp;amp;</div>
              <div>&lt; → &amp;lt;</div>
              <div>&gt; → &amp;gt;</div>
              <div>" → &amp;quot;</div>
              <div>' → &amp;#39;</div>
              <div>© → &amp;copy;</div>
              <div>® → &amp;reg;</div>
              <div>  → &amp;nbsp;</div>
            </div>
            <p className="mt-4"><strong>Use cases:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>XSS prevention in web applications</li>
              <li>Safe rendering of user content</li>
              <li>Email template preparation</li>
              <li>XML/HTML content escaping</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HtmlEntityCoder;
