
import { useCallback, useRef, useEffect } from "react";
import { Position, Tool, BrushSettings } from "./usePaintingTool";

interface ShapePreviewProps {
  canvasSize: { width: number; height: number };
  currentColor: string;
  brushSize: number;
}

export const ShapePreview = ({ canvasSize, currentColor, brushSize }: ShapePreviewProps) => {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const drawShapePreview = useCallback((start: Position, end: Position, shape: Tool) => {
    const previewCanvas = previewCanvasRef.current;
    if (!previewCanvas) return;
    
    const ctx = previewCanvas.getContext('2d');
    if (!ctx) return;
    
    // Clear preview canvas
    ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    
    // Set preview style (lighter/dashed)
    ctx.globalAlpha = 0.7;
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setLineDash([5, 5]); // Dashed line for preview
    
    ctx.beginPath();
    
    switch (shape) {
      case 'rectangle':
        const width = end.x - start.x;
        const height = end.y - start.y;
        ctx.rect(start.x, start.y, width, height);
        break;
      case 'circle':
        const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
        ctx.arc(start.x, start.y, radius, 0, 2 * Math.PI);
        break;
      case 'line':
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        break;
      case 'polygon':
        // Simple triangle for now
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.lineTo(start.x - (end.x - start.x), end.y);
        ctx.closePath();
        break;
    }
    
    ctx.stroke();
    
    // Reset styles
    ctx.globalAlpha = 1;
    ctx.setLineDash([]);
  }, [currentColor, brushSize]);

  const clearShapePreview = useCallback(() => {
    const previewCanvas = previewCanvasRef.current;
    if (!previewCanvas) return;
    
    const ctx = previewCanvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
  }, []);

  // Initialize preview canvas
  useEffect(() => {
    const previewCanvas = previewCanvasRef.current;
    if (!previewCanvas) return;
    
    // Set preview canvas size to match main canvas
    previewCanvas.width = canvasSize.width;
    previewCanvas.height = canvasSize.height;
  }, [canvasSize]);

  return {
    previewCanvasRef,
    drawShapePreview,
    clearShapePreview
  };
};
