
import { Position, CanvasSize } from "./usePaintingTool";

interface PastedImageOverlayProps {
  pastedImagePosition: Position;
  copiedImageData: ImageData;
  canvasSize: CanvasSize;
  canvasDisplaySize: { width: number; height: number };
  isDraggingPastedImage: boolean;
}

export const PastedImageOverlay = ({ 
  pastedImagePosition, 
  copiedImageData, 
  canvasSize, 
  canvasDisplaySize, 
  isDraggingPastedImage 
}: PastedImageOverlayProps) => {
  const getPastedImageOverlayStyle = (position: Position, imageData: ImageData) => {
    const scaleX = canvasDisplaySize.width / canvasSize.width;
    const scaleY = canvasDisplaySize.height / canvasSize.height;
    
    return {
      left: `${position.x * scaleX}px`,
      top: `${position.y * scaleY}px`,
      width: `${imageData.width * scaleX}px`,
      height: `${imageData.height * scaleY}px`,
    };
  };

  return (
    <div
      className={`absolute border-2 border-dashed border-green-500 bg-green-200 bg-opacity-20 pointer-events-none ${
        isDraggingPastedImage ? 'border-green-600' : ''
      }`}
      style={getPastedImageOverlayStyle(pastedImagePosition, copiedImageData)}
    >
      <div className="absolute -top-6 left-0 bg-green-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        Pasted - Click to move
      </div>
    </div>
  );
};
