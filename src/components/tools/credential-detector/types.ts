
export interface CredentialAnalysis {
  state: string;
  entropy: number;
  length: number;
  details: string;
  confidence: number;
  patterns: string[];
  recommendations: string[];
}

export interface HashPattern {
  regex: RegExp;
  name: string;
  confidence: number;
}
