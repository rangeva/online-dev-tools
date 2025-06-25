
import { 
  Settings,
  Type,
  Code2,
  Code,
  Clock,
  Database,
  Shield,
  Zap,
  Eye,
  RefreshCw
} from "lucide-react";
import { ToolCategory } from "@/types/tools";

export const toolCategories: ToolCategory[] = [
  { id: "all", name: "All Tools", icon: Settings },
  { id: "text", name: "Text Tools", icon: Type },
  { id: "html", name: "HTML Tools", icon: Code2 },
  { id: "encoding", name: "Encoding/Decoding", icon: Code },
  { id: "convertors", name: "Convertors", icon: RefreshCw },
  { id: "date", name: "Date & Time", icon: Clock },
  { id: "data", name: "Data & Format", icon: Database },
  { id: "security", name: "Security", icon: Shield },
  { id: "generators", name: "Generators", icon: Zap },
  { id: "graphics", name: "Graphics (Image & Video)", icon: Eye }
];
