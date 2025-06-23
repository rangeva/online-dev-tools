
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDiffCalculator } from './text-diff/useDiffCalculator';
import TextDiffInput from './text-diff/TextDiffInput';
import DiffDisplay from './text-diff/DiffDisplay';

const TextDiff = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const { diff, calculateDiff, clearDiff } = useDiffCalculator();

  const handleCalculateDiff = () => {
    calculateDiff(text1, text2);
  };

  const handleClearTexts = () => {
    setText1('');
    setText2('');
    clearDiff();
  };

  return (
    <div className="p-8 space-y-8">
      <TextDiffInput
        text1={text1}
        text2={text2}
        setText1={setText1}
        setText2={setText2}
      />

      <div className="flex gap-4">
        <Button onClick={handleCalculateDiff} className="flex-1 py-3 text-base">
          Compare Texts
        </Button>
        <Button onClick={handleClearTexts} variant="outline" className="py-3 px-8 text-base">
          Clear All
        </Button>
      </div>

      <DiffDisplay diff={diff} />
    </div>
  );
};

export default TextDiff;
