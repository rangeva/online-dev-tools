
import { useState, useCallback, RefObject } from "react";
import { useToast } from "@/hooks/use-toast";

export interface SelectionArea {
  startX: number;
  startY: number;
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export const useSelectionTool = () => {
  const { toast } = useToast();
  const [selectionArea, setSelectionArea] = useState<SelectionArea | null>(null);
  const [copiedImageData, setCopiedImageData] = useState<ImageData | null>(null);

  const copySelection = useCallback((canvasRef: RefObject<HTMLCanvasElement>) => {
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
  }, [selectionArea, toast]);

  const pasteSelection = useCallback((
    position: Position, 
    canvasRef: RefObject<HTMLCanvasElement>,
    saveCanvasState: () => void
  ) => {
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
  }, [copiedImageData, toast]);

  const cutSelection = useCallback((
    canvasRef: RefObject<HTMLCanvasElement>,
    saveCanvasState: () => void
  ) => {
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
  }, [selectionArea, toast]);

  return {
    selectionArea,
    setSelectionArea,
    copiedImageData,
    copySelection,
    pasteSelection,
    cutSelection
  };
};
