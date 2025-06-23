
import React, { useState } from 'react';
import SSLCheckForm from './ssl/SSLCheckForm';
import SSLCertificateStatus from './ssl/SSLCertificateStatus';
import SSLCertificateDetails from './ssl/SSLCertificateDetails';
import SSLSecurityAssessment from './ssl/SSLSecurityAssessment';
import { SSLInfo } from './ssl/types';

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

  return (
    <div className="space-y-6">
      <SSLCheckForm
        domain={domain}
        setDomain={setDomain}
        onCheck={checkSSL}
        loading={loading}
        error={error}
      />

      {sslInfo && (
        <div className="space-y-6">
          <SSLCertificateStatus sslInfo={sslInfo} />
          <SSLCertificateDetails sslInfo={sslInfo} />
          <SSLSecurityAssessment sslInfo={sslInfo} />
        </div>
      )}
    </div>
  );
};

export default SslChecker;
