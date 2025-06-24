
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HtmlToPlainText = () => {
  const [htmlInput, setHtmlInput] = useState('');
  const [plainText, setPlainText] = useState('');
  const { toast } = useToast();

  const convertToPlainText = () => {
    if (!htmlInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter HTML to convert",
        variant: "destructive"
      });
      return;
    }

    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlInput;

    // Extract text content and preserve some structure
    let text = '';
    
    const extractText = (node: Node): void => {
      if (node.nodeType === Node.TEXT_NODE) {
        const content = node.textContent?.trim();
        if (content) {
          text += content + ' ';
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const tagName = element.tagName.toLowerCase();
        
        // Add line breaks for block elements
        if (['p', 'div', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'].includes(tagName)) {
          if (tagName === 'br') {
            text += '\n';
          } else {
            // Process children first
            Array.from(element.childNodes).forEach(extractText);
            text += '\n';
            return;
          }
        }
        
        // Process child nodes
        Array.from(element.childNodes).forEach(extractText);
      }
    };

    Array.from(tempDiv.childNodes).forEach(extractText);
    
    // Clean up the text
    const cleanText = text
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n\s+/g, '\n') // Remove spaces after newlines
      .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
      .trim();

    setPlainText(cleanText);
    
    toast({
      title: "Converted to Plain Text",
      description: "HTML has been successfully converted to plain text"
    });
  };

  const copyToClipboard = async () => {
    if (!plainText) return;
    
    try {
      await navigator.clipboard.writeText(plainText);
      toast({
        title: "Copied!",
        description: "Plain text copied to clipboard"
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
    if (!plainText) return;

    const blob = new Blob([plainText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.txt';
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
            placeholder="Paste your HTML code here..."
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            className="min-h-48 font-mono text-sm"
          />
        </div>

        <Button onClick={convertToPlainText} disabled={!htmlInput.trim()} className="w-full">
          <FileText className="w-4 h-4 mr-2" />
          Convert to Plain Text
        </Button>
      </div>

      {plainText && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">Plain Text Output</label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={downloadFile}>
                <Download className="w-4 h-4 mr-1" />
                Download .txt
              </Button>
            </div>
          </div>
          <Textarea
            value={plainText}
            readOnly
            className="min-h-96 text-sm bg-slate-50"
          />
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="text-sm text-slate-600">
            <p><strong>Conversion Features:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Removes all HTML tags and attributes</li>
              <li>Preserves text content and basic structure</li>
              <li>Handles line breaks and paragraphs</li>
              <li>Cleans up extra whitespace</li>
              <li>Perfect for text extraction and indexing</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HtmlToPlainText;
