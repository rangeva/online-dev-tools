import { forwardRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { BrushSettings, CanvasSize, Position, Tool, SelectionArea } from "./usePaintingTool";
import { CanvasContainer } from "./CanvasContainer";
import { ToolInstructions } from "./ToolInstructions";

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
    onAddText
  }, ref) => {
    
    const [pastedImagePosition, setPastedImagePosition] = useState<Position | null>(null);
    const [isDraggingPastedImage, setIsDraggingPastedImage] = useState(false);

    const handlePasteAtPosition = (position: Position) => {
      if (copiedImageData) {
        setPastedImagePosition(position);
        if (onPasteAt) {
          onPasteAt(position);
        }
      }
    };

    return (
      <Card className="p-4">
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
