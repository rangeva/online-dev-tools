
import React from 'react';

interface InlineChange {
  type: 'added' | 'removed' | 'unchanged';
  text: string;
}

interface InlineChangesProps {
  changes: InlineChange[];
}

const InlineChanges: React.FC<InlineChangesProps> = ({ changes }) => {
  return (
    <>
      {changes.map((change, index) => (
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
      ))}
    </>
  );
};

export default InlineChanges;
