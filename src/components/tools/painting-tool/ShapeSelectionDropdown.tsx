
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tool } from "./usePaintingTool";
import { ChevronDown } from "lucide-react";

interface ShapeSelectionDropdownProps {
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
}

export const ShapeSelectionDropdown = ({ 
  currentTool, 
  onToolChange
}: ShapeSelectionDropdownProps) => {
  const shapes = [
    { tool: 'rectangle' as Tool, name: 'Rectangle', icon: '⬜' },
    { tool: 'circle' as Tool, name: 'Circle', icon: '⭕' },
    { tool: 'line' as Tool, name: 'Line', icon: '📏' },
    { tool: 'polygon' as Tool, name: 'Polygon', icon: '🔷' },
  ];

  const isShapeToolActive = shapes.some(shape => shape.tool === currentTool);
  const currentShape = shapes.find(shape => shape.tool === currentTool);

  const handleShapeSelect = (shape: Tool) => {
    onToolChange(shape);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isShapeToolActive ? "default" : "ghost"}
          size="sm"
          className={`
            relative transition-all duration-200 
            ${isShapeToolActive 
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }
          `}
        >
          <span className="mr-1.5">
            {currentShape ? currentShape.icon : '🔷'}
          </span>
          <span className="font-medium">
            {currentShape ? currentShape.name : 'Shapes'}
          </span>
          <ChevronDown className="w-3 h-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg z-50">
        {shapes.map((shape) => (
          <DropdownMenuItem
            key={shape.tool}
            onClick={() => handleShapeSelect(shape.tool)}
            className={`cursor-pointer flex items-center gap-2 ${
              currentTool === shape.tool ? 'bg-blue-50 dark:bg-blue-900/20' : ''
            }`}
          >
            <span>{shape.icon}</span>
            <span>{shape.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
