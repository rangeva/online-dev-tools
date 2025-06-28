
import { useToast } from "@/hooks/use-toast";
import { usePaintingToolState } from "./PaintingToolState";

export const usePaintingToolHandlers = (state: ReturnType<typeof usePaintingToolState>) => {
  const { toast } = useToast();
  const {
    canvasRef,
    setCurrentColor,
    setCurrentTool,
    setResizeType,
    setResizeDialogOpen,
    setCanvasSize,
    exportCanvas,
    uploadImage,
    addText,
    textSettings
  } = state;

  const handleColorPicked = (color: string) => {
    setCurrentColor(color);
    setCurrentTool('brush'); // Switch back to brush after picking color
    toast({
      title: "Color Picked",
      description: `Selected color: ${color}`,
    });
  };

  const handleColorPreview = (color: string | null) => {
    state.setPreviewColor(color);
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
    if (state.resizeType === 'image') {
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
      state.resizeCanvas(newSize);
    }
  };

  return {
    handleColorPicked,
    handleColorPreview,
    handleExport,
    handleAddText,
    handleImageResize,
    handleCanvasResize,
    handleResize
  };
};
