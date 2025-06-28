
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Move, ChevronDown, Image, Square } from "lucide-react";

interface ResizeDropdownProps {
  onImageResize: () => void;
  onCanvasResize: () => void;
}

export const ResizeDropdown = ({ onImageResize, onCanvasResize }: ResizeDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <Move className="w-4 h-4 mr-1.5" />
          Resize
          <ChevronDown className="w-3 h-3 ml-1.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
        <DropdownMenuItem 
          onClick={onImageResize}
          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Image className="w-4 h-4 mr-2" />
          Resize Image
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={onCanvasResize}
          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Square className="w-4 h-4 mr-2" />
          Resize Canvas
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
