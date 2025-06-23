
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EpochConverter = () => {
  const [epoch, setEpoch] = useState('');
  const [humanDate, setHumanDate] = useState('');
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
      return;
    }
    
    // Handle both seconds and milliseconds
    const date = new Date(timestamp < 10000000000 ? timestamp * 1000 : timestamp);
    setHumanDate(date.toISOString());
  };

  const convertToEpoch = () => {
    const date = new Date(humanDate);
    if (isNaN(date.getTime())) {
      setEpoch('Invalid date');
      return;
    }
    
    setEpoch(Math.floor(date.getTime() / 1000).toString());
  };

  const useCurrentTime = () => {
    setEpoch(currentEpoch.toString());
    setHumanDate(new Date().toISOString());
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
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

        <div className="space-y-2">
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

      <Card>
        <CardContent className="p-4">
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
