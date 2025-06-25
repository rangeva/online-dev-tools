
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, FileText, Download, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MarkdownToHtmlConverter = () => {
  const [markdownInput, setMarkdownInput] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const { toast } = useToast();

  const markdownToHtml = (markdown: string): string => {
    let html = markdown;
    
    // Headers
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
    html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Code
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');
    
    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    
    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
    
    // Strikethrough
    html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');
    
    // Horizontal rule
    html = html.replace(/^---$/gm, '<hr>');
    html = html.replace(/^\*\*\*$/gm, '<hr>');
    
    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');
    
    // Wrap in paragraphs
    if (html && !html.startsWith('<')) {
      html = '<p>' + html + '</p>';
    }
    
    // Lists
    html = html.replace(/^\* (.+)$/gm, '<li>$1</li>');
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/^\+ (.+)$/gm, '<li>$1</li>');
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
    
    // Wrap consecutive list items in ul/ol tags
    html = html.replace(/(<li>.*<\/li>)/gs, function(match) {
      return '<ul>' + match + '</ul>';
    });
    
    // Blockquotes
    html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
    
    return html;
  };

  const convertToHtml = () => {
    try {
      if (!markdownInput.trim()) {
        toast({
          title: "Error",
          description: "Please enter some Markdown to convert.",
          variant: "destructive"
        });
        return;
      }

      const htmlString = markdownToHtml(markdownInput);
      setHtmlOutput(htmlString);
      
      toast({
        title: "Success",
        description: "Markdown converted to HTML successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error converting Markdown. Please check your input.",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlOutput);
    toast({
      title: "Copied!",
      description: "HTML output copied to clipboard"
    });
  };

  const downloadFile = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Converted Document</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        h1, h2, h3, h4, h5, h6 { color: #333; }
        code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
        pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
        blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 20px; color: #666; }
        @media print { body { margin: 0; } }
    </style>
</head>
<body>
${htmlOutput}
</body>
</html>`;
    
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const printAsPdf = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Converted Document</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        h1, h2, h3, h4, h5, h6 { color: #333; }
        code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
        pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
        blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 20px; color: #666; }
        @media print { body { margin: 0; } }
    </style>
</head>
<body>
${htmlOutput}
</body>
</html>`;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(fullHtml);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  const clearAll = () => {
    setMarkdownInput("");
    setHtmlOutput("");
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <CardTitle>Markdown to HTML</CardTitle>
          </div>
          <CardDescription>
            Convert Markdown to HTML and allow to print (as PDF)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="markdown-input">Markdown Input</Label>
              <Textarea
                id="markdown-input"
                value={markdownInput}
                onChange={(e) => setMarkdownInput(e.target.value)}
                placeholder='# Hello World

This is **bold** and this is *italic*.

- List item 1
- List item 2

[Link](https://example.com)

`inline code`

```
code block
```'
                className="min-h-[300px] font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>HTML Output</Label>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!htmlOutput}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={downloadFile}
                    disabled={!htmlOutput}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={printAsPdf}
                    disabled={!htmlOutput}
                  >
                    <Printer className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                value={htmlOutput}
                readOnly
                className="min-h-[300px] font-mono text-sm"
                placeholder="HTML output will appear here..."
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={convertToHtml} className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Convert to HTML
            </Button>
            <Button onClick={clearAll} variant="outline">
              Clear All
            </Button>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <div><strong>Tips:</strong></div>
            <div>• Paste Markdown content in the input field</div>
            <div>• Supports headers, bold, italic, links, images, lists, and code blocks</div>
            <div>• Use the print button to generate a PDF from the HTML output</div>
            <div>• Download creates a complete HTML file with styling</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarkdownToHtmlConverter;
