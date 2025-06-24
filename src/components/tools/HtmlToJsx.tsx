
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Download, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HtmlToJsx = () => {
  const [htmlInput, setHtmlInput] = useState('');
  const [jsxOutput, setJsxOutput] = useState('');
  const { toast } = useToast();

  const convertToJsx = () => {
    if (!htmlInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter HTML to convert",
        variant: "destructive"
      });
      return;
    }

    let jsx = htmlInput
      // Convert self-closing tags
      .replace(/<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)([^>]*?)(?<!\/)\s*>/gi, '<$1$2 />')
      
      // Convert attributes
      .replace(/class=/g, 'className=')
      .replace(/for=/g, 'htmlFor=')
      .replace(/contenteditable=/g, 'contentEditable=')
      .replace(/tabindex=/g, 'tabIndex=')
      .replace(/readonly=/g, 'readOnly=')
      .replace(/maxlength=/g, 'maxLength=')
      .replace(/minlength=/g, 'minLength=')
      .replace(/autocomplete=/g, 'autoComplete=')
      .replace(/autofocus=/g, 'autoFocus=')
      .replace(/autoplay=/g, 'autoPlay=')
      .replace(/crossorigin=/g, 'crossOrigin=')
      .replace(/datetime=/g, 'dateTime=')
      .replace(/formaction=/g, 'formAction=')
      .replace(/formenctype=/g, 'formEncType=')
      .replace(/formmethod=/g, 'formMethod=')
      .replace(/formnovalidate=/g, 'formNoValidate=')
      .replace(/formtarget=/g, 'formTarget=')
      .replace(/frameborder=/g, 'frameBorder=')
      .replace(/marginheight=/g, 'marginHeight=')
      .replace(/marginwidth=/g, 'marginWidth=')
      .replace(/novalidate=/g, 'noValidate=')
      .replace(/radiogroup=/g, 'radioGroup=')
      .replace(/spellcheck=/g, 'spellCheck=')
      .replace(/srcdoc=/g, 'srcDoc=')
      .replace(/srclang=/g, 'srcLang=')
      .replace(/srcset=/g, 'srcSet=')
      .replace(/usemap=/g, 'useMap=')
      
      // Convert data and aria attributes to camelCase
      .replace(/data-([a-z]+(?:-[a-z]+)*)/g, (match, attr) => {
        return 'data-' + attr.replace(/-([a-z])/g, (m, letter) => letter.toUpperCase());
      })
      .replace(/aria-([a-z]+(?:-[a-z]+)*)/g, (match, attr) => {
        return 'aria-' + attr.replace(/-([a-z])/g, (m, letter) => letter.toUpperCase());
      })
      
      // Convert style attribute to object
      .replace(/style="([^"]*)"/g, (match, styles) => {
        if (!styles.trim()) return 'style={{}}';
        
        const styleObj = styles.split(';')
          .filter(s => s.trim())
          .map(s => {
            const [property, value] = s.split(':').map(part => part.trim());
            if (!property || !value) return '';
            
            // Convert kebab-case to camelCase
            const camelProperty = property.replace(/-([a-z])/g, (m, letter) => letter.toUpperCase());
            
            // Handle numeric values
            const numericValue = /^\d+$/.test(value) ? value : `'${value}'`;
            
            return `${camelProperty}: ${numericValue}`;
          })
          .filter(s => s)
          .join(', ');
        
        return `style={{${styleObj}}}`;
      })
      
      // Convert event handlers to camelCase
      .replace(/on([a-z]+)=/g, (match, event) => {
        return 'on' + event.charAt(0).toUpperCase() + event.slice(1) + '=';
      })
      
      // Handle boolean attributes
      .replace(/\s(checked|selected|disabled|readonly|multiple|autofocus|autoplay|controls|default|defer|hidden|loop|muted|open|required|reversed)\s*=\s*["']?\1["']?/gi, ' $1')
      .replace(/\s(checked|selected|disabled|readonly|multiple|autofocus|autoplay|controls|default|defer|hidden|loop|muted|open|required|reversed)(?=\s|>)/gi, ' $1={true}')
      
      // Fix common JSX issues
      .replace(/<!--(.*?)-->/g, '{/* $1 */}')  // Convert HTML comments to JSX comments
      .replace(/&nbsp;/g, '{\'\\u00A0\'}')     // Convert non-breaking spaces
      .replace(/&amp;/g, '&')                 // Convert HTML entities
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    setJsxOutput(jsx);
    
    toast({
      title: "Converted to JSX",
      description: "HTML has been successfully converted to JSX"
    });
  };

  const copyToClipboard = async () => {
    if (!jsxOutput) return;
    
    try {
      await navigator.clipboard.writeText(jsxOutput);
      toast({
        title: "Copied!",
        description: "JSX code copied to clipboard"
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
    if (!jsxOutput) return;

    const blob = new Blob([jsxOutput], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.jsx';
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

        <Button onClick={convertToJsx} disabled={!htmlInput.trim()} className="w-full">
          <Code className="w-4 h-4 mr-2" />
          Convert to JSX
        </Button>
      </div>

      {jsxOutput && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">JSX Output</label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={downloadFile}>
                <Download className="w-4 h-4 mr-1" />
                Download .jsx
              </Button>
            </div>
          </div>
          <Textarea
            value={jsxOutput}
            readOnly
            className="min-h-96 font-mono text-sm bg-slate-50"
          />
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="text-sm text-slate-600">
            <p><strong>Automatic conversions:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>class → className</li>
              <li>for → htmlFor</li>
              <li>Self-closing tags (br, img, input, etc.)</li>
              <li>Style attributes → style objects</li>
              <li>Event handlers → camelCase</li>
              <li>HTML comments → JSX comments</li>
              <li>Boolean attributes</li>
              <li>Data and aria attributes</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HtmlToJsx;
