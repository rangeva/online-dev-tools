
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
    saveCanvasState: () => void,
    currentTextSettings?: TextSettings
  ) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveCanvasState();
    
    // Use the passed settings or fall back to the hook's settings
    const settings = currentTextSettings || textSettings;
    
    // Build the font string properly
    let fontString = '';
    
    // Add font style (italic)
    if (settings.italic) {
      fontString += 'italic ';
    }
    
    // Add font weight (bold)
    if (settings.bold) {
      fontString += 'bold ';
    }
    
    // Add font size and family
    fontString += `${settings.fontSize}px ${settings.fontFamily}`;
    
    // Apply all text formatting
    ctx.fillStyle = settings.color;
    ctx.font = fontString;
    ctx.textBaseline = 'top';
    
    // Render the text
    ctx.fillText(text, position.x, position.y);
    
    console.log('Text added with settings:', {
      text,
      position,
      settings,
      fontString,
      color: settings.color
    });
    
    toast({
      title: "Text Added",
      description: "Formatted text has been added to the canvas.",
    });
  }, [textSettings, toast]);

  return {
    textSettings,
    setTextSettings,
    addText
  };
};
