
import { useState, useCallback, RefObject } from "react";
import { useToast } from "@/hooks/use-toast";

export interface TextSettings {
  fontSize: number;
  fontFamily: string;
  color: string;
  bold: boolean;
  italic: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export const useTextTool = () => {
  const { toast } = useToast();
  const [textSettings, setTextSettings] = useState<TextSettings>({
    fontSize: 16,
    fontFamily: 'Arial',
    color: '#000000',
    bold: false,
    italic: false
  });

  const addText = useCallback((
    position: Position, 
    text: string, 
    canvasRef: RefObject<HTMLCanvasElement>,
    saveCanvasState: () => void
  ) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveCanvasState();
    
    ctx.fillStyle = textSettings.color;
    ctx.font = `${textSettings.italic ? 'italic ' : ''}${textSettings.bold ? 'bold ' : ''}${textSettings.fontSize}px ${textSettings.fontFamily}`;
    ctx.textBaseline = 'top';
    
    ctx.fillText(text, position.x, position.y);
    
    toast({
      title: "Text Added",
      description: "Text has been added to the canvas.",
    });
  }, [textSettings, toast]);

  return {
    textSettings,
    setTextSettings,
    addText
  };
};
