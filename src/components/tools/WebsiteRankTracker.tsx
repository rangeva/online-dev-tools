
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Loader2, TrendingUp, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RankData {
  date: string;
  rank: number;
}

interface TrancoResponse {
  ranks: RankData[];
  domain: string;
}

const WebsiteRankTracker = () => {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RankData[]>([]);
  const [domainName, setDomainName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchRankingData = async () => {
    if (!domain.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      // Clean domain input (remove protocol and www)
      const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
      
      const response = await fetch(`https://tranco-list.eu/api/ranks/domain/${cleanDomain}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      
      const result: TrancoResponse = await response.json();
      
      if (!result.ranks || result.ranks.length === 0) {
        throw new Error("No ranking data found for this domain");
      }
      
      // Sort data by date (oldest first) for proper chart display
      const sortedData = result.ranks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      setData(sortedData);
      setDomainName(result.domain);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching data");
      setData([]);
      setDomainName("");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchRankingData();
    }
  };

  const chartConfig = {
    rank: {
      label: "Rank",
      color: "#2563eb",
    },
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCurrentRank = () => {
    if (data.length === 0) return null;
    return data[data.length - 1].rank;
  };

  const getRankTrend = () => {
    if (data.length < 2) return null;
    const current = data[data.length - 1].rank;
    const previous = data[data.length - 2].rank;
    return current - previous;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Website Rank Tracker</h2>
        <p className="text-muted-foreground">
          Track website ranking over time using Tranco data. Enter a domain to see its ranking history.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Domain Input</CardTitle>
          <CardDescription>
            Enter a website domain (e.g., example.com or https://www.example.com)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="domain">Website Domain</Label>
              <Input
                id="domain"
                type="text"
                placeholder="example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={fetchRankingData} 
                disabled={loading || !domain.trim()}
                className="min-w-[100px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading
                  </>
                ) : (
                  'Track Rank'
                )}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {data.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Domain</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{domainName}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">#{getCurrentRank()?.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(() => {
                    const trend = getRankTrend();
                    if (trend === null) return "N/A";
                    if (trend === 0) return "No Change";
                    if (trend > 0) return `+${trend}` ;
                    return `${trend}`;
                  })()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {(() => {
                    const trend = getRankTrend();
                    if (trend === null || trend === 0) return "";
                    return trend > 0 ? "Rank decreased" : "Rank improved";
                  })()}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ranking History</CardTitle>
              <CardDescription>
                Website ranking over time (lower numbers are better)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
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
                          formatter={(value, name) => [`#${value.toLocaleString()}`, "Rank"]}
                          labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
                        />
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="rank"
                      stroke="var(--color-rank)"
                      strokeWidth={2}
                      dot={{ fill: "var(--color-rank)", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "var(--color-rank)", strokeWidth: 2 }}
                    />
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
