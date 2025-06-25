
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { domains } from "./emailGeneratorUtils";

interface EmailGeneratorFormProps {
  count: number;
  selectedDomain: string;
  customDomain: string;
  onCountChange: (count: number) => void;
  onDomainChange: (domain: string) => void;
  onCustomDomainChange: (domain: string) => void;
}

const EmailGeneratorForm = ({
  count,
  selectedDomain,
  customDomain,
  onCountChange,
  onDomainChange,
  onCustomDomainChange
}: EmailGeneratorFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="count">Number of Emails</Label>
        <Input
          id="count"
          type="number"
          min="1"
          max="100"
          value={count}
          onChange={(e) => onCountChange(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="domain">Domain</Label>
        <Select value={selectedDomain} onValueChange={onDomainChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="random">Random Domain</SelectItem>
            {domains.map((domain) => (
              <SelectItem key={domain} value={domain}>
                {domain}
              </SelectItem>
            ))}
            <SelectItem value="custom">Custom Domain</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {selectedDomain === "custom" && (
        <div className="space-y-2">
          <Label htmlFor="customDomain">Custom Domain</Label>
          <Input
            id="customDomain"
            placeholder="example.com"
            value={customDomain}
            onChange={(e) => onCustomDomainChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default EmailGeneratorForm;
