
import { Button } from "@/components/ui/button";
import { Copy, Scissors } from "lucide-react";

interface EditControlsProps {
  onCopy?: () => void;
  onCut?: () => void;
  canCopy?: boolean;
}

export const EditControls = ({ onCopy, onCut, canCopy = false }: EditControlsProps) => {
  return (
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
  );
};
