
import { Layers } from "lucide-react";
import { Tool } from "@/types/tools";
import { toolComponents } from "@/data/toolComponents";

export const aiTools: Tool[] = [
  {
    id: "tokenizer",
    name: "Tokenizer",
    description: "Analyze how text is tokenized by different language models and count tokens",
    category: "ai",
    icon: Layers,
    component: toolComponents.Tokenizer,
    tags: ["tokenizer", "ai", "language-model", "token-count", "gpt", "analysis"]
  }
];
