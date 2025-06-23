
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const IsoGenerator = () => {
  const [currentIso, setCurrentIso] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [customTime, setCustomTime] = useState('');
  const [customIso, setCustomIso] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentIso(new Date().toISOString());
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (customDate && customTime) {
      const dateTime = new Date(`${customDate}T${customTime}`);
      if (!isNaN(dateTime.getTime())) {
        setCustomIso(dateTime.toISOString());
      }
    }
  }, [customDate, customTime]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateVariations = (isoString: string) => {
    const date = new Date(isoString);
    return {
      iso: isoString,
      local: date.toLocaleString(),
      utc: date.toUTCString(),
      timestamp: Math.floor(date.getTime() / 1000),
      date: date.toISOString().split('T')[0],
      time: date.toISOString().split('T')[1].split('.')[0]
    };
  };

  const currentVariations = generateVariations(currentIso);
  const customVariations = customIso ? generateVariations(customIso) : null;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current Time (Live)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(currentVariations).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center gap-3">
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-600 capitalize">
                    {key === 'iso' ? 'ISO 8601' : key}
                  </div>
                  <div className="font-mono text-sm bg-slate-50 p-2 rounded border">
                    {value}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(value.toString())}
                >
                  Copy
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Custom Date & Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <Input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Time</label>
              <Input
                type="time"
                step="1"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
              />
            </div>
          </div>

          {customVariations && (
            <div className="space-y-3">
              {Object.entries(customVariations).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center gap-3">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-600 capitalize">
                      {key === 'iso' ? 'ISO 8601' : key}
                    </div>
                    <div className="font-mono text-sm bg-slate-50 p-2 rounded border">
                      {value}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(value.toString())}
                  >
                    Copy
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IsoGenerator;
