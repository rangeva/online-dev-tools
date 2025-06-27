
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tool } from "./usePaintingTool";
import { Brush, Eraser, Pipette, Undo, Redo, Trash2, Download } from "lucide-react";

interface ToolbarPanelProps {
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onExport: () => void;
}

export const ToolbarPanel = ({
  currentTool,
  onToolChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onClear,
  onExport
}: ToolbarPanelProps) => {
  const tools = [
    { tool: 'brush' as Tool, name: 'Brush', icon: Brush },
    { tool: 'eraser' as Tool, name: 'Eraser', icon: Eraser },
    { tool: 'eyedropper' as Tool, name: 'Eyedropper', icon: Pipette },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm">
      {/* Tool Selection */}
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

      <Separator orientation="vertical" className="h-8 bg-gray-300 dark:bg-gray-600" />

      {/* History Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          <Undo className="w-4 h-4 mr-1.5" />
          Undo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          <Redo className="w-4 h-4 mr-1.5" />
          Redo
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8 bg-gray-300 dark:bg-gray-600" />

      {/* Canvas Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          title="Clear Canvas"
          className="bg-white dark:bg-gray-800 border-red-300 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
        >
          <Trash2 className="w-4 h-4 mr-1.5" />
          Clear
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          title="Export as PNG"
          className="bg-white dark:bg-gray-800 border-green-300 dark:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400"
        >
          <Download className="w-4 h-4 mr-1.5" />
          Export
        </Button>
      </div>
    </div>
  );
};
