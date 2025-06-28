
import { forwardRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { BrushSettings, CanvasSize, Position, Tool, SelectionArea } from "./usePaintingTool";
import { CanvasContainer } from "./CanvasContainer";
import { ToolInstructions } from "./ToolInstructions";
import { CropApprovalOverlay } from "./CropApprovalOverlay";
import { useCanvasDisplaySize } from "./useCanvasDisplaySize";

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
  textSettings?: any;
  onAddText?: (position: Position, text: string, settings?: any) => void;
  cropCanvas?: (selection: SelectionArea) => void;
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
    copiedImageData,
    textSettings,
    onAddText,
    cropCanvas
  }, ref) => {
    
    const [pastedImagePosition, setPastedImagePosition] = useState<Position | null>(null);
    const [isDraggingPastedImage, setIsDraggingPastedImage] = useState(false);
    const canvasDisplaySize = useCanvasDisplaySize(ref);

    const handlePasteAtPosition = (position: Position) => {
      if (copiedImageData) {
        setPastedImagePosition(position);
        if (onPasteAt) {
          onPasteAt(position);
        }
      }
    };

    const handleCropApprove = () => {
      if (selectionArea && cropCanvas) {
        // Normalize the selection area to handle negative dimensions
        const normalizedSelection = {
          startX: selectionArea.width < 0 ? selectionArea.startX + selectionArea.width : selectionArea.startX,
          startY: selectionArea.height < 0 ? selectionArea.startY + selectionArea.height : selectionArea.startY,
          width: Math.abs(selectionArea.width),
          height: Math.abs(selectionArea.height)
        };
        
        cropCanvas(normalizedSelection);
      }
    };

    const handleCropCancel = () => {
      if (setSelectionArea) {
        setSelectionArea(null);
      }
    };

    const showCropApproval = currentTool === 'crop' && selectionArea && !isDrawing && Math.abs(selectionArea.width) > 0 && Math.abs(selectionArea.height) > 0;

    return (
      <Card className="p-4">
        <div className="relative">
          <CanvasContainer
            ref={ref}
            canvasSize={canvasSize}
            currentTool={currentTool}
            brushSettings={brushSettings}
            currentColor={currentColor}
            isDrawing={isDrawing}
            setIsDrawing={setIsDrawing}
            lastPosition={lastPosition}
            setLastPosition={setLastPosition}
            saveCanvasState={saveCanvasState}
            onColorPicked={onColorPicked}
            onColorPreview={onColorPreview}
            selectionArea={selectionArea}
            setSelectionArea={setSelectionArea}
            onTextClick={onTextClick}
            onPasteAt={handlePasteAtPosition}
            copiedImageData={copiedImageData}
            pastedImagePosition={pastedImagePosition}
            setPastedImagePosition={setPastedImagePosition}
            isDraggingPastedImage={isDraggingPastedImage}
            setIsDraggingPastedImage={setIsDraggingPastedImage}
            textSettings={textSettings}
            onAddText={onAddText}
          />

          {/* Crop approval overlay */}
          {showCropApproval && canvasDisplaySize && (
            <CropApprovalOverlay
              selectionArea={selectionArea}
              canvasSize={canvasSize}
              canvasDisplaySize={canvasDisplaySize}
              onApprove={handleCropApprove}
              onCancel={handleCropCancel}
            />
          )}
        </div>

        <div className="mt-2">
          <ToolInstructions
            currentTool={currentTool}
            selectionArea={selectionArea}
            isDrawing={isDrawing}
            pastedImagePosition={pastedImagePosition}
          />
        </div>
      </Card>
    );
  }
);

PaintingCanvas.displayName = 'PaintingCanvas';
