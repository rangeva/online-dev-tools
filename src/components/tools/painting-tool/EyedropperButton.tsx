
import { Button } from "@/components/ui/button";
import { Pipette } from "lucide-react";
import { Tool } from "./usePaintingTool";

interface EyedropperButtonProps {
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
}

export const EyedropperButton = ({ currentTool, onToolChange }: EyedropperButtonProps) => {
  const handleEyedropper = () => {
    onToolChange('eyedropper');
  };

  return (
    <Button 
      onClick={handleEyedropper} 
      variant={currentTool === 'eyedropper' ? "default" : "outline"} 
      className="w-full"
    >
      <Pipette className="w-4 h-4 mr-2" />
      {currentTool === 'eyedropper' ? 'Eyedropper Active' : 'Activate Eyedropper'}
    </Button>
  );
};
