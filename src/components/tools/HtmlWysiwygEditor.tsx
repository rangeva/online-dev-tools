
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Copy, 
  Download, 
  Trash2, 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered,
  Link,
  Image,
  Undo,
  Redo
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HtmlWysiwygEditor = () => {
  const [htmlContent, setHtmlContent] = useState(`<h1>Welcome to HTML WYSIWYG Editor</h1>
<p>This is a <strong>rich text editor</strong> that generates HTML code instantly.</p>
<ul>
  <li>Use the formatting toolbar above</li>
  <li>Switch between visual and code editing</li>
  <li>See real-time preview of your content</li>
</ul>
<p><em>Start editing to see the magic happen!</em></p>`);

  const editorRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Update editor content when htmlContent changes from code tab
    if (editorRef.current && editorRef.current.innerHTML !== htmlContent) {
      editorRef.current.innerHTML = htmlContent;
    }
  }, [htmlContent]);

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateHtmlFromEditor();
  };

  const updateHtmlFromEditor = () => {
    if (editorRef.current) {
      setHtmlContent(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      executeCommand("insertImage", url);
    }
  };

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
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WYSIWYG Editor Output</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>`;
    
    const blob = new Blob([fullHtml], { type: 'text/html' });
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
      description: "Complete HTML file downloaded",
    });
  };

  const clearContent = () => {
    if (confirm("Are you sure you want to clear all content?")) {
      setHtmlContent("");
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
    }
  };

  const formatButtons = [
    { command: "bold", icon: Bold, title: "Bold (Ctrl+B)" },
    { command: "italic", icon: Italic, title: "Italic (Ctrl+I)" },
    { command: "underline", icon: Underline, title: "Underline (Ctrl+U)" },
    { command: "justifyLeft", icon: AlignLeft, title: "Align Left" },
    { command: "justifyCenter", icon: AlignCenter, title: "Align Center" },
    { command: "justifyRight", icon: AlignRight, title: "Align Right" },
    { command: "insertUnorderedList", icon: List, title: "Bullet List" },
    { command: "insertOrderedList", icon: ListOrdered, title: "Numbered List" },
    { command: "undo", icon: Undo, title: "Undo (Ctrl+Z)" },
    { command: "redo", icon: Redo, title: "Redo (Ctrl+Y)" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            HTML WYSIWYG Editor
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Create rich HTML content with visual editing, live preview, and instant code generation
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
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
              {/* Formatting Toolbar */}
              <div className="flex flex-wrap gap-1 p-2 border border-gray-200 rounded-md bg-gray-50">
                {formatButtons.map((button) => (
                  <Button
                    key={button.command}
                    variant="ghost"
                    size="sm"
                    onClick={() => executeCommand(button.command)}
                    title={button.title}
                    className="h-8 w-8 p-0"
                  >
                    <button.icon className="h-4 w-4" />
                  </Button>
                ))}
                
                <Separator orientation="vertical" className="h-6 mx-1" />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={insertLink}
                  title="Insert Link"
                  className="h-8 w-8 p-0"
                >
                  <Link className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={insertImage}
                  title="Insert Image"
                  className="h-8 w-8 p-0"
                >
                  <Image className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-6 mx-1" />

                <select 
                  onChange={(e) => executeCommand("formatBlock", e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                  defaultValue=""
                >
                  <option value="">Format</option>
                  <option value="h1">Heading 1</option>
                  <option value="h2">Heading 2</option>
                  <option value="h3">Heading 3</option>
                  <option value="p">Paragraph</option>
                  <option value="blockquote">Quote</option>
                </select>
              </div>

              {/* Rich Text Editor */}
              <div 
                ref={editorRef}
                contentEditable
                className="min-h-[400px] p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                onInput={updateHtmlFromEditor}
                onKeyDown={(e) => {
                  // Handle keyboard shortcuts
                  if (e.ctrlKey || e.metaKey) {
                    switch (e.key.toLowerCase()) {
                      case 'b':
                        e.preventDefault();
                        executeCommand('bold');
                        break;
                      case 'i':
                        e.preventDefault();
                        executeCommand('italic');
                        break;
                      case 'u':
                        e.preventDefault();
                        executeCommand('underline');
                        break;
                      case 'z':
                        if (e.shiftKey) {
                          e.preventDefault();
                          executeCommand('redo');
                        } else {
                          e.preventDefault();
                          executeCommand('undo');
                        }
                        break;
                      case 'y':
                        e.preventDefault();
                        executeCommand('redo');
                        break;
                    }
                  }
                }}
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  lineHeight: '1.6'
                }}
              />
              <p className="text-sm text-muted-foreground">
                Use the toolbar above for formatting, or keyboard shortcuts: Ctrl+B (bold), Ctrl+I (italic), Ctrl+U (underline), Ctrl+Z (undo), Ctrl+Y (redo)
              </p>
            </TabsContent>
            
            <TabsContent value="code" className="space-y-4">
              <Textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                className="min-h-[500px] font-mono text-sm"
                placeholder="HTML code will appear here..."
              />
              <p className="text-sm text-muted-foreground">
                Edit the HTML code directly. Changes will be reflected in the visual editor and preview.
              </p>
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-4">
              <div 
                className="min-h-[400px] p-4 border border-gray-300 rounded-md bg-white prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  lineHeight: '1.6'
                }}
              />
              <p className="text-sm text-muted-foreground">
                This is how your content will appear when rendered as HTML on a webpage.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default HtmlWysiwygEditor;
