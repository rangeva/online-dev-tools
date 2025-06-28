
import { Button } from "@/components/ui/button";
import { Undo, Redo } from "lucide-react";

interface HistoryControlsProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export const HistoryControls = ({ canUndo, canRedo, onUndo, onRedo }: HistoryControlsProps) => {
  return (
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
  );
};
