
import { useState, useEffect, useRef } from "react";
import { TextSettings, Position } from "./usePaintingTool";
import { TextPreviewHeader } from "./TextPreviewHeader";
import { TextPreviewInput } from "./TextPreviewInput";
import { TextPreviewControls } from "./TextPreviewControls";
import { TextPreviewRenderer } from "./TextPreviewRenderer";
import { TextPreviewDragHandler } from "./TextPreviewDragHandler";

interface TextPreviewOverlayProps {
  position: Position;
  textSettings: TextSettings;
  canvasSize: { width: number; height: number };
  canvasDisplaySize: { width: number; height: number };
  onConfirm: (text: string, settings: TextSettings) => void;
  onCancel: () => void;
  onTextSettingsChange?: (settings: TextSettings) => void;
}

export const TextPreviewOverlay = ({
  position,
  textSettings,
  canvasSize,
  canvasDisplaySize,
  onConfirm,
  onCancel,
  onTextSettingsChange
}: TextPreviewOverlayProps) => {
  const [text, setText] = useState("");
  const [currentPosition, setCurrentPosition] = useState(position);
  const [localTextSettings, setLocalTextSettings] = useState(textSettings);
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

  // Calculate position scaling from canvas coordinates to display coordinates
  const scaleX = canvasDisplaySize.width / canvasSize.width;
  const scaleY = canvasDisplaySize.height / canvasSize.height;
  
  const displayPosition = {
    x: currentPosition.x * scaleX,
    y: currentPosition.y * scaleY
  };

  // Calculate scaled font size for display
  const displayFontSize = localTextSettings.fontSize * Math.min(scaleX, scaleY);

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
      <TextPreviewRenderer
        text={text}
        position={currentPosition}
        textSettings={localTextSettings}
        canvasSize={canvasSize}
        canvasDisplaySize={canvasDisplaySize}
      />
      
      {/* Input field and controls */}
      <TextPreviewDragHandler
        canvasSize={canvasSize}
        canvasDisplaySize={canvasDisplaySize}
        initialPosition={currentPosition}
        onPositionChange={setCurrentPosition}
      >
        {({ isDragging, onDragHandleMouseDown, containerRef }) => (
          <div 
            ref={containerRef}
            style={{ ...controlsStyle, pointerEvents: 'all' }}
          >
            <TextPreviewHeader
              isDragging={isDragging}
              onDragHandleMouseDown={onDragHandleMouseDown}
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
        )}
      </TextPreviewDragHandler>
    </div>
  );
};
