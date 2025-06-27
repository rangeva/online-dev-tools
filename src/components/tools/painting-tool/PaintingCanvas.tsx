
import { forwardRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { BrushSettings, CanvasSize, Position, Tool, SelectionArea } from "./usePaintingTool";
import { ShapePreview } from "./ShapePreview";
import { CanvasRenderer } from "./CanvasRenderer";
import { useCanvasEventHandlers } from "./CanvasEventHandlers";

interface PaintingCanvasProps {
  canvasSize: CanvasSize;
  currentTool: Tool;
  brushSettings: BrushSettings;
  currentColor: string;
  isDrawing: boolean;
  setIsDrawing: (drawing: boolean) => void;
  lastPosition: Position | null;
  setLastPosition: (position: Position | null) => void;
  saveCanvasState: () => void;
  onColorPicked: (color: string) => void;
  onColorPreview?: (color: string | null) => void;
  selectionArea?: SelectionArea | null;
  setSelectionArea?: (area: SelectionArea | null) => void;
  onTextClick?: (position: Position) => void;
  onPasteAt?: (position: Position) => void;
  copiedImageData?: ImageData | null;
}

export const PaintingCanvas = forwardRef<HTMLCanvasElement, PaintingCanvasProps>(
  ({ 
    canvasSize, 
    currentTool, 
    brushSettings, 
    currentColor, 
    isDrawing, 
    setIsDrawing, 
    lastPosition, 
    setLastPosition, 
    saveCanvasState, 
    onColorPicked, 
    onColorPreview,
    selectionArea,
    setSelectionArea,
    onTextClick,
    onPasteAt,
    copiedImageData
  }, ref) => {
    
    const [shapeStartPosition, setShapeStartPosition] = useState<Position | null>(null);

    const { previewCanvasRef, drawShapePreview, clearShapePreview } = ShapePreview({
      canvasSize,
      currentColor,
      brushSize: brushSettings.size
    });

    const { handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave } = useCanvasEventHandlers({
      canvasRef: ref,
      currentTool,
      brushSettings,
      currentColor,
      isDrawing,
      setIsDrawing,
      lastPosition,
      setLastPosition,
      saveCanvasState,
      onColorPicked,
      onColorPreview,
      shapeStartPosition,
      setShapeStartPosition,
      drawShapePreview,
      clearShapePreview,
      selectionArea,
      setSelectionArea,
      onTextClick,
      onPasteAt,
      copiedImageData
    });

    const isShapeTool = (tool: Tool) => {
      return ['rectangle', 'circle', 'line', 'polygon'].includes(tool);
    };

    const getToolInstructions = () => {
      switch (currentTool) {
        case 'eyedropper':
          return 'Hover over the canvas to preview colors, click to select';
        case 'select':
          return 'Click and drag to make a selection';
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

    return (
      <Card className="p-4">
        <CanvasRenderer
          ref={ref}
          canvasSize={canvasSize}
          currentTool={currentTool}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          previewCanvasRef={previewCanvasRef}
        />
        
        {/* Selection overlay */}
        {selectionArea && (
          <div
            className="absolute border-2 border-dashed border-blue-500 bg-blue-200 bg-opacity-20 pointer-events-none"
            style={{
              left: selectionArea.startX,
              top: selectionArea.startY,
              width: selectionArea.width,
              height: selectionArea.height,
            }}
          />
        )}

        {getToolInstructions() && (
          <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {getToolInstructions()}
          </div>
        )}

        {currentTool === 'select' && selectionArea && (
          <div className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
            Selection: {selectionArea.width} × {selectionArea.height} px
          </div>
        )}
      </Card>
    );
  }
);

PaintingCanvas.displayName = 'PaintingCanvas';
