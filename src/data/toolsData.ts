
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
  Zap
} from "lucide-react";

// Tool components - using default imports
import WordCounter from "@/components/tools/WordCounter";
import TextDiff from "@/components/tools/TextDiff";
import CaseConverter from "@/components/tools/CaseConverter";
import RegexTester from "@/components/tools/RegexTester";
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

export const toolCategories = [
  { id: "all", name: "All Tools", icon: Settings },
  { id: "text", name: "Text Tools", icon: Type },
  { id: "encoding", name: "Encoding/Decoding", icon: Code },
  { id: "date", name: "Date & Time", icon: Clock },
  { id: "data", name: "Data & Format", icon: Database },
  { id: "security", name: "Security", icon: Shield },
  { id: "generators", name: "Generators", icon: Zap }
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
    id: "html-minifier",
    name: "HTML Minifier",
    description: "Minify HTML code to reduce file size and optimize performance",
    category: "data",
    icon: Minimize2,
    component: HtmlMinifier,
    tags: ["html", "minify", "compress", "optimize"]
  },
  {
    id: "html-beautifier",
    name: "HTML Beautifier",
    description: "Format and beautify HTML code for better readability",
    category: "data",
    icon: Sparkles,
    component: HtmlBeautifier,
    tags: ["html", "format", "beautify", "prettify"]
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
  }
];
