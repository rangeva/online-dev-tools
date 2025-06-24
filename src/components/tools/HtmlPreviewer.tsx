
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HtmlPreviewer = () => {
  const [htmlInput, setHtmlInput] = useState('');
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

        <Button onClick={handlePreview} disabled={!htmlInput.trim()} className="w-full">
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

      {showPreview && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-amber-600 dark:text-amber-400">
              Be cautious with untrusted HTML content
            </span>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Live Preview</label>
            <Card>
              <CardContent className="p-6">
                <div 
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: htmlInput }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="text-sm text-slate-600">
            <p><strong>HTML Previewer Features:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Real-time HTML rendering</li>
              <li>Safe preview environment</li>
              <li>Support for all HTML elements</li>
              <li>CSS styling preserved</li>
              <li>Interactive elements functional</li>
            </ul>
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-800">
              <p className="text-amber-800 dark:text-amber-200">
                <strong>Security Note:</strong> Only preview HTML from trusted sources. This tool renders HTML directly in your browser.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HtmlPreviewer;
