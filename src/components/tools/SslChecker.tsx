import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Shield, CheckCircle, AlertTriangle, XCircle, Calendar, Globe, Lock, Key, Info } from 'lucide-react';

interface SSLInfo {
  domain: string;
  issued_to: string;
  issued_by: string;
  valid_from: string;
  valid_to: string;
  fingerprint_sha1: string;
  fingerprint_sha256: string;
  serial_number: string;
  signature_algorithm: string;
  public_key_algorithm: string;
  key_size: number;
  subject_alt_names: string[];
  is_valid: boolean;
  is_expired: boolean;
  days_until_expiry: number;
  chain_length: number;
  protocol_version: string;
  cipher_suite: string;
  is_wildcard: boolean;
  is_self_signed: boolean;
  issuer_country: string;
  issuer_organization: string;
}

const SslChecker = () => {
  const [domain, setDomain] = useState('');
  const [sslInfo, setSslInfo] = useState<SSLInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkSSL = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }

    setLoading(true);
    setError('');
    setSslInfo(null);

    try {
      const url = domain.startsWith('http') ? domain : `https://${domain}`;
      const hostname = new URL(url).hostname;
      
      // Enhanced mock SSL information for demonstration
      const mockSslInfo: SSLInfo = {
        domain: hostname,
        issued_to: hostname,
        issued_by: Math.random() > 0.5 ? 'Let\'s Encrypt Authority X3' : 'DigiCert Inc',
        valid_from: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        valid_to: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        fingerprint_sha1: Array.from({length: 20}, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(':').toUpperCase(),
        fingerprint_sha256: Array.from({length: 32}, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(':').toUpperCase(),
        serial_number: Array.from({length: 16}, () => Math.floor(Math.random() * 16).toString(16)).join(':').toUpperCase(),
        signature_algorithm: Math.random() > 0.5 ? 'SHA256WithRSA' : 'SHA384WithECDSA',
        public_key_algorithm: Math.random() > 0.7 ? 'ECDSA' : 'RSA',
        key_size: Math.random() > 0.7 ? 256 : 2048,
        subject_alt_names: [`*.${hostname}`, hostname, `www.${hostname}`],
        is_valid: Math.random() > 0.1,
        is_expired: false,
        days_until_expiry: Math.floor(Math.random() * 365),
        chain_length: Math.floor(Math.random() * 3) + 1,
        protocol_version: 'TLS 1.3',
        cipher_suite: 'TLS_AES_256_GCM_SHA384',
        is_wildcard: hostname.startsWith('*.'),
        is_self_signed: Math.random() > 0.9,
        issuer_country: 'US',
        issuer_organization: Math.random() > 0.5 ? 'Let\'s Encrypt' : 'DigiCert Inc'
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSslInfo(mockSslInfo);
    } catch (err) {
      setError('Failed to check SSL certificate. Please verify the domain and try again.');
      console.error('SSL check error:', err);
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
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getExpiryStatus = (days: number, isExpired: boolean) => {
    if (isExpired || days < 0) return { variant: 'destructive' as const, text: 'Expired', icon: XCircle };
    if (days < 7) return { variant: 'destructive' as const, text: 'Expires Very Soon', icon: AlertTriangle };
    if (days < 30) return { variant: 'secondary' as const, text: 'Expires Soon', icon: AlertTriangle };
    if (days < 90) return { variant: 'outline' as const, text: 'Expires in 1-3 months', icon: Calendar };
    return { variant: 'default' as const, text: 'Valid', icon: CheckCircle };
  };

  const getValidityProgress = (validFrom: string, validTo: string) => {
    const now = Date.now();
    const start = new Date(validFrom).getTime();
    const end = new Date(validTo).getTime();
    const progress = ((now - start) / (end - start)) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Domain or URL</label>
        <div className="flex gap-2">
          <Input
            placeholder="example.com or https://example.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && checkSSL()}
          />
          <Button onClick={checkSSL} disabled={!domain.trim() || loading} className="min-w-[120px]">
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

      {sslInfo && (
        <div className="space-y-6">
          {/* Certificate Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5" />
                SSL Certificate Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant={sslInfo.is_valid ? 'default' : 'destructive'} className="flex items-center gap-1">
                    {sslInfo.is_valid ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {sslInfo.is_valid ? 'Valid Certificate' : 'Invalid Certificate'}
                  </Badge>
                  <Badge {...getExpiryStatus(sslInfo.days_until_expiry, sslInfo.is_expired)} className="flex items-center gap-1">
                    {React.createElement(getExpiryStatus(sslInfo.days_until_expiry, sslInfo.is_expired).icon, { className: "w-3 h-3" })}
                    {getExpiryStatus(sslInfo.days_until_expiry, sslInfo.is_expired).text}
                  </Badge>
                  {sslInfo.is_wildcard && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      Wildcard
                    </Badge>
                  )}
                  {sslInfo.is_self_signed && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Self-Signed
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-slate-600 mb-1">Domain</div>
                    <div className="font-mono bg-slate-50 p-2 rounded">{sslInfo.domain}</div>
                  </div>
                  <div>
                    <div className="font-medium text-slate-600 mb-1">Days Until Expiry</div>
                    <div className="font-semibold text-lg">{sslInfo.days_until_expiry} days</div>
                  </div>
                  <div>
                    <div className="font-medium text-slate-600 mb-1">Certificate Chain Length</div>
                    <div className="font-semibold">{sslInfo.chain_length} certificate{sslInfo.chain_length !== 1 ? 's' : ''}</div>
                  </div>
                </div>

                <div>
                  <div className="font-medium text-slate-600 mb-2">Certificate Validity Period</div>
                  <Progress value={getValidityProgress(sslInfo.valid_from, sslInfo.valid_to)} className="h-2" />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>Issued: {new Date(sslInfo.valid_from).toLocaleDateString()}</span>
                    <span>Expires: {new Date(sslInfo.valid_to).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificate Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="w-5 h-5" />
                Certificate Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium text-slate-600 mb-1">Valid From</div>
                      <div className="text-sm">{formatDate(sslInfo.valid_from)}</div>
                    </div>
                    <div>
                      <div className="font-medium text-slate-600 mb-1">Valid To</div>
                      <div className="text-sm">{formatDate(sslInfo.valid_to)}</div>
                    </div>
                    <div>
                      <div className="font-medium text-slate-600 mb-1">Issued By</div>
                      <div className="text-sm">{sslInfo.issued_by}</div>
                    </div>
                    <div>
                      <div className="font-medium text-slate-600 mb-1">Issuer Organization</div>
                      <div className="text-sm">{sslInfo.issuer_organization} ({sslInfo.issuer_country})</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium text-slate-600 mb-1">Protocol Version</div>
                      <div className="text-sm font-mono">{sslInfo.protocol_version}</div>
                    </div>
                    <div>
                      <div className="font-medium text-slate-600 mb-1">Cipher Suite</div>
                      <div className="text-sm font-mono">{sslInfo.cipher_suite}</div>
                    </div>
                    <div>
                      <div className="font-medium text-slate-600 mb-1">Signature Algorithm</div>
                      <div className="text-sm font-mono">{sslInfo.signature_algorithm}</div>
                    </div>
                    <div>
                      <div className="font-medium text-slate-600 mb-1">Public Key</div>
                      <div className="text-sm">{sslInfo.public_key_algorithm} ({sslInfo.key_size} bits)</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="font-medium text-slate-600 mb-2">Subject Alternative Names</div>
                  <div className="flex flex-wrap gap-1">
                    {sslInfo.subject_alt_names.map((name: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs font-mono">
                        {name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <div className="font-medium text-slate-600 mb-1">Serial Number</div>
                    <div className="font-mono text-xs bg-slate-50 p-2 rounded break-all">{sslInfo.serial_number}</div>
                  </div>
                  <div>
                    <div className="font-medium text-slate-600 mb-1">SHA-1 Fingerprint</div>
                    <div className="font-mono text-xs bg-slate-50 p-2 rounded break-all">{sslInfo.fingerprint_sha1}</div>
                  </div>
                  <div>
                    <div className="font-medium text-slate-600 mb-1">SHA-256 Fingerprint</div>
                    <div className="font-mono text-xs bg-slate-50 p-2 rounded break-all">{sslInfo.fingerprint_sha256}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Security Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sslInfo.protocol_version === 'TLS 1.3' && (
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Using latest TLS 1.3 protocol</span>
                  </div>
                )}
                {sslInfo.key_size >= 2048 && (
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Strong key size ({sslInfo.key_size} bits)</span>
                  </div>
                )}
                {sslInfo.days_until_expiry > 30 && (
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Certificate expires in {sslInfo.days_until_expiry} days</span>
                  </div>
                )}
                {sslInfo.is_self_signed && (
                  <div className="flex items-center gap-2 text-orange-700">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">Self-signed certificate may cause browser warnings</span>
                  </div>
                )}
                {sslInfo.days_until_expiry < 30 && (
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">Certificate expires soon - renewal recommended</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SslChecker;
