
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { detectPasswordState } from './credential-detector/utils';
import { CredentialAnalysis } from './credential-detector/types';
import AnalysisResult from './credential-detector/AnalysisResult';

const CredentialFormatDetector = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<CredentialAnalysis | null>(null);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    const analysis = detectPasswordState(input);
    setResult(analysis);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Credential Format Detector
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Advanced analysis of passwords and credentials to detect format, security level, and provide recommendations
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Password Analysis
          </CardTitle>
          <CardDescription>
            Enter a password or credential to analyze its format and security characteristics
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

          {result && <AnalysisResult result={result} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default CredentialFormatDetector;
