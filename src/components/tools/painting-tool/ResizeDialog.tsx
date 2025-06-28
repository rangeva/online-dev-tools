
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CanvasSize } from "./usePaintingTool";

interface ResizeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'image' | 'canvas';
  currentSize: CanvasSize;
  onResize: (size: CanvasSize) => void;
}

const PREDEFINED_SIZES = [
  { name: "Small (400×300)", width: 400, height: 300 },
  { name: "Medium (800×600)", width: 800, height: 600 },
  { name: "Large (1200×800)", width: 1200, height: 800 },
  { name: "HD (1920×1080)", width: 1920, height: 1080 },
  { name: "Square Small (400×400)", width: 400, height: 400 },
  { name: "Square Medium (800×800)", width: 800, height: 800 },
  { name: "Instagram Post (1080×1080)", width: 1080, height: 1080 },
  { name: "Instagram Story (1080×1920)", width: 1080, height: 1920 },
];

export const ResizeDialog = ({ 
  isOpen, 
  onClose, 
  type, 
  currentSize, 
  onResize 
}: ResizeDialogProps) => {
  const [width, setWidth] = useState(currentSize.width);
  const [height, setHeight] = useState(currentSize.height);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);

  const aspectRatio = currentSize.width / currentSize.height;

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (maintainAspectRatio) {
      setHeight(Math.round(newWidth / aspectRatio));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (maintainAspectRatio) {
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };

  const handlePredefinedSize = (size: { width: number; height: number }) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  const handleApply = () => {
    onResize({ width, height });
    onClose();
  };

  const title = type === 'image' ? 'Resize Image' : 'Resize Canvas';
  const description = type === 'image' 
    ? 'Resize the image content while maintaining quality'
    : 'Resize the canvas dimensions (may crop or add space)';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Size Display */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Current size: {currentSize.width} × {currentSize.height}
          </div>

          {/* Custom Size Inputs */}
          <div className="space-y-4">
            <h3 className="font-medium">Custom Size</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="width">Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  min="100"
                  max="4000"
                  value={width}
                  onChange={(e) => handleWidthChange(parseInt(e.target.value) || currentSize.width)}
                />
              </div>
              <div>
                <Label htmlFor="height">Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  min="100"
                  max="4000"
                  value={height}
                  onChange={(e) => handleHeightChange(parseInt(e.target.value) || currentSize.height)}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="aspect-ratio"
                checked={maintainAspectRatio}
                onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="aspect-ratio" className="text-sm">
                Maintain aspect ratio
              </Label>
            </div>
          </div>

          {/* Predefined Sizes */}
          <div className="space-y-4">
            <h3 className="font-medium">Predefined Sizes</h3>
            <div className="grid grid-cols-2 gap-2">
              {PREDEFINED_SIZES.map((size) => (
                <Card 
                  key={size.name} 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => handlePredefinedSize(size)}
                >
                  <CardContent className="p-3">
                    <div className="text-sm font-medium">{size.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {size.width} × {size.height}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-600">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleApply}>
              Apply Resize
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
