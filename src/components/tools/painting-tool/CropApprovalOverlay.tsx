
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X, Crop } from "lucide-react";
import { SelectionArea, CanvasSize } from "./usePaintingTool";

interface CropApprovalOverlayProps {
  selectionArea: SelectionArea;
  canvasSize: CanvasSize;
  canvasDisplaySize: { width: number; height: number };
  onApprove: () => void;
  onCancel: () => void;
}

export const CropApprovalOverlay = ({ 
  selectionArea, 
  canvasSize, 
  canvasDisplaySize,
  onApprove,
  onCancel
}: CropApprovalOverlayProps) => {
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
  const overlayStyle = getSelectionOverlayStyle(selectionArea);

  return (
    <>
      {/* Selection area highlight */}
      <div
        className="absolute border-2 border-dashed border-orange-500 bg-orange-200 bg-opacity-30 pointer-events-none"
        style={overlayStyle}
      >
        <div className="absolute -top-6 left-0 bg-orange-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {Math.round(dimensions.width)} × {Math.round(dimensions.height)}
        </div>
      </div>

      {/* Control buttons */}
      <Card className="absolute top-4 left-4 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Crop className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium">Crop Selection</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={onApprove}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Check className="w-4 h-4 mr-1" />
              Apply
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={onCancel}
              className="border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};
