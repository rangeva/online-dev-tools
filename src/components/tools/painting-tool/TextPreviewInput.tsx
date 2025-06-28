
import { forwardRef } from "react";
import { TextSettings } from "./usePaintingTool";

interface TextPreviewInputProps {
  text: string;
  setText: (text: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  textSettings: TextSettings;
  displayFontSize: number;
}

export const TextPreviewInput = forwardRef<HTMLInputElement, TextPreviewInputProps>(
  ({ text, setText, onKeyDown, textSettings, displayFontSize }, ref) => {
    const inputStyle = {
      fontSize: `${Math.max(14, displayFontSize * 0.8)}px`,
      fontFamily: textSettings.fontFamily,
      color: textSettings.color,
      fontWeight: textSettings.bold ? 'bold' : 'normal',
      fontStyle: textSettings.italic ? 'italic' : 'normal',
    };

    return (
      <input
        ref={ref}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Enter text..."
        className="px-3 py-2 text-sm border border-gray-300 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={inputStyle}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      />
    );
  }
);

TextPreviewInput.displayName = 'TextPreviewInput';
