
import { forwardRef, useEffect, ForwardedRef } from "react";
import { CanvasSize, Tool, BrushSettings } from "./usePaintingTool";

interface CanvasRendererProps {
  canvasSize: CanvasSize;
  currentTool: Tool;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseLeave: () => void;
  previewCanvasRef: React.RefObject<HTMLCanvasElement>;
  isDrawing?: boolean;
  brushSettings?: BrushSettings;
}

export const CanvasRenderer = forwardRef<HTMLCanvasElement, CanvasRendererProps>(
  ({ canvasSize, currentTool, onMouseDown, onMouseMove, onMouseUp, onMouseLeave, previewCanvasRef, isDrawing = false, brushSettings }, ref) => {
    
    // Initialize canvas only once
    useEffect(() => {
      if (!ref || typeof ref === 'function') return;
      const canvas = ref.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Only initialize if canvas is empty (first time setup)
      if (canvas.width === 0 || canvas.height === 0) {
        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;
        
        // Initialize with white background only for new canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }, [ref]); // Only run when ref changes, not when canvasSize changes

    // Handle canvas size changes without clearing content
    useEffect(() => {
      if (!ref || typeof ref === 'function') return;
      const canvas = ref.current;
      if (!canvas) return;
      
      // Only update size if it's different (avoid unnecessary updates)
      if (canvas.width !== canvasSize.width || canvas.height !== canvasSize.height) {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Save current content before resizing
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Update canvas size
        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;
        
        // Only restore if we had content before
        if (imageData.data.some(pixel => pixel !== 0)) {
          // Fill with white background first
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Restore previous content
          ctx.putImageData(imageData, 0, 0);
        } else {
          // If no content, just fill with white
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    }, [ref, canvasSize]);

    const getCursorStyle = () => {
      switch (currentTool) {
        case 'eyedropper':
          return 'crosshair';
        case 'flood-fill':
          return 'crosshair';
        case 'eraser':
          // Create a custom cursor showing eraser size
          if (brushSettings) {
            const size = Math.max(8, Math.min(32, brushSettings.size)); // Clamp cursor size
            const cursorSvg = `
              <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 1}" fill="none" stroke="black" stroke-width="1"/>
                <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 2}" fill="none" stroke="white" stroke-width="1"/>
              </svg>
            `;
            const encodedSvg = encodeURIComponent(cursorSvg);
            return `url("data:image/svg+xml,${encodedSvg}") ${size/2} ${size/2}, auto`;
          }
          return 'grab';
        case 'brush':
          return 'crosshair';
        case 'select':
          // When dragging, use nw-resize cursor to make the pointer appear at bottom-right
          return isDrawing ? 'nw-resize' : 'crosshair';
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
