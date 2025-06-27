
import { useCallback } from "react";
import { Position, BrushSettings, Tool } from "./usePaintingTool";
import { useCanvasDrawingLogic } from "./CanvasDrawingLogic";

interface UseBrushHandlingProps {
  currentTool: Tool;
  brushSettings: BrushSettings;
  currentColor: string;
  setLastPosition: (position: Position | null) => void;
}

export const useBrushHandling = ({ 
  currentTool, 
  brushSettings, 
  currentColor,
  setLastPosition
}: UseBrushHandlingProps) => {
  const { drawLine } = useCanvasDrawingLogic({
    currentTool,
    brushSettings,
    currentColor
  });

  const handleBrushMouseDown = useCallback((position: Position, ctx: CanvasRenderingContext2D) => {
    ctx.globalCompositeOperation = currentTool === 'eraser' ? 'destination-out' : 'source-over';
    ctx.globalAlpha = brushSettings.opacity;
    ctx.fillStyle = currentColor;
    ctx.beginPath();
    ctx.arc(position.x, position.y, brushSettings.size / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalAlpha = 1;
  }, [currentTool, brushSettings, currentColor]);

  const handleBrushMouseMove = useCallback((
    currentPosition: Position, 
    lastPosition: Position | null, 
    ctx: CanvasRenderingContext2D
  ) => {
    if (lastPosition) {
      drawLine(lastPosition, currentPosition, ctx);
      setLastPosition(currentPosition);
      return true;
    }
    return false;
  }, [drawLine, setLastPosition]);

  return {
    handleBrushMouseDown,
    handleBrushMouseMove
  };
};
