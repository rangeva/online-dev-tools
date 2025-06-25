
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateStartEndDates } from './utils';

const StartEndDates = () => {
  const [startEndYear, setStartEndYear] = useState('2025');
  const [startEndMonth, setStartEndMonth] = useState('6');
  const [startEndDay, setStartEndDay] = useState('25');
  const [startEndResults, setStartEndResults] = useState<any>(null);

  const handleCalculateStartEndDates = () => {
    const results = calculateStartEndDates(startEndYear, startEndMonth, startEndDay);
    setStartEndResults(results);
  };

  return (
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
          <Button onClick={handleCalculateStartEndDates}>Calculate</Button>
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
  );
};

export default StartEndDates;
