
import { useEffect } from "react";
import { tools } from "@/data/toolsData";
import { useMultilingualSEO } from "./useMultilingualSEO";

export const usePageMeta = (toolId?: string, activeCategory?: string) => {
  const seoData = useMultilingualSEO(toolId, activeCategory);
  const selectedTool = toolId ? tools.find(tool => tool.id === toolId) : null;

  return { selectedTool };
};
