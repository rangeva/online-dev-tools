
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface DomainInputProps {
  domains: string[];
  loading: boolean;
  error: string | null;
  onAddDomain: () => void;
  onRemoveDomain: (index: number) => void;
  onUpdateDomain: (index: number, value: string) => void;
  onFetchData: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const DomainInput = ({
  domains,
  loading,
  error,
  onAddDomain,
  onRemoveDomain,
  onUpdateDomain,
  onFetchData,
  onKeyPress
}: DomainInputProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Domain Input</CardTitle>
        <CardDescription>
          Enter website domains to compare (e.g., example.com or https://www.example.com)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {domains.map((domain, index) => (
          <div key={index} className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor={`domain-${index}`}>Website Domain {index + 1}</Label>
              <Input
                id={`domain-${index}`}
                type="text"
                placeholder="example.com"
                value={domain}
                onChange={(e) => onUpdateDomain(index, e.target.value)}
                onKeyPress={onKeyPress}
                disabled={loading}
              />
            </div>
            {domains.length > 1 && (
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => onRemoveDomain(index)}
                  disabled={loading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
        
        <div className="flex gap-2">
          {domains.length < 4 && (
            <Button 
              variant="outline" 
              onClick={onAddDomain}
              disabled={loading}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Domain
            </Button>
          )}
          <Button 
            onClick={onFetchData} 
            disabled={loading || !domains.some(d => d.trim())}
            className="min-w-[120px]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </>
            ) : (
              'Compare Rankings'
            )}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default DomainInput;
