
export interface SSLInfo {
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
