
import { useCallback } from "react";
import { Position } from "./usePaintingTool";

interface UsePastedImageHandlingProps {
  pastedImagePosition?: Position | null;
  copiedImageData?: ImageData | null;
  setPastedImagePosition?: (position: Position | null) => void;
  setIsDraggingPastedImage?: (dragging: boolean) => void;
  setIsDrawing: (drawing: boolean) => void;
  setLastPosition: (position: Position | null) => void;
}

export const usePastedImageHandling = ({ 
  pastedImagePosition,
  copiedImageData,
  setPastedImagePosition,
  setIsDraggingPastedImage,
  setIsDrawing,
  setLastPosition
}: UsePastedImageHandlingProps) => {
  
  const isPointInPastedImage = useCallback((position: Position) => {
    if (!pastedImagePosition || !copiedImageData) return false;
    
    return position.x >= pastedImagePosition.x &&
           position.x <= pastedImagePosition.x + copiedImageData.width &&
           position.y >= pastedImagePosition.y &&
           position.y <= pastedImagePosition.y + copiedImageData.height;
  }, [pastedImagePosition, copiedImageData]);

  const handlePastedImageMouseDown = useCallback((position: Position) => {
    if (pastedImagePosition && copiedImageData && isPointInPastedImage(position)) {
      if (setIsDraggingPastedImage) {
        setIsDraggingPastedImage(true);
        setIsDrawing(true);
        setLastPosition(position);
        return true;
      }
    }
    return false;
  }, [pastedImagePosition, copiedImageData, isPointInPastedImage, setIsDraggingPastedImage, setIsDrawing, setLastPosition]);

  const handlePastedImageMouseMove = useCallback((
    currentPosition: Position, 
    lastPosition: Position | null,
    isDraggingPastedImage?: boolean
  ) => {
    if (isDraggingPastedImage && pastedImagePosition && setPastedImagePosition && lastPosition) {
      const deltaX = currentPosition.x - lastPosition.x;
      const deltaY = currentPosition.y - lastPosition.y;
      
      setPastedImagePosition({
        x: pastedImagePosition.x + deltaX,
        y: pastedImagePosition.y + deltaY
      });
      
      setLastPosition(currentPosition);
      return true;
    }
    return false;
  }, [pastedImagePosition, setPastedImagePosition, setLastPosition]);

  const handlePastedImageMouseUp = useCallback((isDraggingPastedImage?: boolean) => {
    if (isDraggingPastedImage && setIsDraggingPastedImage) {
      setIsDraggingPastedImage(false);
      setIsDrawing(false);
      setLastPosition(null);
      return true;
    }
    return false;
  }, [setIsDraggingPastedImage, setIsDrawing, setLastPosition]);

  const handlePastedImageMouseLeave = useCallback(() => {
    if (setIsDraggingPastedImage) {
      setIsDraggingPastedImage(false);
    }
  }, [setIsDraggingPastedImage]);

  return {
    isPointInPastedImage,
    handlePastedImageMouseDown,
    handlePastedImageMouseMove,
    handlePastedImageMouseUp,
    handlePastedImageMouseLeave
  };
};
