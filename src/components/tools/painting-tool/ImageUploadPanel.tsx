
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CanvasSize } from "./usePaintingTool";

interface ImageUploadPanelProps {
  onImageUpload: (file: File) => void;
  canvasSize: CanvasSize;
  onCanvasSizeChange: (size: CanvasSize) => void;
}

export const ImageUploadPanel = ({ onImageUpload, canvasSize, onCanvasSizeChange }: ImageUploadPanelProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleCanvasSizeChange = (dimension: 'width' | 'height', value: number) => {
    onCanvasSizeChange({
      ...canvasSize,
      [dimension]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Upload & Canvas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Upload Image</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            variant="outline"
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
          >
            📁 Upload Image
          </Button>
        </div>

        <div className="space-y-3">
          <Label>Canvas Size</Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-xs w-12">Width:</Label>
              <Input
                type="number"
                value={canvasSize.width}
                onChange={(e) => handleCanvasSizeChange('width', parseInt(e.target.value) || 800)}
                min={100}
                max={2000}
                className="text-xs"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-xs w-12">Height:</Label>
              <Input
                type="number"
                value={canvasSize.height}
                onChange={(e) => handleCanvasSizeChange('height', parseInt(e.target.value) || 600)}
                min={100}
                max={2000}
                className="text-xs"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Quick Presets</Label>
          <div className="grid grid-cols-2 gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCanvasSizeChange({ width: 800, height: 600 })}
            >
              800×600
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCanvasSizeChange({ width: 1024, height: 768 })}
            >
              1024×768
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCanvasSizeChange({ width: 1920, height: 1080 })}
            >
              1920×1080
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCanvasSizeChange({ width: 1080, height: 1080 })}
            >
              Square
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
