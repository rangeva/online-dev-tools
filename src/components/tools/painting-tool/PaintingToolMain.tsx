import { useRef } from "react";
import { PaintingCanvas } from "./PaintingCanvas";
import { ToolbarPanel } from "./ToolbarPanel";
import { PaintingToolPanels } from "./PaintingToolPanels";
import { ResizeDialog } from "./ResizeDialog";
import { PaintingToolLayout } from "./PaintingToolLayout";
import { usePaintingTool } from "./usePaintingTool";
import { usePaintingKeyboardShortcuts } from "./usePaintingKeyboardShortcuts";
import { useDialogState } from "./useDialogState";
import { usePaintingEventHandlers } from "./usePaintingEventHandlers";

export const PaintingToolMain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
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

  const {
    resizeDialogOpen,
    resizeType,
    openImageResize,
    openCanvasResize,
    closeDialog
  } = useDialogState();

  const {
    previewColor,
    handleColorPicked,
    handleColorPreview,
    handleExport,
    handleAddText,
    handleResize
  } = usePaintingEventHandlers({
    canvasRef,
    canvasSize,
    setCanvasSize,
    setCurrentTool,
    textSettings,
    exportCanvas,
    addText
  });

  // Handle keyboard shortcuts
  usePaintingKeyboardShortcuts({
    undo,
    redo,
    selectionArea,
    copySelection,
    cutSelection,
    copiedImageData
  });

  const handleResizeSubmit = (newSize: { width: number; height: number }) => {
    if (resizeType === 'canvas') {
      resizeCanvas(newSize);
    } else {
      handleResize(newSize, resizeType);
    }
  };

  const toolbar = (
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
      onImageResize={openImageResize}
      onCanvasResize={openCanvasResize}
      currentColor={currentColor}
      onColorChange={setCurrentColor}
      canvasRef={canvasRef}
      previewColor={previewColor}
      brushSettings={brushSettings}
      onBrushSettingsChange={setBrushSettings}
    />
  );

  const panels = (
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
  );

  const canvas = (
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
  );

  const dialogs = (
    <ResizeDialog
      isOpen={resizeDialogOpen}
      onClose={closeDialog}
      type={resizeType}
      currentSize={canvasSize}
      onResize={handleResizeSubmit}
    />
  );

  return (
    <PaintingToolLayout
      toolbar={toolbar}
      panels={panels}
      canvas={canvas}
      dialogs={dialogs}
    />
  );
};
