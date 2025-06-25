
import { 
  Database,
  FileText,
  Shuffle
} from "lucide-react";
import { Tool } from "@/types/tools";
import { toolComponents } from "../toolComponents";

export const dataTools: Tool[] = [
  {
    id: "json-formatter",
    name: "JSON Formatter & Validator",
    description: "Format, validate, and minify JSON data",
    category: "data",
    icon: Database,
    component: toolComponents.JsonFormatter,
    tags: ["json", "format", "validate", "minify"]
  },
  {
    id: "xml-formatter",
    name: "XML Formatter",
    description: "Format and prettify XML documents",
    category: "data",
    icon: FileText,
    component: toolComponents.XmlFormatter,
    tags: ["xml", "format", "prettify"]
  },
  {
    id: "yaml-converter",
    name: "YAML Converter",
    description: "Convert between YAML and JSON formats",
    category: "data",
    icon: Shuffle,
    component: toolComponents.YamlConverter,
    tags: ["yaml", "json", "convert", "format"]
  }
];
