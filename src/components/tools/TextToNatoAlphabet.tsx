
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Radio } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextToNatoAlphabet = () => {
  const [inputText, setInputText] = useState("");
  const [natoText, setNatoText] = useState("");
  const { toast } = useToast();

  const natoAlphabet: Record<string, string> = {
    'A': 'Alfa', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo',
    'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliet',
    'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar',
    'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
    'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee',
    'Z': 'Zulu',
    '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
    '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine'
  };

  const convertToNato = () => {
    const result = inputText
      .toUpperCase()
      .split('')
      .map(char => {
        if (natoAlphabet[char]) {
          return natoAlphabet[char];
        } else if (char === ' ') {
          return '[SPACE]';
        } else if (char.match(/[^A-Z0-9\s]/)) {
          return `[${char}]`;
        }
        return char;
      })
      .join(' ');
    
    setNatoText(result);
  };

  const convertFromNato = () => {
    const reverseNato = Object.fromEntries(
      Object.entries(natoAlphabet).map(([key, value]) => [value.toUpperCase(), key])
    );
    
    const words = natoText.toUpperCase().split(' ');
    const result = words
      .map(word => {
        if (word === '[SPACE]') {
          return ' ';
        } else if (word.startsWith('[') && word.endsWith(']')) {
          return word.slice(1, -1);
        } else if (reverseNato[word]) {
          return reverseNato[word];
        }
        return word;
      })
      .join('');
    
    setInputText(result);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard"
    });
  };

  const clear = () => {
    setInputText("");
    setNatoText("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Radio className="h-5 w-5" />
            <CardTitle>Text to NATO Alphabet</CardTitle>
          </div>
          <CardDescription>
            Transform text into the NATO phonetic alphabet for oral transmission
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Text */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="input-text">Plain Text</Label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(inputText)}
                    disabled={!inputText}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                id="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to convert to NATO alphabet..."
                className="min-h-[200px] text-sm"
              />
              <Button onClick={convertToNato} disabled={!inputText} className="w-full">
                Convert to NATO Alphabet
              </Button>
            </div>

            {/* NATO Alphabet */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="nato-text">NATO Phonetic Alphabet</Label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(natoText)}
                    disabled={!natoText}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                id="nato-text"
                value={natoText}
                onChange={(e) => setNatoText(e.target.value)}
                placeholder="NATO alphabet representation..."
                className="min-h-[200px] text-sm"
              />
              <Button onClick={convertFromNato} disabled={!natoText} className="w-full">
                Convert from NATO Alphabet
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" onClick={clear}>
              Clear All
            </Button>
          </div>

          {/* NATO Alphabet Reference */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">NATO Phonetic Alphabet Reference</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm">
              {Object.entries(natoAlphabet).map(([letter, word]) => (
                <div key={letter} className="flex justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded">
                  <span className="font-mono font-bold">{letter}</span>
                  <span>{word}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TextToNatoAlphabet;
