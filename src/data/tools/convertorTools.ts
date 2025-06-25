
import { 
  Clock,
  Hash,
  Crown,
  Code,
  Palette,
  Radio
} from "lucide-react";
import { Tool } from "@/types/tools";
import { toolComponents } from "../toolComponents";

export const convertorTools: Tool[] = [
  {
    id: "date-time-converter",
    name: "Date-time Converter",
    description: "Convert date and time into various different formats",
    category: "convertors",
    icon: Clock,
    component: toolComponents.DateTimeConverter,
    tags: ["date", "time", "convert", "format", "timestamp"]
  },
  {
    id: "integer-base-converter",
    name: "Integer Base Converter",
    description: "Convert a number between different bases (decimal, hexadecimal, binary, octal, base64, ...)",
    category: "convertors",
    icon: Hash,
    component: toolComponents.IntegerBaseConverter,
    tags: ["number", "base", "convert", "binary", "hex", "decimal", "octal"]
  },
  {
    id: "roman-numeral-converter",
    name: "Roman Numeral Converter",
    description: "Convert Roman numerals to numbers and convert numbers to Roman numerals",
    category: "convertors",
    icon: Crown,
    component: toolComponents.RomanNumeralConverter,
    tags: ["roman", "numeral", "convert", "number", "ancient"]
  },
  {
    id: "base64-string-encoder",
    name: "Base64 String Encoder/Decoder",
    description: "Simply encode and decode strings into their base64 representation",
    category: "convertors",
    icon: Code,
    component: toolComponents.Base64StringEncoder,
    tags: ["base64", "string", "encode", "decode", "text"]
  },
  {
    id: "color-converter",
    name: "Color Converter",
    description: "Convert color between different formats (hex, rgb, hsl and css name)",
    category: "convertors",
    icon: Palette,
    component: toolComponents.ColorConverter,
    tags: ["color", "hex", "rgb", "hsl", "css", "convert"]
  },
  {
    id: "text-to-nato-alphabet",
    name: "Text to NATO Alphabet",
    description: "Transform text into the NATO phonetic alphabet for oral transmission",
    category: "convertors",
    icon: Radio,
    component: toolComponents.TextToNatoAlphabet,
    tags: ["nato", "phonetic", "alphabet", "radio", "communication"]
  }
];
