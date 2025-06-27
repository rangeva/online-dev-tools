
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
    
    // Handle negative width/height by adjusting the position and making dimensions positive
    const actualStartX = area.width < 0 ? area.startX + area.width : area.startX;
    const actualStartY = area.height < 0 ? area.startY + area.height : area.startY;
    const actualWidth = Math.abs(area.width);
    const actualHeight = Math.abs(area.height);
    
    return {
      left: `${actualStartX * scaleX}px`,
      top: `${actualStartY * scaleY}px`,
      width: `${actualWidth * scaleX}px`,
      height: `${actualHeight * scaleY}px`,
    };
  };

  const getDisplayDimensions = (area: SelectionArea) => {
    return {
      width: Math.abs(area.width),
      height: Math.abs(area.height)
    };
  };

  const dimensions = getDisplayDimensions(selectionArea);

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
        {Math.round(dimensions.width)} × {Math.round(dimensions.height)}
      </div>
    </div>
  );
};
