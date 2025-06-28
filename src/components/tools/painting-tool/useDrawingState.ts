
import { useState } from "react";

export type Tool = 
  | 'brush' 
  | 'eraser' 
  | 'eyedropper' 
  | 'select' 
  | 'text' 
  | 'rectangle' 
  | 'circle' 
  | 'line' 
  | 'polygon'
  | 'resize'
  | 'crop'
  | 'flood-fill';

export interface BrushSettings {
  size: number;
  opacity: number;
  hardness: number;
}

export interface Position {
  x: number;
  y: number;
}

export const useDrawingState = () => {
  const [currentTool, setCurrentTool] = useState<Tool>('brush');
  const [brushSettings, setBrushSettings] = useState<BrushSettings>({
    size: 5,
    opacity: 100,
    hardness: 100
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
