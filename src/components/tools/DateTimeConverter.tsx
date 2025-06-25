
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DateTimeConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputFormat, setInputFormat] = useState("iso");
  const [results, setResults] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const formatDate = (date: Date) => {
    return {
      iso: date.toISOString(),
      timestamp: Math.floor(date.getTime() / 1000).toString(),
      milliseconds: date.getTime().toString(),
      utc: date.toUTCString(),
      local: date.toLocaleString(),
      date: date.toDateString(),
      time: date.toTimeString(),
      "dd/mm/yyyy": date.toLocaleDateString('en-GB'),
      "mm/dd/yyyy": date.toLocaleDateString('en-US'),
      "yyyy-mm-dd": date.toISOString().split('T')[0]
    };
  };

  const handleConvert = () => {
    try {
      let date: Date;
      
      switch (inputFormat) {
        case "iso":
          date = new Date(inputValue);
          break;
        case "timestamp":
          date = new Date(parseInt(inputValue) * 1000);
          break;
        case "milliseconds":
          date = new Date(parseInt(inputValue));
          break;
        default:
          date = new Date(inputValue);
      }

      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }

      setResults(formatDate(date));
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid date format. Please check your input.",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Date format copied to clipboard"
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <CardTitle>Date-time Converter</CardTitle>
          </div>
          <CardDescription>
            Convert date and time into various different formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="input-date">Input Date/Time</Label>
              <Input
                id="input-date"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter date/time..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-format">Input Format</Label>
              <Select value={inputFormat} onValueChange={setInputFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iso">ISO 8601</SelectItem>
                  <SelectItem value="timestamp">Unix Timestamp</SelectItem>
                  <SelectItem value="milliseconds">Milliseconds</SelectItem>
                  <SelectItem value="auto">Auto Detect</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={handleConvert} className="w-full">
            Convert Date
          </Button>

          {Object.keys(results).length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Converted Formats</h3>
              <div className="grid gap-3">
                {Object.entries(results).map(([format, value]) => (
                  <div key={format} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm uppercase text-slate-600 dark:text-slate-400">
                        {format.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="font-mono text-sm mt-1">{value}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(value)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DateTimeConverter;
