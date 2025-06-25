
import { 
  Globe,
  Code,
  Key
} from "lucide-react";
import { Tool } from "@/types/tools";
import { toolComponents } from "../toolComponents";

export const encodingTools: Tool[] = [
  {
    id: "url-encoder",
    name: "URL Encoder/Decoder",
    description: "Encode and decode URLs and query parameters",
    category: "encoding",
    icon: Globe,
    component: toolComponents.UrlEncoder,
    tags: ["url", "encode", "decode", "query"]
  },
  {
    id: "base64-encoder",
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings",
    category: "encoding",
    icon: Code,
    component: toolComponents.Base64Encoder,
    tags: ["base64", "encode", "decode"]
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode and inspect JSON Web Tokens",
    category: "encoding",
    icon: Key,
    component: toolComponents.JwtDecoder,
    tags: ["jwt", "token", "decode", "json"]
  }
];
