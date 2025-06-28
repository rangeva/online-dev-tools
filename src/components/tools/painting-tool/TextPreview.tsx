import { useState, useEffect, useRef } from "react";
import { TextSettings, Position } from "./usePaintingTool";
import { TextPreviewHeader } from "./TextPreviewHeader";
import { TextPreviewInput } from "./TextPreviewInput";
import { TextPreviewControls } from "./TextPreviewControls";

interface TextPreviewProps {
  position: Position;
  textSettings: TextSettings;
  canvasSize: { width: number; height: number };
  canvasDisplaySize: { width: number; height: number };
  onConfirm: (text: string, settings: TextSettings) => void;
  onCancel: () => void;
  onTextSettingsChange?: (settings: TextSettings) => void;
}

export const TextPreview = ({
  position,
  textSettings,
  canvasSize,
  canvasDisplaySize,
  onConfirm,
  onCancel,
  onTextSettingsChange
}: TextPreviewProps) => {
  const [text, setText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState(position);
  const [localTextSettings, setLocalTextSettings] = useState(textSettings);
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

  const updateTextSettings = (updates: Partial<TextSettings>) => {
    const newSettings = { ...localTextSettings, ...updates };
    setLocalTextSettings(newSettings);
    if (onTextSettingsChange) {
      onTextSettingsChange(newSettings);
    }
  };

  const handleConfirm = () => {
    if (text.trim()) {
      onConfirm(text.trim(), localTextSettings);
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
  const displayFontSize = localTextSettings.fontSize * Math.min(scaleX, scaleY);

  const textStyle = {
    position: 'absolute' as const,
    left: `${displayPosition.x}px`,
    top: `${displayPosition.y}px`,
    fontSize: `${displayFontSize}px`,
    fontFamily: localTextSettings.fontFamily,
    color: localTextSettings.color,
    fontWeight: localTextSettings.bold ? 'bold' : 'normal',
    fontStyle: localTextSettings.italic ? 'italic' : 'normal',
    whiteSpace: 'pre-wrap' as const,
    pointerEvents: 'none' as const,
    zIndex: 10,
    textShadow: '0 0 2px rgba(255,255,255,0.8)',
  };

  const controlsStyle = {
    position: 'absolute' as const,
    left: `${displayPosition.x}px`,
    top: `${displayPosition.y - 120}px`,
    zIndex: 20,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    padding: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    minWidth: '320px',
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
        <TextPreviewHeader
          isDragging={isDragging}
          onDragHandleMouseDown={handleDragHandleMouseDown}
          onConfirm={handleConfirm}
          onCancel={onCancel}
          hasText={!!text.trim()}
        />

        <TextPreviewInput
          ref={inputRef}
          text={text}
          setText={setText}
          onKeyDown={handleKeyDown}
          textSettings={localTextSettings}
          displayFontSize={displayFontSize}
        />

        <TextPreviewControls
          textSettings={localTextSettings}
          onTextSettingsChange={updateTextSettings}
        />
      </div>
    </div>
  );
};
