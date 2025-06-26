
import { useState, useEffect } from "react";
import { toolCategories } from "@/data/toolsData";

const ACCORDION_STATE_COOKIE = "sidebar-accordion-state";

export function useSidebarAccordion() {
  const [accordionValue, setAccordionValue] = useState<string[]>([]);

  // Initialize accordion state
  useEffect(() => {
    // Try to load saved state from cookie
    const savedState = document.cookie
      .split('; ')
      .find(row => row.startsWith(ACCORDION_STATE_COOKIE + '='));
    
    if (savedState) {
      try {
        const state = JSON.parse(decodeURIComponent(savedState.split('=')[1]));
        setAccordionValue(state);
      } catch (error) {
        // If parsing fails, default to all categories open
        setAccordionValue(toolCategories.map(cat => cat.id));
      }
    } else {
      // Default to all categories open
      setAccordionValue(toolCategories.map(cat => cat.id));
    }
  }, []);

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
