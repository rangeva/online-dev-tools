
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Resize, Crop } from "lucide-react";
import { CanvasSize, SelectionArea } from "./usePaintingTool";
import { useState } from "react";

interface ResizeCropPanelProps {
  canvasSize: CanvasSize;
  selectionArea: SelectionArea | null;
  onResize: (size: CanvasSize) => void;
  onCrop: (selection: SelectionArea) => void;
}

export const ResizeCropPanel = ({ 
  canvasSize, 
  selectionArea, 
  onResize, 
  onCrop 
}: ResizeCropPanelProps) => {
  const [newWidth, setNewWidth] = useState(canvasSize.width);
  const [newHeight, setNewHeight] = useState(canvasSize.height);

  const handleResize = () => {
    onResize({ width: newWidth, height: newHeight });
  };

  const handleCrop = () => {
    if (selectionArea) {
      onCrop(selectionArea);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Resize className="w-4 h-4" />
          Resize & Crop
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Resize Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Resize className="w-4 h-4" />
            <span className="text-sm font-medium">Resize Canvas</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="canvas-width" className="text-xs">Width</Label>
              <Input
                id="canvas-width"
                type="number"
                min="100"
                max="2000"
                value={newWidth}
                onChange={(e) => setNewWidth(parseInt(e.target.value) || canvasSize.width)}
                className="h-8"
              />
            </div>
            <div>
              <Label htmlFor="canvas-height" className="text-xs">Height</Label>
              <Input
                id="canvas-height"
                type="number"
                min="100"
                max="2000"
                value={newHeight}
                onChange={(e) => setNewHeight(parseInt(e.target.value) || canvasSize.height)}
                className="h-8"
              />
            </div>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400">
            Current: {canvasSize.width} × {canvasSize.height}
          </div>

          <Button onClick={handleResize} size="sm" className="w-full">
            <Resize className="w-4 h-4 mr-2" />
            Apply Resize
          </Button>
        </div>

        <Separator />

        {/* Crop Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Crop className="w-4 h-4" />
            <span className="text-sm font-medium">Crop Canvas</span>
          </div>

          {selectionArea ? (
            <div className="space-y-2">
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Selection: {selectionArea.width} × {selectionArea.height}
              </div>
              <Button onClick={handleCrop} size="sm" className="w-full">
                <Crop className="w-4 h-4 mr-2" />
                Crop to Selection
              </Button>
            </div>
          ) : (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Make a selection first to enable cropping
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
