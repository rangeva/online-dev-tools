
import { forwardRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { BrushSettings, CanvasSize, Position, Tool } from "./usePaintingTool";
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
}

export const PaintingCanvas = forwardRef<HTMLCanvasElement, PaintingCanvasProps>(
  ({ canvasSize, currentTool, brushSettings, currentColor, isDrawing, setIsDrawing, lastPosition, setLastPosition, saveCanvasState, onColorPicked, onColorPreview }, ref) => {
    
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
      clearShapePreview
    });

    const isShapeTool = (tool: Tool) => {
      return ['rectangle', 'circle', 'line', 'polygon'].includes(tool);
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
        {currentTool === 'eyedropper' && (
          <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Hover over the canvas to preview colors, click to select
          </div>
        )}
        {isShapeTool(currentTool) && (
          <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Click and drag to draw a {currentTool}
          </div>
        )}
      </Card>
    );
  }
);

PaintingCanvas.displayName = 'PaintingCanvas';
