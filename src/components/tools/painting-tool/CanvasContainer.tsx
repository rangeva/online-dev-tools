
import { forwardRef, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { BrushSettings, CanvasSize, Position, Tool, SelectionArea, TextSettings } from "./usePaintingTool";
import { ShapePreview } from "./ShapePreview";
import { CanvasRenderer } from "./CanvasRenderer";
import { useCanvasEventHandlers } from "./CanvasEventHandlers";
import { useCanvasDisplaySize } from "./useCanvasDisplaySize";
import { usePastedImageRenderer } from "./usePastedImageRenderer";
import { useShapeHandling } from "./useShapeHandling";
import { SelectionOverlay } from "./SelectionOverlay";
import { PastedImageOverlay } from "./PastedImageOverlay";
import { TextPreview } from "./TextPreview";

interface CanvasContainerProps {
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
  pastedImagePosition?: Position | null;
  setPastedImagePosition?: (position: Position | null) => void;
  isDraggingPastedImage?: boolean;
  setIsDraggingPastedImage?: (dragging: boolean) => void;
  textSettings?: TextSettings;
  onAddText?: (position: Position, text: string, settings?: TextSettings) => void;
}

export const CanvasContainer = forwardRef<HTMLCanvasElement, CanvasContainerProps>(
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
    pastedImagePosition,
    setPastedImagePosition,
    isDraggingPastedImage,
    setIsDraggingPastedImage,
    textSettings,
    onAddText
  }, ref) => {
    
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const canvasDisplaySize = useCanvasDisplaySize(ref);
    const { shapeStartPosition, setShapeStartPosition } = useShapeHandling();
    const [textPreviewPosition, setTextPreviewPosition] = useState<Position | null>(null);

    const { previewCanvasRef, drawShapePreview, clearShapePreview } = ShapePreview({
      canvasSize,
      currentColor,
      brushSize: brushSettings.size
    });

    const handleTextClick = (position: Position) => {
      setTextPreviewPosition(position);
      if (onTextClick) {
        onTextClick(position);
      }
    };

    const handleTextConfirm = (text: string, settings: TextSettings) => {
      if (textPreviewPosition && onAddText) {
        onAddText(textPreviewPosition, text, settings);
      }
      setTextPreviewPosition(null);
    };

    const handleTextCancel = () => {
      setTextPreviewPosition(null);
    };

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
      onTextClick: handleTextClick,
      onPasteAt,
      copiedImageData,
      pastedImagePosition,
      setPastedImagePosition,
      isDraggingPastedImage,
      setIsDraggingPastedImage
    });

    usePastedImageRenderer({
      canvasRef: ref,
      pastedImagePosition,
      copiedImageData
    });

    return (
      <div className="relative" ref={canvasContainerRef}>
        <CanvasRenderer
          ref={ref}
          canvasSize={canvasSize}
          currentTool={currentTool}
          brushSettings={brushSettings}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          previewCanvasRef={previewCanvasRef}
          isDrawing={isDrawing}
        />
        
        {/* Selection overlay - show when select or crop tool is active and has selection area */}
        {(currentTool === 'select' || currentTool === 'crop') && selectionArea && canvasDisplaySize && Math.abs(selectionArea.width) > 0 && Math.abs(selectionArea.height) > 0 && (
          <SelectionOverlay
            selectionArea={selectionArea}
            canvasSize={canvasSize}
            canvasDisplaySize={canvasDisplaySize}
            isDrawing={isDrawing}
          />
        )}

        {/* Pasted image overlay */}
        {pastedImagePosition && copiedImageData && canvasDisplaySize && (
          <PastedImageOverlay
            pastedImagePosition={pastedImagePosition}
            copiedImageData={copiedImageData}
            canvasSize={canvasSize}
            canvasDisplaySize={canvasDisplaySize}
            isDraggingPastedImage={isDraggingPastedImage || false}
          />
        )}

        {/* Text preview overlay */}
        {textPreviewPosition && textSettings && canvasDisplaySize && (
          <TextPreview
            position={textPreviewPosition}
            textSettings={textSettings}
            canvasSize={canvasSize}
            canvasDisplaySize={canvasDisplaySize}
            onConfirm={handleTextConfirm}
            onCancel={handleTextCancel}
          />
        )}
      </div>
    );
  }
);

CanvasContainer.displayName = 'CanvasContainer';
