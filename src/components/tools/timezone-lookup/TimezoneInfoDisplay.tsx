
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { TimezoneInfo } from './types';
import { formatTime } from './timezoneUtils';

interface TimezoneInfoDisplayProps {
  timezoneInfo: TimezoneInfo;
}

const TimezoneInfoDisplay = ({ timezoneInfo }: TimezoneInfoDisplayProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold">Timezone Information</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Basic Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Location Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span className="font-medium">{timezoneInfo.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Timezone:</span>
              <Badge variant="outline">{timezoneInfo.timezone}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Abbreviation:</span>
              <Badge>{timezoneInfo.abbreviation}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">UTC Offset:</span>
              <Badge variant="secondary">{timezoneInfo.offset}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Time Formats */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Time Formats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">12-Hour:</span>
              <span className="font-mono font-medium">
                {formatTime(timezoneInfo.timezone, '12hour')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">24-Hour:</span>
              <span className="font-mono font-medium">
                {formatTime(timezoneInfo.timezone, '24hour')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ISO Format:</span>
              <span className="font-mono font-medium text-sm">
                {formatTime(timezoneInfo.timezone, 'iso')}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Full Date Time Display */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">
              Current Date & Time in {timezoneInfo.location}
            </div>
            <div className="text-2xl font-bold">
              {formatTime(timezoneInfo.timezone, 'full')}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimezoneInfoDisplay;
