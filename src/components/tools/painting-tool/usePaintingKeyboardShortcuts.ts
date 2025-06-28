
import { useEffect } from "react";
import { SelectionArea } from "./usePaintingTool";

interface UsePaintingKeyboardShortcutsProps {
  undo: () => void;
  redo: () => void;
  selectionArea: SelectionArea | null;
  copySelection: () => void;
  cutSelection: () => void;
  copiedImageData: ImageData | null;
}

export const usePaintingKeyboardShortcuts = ({
  undo,
  redo,
  selectionArea,
  copySelection,
  cutSelection,
  copiedImageData
}: UsePaintingKeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case 'y':
            e.preventDefault();
            redo();
            break;
          case 'c':
            if (selectionArea) {
              e.preventDefault();
              copySelection();
            }
            break;
          case 'x':
            if (selectionArea) {
              e.preventDefault();
              cutSelection();
            }
            break;
          case 'v':
            if (copiedImageData) {
              e.preventDefault();
              // Paste will be handled by clicking on canvas
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, selectionArea, copySelection, cutSelection, copiedImageData]);
};
