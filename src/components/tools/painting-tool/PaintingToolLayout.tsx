
import { Card, CardContent } from "@/components/ui/card";
import { PaintingCanvas } from "./PaintingCanvas";
import { ToolbarPanel } from "./ToolbarPanel";
import { PaintingToolHeader } from "./PaintingToolHeader";
import { PaintingToolPanels } from "./PaintingToolPanels";
import { ResizeDialog } from "./ResizeDialog";
import { usePaintingToolState } from "./PaintingToolState";
import { usePaintingToolHandlers } from "./PaintingToolHandlers";

interface PaintingToolLayoutProps {
  state: ReturnType<typeof usePaintingToolState>;
  handlers: ReturnType<typeof usePaintingToolHandlers>;
}

export const PaintingToolLayout = ({ state, handlers }: PaintingToolLayoutProps) => {
  const {
    canvasRef,
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
    uploadImage,
    previewColor,
    resizeDialogOpen,
    setResizeDialogOpen,
    resizeType
  } = state;

  const {
    handleColorPicked,
    handleColorPreview,
    handleExport,
    handleAddText,
    handleImageResize,
    handleCanvasResize,
    handleResize
  } = handlers;

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
            brushSettings={brushSettings}
            onBrushSettingsChange={setBrushSettings}
            currentColor={currentColor}
            onColorChange={setCurrentColor}
            previewColor={previewColor}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Tool Panels - Only show non-brush panels */}
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
