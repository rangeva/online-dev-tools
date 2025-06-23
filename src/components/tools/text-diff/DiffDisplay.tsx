
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InlineChanges from './InlineChanges';

interface DiffSegment {
  type: 'added' | 'removed' | 'unchanged';
  value: string;
  inlineChanges?: Array<{type: 'added' | 'removed' | 'unchanged', text: string}>;
}

interface DiffDisplayProps {
  diff: DiffSegment[];
}

const DiffDisplay: React.FC<DiffDisplayProps> = ({ diff }) => {
  if (diff.length === 0) {
    return null;
  }

  return (
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
                <span><InlineChanges changes={item.inlineChanges} /></span>
              ) : (
                <span>{item.value || '(empty line)'}</span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiffDisplay;
