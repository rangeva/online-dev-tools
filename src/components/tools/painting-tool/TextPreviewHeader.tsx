
import { Move, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TextPreviewHeaderProps {
  isDragging: boolean;
  onDragHandleMouseDown: (e: React.MouseEvent) => void;
  onConfirm: () => void;
  onCancel: () => void;
  hasText: boolean;
}

export const TextPreviewHeader = ({
  isDragging,
  onDragHandleMouseDown,
  onConfirm,
  onCancel,
  hasText
}: TextPreviewHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div 
        className="drag-handle flex items-center justify-center w-6 h-6 rounded hover:bg-gray-100"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={onDragHandleMouseDown}
      >
        <Move className="w-4 h-4 text-gray-500" />
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={onConfirm}
          disabled={!hasText}
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
  );
};
