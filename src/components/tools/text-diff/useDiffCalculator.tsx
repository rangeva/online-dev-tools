
import { useState } from 'react';

interface DiffSegment {
  type: 'added' | 'removed' | 'unchanged';
  value: string;
  inlineChanges?: Array<{type: 'added' | 'removed' | 'unchanged', text: string}>;
}

export const useDiffCalculator = () => {
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

  const calculateDiff = (text1: string, text2: string) => {
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

  const clearDiff = () => {
    setDiff([]);
  };

  return {
    diff,
    calculateDiff,
    clearDiff
  };
};
