
import { useEffect, RefObject } from "react";
import { Position } from "./usePaintingTool";

interface UsePastedImageRendererProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  pastedImagePosition: Position | null;
  copiedImageData: ImageData | null;
}

export const usePastedImageRenderer = ({
  canvasRef,
  pastedImagePosition,
  copiedImageData
}: UsePastedImageRendererProps) => {
  useEffect(() => {
    if (!canvasRef || typeof canvasRef === 'function' || !canvasRef.current) return;
    if (!pastedImagePosition || !copiedImageData) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Redraw the canvas from saved state first, then add the pasted image
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    
    // Copy current canvas to temp
    tempCtx.drawImage(canvas, 0, 0);
    
    // Clear and redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);
    
    // Draw pasted image
    const imageCanvas = document.createElement('canvas');
    const imageCtx = imageCanvas.getContext('2d');
    if (!imageCtx) return;
    
    imageCanvas.width = copiedImageData.width;
    imageCanvas.height = copiedImageData.height;
    imageCtx.putImageData(copiedImageData, 0, 0);
    
    ctx.drawImage(imageCanvas, pastedImagePosition.x, pastedImagePosition.y);
  }, [pastedImagePosition, copiedImageData, canvasRef]);
};
