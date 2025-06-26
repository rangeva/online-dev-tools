
import { 
  Zap,
  FileText,
  Database,
  Phone,
  Mail,
  Calendar
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
  },
  {
    id: "random-phone-generator",
    name: "Random Phone Number Generator",
    description: "Generate random phone numbers by country with proper formatting",
    category: "generators",
    icon: Phone,
    component: toolComponents.RandomPhoneGenerator,
    tags: ["phone", "number", "random", "country", "generate"]
  },
  {
    id: "random-email-generator",
    name: "Random Email Generator",
    description: "Generate random email addresses with customizable options",
    category: "generators",
    icon: Mail,
    component: toolComponents.RandomEmailGenerator,
    tags: ["email", "random", "generate", "address", "fake"]
  },
  {
    id: "iso-generator",
    name: "ISO 8601 Generator",
    description: "Generate and validate ISO 8601 date strings",
    category: "generators",
    icon: Calendar,
    component: toolComponents.IsoGenerator,
    tags: ["iso", "date", "format", "8601", "generate"]
  }
];
