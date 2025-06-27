
import { RefObject } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCanvasState } from "./useCanvasState";
import { useDrawingState } from "./useDrawingState";
import { useTextTool } from "./useTextTool";
import { useSelectionTool } from "./useSelectionTool";
import { clearCanvas, resizeCanvas, cropCanvas, exportCanvas, uploadImage } from "./canvasUtils";

// Re-export types for backward compatibility
export type { BrushSettings, Position, Tool } from "./useDrawingState";
export type { CanvasSize } from "./useCanvasState";
export type { TextSettings } from "./useTextTool";
export type { SelectionArea } from "./useSelectionTool";

export const usePaintingTool = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const { toast } = useToast();
  
  // Canvas state management
  const {
    canvasSize,
    setCanvasSize,
    undoStack,
    redoStack,
    saveCanvasState: baseSaveCanvasState,
    undo: baseUndo,
    redo: baseRedo
  } = useCanvasState();

  // Drawing state management
  const {
    currentTool,
    setCurrentTool,
    brushSettings,
    setBrushSettings,
    currentColor,
    setCurrentColor,
    isDrawing,
    setIsDrawing,
    lastPosition,
    setLastPosition
  } = useDrawingState();

  // Text tool
  const {
    textSettings,
    setTextSettings,
    addText: baseAddText
  } = useTextTool();

  // Selection tool
  const {
    selectionArea,
    setSelectionArea,
    copiedImageData,
    copySelection: baseCopySelection,
    pasteSelection: basePasteSelection,
    cutSelection: baseCutSelection
  } = useSelectionTool();

  // Wrapper functions to maintain the same API
  const saveCanvasState = () => baseSaveCanvasState(canvasRef);
  const undo = () => baseUndo(canvasRef);
  const redo = () => baseRedo(canvasRef);
  
  const addText = (position: { x: number; y: number }, text: string) => 
    baseAddText(position, text, canvasRef, saveCanvasState);
  
  const copySelection = () => baseCopySelection(canvasRef);
  const pasteSelection = (position: { x: number; y: number }) => 
    basePasteSelection(position, canvasRef, saveCanvasState);
  const cutSelection = () => baseCutSelection(canvasRef, saveCanvasState);

  // Canvas operations with toast integration
  const handleClearCanvas = () => clearCanvas(canvasRef, saveCanvasState, (message) => {
    toast({ title: "Canvas Cleared", description: message });
  });

  const handleResizeCanvas = (newSize: { width: number; height: number }) => {
    resizeCanvas(newSize, canvasRef, (message) => {
      toast({ title: "Canvas Resized", description: message });
    });
    setCanvasSize(newSize);
  };

  const handleCropCanvas = (selection: { startX: number; startY: number; width: number; height: number }) => {
    cropCanvas(selection, canvasRef, saveCanvasState, setCanvasSize, (message) => {
      toast({ title: "Image Cropped", description: message });
    });
    setSelectionArea(null);
  };

  const handleExportCanvas = (format?: 'png' | 'jpg' | 'gif' | 'bmp') => 
    exportCanvas(canvasRef, format, (message) => {
      toast({ title: "Image Exported", description: message });
    });

  const handleUploadImage = (file: File) => 
    uploadImage(file, canvasRef, saveCanvasState, setCanvasSize, (message) => {
      toast({ title: "Image Uploaded", description: message });
    });

  return {
    // Drawing state
    currentTool,
    setCurrentTool,
    brushSettings,
    setBrushSettings,
    currentColor,
    setCurrentColor,
    isDrawing,
    setIsDrawing,
    lastPosition,
    setLastPosition,
    
    // Canvas state
    canvasSize,
    setCanvasSize,
    undoStack,
    redoStack,
    saveCanvasState,
    undo,
    redo,
    
    // Text functionality
    textSettings,
    setTextSettings,
    addText,
    
    // Selection functionality
    selectionArea,
    setSelectionArea,
    copiedImageData,
    copySelection,
    pasteSelection,
    cutSelection,
    
    // Canvas operations
    clearCanvas: handleClearCanvas,
    resizeCanvas: handleResizeCanvas,
    cropCanvas: handleCropCanvas,
    exportCanvas: handleExportCanvas,
    uploadImage: handleUploadImage
  };
};
