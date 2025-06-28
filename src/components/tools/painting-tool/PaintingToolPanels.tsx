
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrushPanel } from "./BrushPanel";
import { ColorPanel } from "./ColorPanel";
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
  brushSettings,
  setBrushSettings,
  currentColor,
  setCurrentColor,
  textSettings,
  setTextSettings,
  canvasSize,
  setCanvasSize,
  selectionArea,
  canvasRef,
  previewColor,
  resizeCanvas,
  cropCanvas,
  uploadImage
}: PaintingToolPanelsProps) => {
  return (
    <Tabs defaultValue="brush" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="brush">Tools</TabsTrigger>
        <TabsTrigger value="color">Color</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      
      <TabsContent value="brush" className="space-y-4">
        <BrushPanel 
          brushSettings={brushSettings}
          onBrushSettingsChange={setBrushSettings}
        />
        <ShapePanel 
          onShapeSelect={(shape) => setCurrentTool(shape)}
          currentTool={currentTool}
        />
      </TabsContent>
      
      <TabsContent value="color" className="space-y-4">
        <ColorPanel 
          currentColor={currentColor}
          onColorChange={setCurrentColor}
          canvasRef={canvasRef}
          currentTool={currentTool}
          onToolChange={setCurrentTool}
          previewColor={previewColor}
        />
      </TabsContent>
      
      <TabsContent value="advanced" className="space-y-4">
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
      </TabsContent>
    </Tabs>
  );
};
