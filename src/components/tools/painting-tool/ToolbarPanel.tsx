
import { Separator } from "@/components/ui/separator";
import { Tool } from "./usePaintingTool";
import { ToolSelection } from "./ToolSelection";
import { HistoryControls } from "./HistoryControls";
import { EditControls } from "./EditControls";
import { ImageUploadControl } from "./ImageUploadControl";
import { CanvasControls } from "./CanvasControls";
import { ResizeDropdown } from "./ResizeDropdown";

interface ToolbarPanelProps {
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onExport: (format?: 'png' | 'jpg' | 'gif' | 'bmp') => void;
  onCopy?: () => void;
  onCut?: () => void;
  canCopy?: boolean;
  onImageUpload?: (file: File) => void;
  onImageResize?: () => void;
  onCanvasResize?: () => void;
}

export const ToolbarPanel = ({
  currentTool,
  onToolChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onClear,
  onExport,
  onCopy,
  onCut,
  canCopy = false,
  onImageUpload,
  onImageResize,
  onCanvasResize
}: ToolbarPanelProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm">
      {/* Tool Selection */}
      <ToolSelection currentTool={currentTool} onToolChange={onToolChange} />

      <Separator orientation="vertical" className="h-8 bg-gray-300 dark:bg-gray-600" />

      {/* History Controls */}
      <HistoryControls 
        canUndo={canUndo} 
        canRedo={canRedo} 
        onUndo={onUndo} 
        onRedo={onRedo} 
      />

      <Separator orientation="vertical" className="h-8 bg-gray-300 dark:bg-gray-600" />

      {/* Edit Controls */}
      <EditControls onCopy={onCopy} onCut={onCut} canCopy={canCopy} />

      <Separator orientation="vertical" className="h-8 bg-gray-300 dark:bg-gray-600" />

      {/* Resize Dropdown */}
      {onImageResize && onCanvasResize && (
        <>
          <ResizeDropdown 
            onImageResize={onImageResize} 
            onCanvasResize={onCanvasResize} 
          />
          <Separator orientation="vertical" className="h-8 bg-gray-300 dark:bg-gray-600" />
        </>
      )}

      {/* Image Upload */}
      <ImageUploadControl onImageUpload={onImageUpload} />

      <Separator orientation="vertical" className="h-8 bg-gray-300 dark:bg-gray-600" />

      {/* Canvas Controls */}
      <CanvasControls onClear={onClear} onExport={onExport} />
    </div>
  );
};
