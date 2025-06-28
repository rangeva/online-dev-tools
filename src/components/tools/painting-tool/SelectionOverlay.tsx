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
    
    // Always keep the rectangle's top-left corner at the original click position
    // Calculate the actual rectangle bounds based on current mouse position
    const left = Math.min(area.startX, area.startX + area.width);
    const top = Math.min(area.startY, area.startY + area.height);
    const right = Math.max(area.startX, area.startX + area.width);
    const bottom = Math.max(area.startY, area.startY + area.height);
    
    return {
      left: `${left * scaleX}px`,
      top: `${top * scaleY}px`,
      width: `${(right - left) * scaleX}px`,
      height: `${(bottom - top) * scaleY}px`,
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
