
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, Lock } from 'lucide-react';

interface SSLInfo {
  protocol_version: string;
  key_size: number;
  days_until_expiry: number;
  is_self_signed: boolean;
}

interface SSLSecurityAssessmentProps {
  sslInfo: SSLInfo;
}

const SSLSecurityAssessment = ({ sslInfo }: SSLSecurityAssessmentProps) => {
  return (
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
  );
};

export default SSLSecurityAssessment;
