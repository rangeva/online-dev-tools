
import { useCallback, RefObject } from "react";
import { Position, Tool, BrushSettings } from "./usePaintingTool";
import { useCanvasDrawingLogic } from "./CanvasDrawingLogic";

interface CanvasEventHandlersProps {
  canvasRef: RefObject<HTMLCanvasElement>;
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
  clearShapePreview
}: CanvasEventHandlersProps) => {
  
  const { drawLine, drawShape, pickColor, isShapeTool } = useCanvasDrawingLogic({
    currentTool,
    brushSettings,
    currentColor
  });

  const getCanvasCoordinates = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef || typeof canvasRef === 'function') return { x: 0, y: 0 };
    
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }, [canvasRef]);

  const previewColor = useCallback((position: Position, ctx: CanvasRenderingContext2D) => {
    const color = pickColor(position, ctx);
    if (onColorPreview) {
      onColorPreview(color);
    }
  }, [pickColor, onColorPreview]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef || typeof canvasRef === 'function') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const position = getCanvasCoordinates(e);
    
    if (currentTool === 'eyedropper') {
      const color = pickColor(position, ctx);
      if (color) {
        onColorPicked(color);
      }
      return;
    }
    
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
  }, [canvasRef, getCanvasCoordinates, currentTool, pickColor, onColorPicked, saveCanvasState, setIsDrawing, setLastPosition, brushSettings, currentColor, isShapeTool, setShapeStartPosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef || typeof canvasRef === 'function') return;
    const canvas = canvasRef.current;
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
    
    // Handle brush and eraser tools
    if (currentTool === 'brush' || currentTool === 'eraser') {
      drawLine(lastPosition, currentPosition, ctx);
      setLastPosition(currentPosition);
    }
    
    // Handle shape preview
    if (isShapeTool(currentTool) && shapeStartPosition) {
      drawShapePreview(shapeStartPosition, currentPosition, currentTool);
    }
  }, [isDrawing, lastPosition, canvasRef, getCanvasCoordinates, currentTool, previewColor, drawLine, setLastPosition, isShapeTool, shapeStartPosition, drawShapePreview]);

  const handleMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    if (!canvasRef || typeof canvasRef === 'function') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const currentPosition = getCanvasCoordinates(e);
    
    // Draw shape if using a shape tool
    if (isShapeTool(currentTool) && shapeStartPosition) {
      clearShapePreview(); // Clear the preview
      drawShape(shapeStartPosition, currentPosition, ctx, currentTool);
      setShapeStartPosition(null);
    }
    
    setIsDrawing(false);
    setLastPosition(null);
  }, [isDrawing, canvasRef, getCanvasCoordinates, currentTool, isShapeTool, shapeStartPosition, drawShape, setIsDrawing, setLastPosition, clearShapePreview]);

  const handleMouseLeave = useCallback(() => {
    setIsDrawing(false);
    setLastPosition(null);
    setShapeStartPosition(null);
    clearShapePreview(); // Clear preview when mouse leaves
    
    // Clear color preview when mouse leaves
    if (currentTool === 'eyedropper' && onColorPreview) {
      onColorPreview(null);
    }
  }, [setIsDrawing, setLastPosition, setShapeStartPosition, clearShapePreview, currentTool, onColorPreview]);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave
  };
};
