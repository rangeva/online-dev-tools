import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Download, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HtmlBeautifier = () => {
  const [htmlInput, setHtmlInput] = useState('');
  const [beautifiedHtml, setBeautifiedHtml] = useState('');
  const { toast } = useToast();

  const beautifyHtml = () => {
    if (!htmlInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter HTML to beautify",
        variant: "destructive"
      });
      return;
    }

    let formatted = htmlInput
      // Remove extra whitespace
      .replace(/\s+/g, ' ')
      // Remove whitespace between tags
      .replace(/>\s+</g, '><')
      .trim();

    // Basic formatting with indentation
    let indentLevel = 0;
    const indentSize = 2;
    let result = '';
    let inTag = false;
    let tagContent = '';

    const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
    const inlineTags = ['a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'button', 'cite', 'code', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var'];

    for (let i = 0; i < formatted.length; i++) {
      const char = formatted[i];
      
      if (char === '<') {
        if (tagContent.trim() && !inTag) {
          result += tagContent.trim();
        }
        tagContent = '';
        inTag = true;
        
        // Check if it's a closing tag
        if (formatted[i + 1] === '/') {
          indentLevel = Math.max(0, indentLevel - 1);
          result += '\n' + ' '.repeat(indentLevel * indentSize);
        } else {
          result += '\n' + ' '.repeat(indentLevel * indentSize);
        }
        
        result += char;
      } else if (char === '>') {
        result += char;
        
        // Get tag name
        const tagMatch = tagContent.match(/^\/?\s*([a-zA-Z][a-zA-Z0-9]*)/);
        const tagName = tagMatch ? tagMatch[1].toLowerCase() : '';
        
        // Don't increase indent for self-closing or closing tags
        if (!tagContent.startsWith('/') && !tagContent.endsWith('/') && !selfClosingTags.includes(tagName)) {
          if (!inlineTags.includes(tagName)) {
            indentLevel++;
          }
        }
        
        inTag = false;
        tagContent = '';
      } else {
        if (inTag) {
          tagContent += char;
        } else {
          tagContent += char;
        }
        result += char;
      }
    }

    // Clean up extra newlines and format
    const finalResult = result
      .split('\n')
      .map(line => line.trimRight())
      .filter((line, index, array) => {
        // Remove empty lines between tags but keep content
        if (line.trim() === '') {
          const nextLine = array[index + 1];
          const prevLine = array[index - 1];
          return !(nextLine && prevLine && nextLine.trim().startsWith('<') && prevLine.trim().endsWith('>'));
        }
        return true;
      })
      .join('\n')
      .trim();

    setBeautifiedHtml(finalResult);
    
    toast({
      title: "HTML Beautified",
      description: "Your HTML has been formatted and made readable"
    });
  };

  const copyToClipboard = async () => {
    if (!beautifiedHtml) return;
    
    try {
      await navigator.clipboard.writeText(beautifiedHtml);
      toast({
        title: "Copied!",
        description: "Beautified HTML copied to clipboard"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const downloadFile = () => {
    if (!beautifiedHtml) return;

    const blob = new Blob([beautifiedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'beautified.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">HTML Input</label>
          <Textarea
            placeholder="Paste your minified or messy HTML here..."
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            className="min-h-48 font-mono text-sm"
          />
        </div>

        <Button onClick={beautifyHtml} disabled={!htmlInput.trim()} className="w-full">
          <Sparkles className="w-4 h-4 mr-2" />
          Beautify HTML
        </Button>
      </div>

      {beautifiedHtml && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">Beautified HTML</label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={downloadFile}>
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
          <Textarea
            value={beautifiedHtml}
            readOnly
            className="min-h-96 font-mono text-sm bg-slate-50"
          />
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="text-sm text-slate-600">
            <p><strong>Features:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Proper indentation and formatting</li>
              <li>Line breaks for better readability</li>
              <li>Preserves HTML structure and content</li>
              <li>Makes minified code human-readable</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HtmlBeautifier;
