
import { ShapePanel } from "./ShapePanel";
import { TextPanel } from "./TextPanel";
import { ResizeCropPanel } from "./ResizeCropPanel";
import { ImageUploadPanel } from "./ImageUploadPanel";
import { Tool, BrushSettings, TextSettings, CanvasSize, SelectionArea } from "./usePaintingTool";
import { RefObject } from "react";

interface PaintingToolPanelsProps {
  currentTool: Tool;
  setCurrentTool: (tool: Tool) => void;
  brushSettings: BrushSettings;
  setBrushSettings: (settings: BrushSettings) => void;
  currentColor: string;
  setCurrentColor: (color: string) => void;
  textSettings: TextSettings;
  setTextSettings: (settings: TextSettings) => void;
  canvasSize: CanvasSize;
  setCanvasSize: (size: CanvasSize) => void;
  selectionArea: SelectionArea | null;
  canvasRef: RefObject<HTMLCanvasElement>;
  previewColor?: string;
  resizeCanvas: (newSize: { width: number; height: number }) => void;
  cropCanvas: (selection: { startX: number; startY: number; width: number; height: number }) => void;
  uploadImage: (file: File) => void;
}

export const PaintingToolPanels = ({
  currentTool,
  setCurrentTool,
  textSettings,
  setTextSettings,
  canvasSize,
  setCanvasSize,
  selectionArea,
  resizeCanvas,
  cropCanvas,
  uploadImage
}: PaintingToolPanelsProps) => {
  return (
    <div className="space-y-4">
      <ShapePanel 
        onShapeSelect={(shape) => setCurrentTool(shape)}
        currentTool={currentTool}
      />
      
      {(currentTool === 'text') && (
        <TextPanel 
          textSettings={textSettings}
          onTextSettingsChange={setTextSettings}
        />
      )}
      
      {(currentTool === 'resize' || currentTool === 'crop') && (
        <ResizeCropPanel 
          canvasSize={canvasSize}
          selectionArea={selectionArea}
          onResize={resizeCanvas}
          onCrop={cropCanvas}
        />
      )}
      
      <ImageUploadPanel 
        onImageUpload={uploadImage}
        canvasSize={canvasSize}
        onCanvasSizeChange={setCanvasSize}
      />
    </div>
  );
};
