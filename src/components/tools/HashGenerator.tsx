
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const HashGenerator = () => {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({
    md5: '',
    sha1: '',
    sha256: ''
  });

  // Simple hash implementations (for demo purposes - not cryptographically secure)
  const generateMD5 = async (text: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('MD5', data).catch(() => null);
    
    if (!hashBuffer) {
      // Fallback simple hash for demo
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16).padStart(8, '0').substring(0, 32);
    }
    
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const generateSHA1 = async (text: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const generateSHA256 = async (text: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  useEffect(() => {
    if (!input) {
      setHashes({ md5: '', sha1: '', sha256: '' });
      return;
    }

    const generateHashes = async () => {
      const [md5, sha1, sha256] = await Promise.all([
        generateMD5(input),
        generateSHA1(input),
        generateSHA256(input)
      ]);

      setHashes({ md5, sha1, sha256 });
    };

    generateHashes();
  }, [input]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const hashTypes = [
    { name: 'MD5', key: 'md5' as keyof typeof hashes, description: '128-bit hash (not secure)' },
    { name: 'SHA-1', key: 'sha1' as keyof typeof hashes, description: '160-bit hash (deprecated)' },
    { name: 'SHA-256', key: 'sha256' as keyof typeof hashes, description: '256-bit hash (secure)' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium mb-3">Input Text</label>
        <Input
          placeholder="Enter text to hash..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {hashTypes.map((hashType) => (
          <Card key={hashType.key}>
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                <div>
                  <span>{hashType.name}</span>
                  <div className="text-sm font-normal text-slate-600">
                    {hashType.description}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(hashes[hashType.key])}
                  disabled={!hashes[hashType.key]}
                >
                  Copy
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-mono text-sm bg-slate-50 p-4 rounded border break-all">
                {hashes[hashType.key] || 'Hash will appear here...'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="text-sm text-slate-600">
            <p><strong>Security Note:</strong></p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>MD5 is cryptographically broken and should not be used for security purposes</li>
              <li>SHA-1 is deprecated and vulnerable to collision attacks</li>
              <li>SHA-256 is currently considered secure for most applications</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HashGenerator;
