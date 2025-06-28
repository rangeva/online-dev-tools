
import { Tool, BrushSettings } from "./usePaintingTool";
import { BrushButton } from "./BrushButton";
import { NonBrushTools } from "./NonBrushTools";

interface ToolSelectionProps {
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
  brushSettings?: BrushSettings;
  onBrushSettingsChange?: (settings: BrushSettings) => void;
}

export const ToolSelection = ({ 
  currentTool, 
  onToolChange, 
  brushSettings, 
  onBrushSettingsChange 
}: ToolSelectionProps) => {
  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-inner border border-gray-200 dark:border-gray-600">
      {brushSettings && onBrushSettingsChange ? (
        <BrushButton
          currentTool={currentTool}
          onToolChange={onToolChange}
          brushSettings={brushSettings}
          onBrushSettingsChange={onBrushSettingsChange}
        />
      ) : (
        <button
          onClick={() => onToolChange('brush')}
          className={`
            px-3 py-2 rounded transition-all duration-200 
            ${currentTool === 'brush' 
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }
          `}
        >
          Brush
        </button>
      )}
      <NonBrushTools currentTool={currentTool} onToolChange={onToolChange} />
    </div>
  );
};
