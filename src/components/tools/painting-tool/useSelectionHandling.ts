
import { useCallback } from "react";
import { Position, SelectionArea } from "./usePaintingTool";

interface UseSelectionHandlingProps {
  setIsDrawing: (drawing: boolean) => void;
  setShapeStartPosition: (position: Position | null) => void;
  setSelectionArea?: (area: SelectionArea | null) => void;
  setPastedImagePosition?: (position: Position | null) => void;
  currentTool?: string;
}

export const useSelectionHandling = ({ 
  setIsDrawing,
  setShapeStartPosition,
  setSelectionArea,
  setPastedImagePosition,
  currentTool
}: UseSelectionHandlingProps) => {

  const handleSelectionMouseDown = useCallback((position: Position) => {
    console.log(`${currentTool || 'Selection'} tool mouse down at:`, position);
    setIsDrawing(true);
    setShapeStartPosition(position);
    if (setSelectionArea) {
      // Initialize selection area with zero dimensions
      setSelectionArea({
        startX: position.x,
        startY: position.y,
        width: 0,
        height: 0
      });
    }
    // Clear any pasted image when making new selection
    if (setPastedImagePosition) {
      setPastedImagePosition(null);
    }
  }, [setIsDrawing, setShapeStartPosition, setSelectionArea, setPastedImagePosition, currentTool]);

  const handleSelectionMouseMove = useCallback((
    currentPosition: Position, 
    shapeStartPosition: Position | null
  ) => {
    if (shapeStartPosition) {
      console.log(`${currentTool || 'Selection'} tool mouse move, start:`, shapeStartPosition, 'current:', currentPosition);
      const width = currentPosition.x - shapeStartPosition.x;
      const height = currentPosition.y - shapeStartPosition.y;
      
      if (setSelectionArea) {
        // Keep the original start position and let width/height be signed
        // This allows the selection box to grow in any direction from the start point
        const newSelection = {
          startX: shapeStartPosition.x,
          startY: shapeStartPosition.y,
          width: width,
          height: height
        };
        console.log('Setting selection area:', newSelection);
        setSelectionArea(newSelection);
      }
      return true;
    }
    return false;
  }, [setSelectionArea, currentTool]);

  const handleSelectionMouseUp = useCallback((shapeStartPosition: Position | null) => {
    if (shapeStartPosition) {
      console.log(`${currentTool || 'Selection'} tool mouse up`);
      // Selection area is already set in mousemove, just clean up
      setShapeStartPosition(null);
      setIsDrawing(false);
      return true;
    }
    return false;
  }, [setShapeStartPosition, setIsDrawing, currentTool]);

  return {
    handleSelectionMouseDown,
    handleSelectionMouseMove,
    handleSelectionMouseUp
  };
};
