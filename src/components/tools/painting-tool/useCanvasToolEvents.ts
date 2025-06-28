
import { useCallback } from "react";
import { Position, Tool, BrushSettings, SelectionArea } from "./usePaintingTool";
import { useEyedropperTool } from "./useEyedropperTool";
import { usePastedImageHandling } from "./usePastedImageHandling";
import { useSelectionHandling } from "./useSelectionHandling";
import { useBrushHandling } from "./useBrushHandling";
import { useShapeToolHandling } from "./useShapeToolHandling";

interface CanvasToolEventsProps {
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

export const useCanvasToolEvents = (props: CanvasToolEventsProps) => {
  const {
    currentTool,
    brushSettings,
    currentColor,
    setIsDrawing,
    setLastPosition,
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

  const handleTextClick = useCallback((position: Position) => {
    if (onTextClick) {
      onTextClick(position);
    }
  }, [onTextClick]);

  return {
    handleToolEvents: {
      handleEyedropperClick,
      handleEyedropperPreview,
      clearEyedropperPreview,
      handlePastedImageMouseDown,
      handlePastedImageMouseMove,
      handlePastedImageMouseUp,
      handlePastedImageMouseLeave,
      handleSelectionMouseDown,
      handleSelectionMouseMove,
      handleSelectionMouseUp,
      handleBrushMouseDown,
      handleBrushMouseMove,
      handleShapeMouseDown,
      handleShapeMouseMove,
      handleShapeMouseUp,
      isShapeTool,
      handleTextClick
    }
  };
};
