
import { useCallback } from "react";
import { Position, Tool } from "./usePaintingTool";
import { useMouseCoordinates } from "./useMouseCoordinates";
import { useCanvasMouseEvents } from "./useCanvasMouseEvents";
import { useCanvasToolEvents } from "./useCanvasToolEvents";

interface CanvasEventCoordinatorProps {
  canvasRef: React.ForwardedRef<HTMLCanvasElement>;
  currentTool: Tool;
  onColorPicked: (color: string) => void;
  onColorPreview?: (color: string | null) => void;
  onTextClick?: (position: Position) => void;
  onPasteAt?: (position: Position) => void;
  copiedImageData?: ImageData | null;
  pastedImagePosition?: Position | null;
  setPastedImagePosition?: (position: Position | null) => void;
  isDraggingPastedImage?: boolean;
  setIsDraggingPastedImage?: (dragging: boolean) => void;
}

export const useCanvasEventCoordinator = (props: CanvasEventCoordinatorProps) => {
  const { canvasRef, currentTool } = props;
  const { getCanvas, getCanvasCoordinates } = useMouseCoordinates({ canvasRef });
  const { handleMouseEvents } = useCanvasMouseEvents(props);
  const { handleToolEvents } = useCanvasToolEvents(props);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = getCanvas();
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const position = getCanvasCoordinates(e);
    
    // Handle mouse events through the mouse event handler
    handleMouseEvents.onMouseDown(position, ctx);
  }, [getCanvas, getCanvasCoordinates, handleMouseEvents]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = getCanvas();
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const currentPosition = getCanvasCoordinates(e);
    
    // Handle mouse events through the mouse event handler
    handleMouseEvents.onMouseMove(currentPosition, ctx);
  }, [getCanvas, getCanvasCoordinates, handleMouseEvents]);

  const handleMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = getCanvas();
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const currentPosition = getCanvasCoordinates(e);
    
    // Handle mouse events through the mouse event handler
    handleMouseEvents.onMouseUp(currentPosition, ctx);
  }, [getCanvas, getCanvasCoordinates, handleMouseEvents]);

  const handleMouseLeave = useCallback(() => {
    // Handle mouse events through the mouse event handler
    handleMouseEvents.onMouseLeave();
  }, [handleMouseEvents]);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave
  };
};
