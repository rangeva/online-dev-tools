
import { useCallback, RefObject, ForwardedRef } from "react";

interface UseMouseCoordinatesProps {
  canvasRef: ForwardedRef<HTMLCanvasElement>;
}

export const useMouseCoordinates = ({ canvasRef }: UseMouseCoordinatesProps) => {
  const getCanvas = useCallback(() => {
    if (!canvasRef) return null;
    if (typeof canvasRef === 'function') return null;
    return canvasRef.current;
  }, [canvasRef]);

  const getCanvasCoordinates = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = getCanvas();
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }, [getCanvas]);

  return {
    getCanvas,
    getCanvasCoordinates
  };
};
