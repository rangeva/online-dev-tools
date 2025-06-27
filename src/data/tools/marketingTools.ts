
import { TrendingUp } from "lucide-react";
import { Tool } from "@/types/tools";
import { toolComponents } from "@/data/toolComponents";

export const marketingTools: Tool[] = [
  {
    id: "website-rank-tracker",
    name: "Website Rank Tracker",
    description: "Track website ranking over time using Tranco data with interactive charts",
    category: "marketing",
    icon: TrendingUp,
    component: toolComponents.WebsiteRankTracker,
    tags: ["website", "ranking", "tranco", "seo", "analytics", "tracking", "chart"]
  }
];
