
import { useCallback, RefObject, ForwardedRef } from "react";
import { Position, Tool, BrushSettings, SelectionArea } from "./usePaintingTool";
import { useMouseCoordinates } from "./useMouseCoordinates";
import { useEyedropperTool } from "./useEyedropperTool";
import { usePastedImageHandling } from "./usePastedImageHandling";
import { useSelectionHandling } from "./useSelectionHandling";
import { useBrushHandling } from "./useBrushHandling";
import { useShapeToolHandling } from "./useShapeToolHandling";

interface CanvasEventHandlersProps {
  canvasRef: ForwardedRef<HTMLCanvasElement>;
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
  shapeStartPosition: Position | null;
  setShapeStartPosition: (position: Position | null) => void;
  drawShapePreview: (start: Position, end: Position, shape: Tool) => void;
  clearShapePreview: () => void;
  selectionArea?: SelectionArea | null;
  setSelectionArea?: (area: SelectionArea | null) => void;
  onTextClick?: (position: Position) => void;
  onPasteAt?: (position: Position) => void;
  copiedImageData?: ImageData | null;
  pastedImagePosition?: Position | null;
  setPastedImagePosition?: (position: Position | null) => void;
  isDraggingPastedImage?: boolean;
  setIsDraggingPastedImage?: (dragging: boolean) => void;
}

export const useCanvasEventHandlers = (props: CanvasEventHandlersProps) => {
  const {
    canvasRef,
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
    copiedImageData,
    pastedImagePosition,
    setPastedImagePosition,
    isDraggingPastedImage,
    setIsDraggingPastedImage
  } = props;

  const { getCanvas, getCanvasCoordinates } = useMouseCoordinates({ canvasRef });
  
  const { handleEyedropperClick, handleEyedropperPreview, clearEyedropperPreview } = useEyedropperTool({
    currentTool,
    onColorPicked,
    onColorPreview
  });

  const {
    handlePastedImageMouseDown,
    handlePastedImageMouseMove,
    handlePastedImageMouseUp,
    handlePastedImageMouseLeave
  } = usePastedImageHandling({
    pastedImagePosition,
    copiedImageData,
    setPastedImagePosition,
    setIsDraggingPastedImage,
    setIsDrawing,
    setLastPosition
  });

  const {
    handleSelectionMouseDown,
    handleSelectionMouseMove,
    handleSelectionMouseUp
  } = useSelectionHandling({
    setIsDrawing,
    setShapeStartPosition,
    setSelectionArea,
    setPastedImagePosition,
    currentTool
  });

  const { handleBrushMouseDown, handleBrushMouseMove } = useBrushHandling({
    currentTool,
    brushSettings,
    currentColor,
    setLastPosition
  });

  const {
    handleShapeMouseDown,
    handleShapeMouseMove,
    handleShapeMouseUp,
    isShapeTool
  } = useShapeToolHandling({
    currentTool,
    brushSettings,
    currentColor,
    setShapeStartPosition,
    drawShapePreview,
    clearShapePreview
  });

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = getCanvas();
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const position = getCanvasCoordinates(e);
    
    // Check if clicking on pasted image first
    if (handlePastedImageMouseDown(position)) {
      return;
    }
    
    // Handle different tools
    switch (currentTool) {
      case 'eyedropper':
        handleEyedropperClick(position, ctx);
        return;
        
      case 'text':
        if (onTextClick) {
          onTextClick(position);
        }
        return;
        
      case 'select':
      case 'crop':
        handleSelectionMouseDown(position);
        return;
        
      default:
        // Handle brush, eraser, and shape tools
        saveCanvasState();
        setIsDrawing(true);
        setLastPosition(position);
        
        if (isShapeTool(currentTool)) {
          handleShapeMouseDown(position);
        } else if (currentTool === 'brush' || currentTool === 'eraser') {
          handleBrushMouseDown(position, ctx);
        }
        break;
    }
  }, [getCanvas, getCanvasCoordinates, currentTool, handleEyedropperClick, onTextClick, handleSelectionMouseDown, saveCanvasState, setIsDrawing, setLastPosition, isShapeTool, handleShapeMouseDown, handleBrushMouseDown, handlePastedImageMouseDown]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = getCanvas();
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const currentPosition = getCanvasCoordinates(e);
    
    // Handle eyedropper hover preview
    if (currentTool === 'eyedropper') {
      handleEyedropperPreview(currentPosition, ctx);
      return;
    }
    
    if (!isDrawing) return;
    
    // Handle dragging pasted image
    if (handlePastedImageMouseMove(currentPosition, lastPosition, isDraggingPastedImage)) {
      return;
    }
    
    // Handle selection tool and crop tool
    if ((currentTool === 'select' || currentTool === 'crop') && handleSelectionMouseMove(currentPosition, shapeStartPosition)) {
      return;
    }
    
    // Handle brush and eraser tools
    if ((currentTool === 'brush' || currentTool === 'eraser') && handleBrushMouseMove(currentPosition, lastPosition, ctx)) {
      return;
    }
    
    // Handle shape preview
    if (handleShapeMouseMove(currentPosition, shapeStartPosition)) {
      return;
    }
  }, [isDrawing, lastPosition, getCanvas, getCanvasCoordinates, currentTool, handleEyedropperPreview, shapeStartPosition, handlePastedImageMouseMove, isDraggingPastedImage, handleSelectionMouseMove, handleBrushMouseMove, handleShapeMouseMove]);

  const handleMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = getCanvas();
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const currentPosition = getCanvasCoordinates(e);
    
    // Handle dragging pasted image
    if (handlePastedImageMouseUp(isDraggingPastedImage)) {
      return;
    }
    
    // Handle selection tool and crop tool
    if ((currentTool === 'select' || currentTool === 'crop') && handleSelectionMouseUp(shapeStartPosition)) {
      return;
    }
    
    // Draw shape if using a shape tool
    if (handleShapeMouseUp(currentPosition, shapeStartPosition, ctx)) {
      // Shape handling is complete
    }
    
    setIsDrawing(false);
    setLastPosition(null);
  }, [isDrawing, getCanvas, getCanvasCoordinates, currentTool, shapeStartPosition, setIsDrawing, setLastPosition, handlePastedImageMouseUp, isDraggingPastedImage, handleSelectionMouseUp, handleShapeMouseUp]);

  const handleMouseLeave = useCallback(() => {
    setIsDrawing(false);
    setLastPosition(null);
    setShapeStartPosition(null);
    clearShapePreview();
    
    handlePastedImageMouseLeave();
    
    // Clear color preview when mouse leaves
    if (currentTool === 'eyedropper') {
      clearEyedropperPreview();
    }
  }, [setIsDrawing, setLastPosition, setShapeStartPosition, clearShapePreview, currentTool, clearEyedropperPreview, handlePastedImageMouseLeave]);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave
  };
};
