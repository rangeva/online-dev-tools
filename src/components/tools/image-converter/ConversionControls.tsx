
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Image as ImageIcon, RotateCcw } from "lucide-react";
import { supportedFormats } from "./constants";

interface ConversionControlsProps {
  outputFormat: string;
  quality: number[];
  isConverting: boolean;
  onFormatChange: (format: string) => void;
  onQualityChange: (quality: number[]) => void;
  onConvert: () => void;
  onReset: () => void;
}

export const ConversionControls = ({
  outputFormat,
  quality,
  isConverting,
  onFormatChange,
  onQualityChange,
  onConvert,
  onReset
}: ConversionControlsProps) => {
  const selectedFormatConfig = supportedFormats.find(f => f.value === outputFormat);
  const showQualityControl = selectedFormatConfig?.hasQuality;

  return (
    <>
      {/* Output Format Selection */}
      <div className="space-y-2">
        <Label>Output Format</Label>
        <Select value={outputFormat} onValueChange={onFormatChange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {supportedFormats.map((format) => (
              <SelectItem key={format.value} value={format.value}>
                {format.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Quality Control */}
      {showQualityControl && (
        <div className="space-y-2">
          <Label>Quality: {quality[0]}%</Label>
          <Slider
            value={quality}
            onValueChange={onQualityChange}
            max={100}
            min={1}
            step={1}
            className="w-64"
          />
        </div>
      )}

      {/* Convert Button */}
      <div className="flex gap-2">
        <Button 
          onClick={onConvert}
          disabled={isConverting}
          className="flex items-center gap-2"
        >
          <ImageIcon className="h-4 w-4" />
          {isConverting ? "Converting..." : "Convert Image"}
        </Button>
        <Button 
          variant="outline" 
          onClick={onReset}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </>
  );
};
