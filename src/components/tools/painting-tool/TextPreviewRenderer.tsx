
import { TextSettings, Position } from "./usePaintingTool";

interface TextPreviewRendererProps {
  text: string;
  position: Position;
  textSettings: TextSettings;
  canvasSize: { width: number; height: number };
  canvasDisplaySize: { width: number; height: number };
}

export const TextPreviewRenderer = ({
  text,
  position,
  textSettings,
  canvasSize,
  canvasDisplaySize
}: TextPreviewRendererProps) => {
  if (!text) return null;

  // Calculate position scaling from canvas coordinates to display coordinates
  const scaleX = canvasDisplaySize.width / canvasSize.width;
  const scaleY = canvasDisplaySize.height / canvasSize.height;
  
  const displayPosition = {
    x: position.x * scaleX,
    y: position.y * scaleY
  };

  // Calculate scaled font size for display
  const displayFontSize = textSettings.fontSize * Math.min(scaleX, scaleY);

  const textStyle = {
    position: 'absolute' as const,
    left: `${displayPosition.x}px`,
    top: `${displayPosition.y}px`,
    fontSize: `${displayFontSize}px`,
    fontFamily: textSettings.fontFamily,
    color: textSettings.color,
    fontWeight: textSettings.bold ? 'bold' : 'normal',
    fontStyle: textSettings.italic ? 'italic' : 'normal',
    whiteSpace: 'pre-wrap' as const,
    pointerEvents: 'none' as const,
    zIndex: 10,
    textShadow: '0 0 2px rgba(255,255,255,0.8)',
  };

  return (
    <div style={textStyle}>
      {text}
    </div>
  );
};
