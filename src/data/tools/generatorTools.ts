
import { 
  Zap,
  FileText,
  Database
} from "lucide-react";
import { Tool } from "@/types/tools";
import { toolComponents } from "../toolComponents";

export const generatorTools: Tool[] = [
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate UUIDs (v1, v4) and validate existing ones",
    category: "generators",
    icon: Zap,
    component: toolComponents.UuidGenerator,
    tags: ["uuid", "generate", "unique", "identifier"]
  },
  {
    id: "lorem-generator",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your designs",
    category: "generators",
    icon: FileText,
    component: toolComponents.LoremGenerator,
    tags: ["lorem", "ipsum", "placeholder", "text"]
  },
  {
    id: "fake-data-generator",
    name: "Fake Data Generator",
    description: "Generate realistic fake data for testing",
    category: "generators",
    icon: Database,
    component: toolComponents.FakeDataGenerator,
    tags: ["fake", "data", "generate", "test"]
  }
];
