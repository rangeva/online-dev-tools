
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { convertHumanToTimestamp } from './utils';

const HumanToTimestamp = () => {
  const [humanDate, setHumanDate] = useState(new Date().toUTCString());
  const [batchHumanDates, setBatchHumanDates] = useState('');
  const [humanToTimestampResults, setHumanToTimestampResults] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const setCurrentHumanDate = () => {
    const now = new Date();
    setHumanDate(now.toUTCString());
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setHumanDate(date.toUTCString());
      setIsDatePickerOpen(false);
    }
  };

  const convertSingleHumanDate = () => {
    const result = convertHumanToTimestamp(humanDate);
    if (result) {
      setHumanToTimestampResults([result]);
    }
  };

  const convertBatchHumanDates = () => {
    const dates = batchHumanDates.split('\n').filter(d => d.trim());
    const results = dates.map(dateStr => convertHumanToTimestamp(dateStr.trim())).filter(Boolean);
    setHumanToTimestampResults(results);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Convert Human Date to Timestamp</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <Input
            placeholder="Wed, 25 Jun 2025 12:09:21 GMT"
            value={humanDate}
            onChange={(e) => setHumanDate(e.target.value)}
            className="flex-1 text-sm"
          />
          <div className="flex gap-2">
            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "justify-start text-left font-normal whitespace-nowrap",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  <span className="hidden sm:inline">
                    {selectedDate ? format(selectedDate, "PPP") : "Pick date"}
                  </span>
                  <span className="sm:hidden">Date</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            <Button onClick={setCurrentHumanDate} variant="outline" size="sm">
              Now
            </Button>
            <Button onClick={convertSingleHumanDate} size="sm">
              Convert
            </Button>
          </div>
        </div>
        <p className="text-xs md:text-sm text-gray-600">
          Input format: RFC 2822, D-M-Y, M/D/Y, Y-M-D, etc. Strip 'GMT' to convert to local time.
        </p>
        
        <div>
          <label className="block text-sm font-medium mb-2">Batch Convert (one per line):</label>
          <Textarea
            placeholder="Wed, 25 Jun 2025 12:09:21 GMT&#10;2025-06-25 12:09:21&#10;06/25/2025 12:09:21"
            value={batchHumanDates}
            onChange={(e) => setBatchHumanDates(e.target.value)}
            rows={4}
            className="text-sm"
          />
          <Button onClick={convertBatchHumanDates} className="mt-2 w-full sm:w-auto" size="sm">
            Batch Convert
          </Button>
        </div>

        {humanToTimestampResults.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[120px]">Original</TableHead>
                    <TableHead className="min-w-[100px]">Unix Timestamp</TableHead>
                    <TableHead className="min-w-[100px]">Milliseconds</TableHead>
                    <TableHead className="min-w-[150px]">UTC Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {humanToTimestampResults.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-xs md:text-sm break-all">{result.original}</TableCell>
                      <TableCell className="font-mono text-xs md:text-sm">{result.timestamp}</TableCell>
                      <TableCell className="font-mono text-xs md:text-sm">{result.milliseconds}</TableCell>
                      <TableCell className="text-xs md:text-sm">{result.utc}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HumanToTimestamp;
