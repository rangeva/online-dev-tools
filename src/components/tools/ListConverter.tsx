
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, List, ArrowUpDown, Plus, Minus, ArrowUp, ArrowDown, Type, Scissors } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ListConverter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [truncateLength, setTruncateLength] = useState(10);
  const [operations, setOperations] = useState({
    transpose: false,
    addPrefix: false,
    addSuffix: false,
    reverse: false,
    sort: false,
    lowercase: false,
    truncate: false
  });
  const { toast } = useToast();

  const processInput = (inputText: string) => {
    if (!inputText.trim()) return [];
    
    // Split by lines and filter out empty lines
    return inputText.split('\n').filter(line => line.trim() !== '');
  };

  const applyOperations = () => {
    try {
      let lines = processInput(input);
      
      if (lines.length === 0) {
        toast({
          title: "Error",
          description: "Please enter some data to process.",
          variant: "destructive"
        });
        return;
      }

      // Apply transpose (split each line by common delimiters and reorganize)
      if (operations.transpose) {
        const splitLines = lines.map(line => 
          line.split(/[,\t|;]/).map(item => item.trim())
        );
        
        // Find max columns
        const maxCols = Math.max(...splitLines.map(line => line.length));
        
        // Transpose the data
        const transposed = [];
        for (let col = 0; col < maxCols; col++) {
          const column = splitLines.map(row => row[col] || '').filter(item => item);
          if (column.length > 0) {
            transposed.push(column.join(', '));
          }
        }
        lines = transposed;
      }

      // Apply reverse
      if (operations.reverse) {
        lines = [...lines].reverse();
      }

      // Apply sort
      if (operations.sort) {
        lines = [...lines].sort();
      }

      // Apply lowercase
      if (operations.lowercase) {
        lines = lines.map(line => line.toLowerCase());
      }

      // Apply truncate
      if (operations.truncate) {
        lines = lines.map(line => 
          line.length > truncateLength ? line.substring(0, truncateLength) + '...' : line
        );
      }

      // Apply prefix and suffix
      if (operations.addPrefix || operations.addSuffix) {
        lines = lines.map(line => {
          let result = line;
          if (operations.addPrefix && prefix) {
            result = prefix + result;
          }
          if (operations.addSuffix && suffix) {
            result = result + suffix;
          }
          return result;
        });
      }

      setOutput(lines.join('\n'));
      
      toast({
        title: "Success",
        description: "List processed successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while processing the list.",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Processed list copied to clipboard"
    });
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setPrefix("");
    setSuffix("");
    setTruncateLength(10);
    setOperations({
      transpose: false,
      addPrefix: false,
      addSuffix: false,
      reverse: false,
      sort: false,
      lowercase: false,
      truncate: false
    });
  };

  const toggleOperation = (operation: keyof typeof operations) => {
    setOperations(prev => ({
      ...prev,
      [operation]: !prev[operation]
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <List className="h-5 w-5" />
            <CardTitle>List Converter</CardTitle>
          </div>
          <CardDescription>
            Process column-based data and apply various changes (transpose, add prefix and suffix, reverse list, sort list, lowercase values, truncate values) to each row
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="list-input">Input Data (one item per line)</Label>
                <Textarea
                  id="list-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Apple&#10;Banana&#10;Cherry&#10;Date&#10;Elderberry"
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Operations</Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="transpose" 
                      checked={operations.transpose}
                      onCheckedChange={() => toggleOperation('transpose')}
                    />
                    <Label htmlFor="transpose" className="flex items-center gap-2">
                      <ArrowUpDown className="h-4 w-4" />
                      Transpose columns
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="reverse" 
                      checked={operations.reverse}
                      onCheckedChange={() => toggleOperation('reverse')}
                    />
                    <Label htmlFor="reverse" className="flex items-center gap-2">
                      <ArrowDown className="h-4 w-4" />
                      Reverse list
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="sort" 
                      checked={operations.sort}
                      onCheckedChange={() => toggleOperation('sort')}
                    />
                    <Label htmlFor="sort" className="flex items-center gap-2">
                      <ArrowUp className="h-4 w-4" />
                      Sort list
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="lowercase" 
                      checked={operations.lowercase}
                      onCheckedChange={() => toggleOperation('lowercase')}
                    />
                    <Label htmlFor="lowercase" className="flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      Lowercase
                    </Label>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="addPrefix" 
                      checked={operations.addPrefix}
                      onCheckedChange={() => toggleOperation('addPrefix')}
                    />
                    <Label htmlFor="addPrefix" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add prefix
                    </Label>
                  </div>
                  {operations.addPrefix && (
                    <Input
                      placeholder="Enter prefix..."
                      value={prefix}
                      onChange={(e) => setPrefix(e.target.value)}
                      className="ml-6"
                    />
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="addSuffix" 
                      checked={operations.addSuffix}
                      onCheckedChange={() => toggleOperation('addSuffix')}
                    />
                    <Label htmlFor="addSuffix" className="flex items-center gap-2">
                      <Minus className="h-4 w-4" />
                      Add suffix
                    </Label>
                  </div>
                  {operations.addSuffix && (
                    <Input
                      placeholder="Enter suffix..."
                      value={suffix}
                      onChange={(e) => setSuffix(e.target.value)}
                      className="ml-6"
                    />
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="truncate" 
                      checked={operations.truncate}
                      onCheckedChange={() => toggleOperation('truncate')}
                    />
                    <Label htmlFor="truncate" className="flex items-center gap-2">
                      <Scissors className="h-4 w-4" />
                      Truncate values
                    </Label>
                  </div>
                  {operations.truncate && (
                    <div className="ml-6 flex items-center gap-2">
                      <Label htmlFor="truncateLength" className="text-sm">Max length:</Label>
                      <Input
                        id="truncateLength"
                        type="number"
                        min="1"
                        value={truncateLength}
                        onChange={(e) => setTruncateLength(Number(e.target.value))}
                        className="w-20"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Processed Output</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  disabled={!output}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={output}
                readOnly
                className="min-h-[400px] font-mono text-sm"
                placeholder="Processed output will appear here..."
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={applyOperations} className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Process List
            </Button>
            <Button onClick={clearAll} variant="outline">
              Clear All
            </Button>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <div><strong>Tips:</strong></div>
            <div>• Enter one item per line in the input field</div>
            <div>• Transpose works with comma, tab, pipe, or semicolon-separated data</div>
            <div>• Select multiple operations to apply them in sequence</div>
            <div>• Operations are applied in order: transpose → reverse → sort → lowercase → truncate → prefix/suffix</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListConverter;
