
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, formatDistanceToNow } from 'date-fns';

const EpochConverter = () => {
  const [epoch, setEpoch] = useState('');
  const [humanDate, setHumanDate] = useState('');
  const [convertedDate, setConvertedDate] = useState<Date | null>(null);
  const [currentEpoch, setCurrentEpoch] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertFromEpoch = () => {
    const timestamp = parseInt(epoch);
    if (isNaN(timestamp)) {
      setHumanDate('Invalid timestamp');
      setConvertedDate(null);
      return;
    }
    
    // Handle both seconds and milliseconds
    const date = new Date(timestamp < 10000000000 ? timestamp * 1000 : timestamp);
    setHumanDate(date.toISOString());
    setConvertedDate(date);
  };

  const convertToEpoch = () => {
    const date = new Date(humanDate);
    if (isNaN(date.getTime())) {
      setEpoch('Invalid date');
      setConvertedDate(null);
      return;
    }
    
    setEpoch(Math.floor(date.getTime() / 1000).toString());
    setConvertedDate(date);
  };

  const useCurrentTime = () => {
    const now = new Date();
    setEpoch(currentEpoch.toString());
    setHumanDate(now.toISOString());
    setConvertedDate(now);
  };

  const formatDateInTimezone = (date: Date) => {
    try {
      // GMT format
      const gmtTime = format(date, 'yyyy-MM-dd HH:mm:ss') + ' GMT';
      
      // Local timezone format
      const localTime = date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      });
      
      // Relative time
      const relativeTime = formatDistanceToNow(date, { addSuffix: true });
      
      return { gmtTime, localTime, relativeTime };
    } catch (error) {
      return null;
    }
  };

  const dateFormats = convertedDate ? formatDateInTimezone(convertedDate) : null;

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-mono text-lg">{currentEpoch}</span>
              <Button variant="outline" size="sm" onClick={useCurrentTime}>
                Use Current
              </Button>
            </div>
            <div className="text-sm text-slate-600">
              {new Date().toISOString()}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-sm font-medium">UNIX Timestamp</label>
          <Input
            placeholder="1640995200"
            value={epoch}
            onChange={(e) => setEpoch(e.target.value)}
          />
          <Button onClick={convertFromEpoch} disabled={!epoch} className="w-full">
            Convert to Human Date
          </Button>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium">Human Date</label>
          <Input
            placeholder="2022-01-01T00:00:00.000Z"
            value={humanDate}
            onChange={(e) => setHumanDate(e.target.value)}
          />
          <Button onClick={convertToEpoch} disabled={!humanDate} className="w-full">
            Convert to Timestamp
          </Button>
        </div>
      </div>

      {dateFormats && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Converted Date Formats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-700">GMT Time:</div>
              <div className="font-mono text-sm bg-slate-50 p-2 rounded border">
                {dateFormats.gmtTime}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-700">Your Local Time:</div>
              <div className="font-mono text-sm bg-slate-50 p-2 rounded border">
                {dateFormats.localTime}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-700">Relative Time:</div>
              <div className="font-mono text-sm bg-slate-50 p-2 rounded border">
                {dateFormats.relativeTime}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="text-sm text-slate-600">
            <p><strong>Tip:</strong> Supports both seconds and milliseconds timestamps.</p>
            <p>Common formats: ISO 8601, RFC 2822, or any valid date string.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EpochConverter;
