
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface TextDiffInputProps {
  text1: string;
  text2: string;
  setText1: (value: string) => void;
  setText2: (value: string) => void;
}

const TextDiffInput: React.FC<TextDiffInputProps> = ({
  text1,
  text2,
  setText1,
  setText2
}) => {
  return (
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
  );
};

export default TextDiffInput;
