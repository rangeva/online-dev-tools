
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Clock, MapPin, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TimezoneInfo {
  timezone: string;
  abbreviation: string;
  offset: string;
  utcOffset: number;
  isDst: boolean;
  currentTime: string;
  location: string;
}

const TimezoneLookup = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [timezoneInfo, setTimezoneInfo] = useState<TimezoneInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Popular locations for quick access
  const popularLocations = [
    { name: "New York, NY", query: "New York" },
    { name: "Los Angeles, CA", query: "Los Angeles" },
    { name: "Chicago, IL", query: "Chicago" },
    { name: "London, UK", query: "London" },
    { name: "Tokyo, Japan", query: "Tokyo" },
    { name: "Sydney, Australia", query: "Sydney" },
    { name: "Dubai, UAE", query: "Dubai" },
    { name: "Paris, France", query: "Paris" }
  ];

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimezoneInfo = async (location: string) => {
    setIsLoading(true);
    try {
      // For this demo, we'll use a simplified approach with known timezone mappings
      // In a real application, you'd use a proper geocoding and timezone API
      const timezoneMap: Record<string, { timezone: string; country: string }> = {
        'new york': { timezone: 'America/New_York', country: 'United States' },
        'los angeles': { timezone: 'America/Los_Angeles', country: 'United States' },
        'chicago': { timezone: 'America/Chicago', country: 'United States' },
        'miami': { timezone: 'America/New_York', country: 'United States' },
        'denver': { timezone: 'America/Denver', country: 'United States' },
        'phoenix': { timezone: 'America/Phoenix', country: 'United States' },
        'seattle': { timezone: 'America/Los_Angeles', country: 'United States' },
        'london': { timezone: 'Europe/London', country: 'United Kingdom' },
        'paris': { timezone: 'Europe/Paris', country: 'France' },
        'berlin': { timezone: 'Europe/Berlin', country: 'Germany' },
        'tokyo': { timezone: 'Asia/Tokyo', country: 'Japan' },
        'sydney': { timezone: 'Australia/Sydney', country: 'Australia' },
        'dubai': { timezone: 'Asia/Dubai', country: 'United Arab Emirates' },
        'singapore': { timezone: 'Asia/Singapore', country: 'Singapore' },
        'mumbai': { timezone: 'Asia/Kolkata', country: 'India' },
        'beijing': { timezone: 'Asia/Shanghai', country: 'China' },
        'moscow': { timezone: 'Europe/Moscow', country: 'Russia' },
        'toronto': { timezone: 'America/Toronto', country: 'Canada' },
        'vancouver': { timezone: 'America/Vancouver', country: 'Canada' },
        'mexico city': { timezone: 'America/Mexico_City', country: 'Mexico' }
      };

      const normalizedLocation = location.toLowerCase().trim();
      const timezoneData = timezoneMap[normalizedLocation];

      if (!timezoneData) {
        throw new Error(`Timezone information not found for "${location}". Try searching for major cities like New York, London, Tokyo, etc.`);
      }

      const now = new Date();
      const timeInTimezone = new Intl.DateTimeFormat('en-US', {
        timeZone: timezoneData.timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);

      // Get timezone offset
      const tempDate = new Date().toLocaleString("en", {timeZone: timezoneData.timezone});
      const utcTime = new Date().toLocaleString("en", {timeZone: "UTC"});
      const utcOffset = (Date.parse(tempDate) - Date.parse(utcTime)) / (1000 * 60 * 60);

      // Get timezone abbreviation
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezoneData.timezone,
        timeZoneName: 'short'
      });
      const parts = formatter.formatToParts(now);
      const abbreviation = parts.find(part => part.type === 'timeZoneName')?.value || '';

      const info: TimezoneInfo = {
        timezone: timezoneData.timezone,
        abbreviation,
        offset: `UTC${utcOffset >= 0 ? '+' : ''}${utcOffset}`,
        utcOffset,
        isDst: false, // Simplified - would need more complex logic for accurate DST detection
        currentTime: timeInTimezone,
        location: `${location}, ${timezoneData.country}`
      };

      setTimezoneInfo(info);
      toast({
        title: "Timezone Found",
        description: `Retrieved timezone information for ${info.location}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get timezone information",
        variant: "destructive"
      });
      setTimezoneInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      getTimezoneInfo(searchQuery.trim());
    }
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
    getTimezoneInfo(query);
  };

  const formatTime = (timezone: string, format: string) => {
    const now = new Date();
    switch (format) {
      case '12hour':
        return new Intl.DateTimeFormat('en-US', {
          timeZone: timezone,
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }).format(now);
      case '24hour':
        return new Intl.DateTimeFormat('en-US', {
          timeZone: timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(now);
      case 'iso':
        return new Date().toLocaleString('sv-SE', { timeZone: timezone }).replace(' ', 'T');
      case 'full':
        return new Intl.DateTimeFormat('en-US', {
          timeZone: timezone,
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }).format(now);
      default:
        return '';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            Timezone Lookup Tool
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Section */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="location">Enter City or Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., New York, London, Tokyo, Los Angeles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button 
                onClick={handleSearch} 
                disabled={!searchQuery.trim() || isLoading}
                className="mt-6"
              >
                <Search className="w-4 h-4 mr-2" />
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>

            {/* Quick Access Buttons */}
            <div>
              <Label>Popular Locations</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {popularLocations.map((location) => (
                  <Button
                    key={location.query}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickSearch(location.query)}
                    disabled={isLoading}
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    {location.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Results Section */}
          {timezoneInfo && (
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
          )}

          {/* Instructions */}
          {!timezoneInfo && (
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <Globe className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Enter a city name or select from popular locations to get timezone information.</p>
                  <p className="text-sm mt-1">Supports major cities worldwide and US states/cities.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimezoneLookup;
