
import { useState } from "react";

export const useDialogState = () => {
  const [resizeDialogOpen, setResizeDialogOpen] = useState(false);
  const [resizeType, setResizeType] = useState<'image' | 'canvas'>('canvas');

  const openImageResize = () => {
    setResizeType('image');
    setResizeDialogOpen(true);
  };

  const openCanvasResize = () => {
    setResizeType('canvas');
    setResizeDialogOpen(true);
  };

  const closeDialog = () => {
    setResizeDialogOpen(false);
  };

  return {
    resizeDialogOpen,
    resizeType,
    openImageResize,
    openCanvasResize,
    closeDialog
  };
};
