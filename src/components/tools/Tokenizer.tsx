
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layers, Hash } from "lucide-react";

interface TokenResult {
  modelName: string;
  tokens: string[];
  tokenCount: number;
  description: string;
}

const Tokenizer = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<TokenResult[]>([]);

  // Simple tokenization functions for different model types
  const tokenizeByModel = (text: string): TokenResult[] => {
    if (!text.trim()) return [];

    const results: TokenResult[] = [];

    // GPT-style tokenization (rough approximation)
    const gptTokens = text
      .replace(/\s+/g, ' ')
      .split(/(\w+|[^\w\s]|\s+)/)
      .filter(token => token.length > 0)
      .map(token => token === ' ' ? '·' : token);
    
    results.push({
      modelName: "GPT-style",
      tokens: gptTokens,
      tokenCount: gptTokens.length,
      description: "Word and character level tokenization similar to GPT models"
    });

    // Word-based tokenization
    const wordTokens = text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 0);
    
    results.push({
      modelName: "Word-based",
      tokens: wordTokens,
      tokenCount: wordTokens.length,
      description: "Simple word-based tokenization"
    });

    // Character-level tokenization
    const charTokens = text.split('').filter(char => char !== '');
    
    results.push({
      modelName: "Character-level",
      tokens: charTokens,
      tokenCount: charTokens.length,
      description: "Individual character tokenization"
    });

    // Subword tokenization (simplified BPE-like)
    const subwordTokens = text
      .split(/(\w+)/)
      .filter(token => token.length > 0)
      .flatMap(token => {
        if (/^\w+$/.test(token) && token.length > 4) {
          // Split longer words into subwords
          const subwords = [];
          for (let i = 0; i < token.length; i += 3) {
            subwords.push(token.slice(i, i + 3));
          }
          return subwords;
        }
        return [token];
      });

    results.push({
      modelName: "Subword (BPE-like)",
      tokens: subwordTokens,
      tokenCount: subwordTokens.length,
      description: "Byte-pair encoding style subword tokenization"
    });

    return results;
  };

  const handleTokenize = () => {
    if (!input.trim()) return;
    const tokenResults = tokenizeByModel(input);
    setResults(tokenResults);
  };

  const getTokenColor = (index: number) => {
    const colors = [
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Text Tokenizer
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Analyze how text is tokenized by different language models and see token counts
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Text Input
          </CardTitle>
          <CardDescription>
            Enter text to see how it would be tokenized by different language models
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text-input">Text to Tokenize</Label>
            <Textarea
              id="text-input"
              placeholder="Enter your text here to see how it gets tokenized..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <Button onClick={handleTokenize} disabled={!input.trim()} className="w-full">
            <Layers className="h-4 w-4 mr-2" />
            Tokenize Text
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((result, modelIndex) => (
            <Card key={result.modelName}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Hash className="h-4 w-4" />
                    {result.modelName}
                  </CardTitle>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Hash className="h-3 w-3" />
                    {result.tokenCount} tokens
                  </Badge>
                </div>
                <CardDescription>{result.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {result.tokens.map((token, tokenIndex) => (
                    <Badge
                      key={`${result.modelName}-${tokenIndex}`}
                      variant="secondary"
                      className={`${getTokenColor(tokenIndex)} text-xs font-mono border`}
                    >
                      {token === '·' ? '␣' : token}
                    </Badge>
                  ))}
                </div>
                {result.tokens.length === 0 && (
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    No tokens generated
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tokenizer;
