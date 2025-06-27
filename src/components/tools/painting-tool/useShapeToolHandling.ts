
import { useCallback } from "react";
import { Position, Tool } from "./usePaintingTool";
import { useCanvasDrawingLogic } from "./CanvasDrawingLogic";

interface UseShapeToolHandlingProps {
  currentTool: Tool;
  brushSettings: any;
  currentColor: string;
  setShapeStartPosition: (position: Position | null) => void;
  drawShapePreview: (start: Position, end: Position, shape: Tool) => void;
  clearShapePreview: () => void;
}

export const useShapeToolHandling = ({ 
  currentTool,
  brushSettings,
  currentColor,
  setShapeStartPosition,
  drawShapePreview,
  clearShapePreview
}: UseShapeToolHandlingProps) => {
  const { drawShape, isShapeTool } = useCanvasDrawingLogic({
    currentTool,
    brushSettings,
    currentColor
  });

  const handleShapeMouseDown = useCallback((position: Position) => {
    if (isShapeTool(currentTool)) {
      setShapeStartPosition(position);
    }
  }, [currentTool, isShapeTool, setShapeStartPosition]);

  const handleShapeMouseMove = useCallback((
    currentPosition: Position, 
    shapeStartPosition: Position | null
  ) => {
    if (isShapeTool(currentTool) && shapeStartPosition) {
      drawShapePreview(shapeStartPosition, currentPosition, currentTool);
      return true;
    }
    return false;
  }, [currentTool, isShapeTool, drawShapePreview]);

  const handleShapeMouseUp = useCallback((
    currentPosition: Position, 
    shapeStartPosition: Position | null,
    ctx: CanvasRenderingContext2D
  ) => {
    if (isShapeTool(currentTool) && shapeStartPosition) {
      clearShapePreview();
      drawShape(shapeStartPosition, currentPosition, ctx, currentTool);
      setShapeStartPosition(null);
      return true;
    }
    return false;
  }, [currentTool, isShapeTool, clearShapePreview, drawShape, setShapeStartPosition]);

  return {
    handleShapeMouseDown,
    handleShapeMouseMove,
    handleShapeMouseUp,
    isShapeTool
  };
};
