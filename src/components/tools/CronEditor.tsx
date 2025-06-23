
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CronEditor = () => {
  const [cronExpression, setCronExpression] = useState('0 0 * * *');
  const [description, setDescription] = useState('');
  const [nextRuns, setNextRuns] = useState<string[]>([]);

  const cronExamples = [
    { expression: '0 0 * * *', description: 'Daily at midnight' },
    { expression: '0 9 * * 1-5', description: 'Weekdays at 9 AM' },
    { expression: '*/15 * * * *', description: 'Every 15 minutes' },
    { expression: '0 0 1 * *', description: 'First day of every month' },
    { expression: '0 0 * * 0', description: 'Every Sunday at midnight' },
    { expression: '30 14 * * 1', description: 'Every Monday at 2:30 PM' }
  ];

  useEffect(() => {
    try {
      const desc = parseCronExpression(cronExpression);
      setDescription(desc);
      
      // Generate next few run times (simplified)
      const next = generateNextRuns(cronExpression);
      setNextRuns(next);
    } catch (error) {
      setDescription('Invalid cron expression');
      setNextRuns([]);
    }
  }, [cronExpression]);

  const parseCronExpression = (cron: string): string => {
    const parts = cron.trim().split(/\s+/);
    if (parts.length !== 5) {
      throw new Error('Invalid format');
    }

    const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
    
    let desc = 'Runs ';

    // Simple parsing logic (basic implementation)
    if (minute === '0' && hour === '0') {
      desc += 'daily at midnight';
    } else if (minute === '0') {
      desc += `daily at ${hour}:00`;
    } else if (minute.startsWith('*/')) {
      const interval = minute.substring(2);
      desc += `every ${interval} minutes`;
    } else {
      desc += `at ${hour}:${minute.padStart(2, '0')}`;
    }

    if (dayOfWeek !== '*') {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      if (dayOfWeek.includes('-')) {
        desc += ` on weekdays`;
      } else {
        const dayNum = parseInt(dayOfWeek);
        if (!isNaN(dayNum) && dayNum >= 0 && dayNum <= 6) {
          desc += ` on ${days[dayNum]}`;
        }
      }
    }

    return desc;
  };

  const generateNextRuns = (cron: string): string[] => {
    // Simplified next run calculation
    const now = new Date();
    const runs = [];
    
    for (let i = 0; i < 5; i++) {
      const nextRun = new Date(now.getTime() + (i + 1) * 24 * 60 * 60 * 1000);
      runs.push(nextRun.toLocaleString());
    }
    
    return runs;
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Cron Expression</label>
        <Input
          placeholder="0 0 * * *"
          value={cronExpression}
          onChange={(e) => setCronExpression(e.target.value)}
          className="font-mono"
        />
        <div className="text-xs text-slate-500 mt-1">
          Format: minute hour day-of-month month day-of-week
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            Description
            <Badge variant={description.includes('Invalid') ? 'destructive' : 'default'}>
              {description.includes('Invalid') ? 'Invalid' : 'Valid'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{description}</p>
        </CardContent>
      </Card>

      {nextRuns.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Next Scheduled Runs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {nextRuns.map((run, index) => (
                <div key={index} className="font-mono text-sm bg-slate-50 p-2 rounded border">
                  {run}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {cronExamples.map((example, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 hover:bg-slate-50 rounded cursor-pointer"
                onClick={() => setCronExpression(example.expression)}
              >
                <div className="flex-1">
                  <div className="font-mono text-sm">{example.expression}</div>
                  <div className="text-sm text-slate-600">{example.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CronEditor;
