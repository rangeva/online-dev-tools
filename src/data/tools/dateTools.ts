
import { 
  Clock,
  Settings
} from "lucide-react";
import { Tool } from "@/types/tools";
import { toolComponents } from "../toolComponents";

export const dateTools: Tool[] = [
  {
    id: "epoch-converter",
    name: "Epoch Converter",
    description: "Convert between Unix timestamps and human-readable dates",
    category: "date",
    icon: Clock,
    component: toolComponents.EpochConverter,
    tags: ["epoch", "timestamp", "date", "unix"]
  },
  {
    id: "cron-editor",
    name: "Cron Expression Editor",
    description: "Create and validate cron expressions with visual editor",
    category: "date",
    icon: Settings,
    component: toolComponents.CronEditor,
    tags: ["cron", "schedule", "expression", "job"]
  }
];
