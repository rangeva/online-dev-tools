
import { useCallback, RefObject, ForwardedRef } from "react";
import { Position, Tool, BrushSettings, SelectionArea } from "./usePaintingTool";
import { useCanvasDrawingLogic } from "./CanvasDrawingLogic";

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

export const useCanvasEventHandlers = ({
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
}: CanvasEventHandlersProps) => {
  
  const { drawLine, drawShape, pickColor, isShapeTool } = useCanvasDrawingLogic({
    currentTool,
    brushSettings,
    currentColor
  });

  const getCanvas = useCallback(() => {
    if (!canvasRef) return null;
    if (typeof canvasRef === 'function') return null;
    return canvasRef.current;
  }, [canvasRef]);

  const getCanvasCoordinates = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = getCanvas();
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }, [getCanvas]);

  const previewColor = useCallback((position: Position, ctx: CanvasRenderingContext2D) => {
    const color = pickColor(position, ctx);
    if (onColorPreview) {
      onColorPreview(color);
    }
  }, [pickColor, onColorPreview]);

  const isPointInPastedImage = useCallback((position: Position) => {
    if (!pastedImagePosition || !copiedImageData) return false;
    
    return position.x >= pastedImagePosition.x &&
           position.x <= pastedImagePosition.x + copiedImageData.width &&
           position.y >= pastedImagePosition.y &&
           position.y <= pastedImagePosition.y + copiedImageData.height;
  }, [pastedImagePosition, copiedImageData]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = getCanvas();
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const position = getCanvasCoordinates(e);
    
    // Check if clicking on pasted image first
    if (pastedImagePosition && copiedImageData && isPointInPastedImage(position)) {
      if (setIsDraggingPastedImage) {
        setIsDraggingPastedImage(true);
        setIsDrawing(true);
        setLastPosition(position);
        return;
      }
    }
    
    // Handle different tools
    switch (currentTool) {
      case 'eyedropper':
        const color = pickColor(position, ctx);
        if (color) {
          onColorPicked(color);
        }
        return;
        
      case 'text':
        if (onTextClick) {
          onTextClick(position);
        }
        return;
        
      case 'select':
        setIsDrawing(true);
        setShapeStartPosition(position);
        if (setSelectionArea) {
          setSelectionArea(null);
        }
        // Clear any pasted image when making new selection
        if (setPastedImagePosition) {
          setPastedImagePosition(null);
        }
        return;
        
      default:
        // Handle brush, eraser, and shape tools
        saveCanvasState();
        setIsDrawing(true);
        setLastPosition(position);
        
        if (isShapeTool(currentTool)) {
          setShapeStartPosition(position);
        } else if (currentTool === 'brush' || currentTool === 'eraser') {
          ctx.globalCompositeOperation = currentTool === 'eraser' ? 'destination-out' : 'source-over';
          ctx.globalAlpha = brushSettings.opacity;
          ctx.fillStyle = currentColor;
          ctx.beginPath();
          ctx.arc(position.x, position.y, brushSettings.size / 2, 0, 2 * Math.PI);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
        break;
    }
  }, [getCanvas, getCanvasCoordinates, currentTool, pickColor, onColorPicked, onTextClick, setIsDrawing, setShapeStartPosition, setSelectionArea, saveCanvasState, setLastPosition, brushSettings, currentColor, isShapeTool, pastedImagePosition, copiedImageData, isPointInPastedImage, setIsDraggingPastedImage, setPastedImagePosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = getCanvas();
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const currentPosition = getCanvasCoordinates(e);
    
    // Handle eyedropper hover preview
    if (currentTool === 'eyedropper') {
      previewColor(currentPosition, ctx);
      return;
    }
    
    if (!isDrawing || !lastPosition) return;
    
    // Handle dragging pasted image
    if (isDraggingPastedImage && pastedImagePosition && setPastedImagePosition) {
      const deltaX = currentPosition.x - lastPosition.x;
      const deltaY = currentPosition.y - lastPosition.y;
      
      setPastedImagePosition({
        x: pastedImagePosition.x + deltaX,
        y: pastedImagePosition.y + deltaY
      });
      
      setLastPosition(currentPosition);
      return;
    }
    
    // Handle selection tool
    if (currentTool === 'select' && shapeStartPosition) {
      const width = currentPosition.x - shapeStartPosition.x;
      const height = currentPosition.y - shapeStartPosition.y;
      
      if (setSelectionArea) {
        setSelectionArea({
          startX: Math.min(shapeStartPosition.x, currentPosition.x),
          startY: Math.min(shapeStartPosition.y, currentPosition.y),
          width: Math.abs(width),
          height: Math.abs(height)
        });
      }
      return;
    }
    
    // Handle brush and eraser tools
    if (currentTool === 'brush' || currentTool === 'eraser') {
      drawLine(lastPosition, currentPosition, ctx);
      setLastPosition(currentPosition);
    }
    
    // Handle shape preview
    if (isShapeTool(currentTool) && shapeStartPosition) {
      drawShapePreview(shapeStartPosition, currentPosition, currentTool);
    }
  }, [isDrawing, lastPosition, getCanvas, getCanvasCoordinates, currentTool, previewColor, shapeStartPosition, setSelectionArea, drawLine, setLastPosition, isShapeTool, drawShapePreview, isDraggingPastedImage, pastedImagePosition, setPastedImagePosition]);

  const handleMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = getCanvas();
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const currentPosition = getCanvasCoordinates(e);
    
    // Handle dragging pasted image
    if (isDraggingPastedImage && setIsDraggingPastedImage) {
      setIsDraggingPastedImage(false);
      setIsDrawing(false);
      setLastPosition(null);
      return;
    }
    
    // Handle selection tool
    if (currentTool === 'select' && shapeStartPosition) {
      // Selection is already set in mousemove
      setShapeStartPosition(null);
      setIsDrawing(false);
      return;
    }
    
    // Draw shape if using a shape tool
    if (isShapeTool(currentTool) && shapeStartPosition) {
      clearShapePreview(); // Clear the preview
      drawShape(shapeStartPosition, currentPosition, ctx, currentTool);
      setShapeStartPosition(null);
    }
    
    setIsDrawing(false);
    setLastPosition(null);
  }, [isDrawing, getCanvas, getCanvasCoordinates, currentTool, shapeStartPosition, setShapeStartPosition, setIsDrawing, isShapeTool, drawShape, setLastPosition, clearShapePreview, isDraggingPastedImage, setIsDraggingPastedImage]);

  const handleMouseLeave = useCallback(() => {
    setIsDrawing(false);
    setLastPosition(null);
    setShapeStartPosition(null);
    clearShapePreview(); // Clear preview when mouse leaves
    
    if (setIsDraggingPastedImage) {
      setIsDraggingPastedImage(false);
    }
    
    // Clear color preview when mouse leaves
    if (currentTool === 'eyedropper' && onColorPreview) {
      onColorPreview(null);
    }
  }, [setIsDrawing, setLastPosition, setShapeStartPosition, clearShapePreview, currentTool, onColorPreview, setIsDraggingPastedImage]);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave
  };
};
