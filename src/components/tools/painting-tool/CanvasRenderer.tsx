
import { forwardRef, useEffect } from "react";
import { CanvasSize, Tool } from "./usePaintingTool";

interface CanvasRendererProps {
  canvasSize: CanvasSize;
  currentTool: Tool;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseLeave: () => void;
  previewCanvasRef: React.RefObject<HTMLCanvasElement>;
}

export const CanvasRenderer = forwardRef<HTMLCanvasElement, CanvasRendererProps>(
  ({ canvasSize, currentTool, onMouseDown, onMouseMove, onMouseUp, onMouseLeave, previewCanvasRef }, ref) => {
    
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
        case 'rectangle':
        case 'circle':
        case 'line':
        case 'polygon':
          return 'crosshair';
        default:
          return 'crosshair';
      }
    };

    const isShapeTool = (tool: Tool) => {
      return ['rectangle', 'circle', 'line', 'polygon'].includes(tool);
    };

    return (
      <div className="flex justify-center">
        <div className="relative">
          <canvas
            ref={ref}
            className="border border-gray-300 rounded-lg"
            style={{ 
              maxWidth: '100%', 
              maxHeight: '70vh',
              cursor: getCursorStyle()
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
          />
          {/* Preview canvas overlay */}
          <canvas
            ref={previewCanvasRef}
            className="absolute top-0 left-0 pointer-events-none"
            style={{ 
              maxWidth: '100%', 
              maxHeight: '70vh'
            }}
          />
        </div>
      </div>
    );
  }
);

CanvasRenderer.displayName = 'CanvasRenderer';
