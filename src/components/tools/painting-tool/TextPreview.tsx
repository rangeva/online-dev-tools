
import { TextSettings, Position } from "./usePaintingTool";
import { TextPreviewOverlay } from "./TextPreviewOverlay";

interface TextPreviewProps {
  position: Position;
  textSettings: TextSettings;
  canvasSize: { width: number; height: number };
  canvasDisplaySize: { width: number; height: number };
  onConfirm: (text: string, settings: TextSettings) => void;
  onCancel: () => void;
  onTextSettingsChange?: (settings: TextSettings) => void;
}

export const TextPreview = (props: TextPreviewProps) => {
  return <TextPreviewOverlay {...props} />;
};
