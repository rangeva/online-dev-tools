import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { BrushPanel } from "./painting-tool/BrushPanel";
import { ColorPanel } from "./painting-tool/ColorPanel";
import { ShapePanel } from "./painting-tool/ShapePanel";
import { LayerPanel } from "./painting-tool/LayerPanel";
import { TextPanel } from "./painting-tool/TextPanel";
import { ResizeCropPanel } from "./painting-tool/ResizeCropPanel";
import { PaintingCanvas } from "./painting-tool/PaintingCanvas";
import { ToolbarPanel } from "./painting-tool/ToolbarPanel";
import { ImageUploadPanel } from "./painting-tool/ImageUploadPanel";
import { usePaintingTool } from "./painting-tool/usePaintingTool";

const PaintingDrawingTool = () => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewColor, setPreviewColor] = useState<string | null>(null);
  
  const {
    currentTool,
    setCurrentTool,
    brushSettings,
    setBrushSettings,
    currentColor,
    setCurrentColor,
    canvasSize,
    setCanvasSize,
    isDrawing,
    setIsDrawing,
    lastPosition,
    setLastPosition,
    undoStack,
    redoStack,
    textSettings,
    setTextSettings,
    selectionArea,
    setSelectionArea,
    copiedImageData,
    saveCanvasState,
    undo,
    redo,
    clearCanvas,
    resizeCanvas,
    cropCanvas,
    copySelection,
    pasteSelection,
    cutSelection,
    addText,
    exportCanvas,
    uploadImage
  } = usePaintingTool(canvasRef);

  const handleColorPicked = (color: string) => {
    setCurrentColor(color);
    setCurrentTool('brush'); // Switch back to brush after picking color
    toast({
      title: "Color Picked",
      description: `Selected color: ${color}`,
    });
  };

  const handleColorPreview = (color: string | null) => {
    setPreviewColor(color);
  };

  const handleExport = (format?: 'png' | 'jpg' | 'gif' | 'bmp') => {
    exportCanvas(format);
  };

  const handleAddText = (position: { x: number; y: number }, text: string, settings?: typeof textSettings) => {
    addText(position, text, settings);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case 'y':
            e.preventDefault();
            redo();
            break;
          case 'c':
            if (selectionArea) {
              e.preventDefault();
              copySelection();
            }
            break;
          case 'x':
            if (selectionArea) {
              e.preventDefault();
              cutSelection();
            }
            break;
          case 'v':
            if (copiedImageData) {
              e.preventDefault();
              // Paste will be handled by clicking on canvas
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, selectionArea, copySelection, cutSelection, copiedImageData, pasteSelection]);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            Painting & Drawing Tool
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Toolbar */}
          <ToolbarPanel 
            currentTool={currentTool}
            onToolChange={setCurrentTool}
            canUndo={undoStack.length > 0}
            canRedo={redoStack.length > 0}
            onUndo={undo}
            onRedo={redo}
            onClear={clearCanvas}
            onExport={handleExport}
            onCopy={copySelection}
            onCut={cutSelection}
            canCopy={selectionArea !== null}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Tool Panels */}
            <div className="lg:col-span-1 space-y-4">
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
            </div>

            {/* Canvas Area */}
            <div className="lg:col-span-3">
              <PaintingCanvas 
                ref={canvasRef}
                canvasSize={canvasSize}
                currentTool={currentTool}
                brushSettings={brushSettings}
                currentColor={currentColor}
                isDrawing={isDrawing}
                setIsDrawing={setIsDrawing}
                lastPosition={lastPosition}
                setLastPosition={setLastPosition}
                saveCanvasState={saveCanvasState}
                onColorPicked={handleColorPicked}
                onColorPreview={handleColorPreview}
                selectionArea={selectionArea}
                setSelectionArea={setSelectionArea}
                onPasteAt={pasteSelection}
                copiedImageData={copiedImageData}
                textSettings={textSettings}
                onAddText={handleAddText}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaintingDrawingTool;
