
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PaintingCanvas } from "./PaintingCanvas";
import { ToolbarPanel } from "./ToolbarPanel";
import { PaintingToolHeader } from "./PaintingToolHeader";
import { PaintingToolPanels } from "./PaintingToolPanels";
import { ResizeDialog } from "./ResizeDialog";
import { usePaintingTool } from "./usePaintingTool";
import { usePaintingKeyboardShortcuts } from "./usePaintingKeyboardShortcuts";

export const PaintingToolMain = () => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewColor, setPreviewColor] = useState<string | null>(null);
  const [resizeDialogOpen, setResizeDialogOpen] = useState(false);
  const [resizeType, setResizeType] = useState<'image' | 'canvas'>('canvas');
  
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

  // Handle keyboard shortcuts
  usePaintingKeyboardShortcuts({
    undo,
    redo,
    selectionArea,
    copySelection,
    cutSelection,
    copiedImageData
  });

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

  const handleImageResize = () => {
    setResizeType('image');
    setResizeDialogOpen(true);
  };

  const handleCanvasResize = () => {
    setResizeType('canvas');
    setResizeDialogOpen(true);
  };

  const handleResize = (newSize: { width: number; height: number }) => {
    if (resizeType === 'image') {
      // For image resize, we scale the existing content
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Create a temporary canvas with current content
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.drawImage(canvas, 0, 0);

      // Resize main canvas
      canvas.width = newSize.width;
      canvas.height = newSize.height;
      setCanvasSize(newSize);

      // Fill with white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Scale and draw the previous content
      ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, newSize.width, newSize.height);
      
      toast({
        title: "Image Resized",
        description: `Image scaled to ${newSize.width}×${newSize.height}`,
      });
    } else {
      // For canvas resize, use the existing resizeCanvas function
      resizeCanvas(newSize);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <Card>
        <PaintingToolHeader />
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
            onImageUpload={uploadImage}
            onImageResize={handleImageResize}
            onCanvasResize={handleCanvasResize}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Tool Panels */}
            <div className="lg:col-span-1 space-y-4">
              <PaintingToolPanels
                currentTool={currentTool}
                setCurrentTool={setCurrentTool}
                brushSettings={brushSettings}
                setBrushSettings={setBrushSettings}
                currentColor={currentColor}
                setCurrentColor={setCurrentColor}
                textSettings={textSettings}
                setTextSettings={setTextSettings}
                canvasSize={canvasSize}
                setCanvasSize={setCanvasSize}
                selectionArea={selectionArea}
                canvasRef={canvasRef}
                previewColor={previewColor}
                resizeCanvas={resizeCanvas}
                cropCanvas={cropCanvas}
                uploadImage={uploadImage}
              />
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
                cropCanvas={cropCanvas}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resize Dialog */}
      <ResizeDialog
        isOpen={resizeDialogOpen}
        onClose={() => setResizeDialogOpen(false)}
        type={resizeType}
        currentSize={canvasSize}
        onResize={handleResize}
      />
    </div>
  );
};
