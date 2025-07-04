
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { parseTimestamp, getCurrentTimestampInFormat } from './utils';

const TimestampToHuman = () => {
  const [singleTimestamp, setSingleTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [batchTimestamps, setBatchTimestamps] = useState('');
  const [timestampFormat, setTimestampFormat] = useState('seconds');
  const [convertedResults, setConvertedResults] = useState<any[]>([]);

  const setCurrentTimestamp = () => {
    const timestamp = getCurrentTimestampInFormat(timestampFormat);
    setSingleTimestamp(timestamp);
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

  return (
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
  );
};

export default TimestampToHuman;
