
import { Button } from "@/components/ui/button";
import { Tool } from "./usePaintingTool";
import { Eraser, Pipette, Square, Type, Crop } from "lucide-react";

interface NonBrushToolsProps {
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
}

export const NonBrushTools = ({ currentTool, onToolChange }: NonBrushToolsProps) => {
  const tools = [
    { tool: 'eraser' as Tool, name: 'Eraser', icon: Eraser },
    { tool: 'eyedropper' as Tool, name: 'Eyedropper', icon: Pipette },
    { tool: 'select' as Tool, name: 'Select', icon: Square },
    { tool: 'text' as Tool, name: 'Text', icon: Type },
    { tool: 'crop' as Tool, name: 'Crop', icon: Crop },
  ];

  return (
    <>
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
    </>
  );
};
