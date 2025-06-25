import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const EpochConverter = () => {
  const [currentEpoch, setCurrentEpoch] = useState(Math.floor(Date.now() / 1000));
  const [singleTimestamp, setSingleTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [batchTimestamps, setBatchTimestamps] = useState('');
  const [humanDate, setHumanDate] = useState(new Date().toUTCString());
  const [batchHumanDates, setBatchHumanDates] = useState('');
  const [timestampFormat, setTimestampFormat] = useState('seconds');
  const [convertedResults, setConvertedResults] = useState<any[]>([]);
  const [humanToTimestampResults, setHumanToTimestampResults] = useState<any[]>([]);
  const [startEndYear, setStartEndYear] = useState('2025');
  const [startEndMonth, setStartEndMonth] = useState('6');
  const [startEndDay, setStartEndDay] = useState('25');
  const [startEndResults, setStartEndResults] = useState<any>(null);
  const [secondsToConvert, setSecondsToConvert] = useState('90061');
  const [timeConversionResult, setTimeConversionResult] = useState<any>(null);
  
  // Date picker states
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Update current epoch every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const parseTimestamp = (timestamp: string, format: string) => {
    const num = parseInt(timestamp);
    if (isNaN(num)) return null;
    
    switch (format) {
      case 'seconds':
        return num * 1000;
      case 'milliseconds':
        return num;
      case 'microseconds':
        return num / 1000;
      case 'nanoseconds':
        return num / 1000000;
      default:
        return num * 1000;
    }
  };

  const setCurrentTimestamp = () => {
    const now = Math.floor(Date.now() / 1000);
    let timestamp;
    
    switch (timestampFormat) {
      case 'milliseconds':
        timestamp = now * 1000;
        break;
      case 'microseconds':
        timestamp = now * 1000000;
        break;
      case 'nanoseconds':
        timestamp = now * 1000000000;
        break;
      default:
        timestamp = now;
    }
    
    setSingleTimestamp(timestamp.toString());
  };

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

  const convertSingleTimestamp = () => {
    const ms = parseTimestamp(singleTimestamp, timestampFormat);
    if (!ms) return;
    
    const date = new Date(ms);
    const result = {
      original: singleTimestamp,
      date: date,
      iso: date.toISOString(),
      utc: date.toUTCString(),
      local: date.toLocaleString(),
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    };
    setConvertedResults([result]);
  };

  const convertBatchTimestamps = () => {
    const timestamps = batchTimestamps.split('\n').filter(t => t.trim());
    const results = timestamps.map(timestamp => {
      const ms = parseTimestamp(timestamp.trim(), timestampFormat);
      if (!ms) return null;
      
      const date = new Date(ms);
      return {
        original: timestamp.trim(),
        date: date,
        iso: date.toISOString(),
        utc: date.toUTCString(),
        local: date.toLocaleString()
      };
    }).filter(Boolean);
    
    setConvertedResults(results);
  };

  const convertHumanToTimestamp = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return null;
      
      return {
        original: dateStr,
        timestamp: Math.floor(date.getTime() / 1000),
        milliseconds: date.getTime(),
        date: date,
        iso: date.toISOString(),
        utc: date.toUTCString()
      };
    } catch {
      return null;
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

  const calculateStartEndDates = () => {
    const year = parseInt(startEndYear);
    const month = parseInt(startEndMonth);
    const day = parseInt(startEndDay);
    
    // Start and end of day
    const dayStart = new Date(year, month - 1, day, 0, 0, 0);
    const dayEnd = new Date(year, month - 1, day, 23, 59, 59);
    
    // Start and end of month
    const monthStart = new Date(year, month - 1, 1, 0, 0, 0);
    const monthEnd = new Date(year, month, 0, 23, 59, 59);
    
    // Start and end of year
    const yearStart = new Date(year, 0, 1, 0, 0, 0);
    const yearEnd = new Date(year, 11, 31, 23, 59, 59);
    
    setStartEndResults({
      day: {
        start: { date: dayStart, epoch: Math.floor(dayStart.getTime() / 1000) },
        end: { date: dayEnd, epoch: Math.floor(dayEnd.getTime() / 1000) }
      },
      month: {
        start: { date: monthStart, epoch: Math.floor(monthStart.getTime() / 1000) },
        end: { date: monthEnd, epoch: Math.floor(monthEnd.getTime() / 1000) }
      },
      year: {
        start: { date: yearStart, epoch: Math.floor(yearStart.getTime() / 1000) },
        end: { date: yearEnd, epoch: Math.floor(yearEnd.getTime() / 1000) }
      }
    });
  };

  const convertSecondsToTime = () => {
    const totalSeconds = parseInt(secondsToConvert);
    if (isNaN(totalSeconds)) return;
    
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    setTimeConversionResult({
      total: totalSeconds,
      days,
      hours,
      minutes,
      seconds
    });
  };

  const getDynamicDates = () => {
    const now = new Date();
    const dates = [
      { label: 'Now', date: now },
      { label: '1 hour ago', date: new Date(now.getTime() - 3600000) },
      { label: '1 day ago', date: new Date(now.getTime() - 86400000) },
      { label: '1 week ago', date: new Date(now.getTime() - 604800000) },
      { label: '1 month ago', date: new Date(now.getTime() - 2592000000) },
      { label: 'Next hour', date: new Date(now.getTime() + 3600000) },
      { label: 'Next day', date: new Date(now.getTime() + 86400000) },
      { label: 'Next week', date: new Date(now.getTime() + 604800000) },
      { label: 'Next month', date: new Date(now.getTime() + 2592000000) }
    ];
    
    return dates.map(item => ({
      ...item,
      epoch: Math.floor(item.date.getTime() / 1000)
    }));
  };

  const clearAllForms = () => {
    setSingleTimestamp('');
    setBatchTimestamps('');
    setHumanDate('');
    setBatchHumanDates('');
    setConvertedResults([]);
    setHumanToTimestampResults([]);
    setStartEndResults(null);
    setTimeConversionResult(null);
    setSelectedDate(undefined);
  };

  // Keyboard shortcut for clearing
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'c' && !e.ctrlKey && !e.metaKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          clearAllForms();
        }
      }
    };
    
    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Current Epoch Time */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Current Unix Epoch Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-blue-600 mb-2">
              {currentEpoch}
            </div>
            <div className="text-sm text-gray-600">
              {new Date().toUTCString()}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="timestamp-to-human" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="timestamp-to-human">Timestamp to Human</TabsTrigger>
          <TabsTrigger value="human-to-timestamp">Human to Timestamp</TabsTrigger>
          <TabsTrigger value="start-end-dates">Start/End Dates</TabsTrigger>
          <TabsTrigger value="seconds-converter">Seconds Converter</TabsTrigger>
          <TabsTrigger value="dynamic-dates">Dynamic Dates</TabsTrigger>
        </TabsList>

        {/* Timestamp to Human Date */}
        <TabsContent value="timestamp-to-human" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Convert Timestamp to Human Date</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="1750853361"
                    value={singleTimestamp}
                    onChange={(e) => setSingleTimestamp(e.target.value)}
                  />
                </div>
                <Select value={timestampFormat} onValueChange={setTimestampFormat}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seconds">Seconds</SelectItem>
                    <SelectItem value="milliseconds">Milliseconds</SelectItem>
                    <SelectItem value="microseconds">Microseconds</SelectItem>
                    <SelectItem value="nanoseconds">Nanoseconds</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={setCurrentTimestamp} variant="outline">
                  Now
                </Button>
                <Button onClick={convertSingleTimestamp}>Convert</Button>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Batch Convert (one per line):</label>
                <Textarea
                  placeholder="1750853361&#10;1750853400&#10;1750853500"
                  value={batchTimestamps}
                  onChange={(e) => setBatchTimestamps(e.target.value)}
                  rows={4}
                />
                <Button onClick={convertBatchTimestamps} className="mt-2">
                  Batch Convert
                </Button>
              </div>

              {convertedResults.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Results:</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Original</TableHead>
                        <TableHead>UTC Date</TableHead>
                        <TableHead>Local Date</TableHead>
                        <TableHead>ISO Format</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {convertedResults.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono">{result.original}</TableCell>
                          <TableCell>{result.utc}</TableCell>
                          <TableCell>{result.local}</TableCell>
                          <TableCell className="font-mono text-sm">{result.iso}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Human Date to Timestamp */}
        <TabsContent value="human-to-timestamp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Convert Human Date to Timestamp</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="Wed, 25 Jun 2025 12:09:21 GMT"
                  value={humanDate}
                  onChange={(e) => setHumanDate(e.target.value)}
                  className="flex-1"
                />
                <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick date"}
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
                <Button onClick={setCurrentHumanDate} variant="outline">
                  Now
                </Button>
                <Button onClick={convertSingleHumanDate}>Convert</Button>
              </div>
              <p className="text-sm text-gray-600">
                Input format: RFC 2822, D-M-Y, M/D/Y, Y-M-D, etc. Strip 'GMT' to convert to local time.
              </p>
              
              <div>
                <label className="block text-sm font-medium mb-2">Batch Convert (one per line):</label>
                <Textarea
                  placeholder="Wed, 25 Jun 2025 12:09:21 GMT&#10;2025-06-25 12:09:21&#10;06/25/2025 12:09:21"
                  value={batchHumanDates}
                  onChange={(e) => setBatchHumanDates(e.target.value)}
                  rows={4}
                />
                <Button onClick={convertBatchHumanDates} className="mt-2">
                  Batch Convert
                </Button>
              </div>

              {humanToTimestampResults.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Results:</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Original</TableHead>
                        <TableHead>Unix Timestamp</TableHead>
                        <TableHead>Milliseconds</TableHead>
                        <TableHead>UTC Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {humanToTimestampResults.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell>{result.original}</TableCell>
                          <TableCell className="font-mono">{result.timestamp}</TableCell>
                          <TableCell className="font-mono">{result.milliseconds}</TableCell>
                          <TableCell>{result.utc}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Start/End Dates */}
        <TabsContent value="start-end-dates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Epoch Dates for Start and End of Year/Month/Day</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Year:</label>
                  <Input
                    value={startEndYear}
                    onChange={(e) => setStartEndYear(e.target.value)}
                    className="w-20"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Month:</label>
                  <Input
                    value={startEndMonth}
                    onChange={(e) => setStartEndMonth(e.target.value)}
                    className="w-16"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Day:</label>
                  <Input
                    value={startEndDay}
                    onChange={(e) => setStartEndDay(e.target.value)}
                    className="w-16"
                  />
                </div>
                <Button onClick={calculateStartEndDates}>Calculate</Button>
              </div>

              {startEndResults && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Day</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <div className="text-sm font-medium">Start:</div>
                          <div className="font-mono text-sm">{startEndResults.day.start.epoch}</div>
                          <div className="text-xs text-gray-600">{startEndResults.day.start.date.toUTCString()}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">End:</div>
                          <div className="font-mono text-sm">{startEndResults.day.end.epoch}</div>
                          <div className="text-xs text-gray-600">{startEndResults.day.end.date.toUTCString()}</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Month</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <div className="text-sm font-medium">Start:</div>
                          <div className="font-mono text-sm">{startEndResults.month.start.epoch}</div>
                          <div className="text-xs text-gray-600">{startEndResults.month.start.date.toUTCString()}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">End:</div>
                          <div className="font-mono text-sm">{startEndResults.month.end.epoch}</div>
                          <div className="text-xs text-gray-600">{startEndResults.month.end.date.toUTCString()}</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Year</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <div className="text-sm font-medium">Start:</div>
                          <div className="font-mono text-sm">{startEndResults.year.start.epoch}</div>
                          <div className="text-xs text-gray-600">{startEndResults.year.start.date.toUTCString()}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">End:</div>
                          <div className="font-mono text-sm">{startEndResults.year.end.epoch}</div>
                          <div className="text-xs text-gray-600">{startEndResults.year.end.date.toUTCString()}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Seconds Converter */}
        <TabsContent value="seconds-converter" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Convert Seconds to Days, Hours, and Minutes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="90061"
                  value={secondsToConvert}
                  onChange={(e) => setSecondsToConvert(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={convertSecondsToTime}>Convert</Button>
              </div>

              {timeConversionResult && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold">
                        {timeConversionResult.days} days, {timeConversionResult.hours} hours, {timeConversionResult.minutes} minutes, {timeConversionResult.seconds} seconds
                      </div>
                      <div className="text-sm text-gray-600">
                        Total: {timeConversionResult.total.toLocaleString()} seconds
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dynamic Dates */}
        <TabsContent value="dynamic-dates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dynamic Date List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Unix Timestamp</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getDynamicDates().map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.label}</TableCell>
                      <TableCell className="font-mono">{item.epoch}</TableCell>
                      <TableCell>{item.date.toUTCString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Clear All Button */}
      <div className="text-center">
        <Button variant="outline" onClick={clearAllForms}>
          Clear All Forms
        </Button>
        <p className="text-sm text-gray-600 mt-2">
          Press 'c' to clear all forms
        </p>
      </div>
    </div>
  );
};

export default EpochConverter;
