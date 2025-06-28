
import { useCallback } from "react";
import { Position } from "./usePaintingTool";
import { useCanvasDrawingLogic } from "./CanvasDrawingLogic";

interface UseEyedropperToolProps {
  currentTool: string;
  onColorPicked: (color: string) => void;
  onColorPreview?: (color: string | null) => void;
}

export const useEyedropperTool = ({ 
  currentTool, 
  onColorPicked, 
  onColorPreview 
}: UseEyedropperToolProps) => {
  const { pickColor } = useCanvasDrawingLogic({
    currentTool: currentTool as any,
    brushSettings: { size: 1, opacity: 1, hardness: 1, style: 'soft', flow: 1 },
    currentColor: '#000000'
  });

  const handleEyedropperClick = useCallback((position: Position, ctx: CanvasRenderingContext2D) => {
    const color = pickColor(position, ctx);
    if (color) {
      onColorPicked(color);
    }
  }, [pickColor, onColorPicked]);

  const handleEyedropperPreview = useCallback((position: Position, ctx: CanvasRenderingContext2D) => {
    const color = pickColor(position, ctx);
    if (onColorPreview) {
      onColorPreview(color);
    }
  }, [pickColor, onColorPreview]);

  const clearEyedropperPreview = useCallback(() => {
    if (onColorPreview) {
      onColorPreview(null);
    }
  }, [onColorPreview]);

  return {
    handleEyedropperClick,
    handleEyedropperPreview,
    clearEyedropperPreview
  };
};
