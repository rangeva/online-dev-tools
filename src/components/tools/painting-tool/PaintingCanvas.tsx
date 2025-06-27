
import { forwardRef, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { BrushSettings, CanvasSize, Position, Tool, SelectionArea } from "./usePaintingTool";
import { ShapePreview } from "./ShapePreview";
import { CanvasRenderer } from "./CanvasRenderer";
import { useCanvasEventHandlers } from "./CanvasEventHandlers";

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
  onColorPreview?: (color: string | null) => void;
  selectionArea?: SelectionArea | null;
  setSelectionArea?: (area: SelectionArea | null) => void;
  onTextClick?: (position: Position) => void;
  onPasteAt?: (position: Position) => void;
  copiedImageData?: ImageData | null;
}

export const PaintingCanvas = forwardRef<HTMLCanvasElement, PaintingCanvasProps>(
  ({ 
    canvasSize, 
    currentTool, 
    brushSettings, 
    currentColor, 
    isDrawing, 
    setIsDrawing, 
    lastPosition, 
    setLastPosition, 
    saveCanvasState, 
    onColorPicked, 
    onColorPreview,
    selectionArea,
    setSelectionArea,
    onTextClick,
    onPasteAt,
    copiedImageData
  }, ref) => {
    
    const [shapeStartPosition, setShapeStartPosition] = useState<Position | null>(null);
    const [pastedImagePosition, setPastedImagePosition] = useState<Position | null>(null);
    const [isDraggingPastedImage, setIsDraggingPastedImage] = useState(false);

    const { previewCanvasRef, drawShapePreview, clearShapePreview } = ShapePreview({
      canvasSize,
      currentColor,
      brushSize: brushSettings.size
    });

    const { handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave } = useCanvasEventHandlers({
      canvasRef: ref,
      currentTool,
      brushSettings,
      currentColor,
      isDrawing,
      setIsDrawing,
      lastPosition,
      setLastPosition,
      saveCanvasState,
      onColorPicked,
      onColorPreview,
      shapeStartPosition,
      setShapeStartPosition,
      drawShapePreview,
      clearShapePreview,
      selectionArea,
      setSelectionArea,
      onTextClick,
      onPasteAt,
      copiedImageData,
      pastedImagePosition,
      setPastedImagePosition,
      isDraggingPastedImage,
      setIsDraggingPastedImage
    });

    // Render pasted image on canvas
    useEffect(() => {
      if (!ref || typeof ref === 'function' || !ref.current) return;
      if (!pastedImagePosition || !copiedImageData) return;
      
      const canvas = ref.current;
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
    }, [pastedImagePosition, copiedImageData, ref]);

    const handlePasteAtPosition = (position: Position) => {
      if (copiedImageData) {
        setPastedImagePosition(position);
        if (onPasteAt) {
          onPasteAt(position);
        }
      }
    };

    const isShapeTool = (tool: Tool) => {
      return ['rectangle', 'circle', 'line', 'polygon'].includes(tool);
    };

    const getToolInstructions = () => {
      switch (currentTool) {
        case 'eyedropper':
          return 'Hover over the canvas to preview colors, click to select';
        case 'select':
          return 'Click and drag to make a selection. Selected area can be copied or cut.';
        case 'text':
          return 'Click where you want to add text';
        case 'crop':
          return 'Make a selection first, then use the crop tool in the Advanced panel';
        case 'resize':
          return 'Use the resize controls in the Advanced panel';
        default:
          if (isShapeTool(currentTool)) {
            return `Click and drag to draw a ${currentTool}`;
          }
          return '';
      }
    };

    return (
      <Card className="p-4">
        <div className="relative">
          <CanvasRenderer
            ref={ref}
            canvasSize={canvasSize}
            currentTool={currentTool}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            previewCanvasRef={previewCanvasRef}
          />
          
          {/* Selection preview overlay - shown while dragging */}
          {currentTool === 'select' && isDrawing && selectionArea && (
            <div
              className="absolute border-2 border-dashed border-blue-500 bg-blue-200 bg-opacity-30 pointer-events-none"
              style={{
                left: `${(selectionArea.startX / canvasSize.width) * 100}%`,
                top: `${(selectionArea.startY / canvasSize.height) * 100}%`,
                width: `${(selectionArea.width / canvasSize.width) * 100}%`,
                height: `${(selectionArea.height / canvasSize.height) * 100}%`,
              }}
            />
          )}
          
          {/* Final selection overlay - shown after selection is made */}
          {currentTool === 'select' && !isDrawing && selectionArea && (
            <div
              className="absolute border-2 border-solid border-blue-600 bg-blue-300 bg-opacity-20 pointer-events-none"
              style={{
                left: `${(selectionArea.startX / canvasSize.width) * 100}%`,
                top: `${(selectionArea.startY / canvasSize.height) * 100}%`,
                width: `${(selectionArea.width / canvasSize.width) * 100}%`,
                height: `${(selectionArea.height / canvasSize.height) * 100}%`,
              }}
            >
              <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                {Math.round(selectionArea.width)} × {Math.round(selectionArea.height)}
              </div>
            </div>
          )}

          {/* Pasted image overlay */}
          {pastedImagePosition && copiedImageData && (
            <div
              className={`absolute border-2 border-dashed border-green-500 bg-green-200 bg-opacity-20 pointer-events-none ${isDraggingPastedImage ? 'border-green-600' : ''}`}
              style={{
                left: `${(pastedImagePosition.x / canvasSize.width) * 100}%`,
                top: `${(pastedImagePosition.y / canvasSize.height) * 100}%`,
                width: `${(copiedImageData.width / canvasSize.width) * 100}%`,
                height: `${(copiedImageData.height / canvasSize.height) * 100}%`,
              }}
            >
              <div className="absolute -top-6 left-0 bg-green-600 text-white text-xs px-2 py-1 rounded">
                Pasted - Click to move
              </div>
            </div>
          )}
        </div>

        {getToolInstructions() && (
          <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {getToolInstructions()}
          </div>
        )}

        {currentTool === 'select' && selectionArea && !isDrawing && (
          <div className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
            Selection: {Math.round(selectionArea.width)} × {Math.round(selectionArea.height)} px - Use Copy/Cut buttons in toolbar
          </div>
        )}

        {pastedImagePosition && copiedImageData && (
          <div className="mt-2 text-center text-xs text-green-600 dark:text-green-400">
            Pasted content can be moved by clicking and dragging
          </div>
        )}
      </Card>
    );
  }
);

PaintingCanvas.displayName = 'PaintingCanvas';
