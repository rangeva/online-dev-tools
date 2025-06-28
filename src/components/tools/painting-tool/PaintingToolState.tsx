
import { useState, useRef } from "react";
import { usePaintingTool } from "./usePaintingTool";
import { usePaintingKeyboardShortcuts } from "./usePaintingKeyboardShortcuts";

export const usePaintingToolState = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewColor, setPreviewColor] = useState<string | null>(null);
  const [resizeDialogOpen, setResizeDialogOpen] = useState(false);
  const [resizeType, setResizeType] = useState<'image' | 'canvas'>('canvas');
  
  const paintingTool = usePaintingTool(canvasRef);

  // Handle keyboard shortcuts
  usePaintingKeyboardShortcuts({
    undo: paintingTool.undo,
    redo: paintingTool.redo,
    selectionArea: paintingTool.selectionArea,
    copySelection: paintingTool.copySelection,
    cutSelection: paintingTool.cutSelection,
    copiedImageData: paintingTool.copiedImageData
  });

  return {
    canvasRef,
    previewColor,
    setPreviewColor,
    resizeDialogOpen,
    setResizeDialogOpen,
    resizeType,
    setResizeType,
    ...paintingTool
  };
};
