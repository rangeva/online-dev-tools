
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toolCategories, tools } from "@/data/toolsData";

const ACCORDION_STATE_COOKIE = "sidebar-accordion-state";

export function useSidebarAccordion() {
  const [accordionValue, setAccordionValue] = useState<string[]>([]);
  const location = useLocation();

  // Initialize accordion state and auto-expand category for current tool
  useEffect(() => {
    // Try to load saved state from cookie
    const savedState = document.cookie
      .split('; ')
      .find(row => row.startsWith(ACCORDION_STATE_COOKIE + '='));
    
    let initialState: string[] = [];
    if (savedState) {
      try {
        initialState = JSON.parse(decodeURIComponent(savedState.split('=')[1]));
      } catch (error) {
        // If parsing fails, default to all categories closed
        initialState = [];
      }
    }

    // Auto-expand category if we're on a tool page
    const toolMatch = location.pathname.match(/\/tool\/([^/]+)/);
    if (toolMatch) {
      const toolId = toolMatch[1];
      const tool = tools.find(t => t.id === toolId);
      if (tool && !initialState.includes(tool.category)) {
        initialState = [...initialState, tool.category];
      }
    }

    setAccordionValue(initialState);
  }, [location.pathname]);

  // Save accordion state to cookie whenever it changes
  const handleAccordionChange = (value: string[]) => {
    setAccordionValue(value);
    // Save to cookie with 30 days expiration
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    document.cookie = `${ACCORDION_STATE_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; expires=${expirationDate.toUTCString()}; path=/`;
  };

  return {
    accordionValue,
    handleAccordionChange
  };
}
