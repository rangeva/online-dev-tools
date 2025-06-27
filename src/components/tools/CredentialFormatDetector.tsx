
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Shield, Lock, Code } from "lucide-react";

const CredentialFormatDetector = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    state: string;
    entropy: number;
    length: number;
    details: string;
  } | null>(null);

  const isBase64 = (s: string): boolean => {
    try {
      return btoa(atob(s)) === s;
    } catch {
      return false;
    }
  };

  const isHex = (s: string): boolean => {
    return /^[0-9a-fA-F]+$/.test(s);
  };

  const shannonEntropy = (s: string): number => {
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

  const detectPasswordState = (passwordInput: string) => {
    const password = passwordInput.trim();
    const entropy = shannonEntropy(password);
    const length = password.length;

    // Step 1: Check for common hash patterns
    if (/^[a-fA-F0-9]{64}$/.test(password)) {
      return {
        state: "hashed",
        entropy,
        length,
        details: "SHA-256 hash pattern detected (64 hex characters)"
      };
    }
    if (/^[a-fA-F0-9]{32}$/.test(password)) {
      return {
        state: "hashed",
        entropy,
        length,
        details: "MD5 hash pattern detected (32 hex characters)"
      };
    }
    if (/^[a-fA-F0-9]{128}$/.test(password)) {
      return {
        state: "hashed",
        entropy,
        length,
        details: "SHA-512 hash pattern detected (128 hex characters)"
      };
    }

    // Step 2: Base64 or Hex encoding
    if (isBase64(password)) {
      return {
        state: "base64-encoded",
        entropy,
        length,
        details: "Valid Base64 encoding detected"
      };
    }
    if (isHex(password) && length % 2 === 0) {
      return {
        state: "hex-encoded",
        entropy,
        length,
        details: "Hexadecimal encoding detected"
      };
    }

    // Step 3: Encrypted or Obfuscated (high entropy, strange characters)
    if (entropy > 4.5 && length > 20) {
      return {
        state: "encrypted",
        entropy,
        length,
        details: "High entropy and length suggest encryption or obfuscation"
      };
    }

    // Step 4: Plaintext check (low entropy, reasonable length)
    if (entropy < 3.5 && length < 20) {
      return {
        state: "plaintext",
        entropy,
        length,
        details: "Low entropy and reasonable length suggest plaintext"
      };
    }

    // Default
    return {
      state: "unknown",
      entropy,
      length,
      details: "Unable to determine format with confidence"
    };
  };

  const handleAnalyze = () => {
    if (!input.trim()) return;
    const analysis = detectPasswordState(input);
    setResult(analysis);
  };

  const getStateIcon = (state: string) => {
    switch (state) {
      case "plaintext":
        return <Eye className="h-4 w-4" />;
      case "hashed":
        return <Shield className="h-4 w-4" />;
      case "encrypted":
        return <Lock className="h-4 w-4" />;
      case "base64-encoded":
      case "hex-encoded":
        return <Code className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case "plaintext":
        return "destructive";
      case "hashed":
        return "default";
      case "encrypted":
        return "secondary";
      case "base64-encoded":
      case "hex-encoded":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Credential Format Detector
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Analyze passwords and credentials to detect their format: plaintext, hashed, encrypted, or encoded
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Password Analysis
          </CardTitle>
          <CardDescription>
            Enter a password or credential to analyze its format and security state
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password-input">Password/Credential</Label>
            <Textarea
              id="password-input"
              placeholder="Enter the password or credential to analyze..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[100px] font-mono"
            />
          </div>

          <Button onClick={handleAnalyze} disabled={!input.trim()} className="w-full">
            <Shield className="h-4 w-4 mr-2" />
            Analyze Credential
          </Button>

          {result && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStateIcon(result.state)}
                  Analysis Result
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Detected State:</span>
                  <Badge variant={getStateColor(result.state) as any} className="flex items-center gap-1">
                    {getStateIcon(result.state)}
                    {result.state.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Shannon Entropy
                    </span>
                    <div className="text-lg font-mono">
                      {result.entropy.toFixed(2)}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Length
                    </span>
                    <div className="text-lg font-mono">
                      {result.length} characters
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Details
                  </span>
                  <p className="text-sm bg-slate-50 dark:bg-slate-800 p-3 rounded">
                    {result.details}
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Security Recommendations
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    {result.state === "plaintext" && (
                      <>
                        <li>• This appears to be a plaintext password - consider hashing it</li>
                        <li>• Use strong hashing algorithms like bcrypt, Argon2, or PBKDF2</li>
                      </>
                    )}
                    {result.state === "hashed" && (
                      <>
                        <li>• This appears to be a hashed password</li>
                        <li>• Ensure proper salt usage and secure hashing algorithms</li>
                      </>
                    )}
                    {result.state === "encrypted" && (
                      <>
                        <li>• This appears to be encrypted or obfuscated data</li>
                        <li>• Verify the encryption method and key management</li>
                      </>
                    )}
                    {(result.state === "base64-encoded" || result.state === "hex-encoded") && (
                      <>
                        <li>• This appears to be encoded data, not encrypted</li>
                        <li>• Encoding is not encryption - data can be easily decoded</li>
                      </>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CredentialFormatDetector;
