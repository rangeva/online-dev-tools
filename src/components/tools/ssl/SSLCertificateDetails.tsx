
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Info } from 'lucide-react';

interface SSLInfo {
  valid_from: string;
  valid_to: string;
  issued_by: string;
  issuer_organization: string;
  issuer_country: string;
  protocol_version: string;
  cipher_suite: string;
  signature_algorithm: string;
  public_key_algorithm: string;
  key_size: number;
  subject_alt_names: string[];
  serial_number: string;
  fingerprint_sha1: string;
  fingerprint_sha256: string;
}

interface SSLCertificateDetailsProps {
  sslInfo: SSLInfo;
}

const SSLCertificateDetails = ({ sslInfo }: SSLCertificateDetailsProps) => {
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

  return (
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
  );
};

export default SSLCertificateDetails;
