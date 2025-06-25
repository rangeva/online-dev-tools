
import { LucideIcon } from "lucide-react";
import { ComponentType } from "react";

export interface ToolCategory {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: LucideIcon;
  component: ComponentType;
  tags: string[];
}
