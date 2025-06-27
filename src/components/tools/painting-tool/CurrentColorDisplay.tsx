
import { Label } from "@/components/ui/label";

interface CurrentColorDisplayProps {
  currentColor: string;
}

export const CurrentColorDisplay = ({ currentColor }: CurrentColorDisplayProps) => {
  return (
    <div className="space-y-2">
      <Label>Current Color</Label>
      <div 
        className="w-full h-12 border rounded-md shadow-inner"
        style={{ backgroundColor: currentColor }}
      />
      <div className="text-xs text-center font-mono text-gray-600 dark:text-gray-400">
        {currentColor.toUpperCase()}
      </div>
    </div>
  );
};
