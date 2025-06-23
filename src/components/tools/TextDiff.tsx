
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TextDiff = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState<Array<{type: 'added' | 'removed' | 'unchanged', value: string}>>([]);

  const calculateDiff = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const result: Array<{type: 'added' | 'removed' | 'unchanged', value: string}> = [];

    const maxLength = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLength; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';
      
      if (line1 === line2) {
        if (line1 !== '' || line2 !== '') {
          result.push({ type: 'unchanged', value: line1 });
        }
      } else {
        if (lines1[i] !== undefined) {
          result.push({ type: 'removed', value: line1 });
        }
        if (lines2[i] !== undefined) {
          result.push({ type: 'added', value: line2 });
        }
      }
    }
    
    setDiff(result);
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
            className="min-h-[100px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Modified Text</label>
          <Textarea
            placeholder="Enter modified text..."
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </div>

      <Button onClick={calculateDiff} className="w-full">
        Compare Texts
      </Button>

      {diff.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Differences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 font-mono text-sm">
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
                  <span className="mr-2">
                    {item.type === 'added' ? '+' : item.type === 'removed' ? '-' : ' '}
                  </span>
                  {item.value || '(empty line)'}
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
