
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
      // Comprehensive timezone mapping including all US states and major international cities
      const timezoneMap: Record<string, { timezone: string; country: string }> = {
        // US States and Major Cities
        'alabama': { timezone: 'America/Chicago', country: 'United States' },
        'birmingham': { timezone: 'America/Chicago', country: 'United States' },
        'montgomery': { timezone: 'America/Chicago', country: 'United States' },
        'alaska': { timezone: 'America/Anchorage', country: 'United States' },
        'anchorage': { timezone: 'America/Anchorage', country: 'United States' },
        'fairbanks': { timezone: 'America/Anchorage', country: 'United States' },
        'arizona': { timezone: 'America/Phoenix', country: 'United States' },
        'phoenix': { timezone: 'America/Phoenix', country: 'United States' },
        'tucson': { timezone: 'America/Phoenix', country: 'United States' },
        'arkansas': { timezone: 'America/Chicago', country: 'United States' },
        'little rock': { timezone: 'America/Chicago', country: 'United States' },
        'california': { timezone: 'America/Los_Angeles', country: 'United States' },
        'los angeles': { timezone: 'America/Los_Angeles', country: 'United States' },
        'san francisco': { timezone: 'America/Los_Angeles', country: 'United States' },
        'san diego': { timezone: 'America/Los_Angeles', country: 'United States' },
        'sacramento': { timezone: 'America/Los_Angeles', country: 'United States' },
        'colorado': { timezone: 'America/Denver', country: 'United States' },
        'denver': { timezone: 'America/Denver', country: 'United States' },
        'colorado springs': { timezone: 'America/Denver', country: 'United States' },
        'connecticut': { timezone: 'America/New_York', country: 'United States' },
        'hartford': { timezone: 'America/New_York', country: 'United States' },
        'delaware': { timezone: 'America/New_York', country: 'United States' },
        'wilmington': { timezone: 'America/New_York', country: 'United States' },
        'florida': { timezone: 'America/New_York', country: 'United States' },
        'miami': { timezone: 'America/New_York', country: 'United States' },
        'tampa': { timezone: 'America/New_York', country: 'United States' },
        'orlando': { timezone: 'America/New_York', country: 'United States' },
        'jacksonville': { timezone: 'America/New_York', country: 'United States' },
        'georgia': { timezone: 'America/New_York', country: 'United States' },
        'atlanta': { timezone: 'America/New_York', country: 'United States' },
        'savannah': { timezone: 'America/New_York', country: 'United States' },
        'hawaii': { timezone: 'Pacific/Honolulu', country: 'United States' },
        'honolulu': { timezone: 'Pacific/Honolulu', country: 'United States' },
        'idaho': { timezone: 'America/Boise', country: 'United States' },
        'boise': { timezone: 'America/Boise', country: 'United States' },
        'illinois': { timezone: 'America/Chicago', country: 'United States' },
        'chicago': { timezone: 'America/Chicago', country: 'United States' },
        'springfield': { timezone: 'America/Chicago', country: 'United States' },
        'indiana': { timezone: 'America/Indiana/Indianapolis', country: 'United States' },
        'indianapolis': { timezone: 'America/Indiana/Indianapolis', country: 'United States' },
        'iowa': { timezone: 'America/Chicago', country: 'United States' },
        'des moines': { timezone: 'America/Chicago', country: 'United States' },
        'kansas': { timezone: 'America/Chicago', country: 'United States' },
        'wichita': { timezone: 'America/Chicago', country: 'United States' },
        'kentucky': { timezone: 'America/New_York', country: 'United States' },
        'louisville': { timezone: 'America/New_York', country: 'United States' },
        'louisiana': { timezone: 'America/Chicago', country: 'United States' },
        'new orleans': { timezone: 'America/Chicago', country: 'United States' },
        'baton rouge': { timezone: 'America/Chicago', country: 'United States' },
        'maine': { timezone: 'America/New_York', country: 'United States' },
        'portland': { timezone: 'America/New_York', country: 'United States' },
        'maryland': { timezone: 'America/New_York', country: 'United States' },
        'baltimore': { timezone: 'America/New_York', country: 'United States' },
        'massachusetts': { timezone: 'America/New_York', country: 'United States' },
        'boston': { timezone: 'America/New_York', country: 'United States' },
        'michigan': { timezone: 'America/Detroit', country: 'United States' },
        'detroit': { timezone: 'America/Detroit', country: 'United States' },
        'grand rapids': { timezone: 'America/Detroit', country: 'United States' },
        'minnesota': { timezone: 'America/Chicago', country: 'United States' },
        'minneapolis': { timezone: 'America/Chicago', country: 'United States' },
        'saint paul': { timezone: 'America/Chicago', country: 'United States' },
        'mississippi': { timezone: 'America/Chicago', country: 'United States' },
        'jackson': { timezone: 'America/Chicago', country: 'United States' },
        'missouri': { timezone: 'America/Chicago', country: 'United States' },
        'kansas city': { timezone: 'America/Chicago', country: 'United States' },
        'st louis': { timezone: 'America/Chicago', country: 'United States' },
        'montana': { timezone: 'America/Denver', country: 'United States' },
        'billings': { timezone: 'America/Denver', country: 'United States' },
        'nebraska': { timezone: 'America/Chicago', country: 'United States' },
        'omaha': { timezone: 'America/Chicago', country: 'United States' },
        'nevada': { timezone: 'America/Los_Angeles', country: 'United States' },
        'las vegas': { timezone: 'America/Los_Angeles', country: 'United States' },
        'reno': { timezone: 'America/Los_Angeles', country: 'United States' },
        'new hampshire': { timezone: 'America/New_York', country: 'United States' },
        'manchester': { timezone: 'America/New_York', country: 'United States' },
        'new jersey': { timezone: 'America/New_York', country: 'United States' },
        'newark': { timezone: 'America/New_York', country: 'United States' },
        'new mexico': { timezone: 'America/Denver', country: 'United States' },
        'albuquerque': { timezone: 'America/Denver', country: 'United States' },
        'new york': { timezone: 'America/New_York', country: 'United States' },
        'buffalo': { timezone: 'America/New_York', country: 'United States' },
        'rochester': { timezone: 'America/New_York', country: 'United States' },
        'north carolina': { timezone: 'America/New_York', country: 'United States' },
        'charlotte': { timezone: 'America/New_York', country: 'United States' },
        'raleigh': { timezone: 'America/New_York', country: 'United States' },
        'north dakota': { timezone: 'America/Chicago', country: 'United States' },
        'fargo': { timezone: 'America/Chicago', country: 'United States' },
        'ohio': { timezone: 'America/New_York', country: 'United States' },
        'columbus': { timezone: 'America/New_York', country: 'United States' },
        'cleveland': { timezone: 'America/New_York', country: 'United States' },
        'cincinnati': { timezone: 'America/New_York', country: 'United States' },
        'oklahoma': { timezone: 'America/Chicago', country: 'United States' },
        'oklahoma city': { timezone: 'America/Chicago', country: 'United States' },
        'tulsa': { timezone: 'America/Chicago', country: 'United States' },
        'oregon': { timezone: 'America/Los_Angeles', country: 'United States' },
        'portland oregon': { timezone: 'America/Los_Angeles', country: 'United States' },
        'eugene': { timezone: 'America/Los_Angeles', country: 'United States' },
        'pennsylvania': { timezone: 'America/New_York', country: 'United States' },
        'philadelphia': { timezone: 'America/New_York', country: 'United States' },
        'pittsburgh': { timezone: 'America/New_York', country: 'United States' },
        'rhode island': { timezone: 'America/New_York', country: 'United States' },
        'providence': { timezone: 'America/New_York', country: 'United States' },
        'south carolina': { timezone: 'America/New_York', country: 'United States' },
        'charleston': { timezone: 'America/New_York', country: 'United States' },
        'columbia': { timezone: 'America/New_York', country: 'United States' },
        'south dakota': { timezone: 'America/Chicago', country: 'United States' },
        'sioux falls': { timezone: 'America/Chicago', country: 'United States' },
        'tennessee': { timezone: 'America/Chicago', country: 'United States' },
        'nashville': { timezone: 'America/Chicago', country: 'United States' },
        'memphis': { timezone: 'America/Chicago', country: 'United States' },
        'texas': { timezone: 'America/Chicago', country: 'United States' },
        'houston': { timezone: 'America/Chicago', country: 'United States' },
        'dallas': { timezone: 'America/Chicago', country: 'United States' },
        'san antonio': { timezone: 'America/Chicago', country: 'United States' },
        'austin': { timezone: 'America/Chicago', country: 'United States' },
        'utah': { timezone: 'America/Denver', country: 'United States' },
        'salt lake city': { timezone: 'America/Denver', country: 'United States' },
        'vermont': { timezone: 'America/New_York', country: 'United States' },
        'burlington': { timezone: 'America/New_York', country: 'United States' },
        'virginia': { timezone: 'America/New_York', country: 'United States' },
        'virginia beach': { timezone: 'America/New_York', country: 'United States' },
        'richmond': { timezone: 'America/New_York', country: 'United States' },
        'washington': { timezone: 'America/Los_Angeles', country: 'United States' },
        'seattle': { timezone: 'America/Los_Angeles', country: 'United States' },
        'spokane': { timezone: 'America/Los_Angeles', country: 'United States' },
        'west virginia': { timezone: 'America/New_York', country: 'United States' },
        'charleston wv': { timezone: 'America/New_York', country: 'United States' },
        'wisconsin': { timezone: 'America/Chicago', country: 'United States' },
        'milwaukee': { timezone: 'America/Chicago', country: 'United States' },
        'madison': { timezone: 'America/Chicago', country: 'United States' },
        'wyoming': { timezone: 'America/Denver', country: 'United States' },
        'cheyenne': { timezone: 'America/Denver', country: 'United States' },
        
        // Washington DC
        'washington dc': { timezone: 'America/New_York', country: 'United States' },
        'dc': { timezone: 'America/New_York', country: 'United States' },
        
        // Major International Cities
        'london': { timezone: 'Europe/London', country: 'United Kingdom' },
        'paris': { timezone: 'Europe/Paris', country: 'France' },
        'berlin': { timezone: 'Europe/Berlin', country: 'Germany' },
        'rome': { timezone: 'Europe/Rome', country: 'Italy' },
        'madrid': { timezone: 'Europe/Madrid', country: 'Spain' },
        'amsterdam': { timezone: 'Europe/Amsterdam', country: 'Netherlands' },
        'zurich': { timezone: 'Europe/Zurich', country: 'Switzerland' },
        'vienna': { timezone: 'Europe/Vienna', country: 'Austria' },
        'stockholm': { timezone: 'Europe/Stockholm', country: 'Sweden' },
        'oslo': { timezone: 'Europe/Oslo', country: 'Norway' },
        'copenhagen': { timezone: 'Europe/Copenhagen', country: 'Denmark' },
        'helsinki': { timezone: 'Europe/Helsinki', country: 'Finland' },
        'warsaw': { timezone: 'Europe/Warsaw', country: 'Poland' },
        'prague': { timezone: 'Europe/Prague', country: 'Czech Republic' },
        'budapest': { timezone: 'Europe/Budapest', country: 'Hungary' },
        'moscow': { timezone: 'Europe/Moscow', country: 'Russia' },
        'istanbul': { timezone: 'Europe/Istanbul', country: 'Turkey' },
        'tokyo': { timezone: 'Asia/Tokyo', country: 'Japan' },
        'seoul': { timezone: 'Asia/Seoul', country: 'South Korea' },
        'beijing': { timezone: 'Asia/Shanghai', country: 'China' },
        'shanghai': { timezone: 'Asia/Shanghai', country: 'China' },
        'hong kong': { timezone: 'Asia/Hong_Kong', country: 'Hong Kong' },
        'singapore': { timezone: 'Asia/Singapore', country: 'Singapore' },
        'bangkok': { timezone: 'Asia/Bangkok', country: 'Thailand' },
        'mumbai': { timezone: 'Asia/Kolkata', country: 'India' },
        'delhi': { timezone: 'Asia/Kolkata', country: 'India' },
        'dubai': { timezone: 'Asia/Dubai', country: 'United Arab Emirates' },
        'sydney': { timezone: 'Australia/Sydney', country: 'Australia' },
        'melbourne': { timezone: 'Australia/Melbourne', country: 'Australia' },
        'brisbane': { timezone: 'Australia/Brisbane', country: 'Australia' },
        'perth': { timezone: 'Australia/Perth', country: 'Australia' },
        'toronto': { timezone: 'America/Toronto', country: 'Canada' },
        'vancouver': { timezone: 'America/Vancouver', country: 'Canada' },
        'montreal': { timezone: 'America/Montreal', country: 'Canada' },
        'calgary': { timezone: 'America/Edmonton', country: 'Canada' },
        'ottawa': { timezone: 'America/Toronto', country: 'Canada' },
        'mexico city': { timezone: 'America/Mexico_City', country: 'Mexico' },
        'guadalajara': { timezone: 'America/Mexico_City', country: 'Mexico' },
        'sao paulo': { timezone: 'America/Sao_Paulo', country: 'Brazil' },
        'rio de janeiro': { timezone: 'America/Sao_Paulo', country: 'Brazil' },
        'buenos aires': { timezone: 'America/Argentina/Buenos_Aires', country: 'Argentina' },
        'lima': { timezone: 'America/Lima', country: 'Peru' },
        'bogota': { timezone: 'America/Bogota', country: 'Colombia' },
        'santiago': { timezone: 'America/Santiago', country: 'Chile' },
        'cape town': { timezone: 'Africa/Johannesburg', country: 'South Africa' },
        'johannesburg': { timezone: 'Africa/Johannesburg', country: 'South Africa' },
        'cairo': { timezone: 'Africa/Cairo', country: 'Egypt' },
        'lagos': { timezone: 'Africa/Lagos', country: 'Nigeria' },
        'nairobi': { timezone: 'Africa/Nairobi', country: 'Kenya' }
      };

      const normalizedLocation = location.toLowerCase().trim();
      const timezoneData = timezoneMap[normalizedLocation];

      if (!timezoneData) {
        throw new Error(`Timezone information not found for "${location}". Try searching for US states, major cities, or international locations.`);
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
                <Label htmlFor="location">Enter City, State, or Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., California, Texas, New York, London, Tokyo..."
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
                  <p>Enter a city name, US state, or select from popular locations to get timezone information.</p>
                  <p className="text-sm mt-1">Now supports all 50 US states, major cities worldwide, and international locations.</p>
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
