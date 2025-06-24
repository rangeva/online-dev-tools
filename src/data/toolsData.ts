import { 
  FileText, 
  CheckCircle,
  Type,
  Search,
  Globe,
  Code,
  Key,
  Clock,
  Calendar,
  Settings,
  Database,
  Shuffle,
  Minimize2,
  Sparkles,
  Hash,
  Shield,
  Zap,
  Eye,
  AlignLeft,
  Code2,
  Palette,
  Plus,
  Minus,
  Replace,
  Filter,
  Trash2,
  Space,
  QrCode
} from "lucide-react";

// Tool components - using default imports
import WordCounter from "@/components/tools/WordCounter";
import TextDiff from "@/components/tools/TextDiff";
import CaseConverter from "@/components/tools/CaseConverter";
import RegexTester from "@/components/tools/RegexTester";
import AddPrefixSuffix from "@/components/tools/AddPrefixSuffix";
import LineBreakManager from "@/components/tools/LineBreakManager";
import FindReplace from "@/components/tools/FindReplace";
import RemoveDuplicateLines from "@/components/tools/RemoveDuplicateLines";
import RemoveEmptyLines from "@/components/tools/RemoveEmptyLines";
import RemoveExtraSpaces from "@/components/tools/RemoveExtraSpaces";
import UrlEncoder from "@/components/tools/UrlEncoder";
import Base64Encoder from "@/components/tools/Base64Encoder";
import JwtDecoder from "@/components/tools/JwtDecoder";
import EpochConverter from "@/components/tools/EpochConverter";
import IsoGenerator from "@/components/tools/IsoGenerator";
import CronEditor from "@/components/tools/CronEditor";
import JsonFormatter from "@/components/tools/JsonFormatter";
import XmlFormatter from "@/components/tools/XmlFormatter";
import HashGenerator from "@/components/tools/HashGenerator";
import HtpasswdGenerator from "@/components/tools/HtpasswdGenerator";
import UuidGenerator from "@/components/tools/UuidGenerator";
import LoremGenerator from "@/components/tools/LoremGenerator";
import FakeDataGenerator from "@/components/tools/FakeDataGenerator";
import YamlConverter from "@/components/tools/YamlConverter";
import HtmlMinifier from "@/components/tools/HtmlMinifier";
import HtmlBeautifier from "@/components/tools/HtmlBeautifier";
import HtmlToMarkdown from "@/components/tools/HtmlToMarkdown";
import HtmlToJsx from "@/components/tools/HtmlToJsx";
import HtmlPreviewer from "@/components/tools/HtmlPreviewer";
import HtmlToPlainText from "@/components/tools/HtmlToPlainText";
import HtmlEntityCoder from "@/components/tools/HtmlEntityCoder";
import ColorPaletteGenerator from "@/components/tools/ColorPaletteGenerator";
import HtmlColorCodes from "@/components/tools/HtmlColorCodes";
import QrCodeGenerator from "@/components/tools/QrCodeGenerator";

export const toolCategories = [
  { id: "all", name: "All Tools", icon: Settings },
  { id: "text", name: "Text Tools", icon: Type },
  { id: "html", name: "HTML Tools", icon: Code2 },
  { id: "encoding", name: "Encoding/Decoding", icon: Code },
  { id: "date", name: "Date & Time", icon: Clock },
  { id: "data", name: "Data & Format", icon: Database },
  { id: "security", name: "Security", icon: Shield },
  { id: "generators", name: "Generators", icon: Zap },
  { id: "image-video", name: "Image & Video", icon: Eye }
];

export const tools = [
  {
    id: "word-counter",
    name: "Word/Character Counter",
    description: "Count words, characters, and lines in your text",
    category: "text",
    icon: FileText,
    component: WordCounter,
    tags: ["text", "count", "words", "characters"]
  },
  {
    id: "text-diff",
    name: "Text Diff Checker",
    description: "Compare two texts and highlight differences",
    category: "text",
    icon: CheckCircle,
    component: TextDiff,
    tags: ["text", "diff", "compare", "differences"]
  },
  {
    id: "case-converter",
    name: "Case Converter",
    description: "Convert text between different cases (uppercase, lowercase, camelCase, etc.)",
    category: "text",
    icon: Type,
    component: CaseConverter,
    tags: ["text", "case", "convert", "uppercase", "lowercase"]
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Test and debug regular expressions with real-time matching",
    category: "text",
    icon: Search,
    component: RegexTester,
    tags: ["regex", "pattern", "test", "match"]
  },
  {
    id: "add-prefix-suffix",
    name: "Add Prefix/Suffix to Lines",
    description: "Insert a prefix and/or suffix to the content of each line",
    category: "text",
    icon: Plus,
    component: AddPrefixSuffix,
    tags: ["text", "prefix", "suffix", "lines", "format"]
  },
  {
    id: "line-break-manager",
    name: "Add/Remove Line Breaks",
    description: "Add new line breaks and/or remove existing line breaks within your text's formatting",
    category: "text",
    icon: AlignLeft,
    component: LineBreakManager,
    tags: ["text", "line", "breaks", "format", "wrap"]
  },
  {
    id: "find-replace",
    name: "Find and Replace Text",
    description: "Find and replace text matching your search criteria",
    category: "text",
    icon: Replace,
    component: FindReplace,
    tags: ["text", "find", "replace", "search", "substitute"]
  },
  {
    id: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    description: "Remove/delete all duplicate lines within your text/list",
    category: "text",
    icon: Filter,
    component: RemoveDuplicateLines,
    tags: ["text", "duplicate", "lines", "remove", "clean"]
  },
  {
    id: "remove-empty-lines",
    name: "Remove Empty Lines",
    description: "Remove/delete all empty lines within your text/list",
    category: "text",
    icon: Trash2,
    component: RemoveEmptyLines,
    tags: ["text", "empty", "lines", "remove", "clean"]
  },
  {
    id: "remove-extra-spaces",
    name: "Remove Extra Spaces",
    description: "Remove leading/trailing/extra/all white-spaces from your text",
    category: "text",
    icon: Space,
    component: RemoveExtraSpaces,
    tags: ["text", "spaces", "whitespace", "trim", "clean"]
  },
  {
    id: "html-minifier",
    name: "HTML Minifier",
    description: "Minify HTML code to reduce file size and optimize performance",
    category: "html",
    icon: Minimize2,
    component: HtmlMinifier,
    tags: ["html", "minify", "compress", "optimize"]
  },
  {
    id: "html-beautifier",
    name: "HTML Beautifier",
    description: "Format and beautify HTML code for better readability",
    category: "html",
    icon: Sparkles,
    component: HtmlBeautifier,
    tags: ["html", "format", "beautify", "prettify"]
  },
  {
    id: "html-to-markdown",
    name: "HTML to Markdown",
    description: "Convert HTML into clean Markdown syntax for documentation",
    category: "html",
    icon: FileText,
    component: HtmlToMarkdown,
    tags: ["html", "markdown", "convert", "documentation"]
  },
  {
    id: "html-to-jsx",
    name: "HTML to JSX",
    description: "Convert HTML to JSX for React development",
    category: "html",
    icon: Code2,
    component: HtmlToJsx,
    tags: ["html", "jsx", "react", "convert"]
  },
  {
    id: "html-previewer",
    name: "HTML Previewer",
    description: "Render and preview HTML code in real-time",
    category: "html",
    icon: Eye,
    component: HtmlPreviewer,
    tags: ["html", "preview", "render", "visual"]
  },
  {
    id: "html-to-plain-text",
    name: "HTML to Plain Text",
    description: "Extract plain text from HTML, removing all tags and formatting",
    category: "html",
    icon: AlignLeft,
    component: HtmlToPlainText,
    tags: ["html", "text", "extract", "clean"]
  },
  {
    id: "html-entity-coder",
    name: "HTML Entity Encoder/Decoder",
    description: "Encode and decode HTML entities for safe rendering",
    category: "html",
    icon: Shield,
    component: HtmlEntityCoder,
    tags: ["html", "entities", "encode", "decode", "xss"]
  },
  {
    id: "url-encoder",
    name: "URL Encoder/Decoder",
    description: "Encode and decode URLs and query parameters",
    category: "encoding",
    icon: Globe,
    component: UrlEncoder,
    tags: ["url", "encode", "decode", "query"]
  },
  {
    id: "base64-encoder",
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings",
    category: "encoding",
    icon: Code,
    component: Base64Encoder,
    tags: ["base64", "encode", "decode"]
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode and inspect JSON Web Tokens",
    category: "encoding",
    icon: Key,
    component: JwtDecoder,
    tags: ["jwt", "token", "decode", "json"]
  },
  {
    id: "epoch-converter",
    name: "Epoch Converter",
    description: "Convert between Unix timestamps and human-readable dates",
    category: "date",
    icon: Clock,
    component: EpochConverter,
    tags: ["epoch", "timestamp", "date", "unix"]
  },
  {
    id: "iso-generator",
    name: "ISO 8601 Generator",
    description: "Generate and validate ISO 8601 date strings",
    category: "date",
    icon: Calendar,
    component: IsoGenerator,
    tags: ["iso", "date", "format", "8601"]
  },
  {
    id: "cron-editor",
    name: "Cron Expression Editor",
    description: "Create and validate cron expressions with visual editor",
    category: "date",
    icon: Settings,
    component: CronEditor,
    tags: ["cron", "schedule", "expression", "job"]
  },
  {
    id: "json-formatter",
    name: "JSON Formatter & Validator",
    description: "Format, validate, and minify JSON data",
    category: "data",
    icon: Database,
    component: JsonFormatter,
    tags: ["json", "format", "validate", "minify"]
  },
  {
    id: "xml-formatter",
    name: "XML Formatter",
    description: "Format and prettify XML documents",
    category: "data",
    icon: FileText,
    component: XmlFormatter,
    tags: ["xml", "format", "prettify"]
  },
  {
    id: "yaml-converter",
    name: "YAML Converter",
    description: "Convert between YAML and JSON formats",
    category: "data",
    icon: Shuffle,
    component: YamlConverter,
    tags: ["yaml", "json", "convert", "format"]
  },
  {
    id: "hash-generator",
    name: "Hash Generator",
    description: "Generate MD5, SHA1, SHA256 and other hashes",
    category: "security",
    icon: Hash,
    component: HashGenerator,
    tags: ["hash", "md5", "sha", "security"]
  },
  {
    id: "htpasswd-generator",
    name: "Htpasswd Generator",
    description: "Generate htpasswd entries for HTTP authentication",
    category: "security",
    icon: Shield,
    component: HtpasswdGenerator,
    tags: ["htpasswd", "auth", "password", "apache"]
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate UUIDs (v1, v4) and validate existing ones",
    category: "generators",
    icon: Zap,
    component: UuidGenerator,
    tags: ["uuid", "generate", "unique", "identifier"]
  },
  {
    id: "lorem-generator",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your designs",
    category: "generators",
    icon: FileText,
    component: LoremGenerator,
    tags: ["lorem", "ipsum", "placeholder", "text"]
  },
  {
    id: "fake-data-generator",
    name: "Fake Data Generator",
    description: "Generate realistic fake data for testing",
    category: "generators",
    icon: Database,
    component: FakeDataGenerator,
    tags: ["fake", "data", "generate", "test"]
  },
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate and download a QR code for a URL (or just plain text), and customize the background and foreground colors.",
    category: "image-video",
    icon: QrCode,
    component: QrCodeGenerator,
    tags: ["qr", "code", "generator", "url", "text", "download", "colors"]
  },
  {
    id: "color-palette-generator",
    name: "Color Palette Generator",
    description: "Generate harmonious color palettes using color theory",
    category: "image-video",
    icon: Palette,
    component: ColorPaletteGenerator,
    tags: ["color", "palette", "harmony", "design"]
  },
  {
    id: "html-color-codes",
    name: "HTML Color Codes",
    description: "Pick colors, convert formats (HEX, RGB, HSL), and get color codes",
    category: "image-video",
    icon: Palette,
    component: HtmlColorCodes,
    tags: ["color", "hex", "rgb", "hsl", "picker"]
  }
];
