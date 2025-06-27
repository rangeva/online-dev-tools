
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TimezoneInfo } from './timezone-lookup/types';
import { getTimezoneInfo } from './timezone-lookup/timezoneUtils';
import TimezoneSearchForm from './timezone-lookup/TimezoneSearchForm';
import PopularLocationsGrid from './timezone-lookup/PopularLocationsGrid';
import TimezoneInfoDisplay from './timezone-lookup/TimezoneInfoDisplay';
import EmptyState from './timezone-lookup/EmptyState';

const TimezoneLookup = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [timezoneInfo, setTimezoneInfo] = useState<TimezoneInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGetTimezoneInfo = async (location: string) => {
    setIsLoading(true);
    try {
      const info = await getTimezoneInfo(location);
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
      handleGetTimezoneInfo(searchQuery.trim());
    }
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
    handleGetTimezoneInfo(query);
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
            <TimezoneSearchForm
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              onSearch={handleSearch}
              isLoading={isLoading}
            />

            <PopularLocationsGrid
              onQuickSearch={handleQuickSearch}
              isLoading={isLoading}
            />
          </div>

          <Separator />

          {/* Results Section */}
          {timezoneInfo ? (
            <TimezoneInfoDisplay timezoneInfo={timezoneInfo} />
          ) : (
            <EmptyState />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimezoneLookup;
