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
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Original Text
          </label>
          <Textarea
            placeholder="Enter original text..."
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="min-h-[150px] p-4"
          />
        </div>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Modified Text
          </label>
          <Textarea
            placeholder="Enter modified text..."
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="min-h-[150px] p-4"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={calculateDiff} className="flex-1 py-3">
          Compare Texts
        </Button>
        <Button onClick={clearTexts} variant="outline" className="py-3 px-6">
          Clear All
        </Button>
      </div>

      {diff.length > 0 && (
        <Card className="mt-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center justify-between">
              Differences
              <div className="text-sm font-normal text-slate-600 dark:text-slate-400">
                <span className="text-green-600">+{diff.filter(d => d.type === 'added').length} added</span>
                {' | '}
                <span className="text-red-600">-{diff.filter(d => d.type === 'removed').length} removed</span>
                {' | '}
                <span className="text-slate-600">{diff.filter(d => d.type === 'unchanged').length} unchanged</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2 font-mono text-sm max-h-96 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-800">
              {diff.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md ${
                    item.type === 'added'
                      ? 'bg-green-100 text-green-800 border-l-4 border-green-500'
                      : item.type === 'removed'
                      ? 'bg-red-100 text-red-800 border-l-4 border-red-500'
                      : 'bg-gray-50 text-gray-700 border-l-4 border-gray-300'
                  }`}
                >
                  <span className="mr-3 font-bold">
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
