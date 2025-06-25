
import { 
  Minimize2,
  Sparkles,
  FileText,
  Code2,
  Eye,
  AlignLeft,
  Shield
} from "lucide-react";
import { Tool } from "@/types/tools";
import { toolComponents } from "../toolComponents";

export const htmlTools: Tool[] = [
  {
    id: "html-minifier",
    name: "HTML Minifier",
    description: "Minify HTML code to reduce file size and optimize performance",
    category: "html",
    icon: Minimize2,
    component: toolComponents.HtmlMinifier,
    tags: ["html", "minify", "compress", "optimize"]
  },
  {
    id: "html-beautifier",
    name: "HTML Beautifier",
    description: "Format and beautify HTML code for better readability",
    category: "html",
    icon: Sparkles,
    component: toolComponents.HtmlBeautifier,
    tags: ["html", "format", "beautify", "prettify"]
  },
  {
    id: "html-to-markdown",
    name: "HTML to Markdown",
    description: "Convert HTML into clean Markdown syntax for documentation",
    category: "html",
    icon: FileText,
    component: toolComponents.HtmlToMarkdown,
    tags: ["html", "markdown", "convert", "documentation"]
  },
  {
    id: "html-to-jsx",
    name: "HTML to JSX",
    description: "Convert HTML to JSX for React development",
    category: "html",
    icon: Code2,
    component: toolComponents.HtmlToJsx,
    tags: ["html", "jsx", "react", "convert"]
  },
  {
    id: "html-previewer",
    name: "HTML Previewer",
    description: "Render and preview HTML code in real-time",
    category: "html",
    icon: Eye,
    component: toolComponents.HtmlPreviewer,
    tags: ["html", "preview", "render", "visual"]
  },
  {
    id: "html-to-plain-text",
    name: "HTML to Plain Text",
    description: "Extract plain text from HTML, removing all tags and formatting",
    category: "html",
    icon: AlignLeft,
    component: toolComponents.HtmlToPlainText,
    tags: ["html", "text", "extract", "clean"]
  },
  {
    id: "html-entity-coder",
    name: "HTML Entity Encoder/Decoder",
    description: "Encode and decode HTML entities for safe rendering",
    category: "html",
    icon: Shield,
    component: toolComponents.HtmlEntityCoder,
    tags: ["html", "entities", "encode", "decode", "xss"]
  }
];
