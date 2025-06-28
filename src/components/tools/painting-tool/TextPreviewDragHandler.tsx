
import { useState, useEffect, useRef } from "react";
import { Position } from "./usePaintingTool";

interface TextPreviewDragHandlerProps {
  canvasSize: { width: number; height: number };
  canvasDisplaySize: { width: number; height: number };
  initialPosition: Position;
  onPositionChange: (position: Position) => void;
  children: (props: {
    isDragging: boolean;
    onDragHandleMouseDown: (e: React.MouseEvent) => void;
    containerRef: React.RefObject<HTMLDivElement>;
  }) => React.ReactNode;
}

export const TextPreviewDragHandler = ({
  canvasSize,
  canvasDisplaySize,
  initialPosition,
  onPositionChange,
  children
}: TextPreviewDragHandlerProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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
      
      onPositionChange({ x: constrainedX, y: constrainedY });
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

  return (
    <>
      {children({
        isDragging,
        onDragHandleMouseDown: handleDragHandleMouseDown,
        containerRef
      })}
    </>
  );
};
