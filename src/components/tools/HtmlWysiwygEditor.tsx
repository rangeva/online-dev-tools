
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HtmlWysiwygEditor = () => {
  const [htmlContent, setHtmlContent] = useState(`<h1>Welcome to HTML WYSIWYG Editor</h1>
<p>This is a <strong>rich text editor</strong> that generates HTML code instantly.</p>
<ul>
  <li>Type in the editor below</li>
  <li>See the HTML code update in real-time</li>
  <li>Copy or download the generated HTML</li>
</ul>
<p><em>Start editing to see the magic happen!</em></p>`);

  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent);
      toast({
        title: "Copied!",
        description: "HTML code copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const downloadHtml = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wysiwyg-editor-output.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "HTML file download initiated",
    });
  };

  const clearContent = () => {
    setHtmlContent("");
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            HTML WYSIWYG Editor
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Edit content visually and see the generated HTML code instantly
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={copyToClipboard} variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-2" />
              Copy HTML
            </Button>
            <Button onClick={downloadHtml} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button onClick={clearContent} variant="outline" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>

          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="editor">Visual Editor</TabsTrigger>
              <TabsTrigger value="code">HTML Code</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor" className="space-y-4">
              <div 
                contentEditable
                className="min-h-[400px] p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                onInput={(e) => {
                  const target = e.target as HTMLDivElement;
                  setHtmlContent(target.innerHTML);
                }}
                style={{
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: '1.6'
                }}
              />
              <p className="text-sm text-muted-foreground">
                Click in the editor above to start typing. Use standard formatting shortcuts like Ctrl+B for bold, Ctrl+I for italic.
              </p>
            </TabsContent>
            
            <TabsContent value="code" className="space-y-4">
              <Textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
                placeholder="HTML code will appear here..."
              />
              <p className="text-sm text-muted-foreground">
                Edit the HTML code directly. Changes will be reflected in the visual editor and preview.
              </p>
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-4">
              <div 
                className="min-h-[400px] p-4 border border-gray-300 rounded-md bg-white"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                style={{
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: '1.6'
                }}
              />
              <p className="text-sm text-muted-foreground">
                This is how your content will look when rendered as HTML.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default HtmlWysiwygEditor;
