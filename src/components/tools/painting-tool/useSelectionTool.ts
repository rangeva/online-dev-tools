
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

  const copyToClipboard = useCallback(async (canvas: HTMLCanvasElement, area: SelectionArea) => {
    try {
      // Normalize the area to handle negative dimensions
      const normalizedArea = {
        startX: area.width < 0 ? area.startX + area.width : area.startX,
        startY: area.height < 0 ? area.startY + area.height : area.startY,
        width: Math.abs(area.width),
        height: Math.abs(area.height)
      };

      // Create a temporary canvas with just the selected area
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = Math.round(normalizedArea.width);
      tempCanvas.height = Math.round(normalizedArea.height);
      const tempCtx = tempCanvas.getContext('2d');
      
      if (!tempCtx) return;
      
      // Draw the selected area to the temporary canvas
      tempCtx.drawImage(
        canvas,
        Math.round(normalizedArea.startX), Math.round(normalizedArea.startY), 
        Math.round(normalizedArea.width), Math.round(normalizedArea.height),
        0, 0, 
        Math.round(normalizedArea.width), Math.round(normalizedArea.height)
      );
      
      // Convert to blob and copy to clipboard
      tempCanvas.toBlob(async (blob) => {
        if (blob && navigator.clipboard && navigator.clipboard.write) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
          } catch (error) {
            console.log('Clipboard write failed, fallback to internal copy only');
          }
        }
      });
    } catch (error) {
      console.log('Clipboard operation failed, using internal copy only');
    }
  }, []);

  const copySelection = useCallback((canvasRef: RefObject<HTMLCanvasElement>) => {
    if (!canvasRef.current || !selectionArea) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Normalize the area to handle negative dimensions
    const normalizedArea = {
      startX: selectionArea.width < 0 ? selectionArea.startX + selectionArea.width : selectionArea.startX,
      startY: selectionArea.height < 0 ? selectionArea.startY + selectionArea.height : selectionArea.startY,
      width: Math.abs(selectionArea.width),
      height: Math.abs(selectionArea.height)
    };

    const imageData = ctx.getImageData(
      Math.round(normalizedArea.startX), 
      Math.round(normalizedArea.startY), 
      Math.round(normalizedArea.width), 
      Math.round(normalizedArea.height)
    );
    
    setCopiedImageData(imageData);
    
    // Also copy to system clipboard
    copyToClipboard(canvas, selectionArea);
    
    toast({
      title: "Selection Copied",
      description: "The selected area has been copied to clipboard and can be pasted.",
    });
  }, [selectionArea, toast, copyToClipboard]);

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
    
    // Normalize the area to handle negative dimensions
    const normalizedArea = {
      startX: selectionArea.width < 0 ? selectionArea.startX + selectionArea.width : selectionArea.startX,
      startY: selectionArea.height < 0 ? selectionArea.startY + selectionArea.height : selectionArea.startY,
      width: Math.abs(selectionArea.width),
      height: Math.abs(selectionArea.height)
    };
    
    // Copy first (both internal and clipboard)
    const imageData = ctx.getImageData(
      Math.round(normalizedArea.startX), 
      Math.round(normalizedArea.startY), 
      Math.round(normalizedArea.width), 
      Math.round(normalizedArea.height)
    );
    setCopiedImageData(imageData);
    
    // Copy to system clipboard
    copyToClipboard(canvas, selectionArea);
    
    // Then clear the area
    ctx.fillStyle = 'white';
    ctx.fillRect(
      Math.round(normalizedArea.startX), 
      Math.round(normalizedArea.startY), 
      Math.round(normalizedArea.width), 
      Math.round(normalizedArea.height)
    );
    
    setSelectionArea(null);
    
    toast({
      title: "Selection Cut",
      description: "The selected area has been cut and copied to clipboard.",
    });
  }, [selectionArea, toast, copyToClipboard]);

  return {
    selectionArea,
    setSelectionArea,
    copiedImageData,
    copySelection,
    pasteSelection,
    cutSelection
  };
};
