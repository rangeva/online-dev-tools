
import { forwardRef, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { BrushSettings, CanvasSize, Position, Tool } from "./usePaintingTool";

interface PaintingCanvasProps {
  canvasSize: CanvasSize;
  currentTool: Tool;
  brushSettings: BrushSettings;
  currentColor: string;
  isDrawing: boolean;
  setIsDrawing: (drawing: boolean) => void;
  lastPosition: Position | null;
  setLastPosition: (position: Position | null) => void;
  saveCanvasState: () => void;
  onColorPicked: (color: string) => void;
}

export const PaintingCanvas = forwardRef<HTMLCanvasElement, PaintingCanvasProps>(
  ({ canvasSize, currentTool, brushSettings, currentColor, isDrawing, setIsDrawing, lastPosition, setLastPosition, saveCanvasState, onColorPicked }, ref) => {
    
    const getCanvasCoordinates = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!ref || typeof ref === 'function') return { x: 0, y: 0 };
      
      const canvas = ref.current;
      if (!canvas) return { x: 0, y: 0 };
      
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }, [ref]);

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
      ctx.globalAlpha = brushSettings.opacity;
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSettings.size;
      
      ctx.beginPath();
      
      switch (shape) {
        case 'rectangle':
          ctx.rect(start.x, start.y, end.x - start.x, end.y - start.y);
          break;
        case 'circle':
          const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
          ctx.arc(start.x, start.y, radius, 0, 2 * Math.PI);
          break;
        case 'line':
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
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
        onColorPicked(hex);
      }
    }, [onColorPicked]);

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!ref || typeof ref === 'function') return;
      const canvas = ref.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const position = getCanvasCoordinates(e);
      
      if (currentTool === 'eyedropper') {
        pickColor(position, ctx);
        return;
      }
      
      saveCanvasState();
      setIsDrawing(true);
      setLastPosition(position);
      
      if (currentTool === 'brush' || currentTool === 'eraser') {
        ctx.globalCompositeOperation = currentTool === 'eraser' ? 'destination-out' : 'source-over';
        ctx.globalAlpha = brushSettings.opacity;
        ctx.fillStyle = currentColor;
        ctx.beginPath();
        ctx.arc(position.x, position.y, brushSettings.size / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }, [ref, getCanvasCoordinates, currentTool, pickColor, saveCanvasState, setIsDrawing, setLastPosition, brushSettings, currentColor]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!ref || typeof ref === 'function') return;
      const canvas = ref.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const currentPosition = getCanvasCoordinates(e);
      
      // Handle eyedropper hover preview
      if (currentTool === 'eyedropper') {
        // You could add hover preview functionality here
        return;
      }
      
      if (!isDrawing || !lastPosition) return;
      
      if (currentTool === 'brush' || currentTool === 'eraser') {
        drawLine(lastPosition, currentPosition, ctx);
      }
      
      setLastPosition(currentPosition);
    }, [isDrawing, lastPosition, ref, getCanvasCoordinates, currentTool, drawLine, setLastPosition]);

    const handleMouseUp = useCallback(() => {
      setIsDrawing(false);
      setLastPosition(null);
    }, [setIsDrawing, setLastPosition]);

    // Initialize canvas
    useEffect(() => {
      if (!ref || typeof ref === 'function') return;
      const canvas = ref.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Set canvas size
      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;
      
      // Initialize with white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, [ref, canvasSize]);

    const getCursorStyle = () => {
      switch (currentTool) {
        case 'eyedropper':
          return 'crosshair';
        case 'eraser':
          return 'grab';
        case 'brush':
          return 'crosshair';
        default:
          return 'crosshair';
      }
    };

    return (
      <Card className="p-4">
        <div className="flex justify-center">
          <canvas
            ref={ref}
            className="border border-gray-300 rounded-lg"
            style={{ 
              maxWidth: '100%', 
              maxHeight: '70vh',
              cursor: getCursorStyle()
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>
        {currentTool === 'eyedropper' && (
          <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Click anywhere on the canvas to pick a color
          </div>
        )}
      </Card>
    );
  }
);

PaintingCanvas.displayName = 'PaintingCanvas';
