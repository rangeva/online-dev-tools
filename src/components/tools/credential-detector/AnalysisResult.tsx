
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, Shield, Lock, Code, Info, AlertTriangle } from "lucide-react";
import { CredentialAnalysis } from './types';
import AnalysisMetrics from './AnalysisMetrics';
import SecurityRecommendations from './SecurityRecommendations';

interface AnalysisResultProps {
  result: CredentialAnalysis;
}

const AnalysisResult = ({ result }: AnalysisResultProps) => {
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
      case "uuid":
        return <Code className="h-4 w-4" />;
      case "obfuscated":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
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
      case "uuid":
        return "outline";
      case "obfuscated":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getStateIcon(result.state)}
            Analysis Result
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">Detected Format:</span>
            <Badge variant={getStateColor(result.state) as any} className="flex items-center gap-1">
              {getStateIcon(result.state)}
              {result.state.toUpperCase().replace('-', ' ')}
            </Badge>
            <span className="text-sm text-slate-500">
              ({result.confidence}% confidence)
            </span>
          </div>

          <AnalysisMetrics result={result} />

          <div className="space-y-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Analysis Details
            </span>
            <p className="text-sm bg-slate-50 dark:bg-slate-800 p-3 rounded">
              {result.details}
            </p>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <h4 className="font-medium">Understanding the Results:</h4>
            <ul className="text-sm space-y-1 ml-4">
              <li><strong>Shannon Entropy:</strong> Measures randomness (0-8 scale). Higher values indicate more random/complex data.</li>
              <li><strong>Length:</strong> Number of characters. Longer is generally more secure for passwords.</li>
              <li><strong>Character Types:</strong> Variety of character classes used (uppercase, lowercase, digits, symbols).</li>
              <li><strong>Confidence:</strong> How certain the analysis is about the detected format.</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>

      <SecurityRecommendations result={result} />
    </div>
  );
};

export default AnalysisResult;
