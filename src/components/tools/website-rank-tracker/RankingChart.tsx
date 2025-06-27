
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { DomainData } from "./types";
import { formatDate } from "./utils";

interface RankingChartProps {
  domainData: DomainData[];
  chartData: any[];
}

const RankingChart = ({ domainData, chartData }: RankingChartProps) => {
  console.log("RankingChart received domainData:", domainData);
  console.log("RankingChart received chartData:", chartData);
  
  const chartConfig = domainData.reduce((config, domain) => {
    config[domain.domain] = {
      label: domain.domain,
      color: domain.color,
    };
    return config;
  }, {} as any);

  console.log("Chart config:", chartConfig);

  // Custom tooltip component for better formatting
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) {
      return null;
    }

    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-sm mb-2">
          {new Date(label).toLocaleDateString('en-US', { 
            weekday: 'short',
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => {
            if (entry.value === null || entry.value === undefined) {
              return (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-muted-foreground">{entry.dataKey}</span>
                  <span className="text-muted-foreground ml-auto">No data</span>
                </div>
              );
            }
            
            return (
              <div key={index} className="flex items-center gap-2 text-xs">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-foreground">{entry.dataKey}</span>
                <span className="font-mono font-medium ml-auto">
                  #{entry.value.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
          Lower ranks are better positions
        </p>
      </div>
    );
  };

  return (
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
              <ChartTooltip content={<CustomTooltip />} />
              {domainData.map((domain, index) => {
                console.log(`Creating line for domain: ${domain.domain} with color: ${domain.color}`);
                return (
                  <Line
                    key={domain.domain}
                    type="monotone"
                    dataKey={domain.domain}
                    stroke={domain.color}
                    strokeWidth={2}
                    dot={{ fill: domain.color, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: domain.color, strokeWidth: 2 }}
                    connectNulls={false}
                    name={domain.domain}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RankingChart;
