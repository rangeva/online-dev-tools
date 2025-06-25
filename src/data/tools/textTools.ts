
import { 
  FileText, 
  CheckCircle,
  Type,
  Search,
  Plus,
  AlignLeft,
  Replace,
  Filter,
  Trash2,
  Space
} from "lucide-react";
import { Tool } from "@/types/tools";
import { toolComponents } from "../toolComponents";

export const textTools: Tool[] = [
  {
    id: "word-counter",
    name: "Word/Character Counter",
    description: "Count words, characters, and lines in your text",
    category: "text",
    icon: FileText,
    component: toolComponents.WordCounter,
    tags: ["text", "count", "words", "characters"]
  },
  {
    id: "text-diff",
    name: "Text Diff Checker",
    description: "Compare two texts and highlight differences",
    category: "text",
    icon: CheckCircle,
    component: toolComponents.TextDiff,
    tags: ["text", "diff", "compare", "differences"]
  },
  {
    id: "case-converter",
    name: "Case Converter",
    description: "Convert text between different cases (uppercase, lowercase, camelCase, etc.)",
    category: "text",
    icon: Type,
    component: toolComponents.CaseConverter,
    tags: ["text", "case", "convert", "uppercase", "lowercase"]
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Test and debug regular expressions with real-time matching",
    category: "text",
    icon: Search,
    component: toolComponents.RegexTester,
    tags: ["regex", "pattern", "test", "match"]
  },
  {
    id: "add-prefix-suffix",
    name: "Add Prefix/Suffix to Lines",
    description: "Insert a prefix and/or suffix to the content of each line",
    category: "text",
    icon: Plus,
    component: toolComponents.AddPrefixSuffix,
    tags: ["text", "prefix", "suffix", "lines", "format"]
  },
  {
    id: "line-break-manager",
    name: "Add/Remove Line Breaks",
    description: "Add new line breaks and/or remove existing line breaks within your text's formatting",
    category: "text",
    icon: AlignLeft,
    component: toolComponents.LineBreakManager,
    tags: ["text", "line", "breaks", "format", "wrap"]
  },
  {
    id: "find-replace",
    name: "Find and Replace Text",
    description: "Find and replace text matching your search criteria",
    category: "text",
    icon: Replace,
    component: toolComponents.FindReplace,
    tags: ["text", "find", "replace", "search", "substitute"]
  },
  {
    id: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    description: "Remove/delete all duplicate lines within your text/list",
    category: "text",
    icon: Filter,
    component: toolComponents.RemoveDuplicateLines,
    tags: ["text", "duplicate", "lines", "remove", "clean"]
  },
  {
    id: "remove-empty-lines",
    name: "Remove Empty Lines",
    description: "Remove/delete all empty lines within your text/list",
    category: "text",
    icon: Trash2,
    component: toolComponents.RemoveEmptyLines,
    tags: ["text", "empty", "lines", "remove", "clean"]
  },
  {
    id: "remove-extra-spaces",
    name: "Remove Extra Spaces",
    description: "Remove leading/trailing/extra/all white-spaces from your text",
    category: "text",
    icon: Space,
    component: toolComponents.RemoveExtraSpaces,
    tags: ["text", "spaces", "whitespace", "trim", "clean"]
  }
];
