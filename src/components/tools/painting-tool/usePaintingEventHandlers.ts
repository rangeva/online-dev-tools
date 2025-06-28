
import { RefObject, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CanvasSize, TextSettings } from "./usePaintingTool";

interface UsePaintingEventHandlersProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  canvasSize: CanvasSize;
  setCanvasSize: (size: CanvasSize) => void;
  setCurrentTool: (tool: string) => void;
  textSettings: TextSettings;
  exportCanvas: (format?: 'png' | 'jpg' | 'gif' | 'bmp') => void;
  addText: (position: { x: number; y: number }, text: string, settings?: TextSettings) => void;
}

export const usePaintingEventHandlers = ({
  canvasRef,
  canvasSize,
  setCanvasSize,
  setCurrentTool,
  textSettings,
  exportCanvas,
  addText
}: UsePaintingEventHandlersProps) => {
  const { toast } = useToast();
  const [previewColor, setPreviewColor] = useState<string | null>(null);

  const handleColorPicked = (color: string) => {
    setCurrentTool('brush');
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

  const handleResize = (newSize: { width: number; height: number }, resizeType: 'image' | 'canvas') => {
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
      // For canvas resize, this will be handled by the existing resizeCanvas function
      setCanvasSize(newSize);
    }
  };

  return {
    previewColor,
    handleColorPicked,
    handleColorPreview,
    handleExport,
    handleAddText,
    handleResize
  };
};
