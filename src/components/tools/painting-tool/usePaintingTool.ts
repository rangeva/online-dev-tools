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

export interface TextSettings {
  fontSize: number;
  fontFamily: string;
  color: string;
  bold: boolean;
  italic: boolean;
}

export interface SelectionArea {
  startX: number;
  startY: number;
  width: number;
  height: number;
}

export type Tool = 'brush' | 'eraser' | 'rectangle' | 'circle' | 'line' | 'polygon' | 'eyedropper' | 'select' | 'text' | 'crop' | 'resize';

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
  const [textSettings, setTextSettings] = useState<TextSettings>({
    fontSize: 16,
    fontFamily: 'Arial',
    color: '#000000',
    bold: false,
    italic: false
  });
  const [selectionArea, setSelectionArea] = useState<SelectionArea | null>(null);
  const [copiedImageData, setCopiedImageData] = useState<ImageData | null>(null);

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

  const resizeCanvas = useCallback((newSize: CanvasSize) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save current content
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Update canvas size
    canvas.width = newSize.width;
    canvas.height = newSize.height;
    
    // Fill with white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Restore content
    ctx.putImageData(imageData, 0, 0);
    
    setCanvasSize(newSize);
    
    toast({
      title: "Canvas Resized",
      description: `Canvas resized to ${newSize.width}x${newSize.height}`,
    });
  }, [canvasRef, toast]);

  const cropCanvas = useCallback((selection: SelectionArea) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveCanvasState();
    
    // Get the selected area
    const imageData = ctx.getImageData(selection.startX, selection.startY, selection.width, selection.height);
    
    // Resize canvas to selection size
    canvas.width = selection.width;
    canvas.height = selection.height;
    
    // Fill with white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Put the cropped image
    ctx.putImageData(imageData, 0, 0);
    
    setCanvasSize({ width: selection.width, height: selection.height });
    setSelectionArea(null);
    
    toast({
      title: "Image Cropped",
      description: "The canvas has been cropped to the selected area.",
    });
  }, [canvasRef, saveCanvasState, toast]);

  const copySelection = useCallback(() => {
    if (!canvasRef.current || !selectionArea) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(
      Math.round(selectionArea.startX), 
      Math.round(selectionArea.startY), 
      Math.round(selectionArea.width), 
      Math.round(selectionArea.height)
    );
    
    setCopiedImageData(imageData);
    
    toast({
      title: "Selection Copied",
      description: "The selected area has been copied and can be pasted.",
    });
  }, [canvasRef, selectionArea, toast]);

  const pasteSelection = useCallback((position: Position) => {
    if (!canvasRef.current || !copiedImageData) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveCanvasState();
    ctx.putImageData(copiedImageData, Math.round(position.x), Math.round(position.y));
    
    toast({
      title: "Selection Pasted",
      description: "The copied content has been pasted. Click and drag to move it.",
    });
  }, [canvasRef, copiedImageData, saveCanvasState, toast]);

  const cutSelection = useCallback(() => {
    if (!canvasRef.current || !selectionArea) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveCanvasState();
    
    // Copy first
    const imageData = ctx.getImageData(
      Math.round(selectionArea.startX), 
      Math.round(selectionArea.startY), 
      Math.round(selectionArea.width), 
      Math.round(selectionArea.height)
    );
    setCopiedImageData(imageData);
    
    // Then clear the area
    ctx.fillStyle = 'white';
    ctx.fillRect(
      Math.round(selectionArea.startX), 
      Math.round(selectionArea.startY), 
      Math.round(selectionArea.width), 
      Math.round(selectionArea.height)
    );
    
    setSelectionArea(null);
    
    toast({
      title: "Selection Cut",
      description: "The selected area has been cut and copied. It can now be pasted.",
    });
  }, [canvasRef, selectionArea, saveCanvasState, toast]);

  const addText = useCallback((position: Position, text: string) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveCanvasState();
    
    ctx.fillStyle = textSettings.color;
    ctx.font = `${textSettings.italic ? 'italic ' : ''}${textSettings.bold ? 'bold ' : ''}${textSettings.fontSize}px ${textSettings.fontFamily}`;
    ctx.textBaseline = 'top';
    
    ctx.fillText(text, position.x, position.y);
    
    toast({
      title: "Text Added",
      description: "Text has been added to the canvas.",
    });
  }, [canvasRef, textSettings, saveCanvasState, toast]);

  const exportCanvas = useCallback((format: 'png' | 'jpg' | 'gif' | 'bmp' = 'png') => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    // Convert format to MIME type
    let mimeType: string;
    let fileExtension: string;
    
    switch (format) {
      case 'jpg':
        mimeType = 'image/jpeg';
        fileExtension = 'jpg';
        break;
      case 'gif':
        mimeType = 'image/gif';
        fileExtension = 'gif';
        break;
      case 'bmp':
        mimeType = 'image/bmp';
        fileExtension = 'bmp';
        break;
      case 'png':
      default:
        mimeType = 'image/png';
        fileExtension = 'png';
        break;
    }
    
    // For JPEG, we need to handle transparency by adding a white background
    if (format === 'jpg') {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;
      
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      
      // Fill with white background
      tempCtx.fillStyle = 'white';
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      
      // Draw the original canvas on top
      tempCtx.drawImage(canvas, 0, 0);
      
      const link = document.createElement('a');
      link.download = `artwork.${fileExtension}`;
      link.href = tempCanvas.toDataURL(mimeType, 0.9); // 0.9 quality for JPEG
      link.click();
    } else {
      const link = document.createElement('a');
      link.download = `artwork.${fileExtension}`;
      link.href = canvas.toDataURL(mimeType);
      link.click();
    }
    
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
    textSettings,
    setTextSettings,
    selectionArea,
    setSelectionArea,
    copiedImageData,
    saveCanvasState,
    undo,
    redo,
    clearCanvas,
    resizeCanvas,
    cropCanvas,
    copySelection,
    pasteSelection,
    cutSelection,
    addText,
    exportCanvas,
    uploadImage
  };
};
