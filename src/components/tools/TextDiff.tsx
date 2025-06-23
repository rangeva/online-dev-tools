
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DiffSegment {
  type: 'added' | 'removed' | 'unchanged';
  value: string;
  inlineChanges?: Array<{type: 'added' | 'removed' | 'unchanged', text: string}>;
}

const TextDiff = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState<DiffSegment[]>([]);

  const getCharacterDiff = (str1: string, str2: string) => {
    const chars1 = str1.split('');
    const chars2 = str2.split('');
    const matrix: number[][] = [];
    
    // Initialize matrix for character-level LCS
    for (let i = 0; i <= chars1.length; i++) {
      matrix[i] = [];
      for (let j = 0; j <= chars2.length; j++) {
        if (i === 0 || j === 0) {
          matrix[i][j] = 0;
        } else if (chars1[i - 1] === chars2[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1] + 1;
        } else {
          matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
        }
      }
    }

    // Backtrack to find character-level changes
    const result: Array<{type: 'added' | 'removed' | 'unchanged', text: string}> = [];
    let i = chars1.length;
    let j = chars2.length;
    
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && chars1[i - 1] === chars2[j - 1]) {
        result.unshift({ type: 'unchanged', text: chars1[i - 1] });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || matrix[i][j - 1] >= matrix[i - 1][j])) {
        result.unshift({ type: 'added', text: chars2[j - 1] });
        j--;
      } else if (i > 0) {
        result.unshift({ type: 'removed', text: chars1[i - 1] });
        i--;
      }
    }
    
    return result;
  };

  const calculateDiff = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const result: DiffSegment[] = [];

    // Line-level LCS matrix
    const matrix: number[][] = [];
    
    for (let i = 0; i <= lines1.length; i++) {
      matrix[i] = [];
      for (let j = 0; j <= lines2.length; j++) {
        if (i === 0 || j === 0) {
          matrix[i][j] = 0;
        } else if (lines1[i - 1] === lines2[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1] + 1;
        } else {
          matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
        }
      }
    }

    // Backtrack to find line-level changes
    let i = lines1.length;
    let j = lines2.length;
    
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && lines1[i - 1] === lines2[j - 1]) {
        result.unshift({ type: 'unchanged', value: lines1[i - 1] });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || matrix[i][j - 1] >= matrix[i - 1][j])) {
        result.unshift({ type: 'added', value: lines2[j - 1] });
        j--;
      } else if (i > 0) {
        result.unshift({ type: 'removed', value: lines1[i - 1] });
        i--;
      }
    }

    // For lines that appear to be modifications (removed followed by added), 
    // calculate character-level diff
    const enhancedResult: DiffSegment[] = [];
    for (let k = 0; k < result.length; k++) {
      const current = result[k];
      const next = result[k + 1];
      
      if (current.type === 'removed' && next && next.type === 'added') {
        // This looks like a modification, show character-level diff
        const charDiff = getCharacterDiff(current.value, next.value);
        enhancedResult.push({
          type: 'removed',
          value: current.value,
          inlineChanges: charDiff
        });
        k++; // Skip the next item since we processed it
      } else {
        enhancedResult.push(current);
      }
    }
    
    setDiff(enhancedResult);
  };

  const clearTexts = () => {
    setText1('');
    setText2('');
    setDiff([]);
  };

  const renderInlineChanges = (changes: Array<{type: 'added' | 'removed' | 'unchanged', text: string}>) => {
    return changes.map((change, index) => (
      <span
        key={index}
        className={
          change.type === 'added'
            ? 'bg-green-200 text-green-900'
            : change.type === 'removed'
            ? 'bg-red-200 text-red-900 line-through'
            : ''
        }
      >
        {change.text}
      </span>
    ));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Original Text</label>
          <Textarea
            placeholder="Enter original text..."
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="min-h-[120px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Modified Text</label>
          <Textarea
            placeholder="Enter modified text..."
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="min-h-[120px]"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={calculateDiff} className="flex-1">
          Compare Texts
        </Button>
        <Button onClick={clearTexts} variant="outline">
          Clear All
        </Button>
      </div>

      {diff.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Differences
              <div className="text-sm font-normal text-slate-600">
                <span className="text-green-600">+{diff.filter(d => d.type === 'added').length} added</span>
                {' | '}
                <span className="text-red-600">-{diff.filter(d => d.type === 'removed').length} removed</span>
                {' | '}
                <span className="text-slate-600">{diff.filter(d => d.type === 'unchanged').length} unchanged</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 font-mono text-sm max-h-96 overflow-y-auto">
              {diff.map((item, index) => (
                <div
                  key={index}
                  className={`p-2 rounded ${
                    item.type === 'added'
                      ? 'bg-green-100 text-green-800 border-l-4 border-green-500'
                      : item.type === 'removed'
                      ? 'bg-red-100 text-red-800 border-l-4 border-red-500'
                      : 'bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="mr-2 font-bold">
                    {item.type === 'added' ? '+' : item.type === 'removed' ? '-' : ' '}
                  </span>
                  {item.inlineChanges ? (
                    <span>{renderInlineChanges(item.inlineChanges)}</span>
                  ) : (
                    <span>{item.value || '(empty line)'}</span>
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

export default TextDiff;
