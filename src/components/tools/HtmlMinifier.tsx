
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HtmlMinifier = () => {
  const [htmlInput, setHtmlInput] = useState('');
  const [minifiedHtml, setMinifiedHtml] = useState('');
  const [stats, setStats] = useState({ original: 0, minified: 0, saved: 0 });
  const { toast } = useToast();

  const minifyHtml = () => {
    if (!htmlInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter HTML to minify",
        variant: "destructive"
      });
      return;
    }

    const originalSize = htmlInput.length;
    
    // Basic HTML minification
    let minified = htmlInput
      // Remove comments
      .replace(/<!--[\s\S]*?-->/g, '')
      // Remove whitespace between tags
      .replace(/>\s+</g, '><')
      // Remove leading/trailing whitespace from lines
      .replace(/^\s+|\s+$/gm, '')
      // Remove extra whitespace
      .replace(/\s{2,}/g, ' ')
      // Remove whitespace around equals signs in attributes
      .replace(/\s*=\s*/g, '=')
      // Remove quotes from single-word attribute values (safe cases)
      .replace(/=["']([a-zA-Z0-9_-]+)["']/g, '=$1')
      .trim();

    const minifiedSize = minified.length;
    const savedBytes = originalSize - minifiedSize;
    const savedPercent = originalSize > 0 ? ((savedBytes / originalSize) * 100).toFixed(1) : 0;

    setMinifiedHtml(minified);
    setStats({
      original: originalSize,
      minified: minifiedSize,
      saved: Number(savedPercent)
    });

    toast({
      title: "HTML Minified",
      description: `Reduced size by ${savedPercent}% (${savedBytes} bytes saved)`
    });
  };

  const copyToClipboard = async () => {
    if (!minifiedHtml) return;
    
    try {
      await navigator.clipboard.writeText(minifiedHtml);
      toast({
        title: "Copied!",
        description: "Minified HTML copied to clipboard"
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
    if (!minifiedHtml) return;

    const blob = new Blob([minifiedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minified.html';
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

        <Button onClick={minifyHtml} disabled={!htmlInput.trim()} className="w-full">
          <Zap className="w-4 h-4 mr-2" />
          Minify HTML
        </Button>
      </div>

      {minifiedHtml && (
        <>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center justify-between">
                Statistics
                <div className="flex gap-2">
                  <Badge variant="outline">{stats.original} bytes → {stats.minified} bytes</Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {stats.saved}% smaller
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-slate-600">{stats.original}</div>
                  <div className="text-sm text-slate-500">Original Size</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{stats.minified}</div>
                  <div className="text-sm text-slate-500">Minified Size</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{stats.saved}%</div>
                  <div className="text-sm text-slate-500">Size Reduction</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium">Minified HTML</label>
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
              value={minifiedHtml}
              readOnly
              className="min-h-48 font-mono text-sm bg-slate-50"
            />
          </div>
        </>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="text-sm text-slate-600">
            <p><strong>Features:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Removes HTML comments</li>
              <li>Eliminates unnecessary whitespace</li>
              <li>Optimizes attribute formatting</li>
              <li>Preserves functionality while reducing size</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HtmlMinifier;
