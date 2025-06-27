
import { SelectionArea, CanvasSize } from "./usePaintingTool";

interface SelectionOverlayProps {
  selectionArea: SelectionArea;
  canvasSize: CanvasSize;
  canvasDisplaySize: { width: number; height: number };
  isDrawing: boolean;
}

export const SelectionOverlay = ({ 
  selectionArea, 
  canvasSize, 
  canvasDisplaySize, 
  isDrawing 
}: SelectionOverlayProps) => {
  const getSelectionOverlayStyle = (area: SelectionArea) => {
    const scaleX = canvasDisplaySize.width / canvasSize.width;
    const scaleY = canvasDisplaySize.height / canvasSize.height;
    
    return {
      left: `${area.startX * scaleX}px`,
      top: `${area.startY * scaleY}px`,
      width: `${area.width * scaleX}px`,
      height: `${area.height * scaleY}px`,
    };
  };

  if (isDrawing) {
    return (
      <div
        className="absolute border-2 border-dashed border-blue-500 bg-blue-200 bg-opacity-30 pointer-events-none"
        style={getSelectionOverlayStyle(selectionArea)}
      />
    );
  }

  return (
    <div
      className="absolute border-2 border-solid border-blue-600 bg-blue-300 bg-opacity-20 pointer-events-none"
      style={getSelectionOverlayStyle(selectionArea)}
    >
      <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        {Math.round(selectionArea.width)} × {Math.round(selectionArea.height)}
      </div>
    </div>
  );
};
