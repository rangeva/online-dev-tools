
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Eye, EyeOff, AlertTriangle, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HtmlPreviewer = () => {
  const [htmlInput, setHtmlInput] = useState('<h1>Hello World!</h1>\n<p>This is a sample HTML content.</p>\n<button onclick="alert(\'Hello!\')">Click me</button>');
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const handlePreview = () => {
    if (!htmlInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter HTML to preview",
        variant: "destructive"
      });
      return;
    }

    setShowPreview(!showPreview);
    
    if (!showPreview) {
      toast({
        title: "Preview Generated",
        description: "HTML is now being rendered in the preview area"
      });
    }
  };

  const handleClearInput = () => {
    setHtmlInput('');
    setShowPreview(false);
  };

  const handleLoadSample = () => {
    const sampleHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample HTML</title>
    <style>
        .sample-container { 
            padding: 20px; 
            font-family: Arial, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 8px;
        }
        .sample-button {
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px 0;
        }
        .sample-button:hover {
            background: #ff5252;
        }
    </style>
</head>
<body>
    <div class="sample-container">
        <h1>🌟 Welcome to HTML Previewer!</h1>
        <p>This is a sample HTML document with inline CSS and JavaScript.</p>
        <button class="sample-button" onclick="alert('Hello from HTML Previewer!')">Click Me!</button>
        <ul>
            <li>Interactive HTML preview</li>
            <li>CSS styling support</li>
            <li>JavaScript execution</li>
            <li>Real-time rendering</li>
        </ul>
    </div>
</body>
</html>`;
    setHtmlInput(sampleHtml);
    setShowPreview(true);
  };

  console.log('HtmlPreviewer rendered, showPreview:', showPreview, 'htmlInput length:', htmlInput.length);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            HTML Previewer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">HTML Input</label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLoadSample}
                  >
                    Load Sample
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearInput}
                  >
                    Clear
                  </Button>
                </div>
              </div>
              <Textarea
                placeholder="Paste your HTML code here..."
                value={htmlInput}
                onChange={(e) => setHtmlInput(e.target.value)}
                className="min-h-48 font-mono text-sm"
              />
            </div>

            <Button onClick={handlePreview} className="w-full">
              {showPreview ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  Hide Preview
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Show Preview
                </>
              )}
            </Button>
          </div>

          {showPreview && htmlInput.trim() && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span className="text-sm text-amber-600 dark:text-amber-400">
                  Be cautious with untrusted HTML content
                </span>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Live Preview</label>
                <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <CardContent className="p-0">
                    <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
                      <iframe
                        srcDoc={htmlInput}
                        className="w-full min-h-96 border-0"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                        title="HTML Preview"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                <p><strong>HTML Previewer Features:</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Real-time HTML rendering in secure iframe</li>
                  <li>Support for CSS styling and JavaScript</li>
                  <li>Safe preview environment with sandboxing</li>
                  <li>Interactive elements functional</li>
                  <li>Load sample HTML for testing</li>
                </ul>
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-800">
                  <p className="text-amber-800 dark:text-amber-200">
                    <strong>Security Note:</strong> The preview uses a sandboxed iframe for security. Only preview HTML from trusted sources.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default HtmlPreviewer;
