
import { CredentialAnalysis } from './types';
import { getEntropyDescription } from './utils';

interface AnalysisMetricsProps {
  result: CredentialAnalysis;
}

const AnalysisMetrics = ({ result }: AnalysisMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-1">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Shannon Entropy
        </span>
        <div className="text-lg font-mono">
          {result.entropy.toFixed(2)}
        </div>
        <div className="text-xs text-slate-500">
          {getEntropyDescription(result.entropy)}
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Length
        </span>
        <div className="text-lg font-mono">
          {result.length} chars
        </div>
        <div className="text-xs text-slate-500">
          {result.length < 8 ? "Too short" : result.length < 12 ? "Adequate" : result.length < 16 ? "Good" : "Excellent"}
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Character Types
        </span>
        <div className="text-sm">
          {result.patterns.length} types
        </div>
        <div className="text-xs text-slate-500">
          {result.patterns.join(", ") || "None detected"}
        </div>
      </div>
    </div>
  );
};

export default AnalysisMetrics;
