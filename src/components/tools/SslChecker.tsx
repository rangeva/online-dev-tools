
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SslChecker = () => {
  const [domain, setDomain] = useState('');
  const [sslInfo, setSslInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkSSL = async () => {
    if (!domain) return;

    setLoading(true);
    setError('');
    setSslInfo(null);

    try {
      // Note: In a real application, you'd need a backend service to check SSL
      // This is a mock implementation for demonstration
      
      const url = domain.startsWith('http') ? domain : `https://${domain}`;
      const hostname = new URL(url).hostname;
      
      // Simulate SSL check - in production, this would be done server-side
      const mockSslInfo = {
        domain: hostname,
        issued_to: hostname,
        issued_by: 'Let\'s Encrypt Authority X3',
        valid_from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        valid_to: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        fingerprint: 'AA:BB:CC:DD:EE:FF:11:22:33:44:55:66:77:88:99:00',
        serial_number: '03:9E:ED:B5:26:C3:91:1A:E2:4F:E2:B6:8A:1D:6E:75:B4:A2',
        signature_algorithm: 'SHA256WithRSA',
        subject_alt_names: [`*.${hostname}`, hostname],
        is_valid: true,
        days_until_expiry: 60
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSslInfo(mockSslInfo);
    } catch (err) {
      setError('Failed to check SSL certificate. Please check the domain and try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getExpiryStatus = (days: number) => {
    if (days < 0) return { variant: 'destructive' as const, text: 'Expired' };
    if (days < 30) return { variant: 'destructive' as const, text: 'Expires Soon' };
    if (days < 60) return { variant: 'secondary' as const, text: 'Expires in 1-2 months' };
    return { variant: 'default' as const, text: 'Valid' };
  };

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
          />
          <Button onClick={checkSSL} disabled={!domain || loading}>
            {loading ? 'Checking...' : 'Check SSL'}
          </Button>
        </div>
      </div>

      {error && (
        <Alert>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {sslInfo && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                SSL Certificate Status
                <Badge variant={sslInfo.is_valid ? 'default' : 'destructive'}>
                  {sslInfo.is_valid ? 'Valid' : 'Invalid'}
                </Badge>
                <Badge {...getExpiryStatus(sslInfo.days_until_expiry)}>
                  {getExpiryStatus(sslInfo.days_until_expiry).text}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-slate-600">Domain</div>
                  <div className="font-mono">{sslInfo.domain}</div>
                </div>
                <div>
                  <div className="font-medium text-slate-600">Issued To</div>
                  <div className="font-mono">{sslInfo.issued_to}</div>
                </div>
                <div>
                  <div className="font-medium text-slate-600">Issued By</div>
                  <div>{sslInfo.issued_by}</div>
                </div>
                <div>
                  <div className="font-medium text-slate-600">Days Until Expiry</div>
                  <div className="font-semibold">{sslInfo.days_until_expiry} days</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Certificate Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium text-slate-600 mb-1">Valid From</div>
                    <div>{formatDate(sslInfo.valid_from)}</div>
                  </div>
                  <div>
                    <div className="font-medium text-slate-600 mb-1">Valid To</div>
                    <div>{formatDate(sslInfo.valid_to)}</div>
                  </div>
                </div>
                
                <div>
                  <div className="font-medium text-slate-600 mb-1">Subject Alternative Names</div>
                  <div className="flex flex-wrap gap-1">
                    {sslInfo.subject_alt_names.map((name: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium text-slate-600 mb-1">Signature Algorithm</div>
                    <div className="font-mono">{sslInfo.signature_algorithm}</div>
                  </div>
                  <div>
                    <div className="font-medium text-slate-600 mb-1">Serial Number</div>
                    <div className="font-mono text-xs">{sslInfo.serial_number}</div>
                  </div>
                </div>

                <div>
                  <div className="font-medium text-slate-600 mb-1">Fingerprint</div>
                  <div className="font-mono text-xs">{sslInfo.fingerprint}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-slate-600">
            <p><strong>Note:</strong> This is a demonstration tool. In a production environment, SSL checking would be performed server-side to avoid CORS limitations and provide accurate certificate information.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SslChecker;
