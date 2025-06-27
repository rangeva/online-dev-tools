
import { Tool, SelectionArea } from "./usePaintingTool";

interface ToolInstructionsProps {
  currentTool: Tool;
  selectionArea?: SelectionArea | null;
  isDrawing: boolean;
  pastedImagePosition?: { x: number; y: number } | null;
}

export const ToolInstructions = ({ 
  currentTool, 
  selectionArea, 
  isDrawing, 
  pastedImagePosition 
}: ToolInstructionsProps) => {
  const isShapeTool = (tool: Tool) => {
    return ['rectangle', 'circle', 'line', 'polygon'].includes(tool);
  };

  const getToolInstructions = () => {
    switch (currentTool) {
      case 'eyedropper':
        return 'Hover over the canvas to preview colors, click to select';
      case 'select':
        return 'Click and drag to make a selection. Selected area can be copied or cut.';
      case 'text':
        return 'Click where you want to add text';
      case 'crop':
        return 'Make a selection first, then use the crop tool in the Advanced panel';
      case 'resize':
        return 'Use the resize controls in the Advanced panel';
      default:
        if (isShapeTool(currentTool)) {
          return `Click and drag to draw a ${currentTool}`;
        }
        return '';
    }
  };

  const instructions = getToolInstructions();

  return (
    <div className="space-y-2">
      {instructions && (
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          {instructions}
        </div>
      )}

      {currentTool === 'select' && selectionArea && !isDrawing && (
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          Selection: {Math.round(selectionArea.width)} × {Math.round(selectionArea.height)} px - Use Copy/Cut buttons in toolbar
        </div>
      )}

      {pastedImagePosition && (
        <div className="text-center text-xs text-green-600 dark:text-green-400">
          Pasted content can be moved by clicking and dragging
        </div>
      )}
    </div>
  );
};
