
import { Button } from "@/components/ui/button";
import { Tool } from "./usePaintingTool";
import { Brush, Eraser, Pipette, Square, Type, Crop } from "lucide-react";

interface ToolSelectionProps {
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
}

export const ToolSelection = ({ currentTool, onToolChange }: ToolSelectionProps) => {
  const tools = [
    { tool: 'brush' as Tool, name: 'Brush', icon: Brush },
    { tool: 'eraser' as Tool, name: 'Eraser', icon: Eraser },
    { tool: 'eyedropper' as Tool, name: 'Eyedropper', icon: Pipette },
    { tool: 'select' as Tool, name: 'Select', icon: Square },
    { tool: 'text' as Tool, name: 'Text', icon: Type },
    { tool: 'crop' as Tool, name: 'Crop', icon: Crop },
  ];

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-inner border border-gray-200 dark:border-gray-600">
      {tools.map((tool) => (
        <Button
          key={tool.tool}
          variant={currentTool === tool.tool ? "default" : "ghost"}
          size="sm"
          onClick={() => onToolChange(tool.tool)}
          title={tool.name}
          className={`
            relative transition-all duration-200 
            ${currentTool === tool.tool 
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }
          `}
        >
          <tool.icon className="w-4 h-4 mr-1.5" />
          <span className="font-medium">{tool.name}</span>
        </Button>
      ))}
    </div>
  );
};
