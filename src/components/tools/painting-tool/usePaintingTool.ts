
import { useState, useCallback, RefObject } from "react";
import { useToast } from "@/hooks/use-toast";

export interface BrushSettings {
  size: number;
  opacity: number;
  flow: number;
  hardness: number;
  style: 'soft' | 'hard' | 'textured';
}

export interface CanvasSize {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export type Tool = 'brush' | 'eraser' | 'rectangle' | 'circle' | 'line' | 'polygon' | 'eyedropper';

export const usePaintingTool = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const { toast } = useToast();
  
  const [currentTool, setCurrentTool] = useState<Tool>('brush');
  const [brushSettings, setBrushSettings] = useState<BrushSettings>({
    size: 2,
    opacity: 1,
    flow: 1,
    hardness: 1,
    style: 'soft'
  });
  const [currentColor, setCurrentColor] = useState('#000000');
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 800, height: 600 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState<Position | null>(null);
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);

  const saveCanvasState = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack(prev => [...prev.slice(-19), imageData]); // Keep only last 20 states
    setRedoStack([]); // Clear redo stack when new action is performed
  }, [canvasRef]);

  const undo = useCallback(() => {
    if (undoStack.length === 0 || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const previousState = undoStack[undoStack.length - 1];
    
    setRedoStack(prev => [...prev, currentState]);
    setUndoStack(prev => prev.slice(0, -1));
    
    ctx.putImageData(previousState, 0, 0);
  }, [undoStack, canvasRef]);

  const redo = useCallback(() => {
    if (redoStack.length === 0 || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const nextState = redoStack[redoStack.length - 1];
    
    setUndoStack(prev => [...prev, currentState]);
    setRedoStack(prev => prev.slice(0, -1));
    
    ctx.putImageData(nextState, 0, 0);
  }, [redoStack, canvasRef]);

  const clearCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveCanvasState();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    toast({
      title: "Canvas Cleared",
      description: "The canvas has been cleared successfully.",
    });
  }, [canvasRef, saveCanvasState, toast]);

  const exportCanvas = useCallback((format: 'png' | 'jpg' = 'png') => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `artwork.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
    
    toast({
      title: "Image Exported",
      description: `Your artwork has been downloaded as ${format.toUpperCase()}.`,
    });
  }, [canvasRef, toast]);

  const uploadImage = useCallback((file: File) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        saveCanvasState();
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        toast({
          title: "Image Uploaded",
          description: "Image has been loaded onto the canvas.",
        });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, [canvasRef, saveCanvasState, toast]);

  return {
    currentTool,
    setCurrentTool,
    brushSettings,
    setBrushSettings,
    currentColor,
    setCurrentColor,
    canvasSize,
    setCanvasSize,
    isDrawing,
    setIsDrawing,
    lastPosition,
    setLastPosition,
    undoStack,
    redoStack,
    saveCanvasState,
    undo,
    redo,
    clearCanvas,
    exportCanvas,
    uploadImage
  };
};
