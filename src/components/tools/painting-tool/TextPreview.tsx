
import { useState, useEffect, useRef } from "react";
import { X, Check, Move, Type, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TextSettings, Position } from "./usePaintingTool";

interface TextPreviewProps {
  position: Position;
  textSettings: TextSettings;
  canvasSize: { width: number; height: number };
  canvasDisplaySize: { width: number; height: number };
  onConfirm: (text: string) => void;
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

  const fontFamilies = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Verdana',
    'Georgia',
    'Comic Sans MS',
    'Impact'
  ];

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

  const inputStyle = {
    fontSize: `${Math.max(14, displayFontSize * 0.8)}px`,
    fontFamily: localTextSettings.fontFamily,
    color: localTextSettings.color,
    fontWeight: localTextSettings.bold ? 'bold' : 'normal',
    fontStyle: localTextSettings.italic ? 'italic' : 'normal',
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
        {/* Header with drag handle and action buttons */}
        <div className="flex items-center justify-between">
          <div 
            className="drag-handle flex items-center justify-center w-6 h-6 rounded hover:bg-gray-100"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={handleDragHandleMouseDown}
          >
            <Move className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleConfirm}
              disabled={!text.trim()}
              className="h-7 px-3 bg-green-500 hover:bg-green-600 text-white border-green-500"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Check className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onCancel}
              className="h-7 px-3 bg-red-500 hover:bg-red-600 text-white border-red-500"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Text input */}
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter text..."
          className="px-3 py-2 text-sm border border-gray-300 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={inputStyle}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        />

        {/* Formatting controls */}
        <div className="grid grid-cols-2 gap-3">
          {/* Font Size */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">Size</label>
            <div className="flex items-center space-x-2">
              <Slider
                value={[localTextSettings.fontSize]}
                onValueChange={(value) => updateTextSettings({ fontSize: value[0] })}
                min={8}
                max={72}
                step={1}
                className="flex-1"
              />
              <span className="text-xs text-gray-500 min-w-[2rem]">{localTextSettings.fontSize}</span>
            </div>
          </div>

          {/* Color Picker */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">Color</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-8 px-2 justify-start"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div 
                    className="w-4 h-4 rounded border mr-2" 
                    style={{ backgroundColor: localTextSettings.color }}
                  />
                  <Palette className="w-3 h-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3">
                <div className="space-y-3">
                  <Input
                    type="color"
                    value={localTextSettings.color}
                    onChange={(e) => updateTextSettings({ color: e.target.value })}
                    className="w-full h-8"
                  />
                  <Input
                    type="text"
                    value={localTextSettings.color}
                    onChange={(e) => updateTextSettings({ color: e.target.value })}
                    className="text-sm"
                    placeholder="#000000"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Font Family and Style */}
        <div className="grid grid-cols-2 gap-3">
          {/* Font Family */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">Font</label>
            <Select 
              value={localTextSettings.fontFamily} 
              onValueChange={(value) => updateTextSettings({ fontFamily: value })}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 z-50">
                {fontFamilies.map((font) => (
                  <SelectItem key={font} value={font} className="text-xs hover:bg-gray-50">
                    {font}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Style toggles */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">Style</label>
            <div className="flex items-center gap-1">
              <Toggle
                pressed={localTextSettings.bold}
                onPressedChange={(pressed) => updateTextSettings({ bold: pressed })}
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <span className="font-bold text-xs">B</span>
              </Toggle>
              <Toggle
                pressed={localTextSettings.italic}
                onPressedChange={(pressed) => updateTextSettings({ italic: pressed })}
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <span className="italic text-xs">I</span>
              </Toggle>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
