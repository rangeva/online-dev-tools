
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DomainData } from "./types";

interface DomainStatsCardsProps {
  domainData: DomainData[];
}

const DomainStatsCards = ({ domainData }: DomainStatsCardsProps) => {
  const getTrendText = (trend: number | null) => {
    if (trend === null) return "No trend data";
    if (trend === 0) return "No change";
    if (trend > 0) return `+${trend} (rank decreased)`;
    return `${trend} (rank improved)`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {domainData.map((domain) => (
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
              {getTrendText(domain.trend)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DomainStatsCards;
