
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { EmailGeneratorOptions } from "./emailGeneratorUtils";

interface EmailGeneratorOptionsProps {
  options: EmailGeneratorOptions;
  onOptionsChange: (options: EmailGeneratorOptions) => void;
}

const EmailGeneratorOptionsComponent = ({ options, onOptionsChange }: EmailGeneratorOptionsProps) => {
  const handleOptionChange = (key: keyof EmailGeneratorOptions, checked: boolean) => {
    onOptionsChange({
      ...options,
      [key]: checked
    });
  };

  return (
    <div className="space-y-4">
      <Label>Options</Label>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="includeNumbers"
            checked={options.includeNumbers}
            onCheckedChange={(checked) => handleOptionChange('includeNumbers', checked === true)}
          />
          <Label htmlFor="includeNumbers">Include Numbers</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="includeDots"
            checked={options.includeDots}
            onCheckedChange={(checked) => handleOptionChange('includeDots', checked === true)}
          />
          <Label htmlFor="includeDots">Include Dots (.)</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="includeUnderscores"
            checked={options.includeUnderscores}
            onCheckedChange={(checked) => handleOptionChange('includeUnderscores', checked === true)}
          />
          <Label htmlFor="includeUnderscores">Include Underscores (_)</Label>
        </div>
      </div>
    </div>
  );
};

export default EmailGeneratorOptionsComponent;
