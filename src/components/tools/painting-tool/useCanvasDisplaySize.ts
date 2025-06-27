
import { useState, useEffect, RefObject } from "react";

interface CanvasDisplaySize {
  width: number;
  height: number;
}

export const useCanvasDisplaySize = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [canvasDisplaySize, setCanvasDisplaySize] = useState<CanvasDisplaySize | null>(null);

  useEffect(() => {
    if (!canvasRef || typeof canvasRef === 'function' || !canvasRef.current) return;
    
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      setCanvasDisplaySize({
        width: rect.width,
        height: rect.height
      });
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [canvasRef]);

  return canvasDisplaySize;
};
