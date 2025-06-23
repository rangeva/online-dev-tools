
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, CheckCircle, AlertTriangle, XCircle, Calendar, Globe } from 'lucide-react';

interface SSLInfo {
  domain: string;
  is_valid: boolean;
  is_expired: boolean;
  days_until_expiry: number;
  chain_length: number;
  valid_from: string;
  valid_to: string;
  is_wildcard: boolean;
  is_self_signed: boolean;
}

interface SSLCertificateStatusProps {
  sslInfo: SSLInfo;
}

const SSLCertificateStatus = ({ sslInfo }: SSLCertificateStatusProps) => {
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
  );
};

export default SSLCertificateStatus;
