
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const RegexTester = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!pattern || !testString) {
      setMatches([]);
      setError('');
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const foundMatches = [];
      let match;
      
      if (flags.includes('g')) {
        while ((match = regex.exec(testString)) !== null) {
          foundMatches.push(match);
          if (match.index === regex.lastIndex) break;
        }
      } else {
        match = regex.exec(testString);
        if (match) foundMatches.push(match);
      }
      
      setMatches(foundMatches);
      setError('');
    } catch (err) {
      setError((err as Error).message);
      setMatches([]);
    }
  }, [pattern, flags, testString]);

  const highlightMatches = (text: string) => {
    if (!matches.length) return text;

    let result = text;
    let offset = 0;

    matches.forEach((match) => {
      if (match.index !== undefined) {
        const start = match.index + offset;
        const end = start + match[0].length;
        const before = result.slice(0, start);
        const matched = result.slice(start, end);
        const after = result.slice(end);
        
        result = before + `<mark class="bg-yellow-200 px-1 rounded">${matched}</mark>` + after;
        offset += 47; // Length of the mark tags
      }
    });

    return result;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <label className="block text-sm font-medium mb-2">Regular Expression</label>
          <Input
            placeholder="Enter regex pattern..."
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Flags</label>
          <Input
            placeholder="gimuy"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Test String</label>
        <Textarea
          placeholder="Enter text to test against..."
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-700 font-medium">Regex Error:</p>
            <p className="text-red-600 text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {testString && !error && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Test Result
              <Badge variant={matches.length > 0 ? "default" : "secondary"}>
                {matches.length} match{matches.length !== 1 ? 'es' : ''}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="font-mono text-sm bg-slate-50 p-3 rounded border whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: highlightMatches(testString) }}
            />
          </CardContent>
        </Card>
      )}

      {matches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {matches.map((match, index) => (
                <div key={index} className="bg-slate-50 p-3 rounded border font-mono text-sm">
                  <div><strong>Match {index + 1}:</strong> "{match[0]}"</div>
                  <div><strong>Index:</strong> {match.index}</div>
                  {match.length > 1 && (
                    <div><strong>Groups:</strong> {match.slice(1).join(', ')}</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RegexTester;
