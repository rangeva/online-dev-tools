
import { useCallback, useState } from "react";
import { Position, Tool, BrushSettings, SelectionArea } from "./usePaintingTool";
import { useCanvasToolEvents } from "./useCanvasToolEvents";

interface CanvasMouseEventsProps {
  canvasRef: React.ForwardedRef<HTMLCanvasElement>;
  currentTool: Tool;
  brushSettings: BrushSettings;
  currentColor: string;
  isDrawing: boolean;
  setIsDrawing: (drawing: boolean) => void;
  lastPosition: Position | null;
  setLastPosition: (position: Position | null) => void;
  saveCanvasState: () => void;
  shapeStartPosition: Position | null;
  setShapeStartPosition: (position: Position | null) => void;
  drawShapePreview: (start: Position, end: Position, shape: Tool) => void;
  clearShapePreview: () => void;
  selectionArea?: SelectionArea | null;
  setSelectionArea?: (area: SelectionArea | null) => void;
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

export const useCanvasMouseEvents = (props: CanvasMouseEventsProps) => {
  const {
    currentTool,
    isDrawing,
    setIsDrawing,
    setLastPosition,
    saveCanvasState,
    shapeStartPosition,
    setShapeStartPosition,
    clearShapePreview,
    lastPosition,
    isDraggingPastedImage
  } = props;

  const { handleToolEvents } = useCanvasToolEvents(props);

  const onMouseDown = useCallback((position: Position, ctx: CanvasRenderingContext2D) => {
    // Check if clicking on pasted image first
    if (handleToolEvents.handlePastedImageMouseDown(position)) {
      return;
    }
    
    // Handle different tools
    switch (currentTool) {
      case 'eyedropper':
        handleToolEvents.handleEyedropperClick(position, ctx);
        return;
        
      case 'text':
        handleToolEvents.handleTextClick(position);
        return;
        
      case 'select':
      case 'crop':
        handleToolEvents.handleSelectionMouseDown(position);
        return;
        
      default:
        // Handle brush, eraser, and shape tools
        saveCanvasState();
        setIsDrawing(true);
        setLastPosition(position);
        
        if (handleToolEvents.isShapeTool(currentTool)) {
          handleToolEvents.handleShapeMouseDown(position);
        } else if (currentTool === 'brush' || currentTool === 'eraser') {
          handleToolEvents.handleBrushMouseDown(position, ctx);
        }
        break;
    }
  }, [currentTool, handleToolEvents, saveCanvasState, setIsDrawing, setLastPosition]);

  const onMouseMove = useCallback((currentPosition: Position, ctx: CanvasRenderingContext2D) => {
    // Handle eyedropper hover preview
    if (currentTool === 'eyedropper') {
      handleToolEvents.handleEyedropperPreview(currentPosition, ctx);
      return;
    }
    
    if (!isDrawing) return;
    
    // Handle dragging pasted image
    if (handleToolEvents.handlePastedImageMouseMove(currentPosition, lastPosition, isDraggingPastedImage)) {
      return;
    }
    
    // Handle selection tool and crop tool
    if ((currentTool === 'select' || currentTool === 'crop') && handleToolEvents.handleSelectionMouseMove(currentPosition, shapeStartPosition)) {
      return;
    }
    
    // Handle brush and eraser tools
    if ((currentTool === 'brush' || currentTool === 'eraser') && handleToolEvents.handleBrushMouseMove(currentPosition, lastPosition, ctx)) {
      return;
    }
    
    // Handle shape preview
    if (handleToolEvents.handleShapeMouseMove(currentPosition, shapeStartPosition)) {
      return;
    }
  }, [isDrawing, lastPosition, currentTool, handleToolEvents, shapeStartPosition, isDraggingPastedImage]);

  const onMouseUp = useCallback((currentPosition: Position, ctx: CanvasRenderingContext2D) => {
    if (!isDrawing) return;
    
    // Handle dragging pasted image
    if (handleToolEvents.handlePastedImageMouseUp(isDraggingPastedImage)) {
      return;
    }
    
    // Handle selection tool and crop tool
    if ((currentTool === 'select' || currentTool === 'crop') && handleToolEvents.handleSelectionMouseUp(shapeStartPosition)) {
      return;
    }
    
    // Draw shape if using a shape tool
    if (handleToolEvents.handleShapeMouseUp(currentPosition, shapeStartPosition, ctx)) {
      // Shape handling is complete
    }
    
    setIsDrawing(false);
    setLastPosition(null);
  }, [isDrawing, currentTool, shapeStartPosition, setIsDrawing, setLastPosition, handleToolEvents, isDraggingPastedImage]);

  const onMouseLeave = useCallback(() => {
    setIsDrawing(false);
    setLastPosition(null);
    setShapeStartPosition(null);
    clearShapePreview();
    
    handleToolEvents.handlePastedImageMouseLeave();
    
    // Clear color preview when mouse leaves
    if (currentTool === 'eyedropper') {
      handleToolEvents.clearEyedropperPreview();
    }
  }, [setIsDrawing, setLastPosition, setShapeStartPosition, clearShapePreview, currentTool, handleToolEvents]);

  return {
    handleMouseEvents: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave
    }
  };
};
