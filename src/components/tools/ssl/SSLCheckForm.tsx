
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, XCircle } from 'lucide-react';

interface SSLCheckFormProps {
  domain: string;
  setDomain: (domain: string) => void;
  onCheck: () => void;
  loading: boolean;
  error: string;
}

const SSLCheckForm = ({ domain, setDomain, onCheck, loading, error }: SSLCheckFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Domain or URL</label>
        <div className="flex gap-2">
          <Input
            placeholder="example.com or https://example.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && onCheck()}
          />
          <Button onClick={onCheck} disabled={!domain.trim() || loading} className="min-w-[120px]">
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Checking...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Check SSL
              </div>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SSLCheckForm;
