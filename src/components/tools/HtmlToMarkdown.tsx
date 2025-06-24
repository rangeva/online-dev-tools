
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HtmlToMarkdown = () => {
  const [htmlInput, setHtmlInput] = useState('');
  const [markdown, setMarkdown] = useState('');
  const { toast } = useToast();

  const convertToMarkdown = () => {
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

    const convertNode = (node: Node): string => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent?.replace(/\s+/g, ' ') || '';
      }

      if (node.nodeType !== Node.ELEMENT_NODE) {
        return '';
      }

      const element = node as Element;
      const tagName = element.tagName.toLowerCase();
      const children = Array.from(element.childNodes).map(convertNode).join('');

      switch (tagName) {
        case 'h1':
          return `# ${children}\n\n`;
        case 'h2':
          return `## ${children}\n\n`;
        case 'h3':
          return `### ${children}\n\n`;
        case 'h4':
          return `#### ${children}\n\n`;
        case 'h5':
          return `##### ${children}\n\n`;
        case 'h6':
          return `###### ${children}\n\n`;
        case 'p':
          return `${children}\n\n`;
        case 'br':
          return '\n';
        case 'strong':
        case 'b':
          return `**${children}**`;
        case 'em':
        case 'i':
          return `*${children}*`;
        case 'code':
          return `\`${children}\``;
        case 'pre':
          return `\`\`\`\n${children}\n\`\`\`\n\n`;
        case 'blockquote':
          return `> ${children}\n\n`;
        case 'a':
          const href = element.getAttribute('href') || '#';
          return `[${children}](${href})`;
        case 'img':
          const src = element.getAttribute('src') || '';
          const alt = element.getAttribute('alt') || '';
          return `![${alt}](${src})`;
        case 'ul':
          return `${children}\n`;
        case 'ol':
          return `${children}\n`;
        case 'li':
          const parent = element.parentElement?.tagName.toLowerCase();
          const marker = parent === 'ol' ? '1.' : '-';
          return `${marker} ${children}\n`;
        case 'hr':
          return '---\n\n';
        case 'table':
          return `${children}\n`;
        case 'thead':
        case 'tbody':
          return children;
        case 'tr':
          return `${children}\n`;
        case 'th':
        case 'td':
          return `| ${children} `;
        default:
          return children;
      }
    };

    const result = Array.from(tempDiv.childNodes)
      .map(convertNode)
      .join('')
      .replace(/\n{3,}/g, '\n\n') // Remove excessive newlines
      .trim();

    setMarkdown(result);
    
    toast({
      title: "Converted to Markdown",
      description: "HTML has been successfully converted to Markdown"
    });
  };

  const copyToClipboard = async () => {
    if (!markdown) return;
    
    try {
      await navigator.clipboard.writeText(markdown);
      toast({
        title: "Copied!",
        description: "Markdown copied to clipboard"
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
    if (!markdown) return;

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.md';
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

        <Button onClick={convertToMarkdown} disabled={!htmlInput.trim()} className="w-full">
          <FileText className="w-4 h-4 mr-2" />
          Convert to Markdown
        </Button>
      </div>

      {markdown && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">Markdown Output</label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={downloadFile}>
                <Download className="w-4 h-4 mr-1" />
                Download .md
              </Button>
            </div>
          </div>
          <Textarea
            value={markdown}
            readOnly
            className="min-h-96 font-mono text-sm bg-slate-50"
          />
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="text-sm text-slate-600">
            <p><strong>Supported conversions:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Headers (h1-h6) → # ## ### #### ##### ######</li>
              <li>Paragraphs, line breaks, and formatting</li>
              <li>Bold, italic, and code text</li>
              <li>Links and images</li>
              <li>Lists (ordered and unordered)</li>
              <li>Blockquotes and horizontal rules</li>
              <li>Tables (basic support)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HtmlToMarkdown;
