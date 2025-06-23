
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const JwtDecoder = () => {
  const [jwt, setJwt] = useState('');
  const [decoded, setDecoded] = useState<{header: any, payload: any, signature: string} | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!jwt.trim()) {
      setDecoded(null);
      setError('');
      return;
    }

    try {
      const parts = jwt.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      const signature = parts[2];

      setDecoded({ header, payload, signature });
      setError('');
    } catch (err) {
      setError((err as Error).message);
      setDecoded(null);
    }
  }, [jwt]);

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const isExpired = (exp: number) => {
    return Date.now() / 1000 > exp;
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <label className="block text-sm font-medium mb-3">JWT Token</label>
        <Textarea
          placeholder="Paste your JWT token here..."
          value={jwt}
          onChange={(e) => setJwt(e.target.value)}
          className="min-h-[120px] font-mono text-sm py-3"
        />
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-700 font-medium">Invalid JWT:</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </CardContent>
        </Card>
      )}

      {decoded && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-3">
                Header
                <Badge variant="secondary">{decoded.header.alg || 'Unknown'}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-50 p-4 rounded border text-sm overflow-x-auto">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-3">
                Payload
                {decoded.payload.exp && (
                  <Badge variant={isExpired(decoded.payload.exp) ? "destructive" : "default"}>
                    {isExpired(decoded.payload.exp) ? 'Expired' : 'Valid'}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-50 p-4 rounded border text-sm overflow-x-auto">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
              
              {(decoded.payload.iat || decoded.payload.exp || decoded.payload.nbf) && (
                <div className="mt-6 space-y-3 text-sm">
                  {decoded.payload.iat && (
                    <div><strong>Issued At:</strong> {formatTimestamp(decoded.payload.iat)}</div>
                  )}
                  {decoded.payload.exp && (
                    <div><strong>Expires At:</strong> {formatTimestamp(decoded.payload.exp)}</div>
                  )}
                  {decoded.payload.nbf && (
                    <div><strong>Not Before:</strong> {formatTimestamp(decoded.payload.nbf)}</div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Signature</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-4 rounded border font-mono text-sm break-all">
                {decoded.signature}
              </div>
              <p className="text-sm text-slate-600 mt-3">
                Signature verification requires the secret key
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default JwtDecoder;
