
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tool } from "./usePaintingTool";

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
    { tool: 'brush' as Tool, name: 'Brush', icon: '🖌️' },
    { tool: 'eraser' as Tool, name: 'Eraser', icon: '🧹' },
    { tool: 'eyedropper' as Tool, name: 'Eyedropper', icon: '🎨' },
  ];

  return (
    <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      {/* Tool Selection */}
      <div className="flex gap-1">
        {tools.map((tool) => (
          <Button
            key={tool.tool}
            variant={currentTool === tool.tool ? "default" : "outline"}
            size="sm"
            onClick={() => onToolChange(tool.tool)}
            title={tool.name}
          >
            <span className="mr-1">{tool.icon}</span>
            {tool.name}
          </Button>
        ))}
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* History Controls */}
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
        >
          ↶ Undo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
        >
          ↷ Redo
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Canvas Controls */}
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          title="Clear Canvas"
        >
          🗑️ Clear
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          title="Export as PNG"
        >
          💾 Export
        </Button>
      </div>
    </div>
  );
};
