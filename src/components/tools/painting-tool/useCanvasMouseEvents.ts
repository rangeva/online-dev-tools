
import { useCallback } from "react";
import { Position, Tool, BrushSettings, SelectionArea } from "./usePaintingTool";
import { useCanvasToolEvents } from "./useCanvasToolEvents";
import { floodFill } from "./floodFillUtils";

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

export const useCanvasMouseEvents = (props: CanvasMouseEventsProps) => {
  const {
    canvasRef,
    currentTool,
    currentColor,
    saveCanvasState,
    isDrawing,
    lastPosition
  } = props;

  const { handleToolEvents } = useCanvasToolEvents(props);

  const getCanvas = useCallback(() => {
    if (!canvasRef || typeof canvasRef === 'function') return null;
    return canvasRef.current;
  }, [canvasRef]);

  const handleFloodFill = useCallback((position: Position, ctx: CanvasRenderingContext2D) => {
    const canvas = getCanvas();
    if (!canvas) return;

    saveCanvasState();
    floodFill(canvas, Math.floor(position.x), Math.floor(position.y), currentColor);
  }, [getCanvas, saveCanvasState, currentColor]);

  const handleMouseEvents = {
    onMouseDown: useCallback((position: Position, ctx: CanvasRenderingContext2D) => {
      // Handle flood fill tool
      if (currentTool === 'flood-fill') {
        handleFloodFill(position, ctx);
        return;
      }

      // Handle eyedropper tool
      if (currentTool === 'eyedropper') {
        handleToolEvents.handleEyedropperClick(position, ctx);
        return;
      }

      // Handle pasted image interactions
      if (handleToolEvents.handlePastedImageMouseDown(position, ctx)) {
        return;
      }

      // Handle selection tools
      if (currentTool === 'select' || currentTool === 'crop') {
        handleToolEvents.handleSelectionMouseDown(position, ctx);
        return;
      }

      // Handle text tool
      if (currentTool === 'text') {
        handleToolEvents.handleTextClick(position);
        return;
      }

      // Handle shape tools
      if (handleToolEvents.isShapeTool(currentTool)) {
        handleToolEvents.handleShapeMouseDown(position, ctx);
        return;
      }

      // Handle brush and eraser tools
      if (currentTool === 'brush' || currentTool === 'eraser') {
        handleToolEvents.handleBrushMouseDown(position, ctx);
        return;
      }
    }, [currentTool, handleFloodFill, handleToolEvents]),

    onMouseMove: useCallback((position: Position, ctx: CanvasRenderingContext2D) => {
      // Handle eyedropper preview
      if (currentTool === 'eyedropper') {
        handleToolEvents.handleEyedropperPreview(position, ctx);
        return;
      }

      // Handle pasted image dragging
      if (handleToolEvents.handlePastedImageMouseMove(position, ctx)) {
        return;
      }

      // Handle selection tools
      if (currentTool === 'select' || currentTool === 'crop') {
        handleToolEvents.handleSelectionMouseMove(position, ctx);
        return;
      }

      // Handle shape tools
      if (handleToolEvents.isShapeTool(currentTool)) {
        handleToolEvents.handleShapeMouseMove(position, ctx);
        return;
      }

      // Handle brush and eraser tools
      if (currentTool === 'brush' || currentTool === 'eraser') {
        const handled = handleToolEvents.handleBrushMouseMove(position, lastPosition, ctx);
        if (handled && isDrawing) {
          // Mouse move handled by brush
        }
        return;
      }
    }, [currentTool, handleToolEvents, lastPosition, isDrawing]),

    onMouseUp: useCallback((position: Position, ctx: CanvasRenderingContext2D) => {
      // Handle pasted image interactions
      if (handleToolEvents.handlePastedImageMouseUp(position, ctx)) {
        return;
      }

      // Handle selection tools
      if (currentTool === 'select' || currentTool === 'crop') {
        handleToolEvents.handleSelectionMouseUp(position, ctx);
        return;
      }

      // Handle shape tools
      if (handleToolEvents.isShapeTool(currentTool)) {
        handleToolEvents.handleShapeMouseUp(position, ctx);
        return;
      }
    }, [currentTool, handleToolEvents]),

    onMouseLeave: useCallback(() => {
      // Clear eyedropper preview
      if (currentTool === 'eyedropper') {
        handleToolEvents.clearEyedropperPreview();
      }

      // Handle pasted image interactions
      handleToolEvents.handlePastedImageMouseLeave();
    }, [currentTool, handleToolEvents])
  };

  return { handleMouseEvents };
};
