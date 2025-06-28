
import { useCallback } from "react";
import { BrushSettings } from "./usePaintingTool";

interface UseBrushSettingsProps {
  brushSettings: BrushSettings;
  onBrushSettingsChange: (settings: BrushSettings) => void;
}

export const useBrushSettings = ({ 
  brushSettings, 
  onBrushSettingsChange 
}: UseBrushSettingsProps) => {
  
  const updateBrushSetting = useCallback((key: keyof BrushSettings, value: number | string) => {
    onBrushSettingsChange({
      ...brushSettings,
      [key]: value
    });
  }, [brushSettings, onBrushSettingsChange]);

  const handleSliderChange = useCallback((key: keyof BrushSettings) => (values: number[]) => {
    updateBrushSetting(key, values[0]);
  }, [updateBrushSetting]);

  const resetBrushSettings = useCallback(() => {
    onBrushSettingsChange({
      size: 2,
      opacity: 1,
      flow: 1,
      hardness: 1,
      style: 'soft'
    });
  }, [onBrushSettingsChange]);

  return {
    updateBrushSetting,
    handleSliderChange,
    resetBrushSettings
  };
};
