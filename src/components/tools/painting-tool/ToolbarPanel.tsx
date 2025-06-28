
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tool } from "./usePaintingTool";
import { Brush, Eraser, Pipette, Undo, Redo, Trash2, Download, ChevronDown, Square, Type, Crop, Move, Copy, Scissors, Upload } from "lucide-react";
import { useRef } from "react";

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
  onImageUpload
}: ToolbarPanelProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tools = [
    { tool: 'brush' as Tool, name: 'Brush', icon: Brush },
    { tool: 'eraser' as Tool, name: 'Eraser', icon: Eraser },
    { tool: 'eyedropper' as Tool, name: 'Eyedropper', icon: Pipette },
    { tool: 'select' as Tool, name: 'Select', icon: Square },
    { tool: 'text' as Tool, name: 'Text', icon: Type },
    { tool: 'crop' as Tool, name: 'Crop', icon: Crop },
    { tool: 'resize' as Tool, name: 'Resize', icon: Move },
  ];

  const exportFormats = [
    { format: 'png' as const, name: 'PNG', description: 'Portable Network Graphics' },
    { format: 'jpg' as const, name: 'JPG', description: 'JPEG Image' },
    { format: 'gif' as const, name: 'GIF', description: 'Graphics Interchange Format' },
    { format: 'bmp' as const, name: 'BMP', description: 'Bitmap Image' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/') && onImageUpload) {
      onImageUpload(file);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm">
      {/* Tool Selection */}
      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-inner border border-gray-200 dark:border-gray-600">
        {tools.map((tool) => (
          <Button
            key={tool.tool}
            variant={currentTool === tool.tool ? "default" : "ghost"}
            size="sm"
            onClick={() => onToolChange(tool.tool)}
            title={tool.name}
            className={`
              relative transition-all duration-200 
              ${currentTool === tool.tool 
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
          >
            <tool.icon className="w-4 h-4 mr-1.5" />
            <span className="font-medium">{tool.name}</span>
          </Button>
        ))}
      </div>

      <Separator orientation="vertical" className="h-8 bg-gray-300 dark:bg-gray-600" />

      {/* History Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          <Undo className="w-4 h-4 mr-1.5" />
          Undo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          <Redo className="w-4 h-4 mr-1.5" />
          Redo
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8 bg-gray-300 dark:bg-gray-600" />

      {/* Edit Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onCopy}
          disabled={!canCopy}
          title="Copy Selection"
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          <Copy className="w-4 h-4 mr-1.5" />
          Copy
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onCut}
          disabled={!canCopy}
          title="Cut Selection"
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          <Scissors className="w-4 h-4 mr-1.5" />
          Cut
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8 bg-gray-300 dark:bg-gray-600" />

      {/* Image Upload */}
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          title="Upload Image"
          className="bg-white dark:bg-gray-800 border-purple-300 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-400"
        >
          <Upload className="w-4 h-4 mr-1.5" />
          Upload
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8 bg-gray-300 dark:bg-gray-600" />

      {/* Canvas Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          title="Clear Canvas"
          className="bg-white dark:bg-gray-800 border-red-300 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
        >
          <Trash2 className="w-4 h-4 mr-1.5" />
          Clear
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              title="Export Canvas"
              className="bg-white dark:bg-gray-800 border-green-300 dark:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Export
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50">
            {exportFormats.map((format) => (
              <DropdownMenuItem
                key={format.format}
                onClick={() => onExport(format.format)}
                className="flex flex-col items-start gap-1 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                <div className="font-medium text-sm">{format.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{format.description}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
