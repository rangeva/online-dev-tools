
import { useState, useEffect, useRef } from "react";
import { X, Check, Move } from "lucide-react";
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
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState(position);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus on the input when component mounts
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }, []);

  const handleConfirm = () => {
    if (text.trim()) {
      onConfirm(text.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleConfirm();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  const handleDragHandleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && containerRef.current) {
      e.preventDefault();
      
      const canvas = document.querySelector('canvas');
      if (!canvas) return;
      
      const canvasRect = canvas.getBoundingClientRect();
      const scaleX = canvasSize.width / canvasDisplaySize.width;
      const scaleY = canvasSize.height / canvasDisplaySize.height;
      
      // Calculate new position relative to canvas
      const newX = ((e.clientX - canvasRect.left - dragOffset.x) * scaleX);
      const newY = ((e.clientY - canvasRect.top - dragOffset.y) * scaleY);
      
      // Constrain to canvas bounds
      const constrainedX = Math.max(0, Math.min(newX, canvasSize.width - 50));
      const constrainedY = Math.max(0, Math.min(newY, canvasSize.height - 50));
      
      setCurrentPosition({ x: constrainedX, y: constrainedY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset, canvasSize, canvasDisplaySize]);

  // Calculate position scaling from canvas coordinates to display coordinates
  const scaleX = canvasDisplaySize.width / canvasSize.width;
  const scaleY = canvasDisplaySize.height / canvasSize.height;
  
  const displayPosition = {
    x: currentPosition.x * scaleX,
    y: currentPosition.y * scaleY
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

  const controlsStyle = {
    position: 'absolute' as const,
    left: `${displayPosition.x}px`,
    top: `${displayPosition.y - 50}px`,
    zIndex: 20,
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    padding: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    fontSize: `${Math.max(14, displayFontSize * 0.8)}px`,
    fontFamily: textSettings.fontFamily,
    color: textSettings.color,
    fontWeight: textSettings.bold ? 'bold' : 'normal',
    fontStyle: textSettings.italic ? 'italic' : 'normal',
  };

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 15 }}>
      {/* Text preview */}
      {text && (
        <div style={textStyle}>
          {text}
        </div>
      )}
      
      {/* Input field and controls */}
      <div 
        ref={containerRef}
        style={{ ...controlsStyle, pointerEvents: 'all' }}
      >
        <div 
          className="drag-handle flex items-center justify-center w-4 h-6 rounded hover:bg-gray-100"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={handleDragHandleMouseDown}
        >
          <Move className="w-3 h-3 text-gray-500" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter text..."
          className="px-2 py-1 text-sm border border-gray-300 rounded bg-white shadow-sm min-w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={inputStyle}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        />
        <Button
          size="sm"
          variant="outline"
          onClick={handleConfirm}
          disabled={!text.trim()}
          className="h-8 w-8 p-0 bg-green-500 hover:bg-green-600 text-white border-green-500"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <Check className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onCancel}
          className="h-8 w-8 p-0 bg-red-500 hover:bg-red-600 text-white border-red-500"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
