
import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextSettings, Position } from "./usePaintingTool";

interface TextPreviewProps {
  position: Position;
  textSettings: TextSettings;
  canvasSize: { width: number; height: number };
  canvasDisplaySize: { width: number; height: number };
  onConfirm: (text: string) => void;
  onCancel: () => void;
}

export const TextPreview = ({
  position,
  textSettings,
  canvasSize,
  canvasDisplaySize,
  onConfirm,
  onCancel
}: TextPreviewProps) => {
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    // Auto-focus on the input when component mounts
    const input = document.getElementById('text-preview-input');
    if (input) {
      input.focus();
    }
  }, []);

  const handleConfirm = () => {
    if (text.trim()) {
      onConfirm(text.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleConfirm();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

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
    textShadow: '0 0 2px rgba(255,255,255,0.8)', // Add subtle shadow for visibility
  };

  const controlsStyle = {
    position: 'absolute' as const,
    left: `${displayPosition.x}px`,
    top: `${displayPosition.y - 40}px`,
    zIndex: 20,
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
  };

  return (
    <>
      {/* Text preview */}
      {text && (
        <div style={textStyle}>
          {text}
        </div>
      )}
      
      {/* Input field and controls */}
      {isEditing && (
        <div style={controlsStyle}>
          <input
            id="text-preview-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter text..."
            className="px-2 py-1 text-sm border border-gray-300 rounded bg-white shadow-lg min-w-[150px]"
            style={{
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
          />
          <Button
            size="sm"
            variant="outline"
            onClick={handleConfirm}
            disabled={!text.trim()}
            className="h-8 w-8 p-0 bg-green-500 hover:bg-green-600 text-white border-green-500"
          >
            <Check className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onCancel}
            className="h-8 w-8 p-0 bg-red-500 hover:bg-red-600 text-white border-red-500"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </>
  );
};
