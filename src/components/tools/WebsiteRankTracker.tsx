
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Loader2, TrendingUp, AlertCircle, Plus, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RankData {
  date: string;
  rank: number;
}

interface TrancoResponse {
  ranks: RankData[];
  domain: string;
}

interface DomainData {
  domain: string;
  data: RankData[];
  color: string;
  currentRank: number;
  trend: number | null;
}

const CHART_COLORS = [
  "#2563eb", // blue
  "#dc2626", // red
  "#16a34a", // green
  "#ca8a04", // yellow
  "#9333ea", // purple
  "#ea580c"  // orange
];

const WebsiteRankTracker = () => {
  const [domains, setDomains] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [domainData, setDomainData] = useState<DomainData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addDomainInput = () => {
    if (domains.length < 4) {
      setDomains([...domains, ""]);
    }
  };

  const removeDomainInput = (index: number) => {
    if (domains.length > 1) {
      const newDomains = domains.filter((_, i) => i !== index);
      setDomains(newDomains);
    }
  };

  const updateDomain = (index: number, value: string) => {
    const newDomains = [...domains];
    newDomains[index] = value;
    setDomains(newDomains);
  };

  const fetchRankingData = async () => {
    const validDomains = domains.filter(d => d.trim());
    if (validDomains.length === 0) return;

    setLoading(true);
    setError(null);
    
    try {
      const results: DomainData[] = [];
      
      for (let i = 0; i < validDomains.length; i++) {
        const domain = validDomains[i];
        // Clean domain input (remove protocol and www)
        const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
        
        try {
          console.log(`Fetching data for domain: ${cleanDomain}`);
          const response = await fetch(`https://tranco-list.eu/api/ranks/domain/${cleanDomain}`);
          
          if (!response.ok) {
            console.warn(`Failed to fetch data for ${cleanDomain}: ${response.status}`);
            continue;
          }
          
          const result: TrancoResponse = await response.json();
          console.log(`Received data for ${cleanDomain}:`, result);
          
          if (!result.ranks || result.ranks.length === 0) {
            console.warn(`No ranking data found for ${cleanDomain}`);
            continue;
          }
          
          // Sort data by date (oldest first) for proper chart display
          const sortedData = result.ranks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          
          const currentRank = sortedData[sortedData.length - 1].rank;
          const trend = sortedData.length >= 2 ? 
            currentRank - sortedData[sortedData.length - 2].rank : null;
          
          results.push({
            domain: result.domain || cleanDomain,
            data: sortedData,
            color: CHART_COLORS[i % CHART_COLORS.length],
            currentRank,
            trend
          });
          
          console.log(`Successfully added data for ${result.domain || cleanDomain}`);
        } catch (domainError) {
          console.warn(`Error fetching data for ${cleanDomain}:`, domainError);
        }
      }
      
      console.log(`Total domains with data: ${results.length}`);
      
      if (results.length === 0) {
        throw new Error("No valid ranking data found for any of the provided domains. Please check the domain names and try again.");
      }
      
      setDomainData(results);
    } catch (err) {
      console.error("Error in fetchRankingData:", err);
      setError(err instanceof Error ? err.message : "An error occurred while fetching data");
      setDomainData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchRankingData();
    }
  };

  // Create combined chart data with all domains
  const createChartData = () => {
    if (domainData.length === 0) return [];
    
    // Get all unique dates from all domains
    const allDates = new Set<string>();
    domainData.forEach(domain => {
      domain.data.forEach(item => allDates.add(item.date));
    });
    
    const sortedDates = Array.from(allDates).sort((a, b) => 
      new Date(a).getTime() - new Date(b).getTime()
    );
    
    // Create data points for each date
    const chartData = sortedDates.map(date => {
      const dataPoint: any = { date };
      
      // Add rank data for each domain on this date
      domainData.forEach(domain => {
        const rankData = domain.data.find(item => item.date === date);
        dataPoint[domain.domain] = rankData ? rankData.rank : null;
      });
      
      return dataPoint;
    });
    
    console.log("Chart data created:", chartData);
    return chartData;
  };

  const chartConfig = domainData.reduce((config, domain) => {
    config[domain.domain] = {
      label: domain.domain,
      color: domain.color,
    };
    return config;
  }, {} as any);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const chartData = createChartData();

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Website Rank Tracker</h2>
        <p className="text-muted-foreground">
          Track and compare website rankings over time using Tranco data. Add up to 4 domains for comparison.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Domain Input</CardTitle>
          <CardDescription>
            Enter website domains to compare (e.g., example.com or https://www.example.com)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {domains.map((domain, index) => (
            <div key={index} className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor={`domain-${index}`}>Website Domain {index + 1}</Label>
                <Input
                  id={`domain-${index}`}
                  type="text"
                  placeholder="example.com"
                  value={domain}
                  onChange={(e) => updateDomain(index, e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
              </div>
              {domains.length > 1 && (
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => removeDomainInput(index)}
                    disabled={loading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
          
          <div className="flex gap-2">
            {domains.length < 4 && (
              <Button 
                variant="outline" 
                onClick={addDomainInput}
                disabled={loading}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Domain
              </Button>
            )}
            <Button 
              onClick={fetchRankingData} 
              disabled={loading || !domains.some(d => d.trim())}
              className="min-w-[120px]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </>
              ) : (
                'Compare Rankings'
              )}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {domainData.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {domainData.map((domain, index) => (
              <Card key={domain.domain}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium truncate">{domain.domain}</CardTitle>
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: domain.color }}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">#{domain.currentRank.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {(() => {
                      if (domain.trend === null) return "No trend data";
                      if (domain.trend === 0) return "No change";
                      if (domain.trend > 0) return `+${domain.trend} (rank decreased)`;
                      return `${domain.trend} (rank improved)`;
                    })()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ranking Comparison ({domainData.length} domain{domainData.length > 1 ? 's' : ''})</CardTitle>
              <CardDescription>
                Website rankings over time (lower numbers are better)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatDate}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      reversed={true}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `#${value.toLocaleString()}`}
                    />
                    <ChartTooltip 
                      content={
                        <ChartTooltipContent 
                          formatter={(value, name) => [
                            value ? `#${value.toLocaleString()}` : "No data", 
                            name as string
                          ]}
                          labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
                        />
                      }
                    />
                    {domainData.map((domain) => (
                      <Line
                        key={domain.domain}
                        type="monotone"
                        dataKey={domain.domain}
                        stroke={domain.color}
                        strokeWidth={2}
                        dot={{ fill: domain.color, strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: domain.color, strokeWidth: 2 }}
                        connectNulls={false}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default WebsiteRankTracker;
