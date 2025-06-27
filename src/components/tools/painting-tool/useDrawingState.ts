
import { useState } from "react";

export interface BrushSettings {
  size: number;
  opacity: number;
  flow: number;
  hardness: number;
  style: 'soft' | 'hard' | 'textured';
}

export interface Position {
  x: number;
  y: number;
}

export type Tool = 'brush' | 'eraser' | 'rectangle' | 'circle' | 'line' | 'polygon' | 'eyedropper' | 'select' | 'text' | 'crop' | 'resize';

export const useDrawingState = () => {
  const [currentTool, setCurrentTool] = useState<Tool>('brush');
  const [brushSettings, setBrushSettings] = useState<BrushSettings>({
    size: 2,
    opacity: 1,
    flow: 1,
    hardness: 1,
    style: 'soft'
  });
  const [currentColor, setCurrentColor] = useState('#000000');
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState<Position | null>(null);

  return {
    currentTool,
    setCurrentTool,
    brushSettings,
    setBrushSettings,
    currentColor,
    setCurrentColor,
    isDrawing,
    setIsDrawing,
    lastPosition,
    setLastPosition
  };
};
