
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const WordCounter = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    lines: 0,
    paragraphs: 0
  });

  useEffect(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const lines = text === '' ? 0 : text.split('\n').length;
    const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).length;

    setStats({ characters, charactersNoSpaces, words, lines, paragraphs });
  }, [text]);

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[120px]"
      />
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <Card className="p-3">
          <div className="text-center">
            <div className="font-semibold text-lg">{stats.characters}</div>
            <div className="text-slate-600">Characters</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="font-semibold text-lg">{stats.charactersNoSpaces}</div>
            <div className="text-slate-600">No Spaces</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="font-semibold text-lg">{stats.words}</div>
            <div className="text-slate-600">Words</div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <div className="font-semibold text-lg">{stats.lines}</div>
            <div className="text-slate-600">Lines</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WordCounter;
