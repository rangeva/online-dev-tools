
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
  const chartConfig = domainData.reduce((config, domain) => {
    config[domain.domain] = {
      label: domain.domain,
      color: domain.color,
    };
    return config;
  }, {} as any);

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
  );
};

export default RankingChart;
