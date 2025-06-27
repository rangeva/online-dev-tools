
import { useCallback } from "react";
import { BrushSettings, Position, Tool } from "./usePaintingTool";

interface CanvasDrawingLogicProps {
  currentTool: Tool;
  brushSettings: BrushSettings;
  currentColor: string;
}

export const useCanvasDrawingLogic = ({ currentTool, brushSettings, currentColor }: CanvasDrawingLogicProps) => {
  const drawLine = useCallback((from: Position, to: Position, ctx: CanvasRenderingContext2D) => {
    ctx.globalCompositeOperation = currentTool === 'eraser' ? 'destination-out' : 'source-over';
    ctx.globalAlpha = brushSettings.opacity;
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSettings.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Apply brush style
    if (brushSettings.style === 'soft') {
      ctx.filter = `blur(${Math.max(0, brushSettings.size * 0.1)}px)`;
    } else if (brushSettings.style === 'hard') {
      ctx.filter = 'none';
    } else if (brushSettings.style === 'textured') {
      ctx.setLineDash([brushSettings.size * 0.2, brushSettings.size * 0.1]);
    }
    
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    
    // Reset filter and line dash
    ctx.filter = 'none';
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  }, [currentTool, brushSettings, currentColor]);

  const drawShape = useCallback((start: Position, end: Position, ctx: CanvasRenderingContext2D, shape: Tool) => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = brushSettings.opacity;
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSettings.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
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
    ctx.globalAlpha = 1;
  }, [brushSettings, currentColor]);

  const pickColor = useCallback((position: Position, ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(Math.floor(position.x), Math.floor(position.y), 1, 1);
    const [r, g, b, a] = imageData.data;
    
    // Only pick color if the pixel has some opacity
    if (a > 0) {
      const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      return hex;
    }
    return null;
  }, []);

  const isShapeTool = useCallback((tool: Tool) => {
    return ['rectangle', 'circle', 'line', 'polygon'].includes(tool);
  }, []);

  return {
    drawLine,
    drawShape,
    pickColor,
    isShapeTool
  };
};
