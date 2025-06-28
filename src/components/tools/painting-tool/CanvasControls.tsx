
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Trash2, Download, ChevronDown } from "lucide-react";

interface CanvasControlsProps {
  onClear: () => void;
  onExport: (format?: 'png' | 'jpg' | 'gif' | 'bmp') => void;
}

export const CanvasControls = ({ onClear, onExport }: CanvasControlsProps) => {
  const exportFormats = [
    { format: 'png' as const, name: 'PNG', description: 'Portable Network Graphics' },
    { format: 'jpg' as const, name: 'JPG', description: 'JPEG Image' },
    { format: 'gif' as const, name: 'GIF', description: 'Graphics Interchange Format' },
    { format: 'bmp' as const, name: 'BMP', description: 'Bitmap Image' },
  ];

  return (
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
  );
};
