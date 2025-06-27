
import { CredentialAnalysis, HashPattern } from './types';

export const isBase64 = (s: string): boolean => {
  try {
    const decoded = atob(s);
    return btoa(decoded) === s && s.length % 4 === 0;
  } catch {
    return false;
  }
};

export const isHex = (s: string): boolean => {
  return /^[0-9a-fA-F]+$/.test(s);
};

export const isUUID = (s: string): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s);
};

export const hasCommonPatterns = (s: string): string[] => {
  const patterns = [];
  if (/[A-Z]/.test(s)) patterns.push("uppercase");
  if (/[a-z]/.test(s)) patterns.push("lowercase");
  if (/[0-9]/.test(s)) patterns.push("digits");
  if (/[^A-Za-z0-9]/.test(s)) patterns.push("special-chars");
  if (/\s/.test(s)) patterns.push("whitespace");
  if (/(.)\1{2,}/.test(s)) patterns.push("repeating-chars");
  if (/^[a-zA-Z]+$/.test(s)) patterns.push("alphabetic-only");
  if (/^[0-9]+$/.test(s)) patterns.push("numeric-only");
  return patterns;
};

export const shannonEntropy = (s: string): number => {
  const charCounts = new Map<string, number>();
  for (const char of s) {
    charCounts.set(char, (charCounts.get(char) || 0) + 1);
  }
  
  const length = s.length;
  let entropy = 0;
  
  for (const count of charCounts.values()) {
    const prob = count / length;
    entropy -= prob * Math.log2(prob);
  }
  
  return entropy;
};

export const getHashPatterns = (): HashPattern[] => [
  { regex: /^[a-fA-F0-9]{32}$/, name: "MD5", confidence: 95 },
  { regex: /^[a-fA-F0-9]{40}$/, name: "SHA-1", confidence: 95 },
  { regex: /^[a-fA-F0-9]{56}$/, name: "SHA-224", confidence: 90 },
  { regex: /^[a-fA-F0-9]{64}$/, name: "SHA-256", confidence: 95 },
  { regex: /^[a-fA-F0-9]{96}$/, name: "SHA-384", confidence: 90 },
  { regex: /^[a-fA-F0-9]{128}$/, name: "SHA-512", confidence: 95 },
  { regex: /^\$2[ayb]\$.{56}$/, name: "bcrypt", confidence: 98 },
  { regex: /^\$argon2[id]\$v=19\$m=\d+,t=\d+,p=\d+\$.+/, name: "Argon2", confidence: 98 },
  { regex: /^\$6\$.{86}$/, name: "SHA-512 crypt", confidence: 95 },
  { regex: /^{SSHA}/, name: "SSHA", confidence: 90 },
  { regex: /^[a-fA-F0-9]{96}:[a-fA-F0-9]{32}$/, name: "PBKDF2", confidence: 85 }
];

export const detectPasswordState = (passwordInput: string): CredentialAnalysis => {
  const password = passwordInput.trim();
  const entropy = shannonEntropy(password);
  const length = password.length;
  const patterns = hasCommonPatterns(password);
  const hashPatterns = getHashPatterns();

  // Check for hash patterns first
  for (const pattern of hashPatterns) {
    if (pattern.regex.test(password)) {
      return {
        state: "hashed",
        entropy,
        length,
        details: `${pattern.name} hash pattern detected with ${pattern.confidence}% confidence`,
        confidence: pattern.confidence,
        patterns,
        recommendations: [
          `This appears to be a ${pattern.name} hash`,
          pattern.name === "MD5" || pattern.name === "SHA-1" ? 
            "⚠️ This hash algorithm is considered weak - migrate to stronger alternatives" :
            "✅ This is a secure hashing algorithm",
          "Ensure proper salt usage if applicable",
          "Store hashes securely and never transmit them in plain text"
        ]
      };
    }
  }

  // UUID detection
  if (isUUID(password)) {
    return {
      state: "uuid",
      entropy,
      length,
      details: "UUID format detected - typically used as unique identifiers",
      confidence: 95,
      patterns,
      recommendations: [
        "This appears to be a UUID (Universally Unique Identifier)",
        "UUIDs are not passwords and should not be used for authentication",
        "If used as a token, ensure proper expiration and rotation"
      ]
    };
  }

  // Base64 encoding detection
  if (isBase64(password) && password.length > 8) {
    const decodedLength = atob(password).length;
    return {
      state: "base64-encoded",
      entropy,
      length,
      details: `Valid Base64 encoding detected (decodes to ${decodedLength} bytes)`,
      confidence: 85,
      patterns,
      recommendations: [
        "This is Base64 encoded data, not encrypted",
        "Base64 is encoding, not encryption - data can be easily decoded",
        "If this contains sensitive data, proper encryption should be used instead",
        "Consider what the decoded content represents"
      ]
    };
  }

  // Hex encoding detection
  if (isHex(password) && length % 2 === 0 && length > 8) {
    return {
      state: "hex-encoded",
      entropy,
      length,
      details: `Hexadecimal encoding detected (${length/2} bytes when decoded)`,
      confidence: 80,
      patterns,
      recommendations: [
        "This appears to be hexadecimal encoded data",
        "Hex encoding is not encryption - easily reversible",
        "Could be a hash, encoded binary data, or encrypted content",
        "Verify the source and purpose of this hex data"
      ]
    };
  }

  // High entropy analysis for encrypted/obfuscated content
  if (entropy > 4.8 && length > 20 && !patterns.includes("repeating-chars")) {
    return {
      state: "encrypted",
      entropy,
      length,
      details: "Very high entropy suggests strong encryption or compression",
      confidence: 75,
      patterns,
      recommendations: [
        "High entropy indicates encrypted, compressed, or random data",
        "If encrypted, verify the encryption method and key management",
        "Ensure proper key storage and rotation practices",
        "Document the encryption algorithm and parameters used"
      ]
    };
  } else if (entropy > 4.0 && length > 15) {
    return {
      state: "obfuscated",
      entropy,
      length,
      details: "High entropy suggests obfuscation, encoding, or weak encryption",
      confidence: 60,
      patterns,
      recommendations: [
        "Moderate entropy suggests obfuscation or simple encoding",
        "May be weakly encrypted or scrambled data",
        "Consider using stronger encryption methods if security is required",
        "Obfuscation is not a security measure"
      ]
    };
  }

  // Plaintext analysis
  if (entropy < 3.5 && length < 50) {
    const strengthIndicators = [];
    if (length >= 12) strengthIndicators.push("adequate length");
    if (patterns.includes("uppercase") && patterns.includes("lowercase")) strengthIndicators.push("mixed case");
    if (patterns.includes("digits")) strengthIndicators.push("contains digits");
    if (patterns.includes("special-chars")) strengthIndicators.push("special characters");

    const isStrong = strengthIndicators.length >= 3 && length >= 12;
    
    return {
      state: "plaintext",
      entropy,
      length,
      details: `Plaintext password detected - ${isStrong ? 'relatively strong' : 'weak'} (${strengthIndicators.length}/4 strength criteria)`,
      confidence: 90,
      patterns,
      recommendations: [
        isStrong ? 
          "✅ This plaintext password meets basic strength criteria" :
          "⚠️ This plaintext password is weak",
        "Plaintext passwords should be hashed before storage",
        "Use strong hashing algorithms like bcrypt, Argon2, or PBKDF2",
        length < 12 ? "Increase length to at least 12 characters" : "",
        !patterns.includes("special-chars") ? "Add special characters for better security" : "",
        "Never store or transmit passwords in plain text"
      ].filter(Boolean)
    };
  }

  // Default case for unclear patterns
  return {
    state: "unknown",
    entropy,
    length,
    details: "Unable to determine format with high confidence - may be custom encoding",
    confidence: 30,
    patterns,
    recommendations: [
      "Format could not be definitively identified",
      "May be custom encoding, proprietary format, or corrupted data",
      "Verify the source and expected format",
      "Consider the context in which this credential was found"
    ]
  };
};

export const getEntropyDescription = (entropy: number): string => {
  if (entropy < 2) return "Very low - highly predictable";
  if (entropy < 3) return "Low - somewhat predictable";
  if (entropy < 4) return "Moderate - reasonably random";
  if (entropy < 5) return "High - quite random";
  return "Very high - extremely random";
};
