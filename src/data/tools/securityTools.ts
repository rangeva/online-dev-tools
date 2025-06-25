
import { 
  Hash,
  Shield,
  Key
} from "lucide-react";
import { Tool } from "@/types/tools";
import { toolComponents } from "../toolComponents";

export const securityTools: Tool[] = [
  {
    id: "hash-generator",
    name: "Hash Generator",
    description: "Generate MD5, SHA1, SHA256 and other hashes",
    category: "security",
    icon: Hash,
    component: toolComponents.HashGenerator,
    tags: ["hash", "md5", "sha", "security"]
  },
  {
    id: "htpasswd-generator",
    name: "Htpasswd Generator",
    description: "Generate htpasswd entries for HTTP authentication",
    category: "security",
    icon: Shield,
    component: toolComponents.HtpasswdGenerator,
    tags: ["htpasswd", "auth", "password", "apache"]
  },
  {
    id: "strong-password-generator",
    name: "Strong Password Generator",
    description: "Generate secure passwords with customizable options and QR code export",
    category: "security",
    icon: Key,
    component: toolComponents.StrongPasswordGenerator,
    tags: ["password", "generator", "security", "qr", "strong", "secure"]
  }
];
