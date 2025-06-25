import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Copy, Calendar as CalendarIcon, Clock, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const DateTimeConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputFormat, setInputFormat] = useState("iso");
  const [results, setResults] = useState<Record<string, string>>({});
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("12:00");
  const { toast } = useToast();

  const formatDate = (date: Date) => {
    const pad = (num: number) => num.toString().padStart(2, '0');
    
    return {
      "ISO 8601": date.toISOString(),
      "Unix Timestamp": Math.floor(date.getTime() / 1000).toString(),
      "Milliseconds": date.getTime().toString(),
      "UTC String": date.toUTCString(),
      "Local String": date.toLocaleString(),
      "Date Only": date.toDateString(),
      "Time Only": date.toTimeString(),
      "DD/MM/YYYY": date.toLocaleDateString('en-GB'),
      "MM/DD/YYYY": date.toLocaleDateString('en-US'),
      "YYYY-MM-DD": date.toISOString().split('T')[0],
      "YYYY/MM/DD": `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`,
      "DD-MM-YYYY": `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`,
      "Month DD, YYYY": date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      "HH:MM:SS": `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`,
      "HH:MM": `${pad(date.getHours())}:${pad(date.getMinutes())}`,
      "12-Hour Time": date.toLocaleTimeString('en-US', { hour12: true }),
      "Relative": getRelativeTime(date)
    };
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (Math.abs(diffMinutes) < 1) return "Just now";
    if (Math.abs(diffMinutes) < 60) return `${Math.abs(diffMinutes)} minute${Math.abs(diffMinutes) === 1 ? '' : 's'} ${diffMinutes < 0 ? 'from now' : 'ago'}`;
    if (Math.abs(diffHours) < 24) return `${Math.abs(diffHours)} hour${Math.abs(diffHours) === 1 ? '' : 's'} ${diffHours < 0 ? 'from now' : 'ago'}`;
    if (Math.abs(diffDays) < 30) return `${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'} ${diffDays < 0 ? 'from now' : 'ago'}`;
    
    return date.toLocaleDateString();
  };

  const handleDateTimeSelect = () => {
    if (!selectedDate) return;
    
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const combinedDate = new Date(selectedDate);
    combinedDate.setHours(hours, minutes, 0, 0);
    
    setInputValue(combinedDate.toISOString());
    setInputFormat("iso");
    setResults(formatDate(combinedDate));
    
    toast({
      title: "Date & Time Selected",
      description: "Input updated with selected date and time"
    });
  };

  const handleConvert = () => {
    try {
      let date: Date;
      
      switch (inputFormat) {
        case "iso":
          date = new Date(inputValue);
          break;
        case "timestamp":
          const timestamp = parseInt(inputValue);
          // Handle both seconds and milliseconds timestamps
          date = new Date(timestamp < 10000000000 ? timestamp * 1000 : timestamp);
          break;
        case "milliseconds":
          date = new Date(parseInt(inputValue));
          break;
        case "auto":
          // Try different formats
          if (/^\d{10}$/.test(inputValue)) {
            date = new Date(parseInt(inputValue) * 1000);
          } else if (/^\d{13}$/.test(inputValue)) {
            date = new Date(parseInt(inputValue));
          } else {
            date = new Date(inputValue);
          }
          break;
        default:
          date = new Date(inputValue);
      }

      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }

      setResults(formatDate(date));
      toast({
        title: "Success",
        description: "Date converted successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid date format. Please check your input.",
        variant: "destructive"
      });
    }
  };

  const setCurrentTime = () => {
    const now = new Date();
    setInputValue(now.toISOString());
    setInputFormat("iso");
    setResults(formatDate(now));
    setSelectedDate(now);
    setSelectedTime(format(now, "HH:mm"));
    toast({
      title: "Current Time Set",
      description: "Input set to current date and time"
    });
  };

  const clearAll = () => {
    setInputValue("");
    setResults({});
    setInputFormat("iso");
    setSelectedDate(undefined);
    setSelectedTime("12:00");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Date format copied to clipboard"
    });
  };

  const exampleInputs = {
    iso: "2024-01-15T10:30:00.000Z",
    timestamp: "1705312200",
    milliseconds: "1705312200000",
    auto: "January 15, 2024"
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            <CardTitle>Date-time Converter</CardTitle>
          </div>
          <CardDescription>
            Convert date and time into various different formats with enhanced functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Date/Time Picker Section */}
          <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <Label className="text-sm font-medium">Visual Date & Time Picker</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date-picker">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time-picker">Select Time</Label>
                <Input
                  id="time-picker"
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            <Button 
              onClick={handleDateTimeSelect} 
              disabled={!selectedDate}
              className="w-full"
            >
              <Clock className="h-4 w-4 mr-2" />
              Use Selected Date & Time
            </Button>
          </div>

          {/* Original Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="input-date">Input Date/Time</Label>
              <Input
                id="input-date"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`e.g., ${exampleInputs[inputFormat as keyof typeof exampleInputs]}`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-format">Input Format</Label>
              <Select value={inputFormat} onValueChange={setInputFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iso">ISO 8601 (e.g., 2024-01-15T10:30:00Z)</SelectItem>
                  <SelectItem value="timestamp">Unix Timestamp (e.g., 1705312200)</SelectItem>
                  <SelectItem value="milliseconds">Milliseconds (e.g., 1705312200000)</SelectItem>
                  <SelectItem value="auto">Auto Detect</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleConvert} className="flex-1 min-w-fit">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Convert Date
            </Button>
            <Button onClick={setCurrentTime} variant="outline" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Use Current Time
            </Button>
            <Button onClick={clearAll} variant="outline" className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Clear All
            </Button>
          </div>

          {Object.keys(results).length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Converted Formats</h3>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {Object.keys(results).length} formats available
                </div>
              </div>
              <div className="grid gap-3">
                {Object.entries(results).map(([format, value]) => (
                  <div key={format} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-slate-700 dark:text-slate-300 mb-1">
                        {format}
                      </div>
                      <div className="font-mono text-sm text-slate-900 dark:text-slate-100 break-all">
                        {value}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(value)}
                      className="ml-3 flex-shrink-0"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <div><strong>Tips:</strong></div>
            <div>• Use the visual date & time picker for easy date selection</div>
            <div>• Unix timestamps can be in seconds (10 digits) or milliseconds (13 digits)</div>
            <div>• Auto-detect works with most common date formats</div>
            <div>• Use "Current Time" to quickly get the current date and time</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DateTimeConverter;
