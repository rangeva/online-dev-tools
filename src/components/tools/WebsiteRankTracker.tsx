
import { useState } from "react";
import { DomainData } from "./website-rank-tracker/types";
import { fetchDomainRankingData, createChartData } from "./website-rank-tracker/utils";
import DomainInput from "./website-rank-tracker/DomainInput";
import DomainStatsCards from "./website-rank-tracker/DomainStatsCards";
import RankingChart from "./website-rank-tracker/RankingChart";

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
    setLoading(true);
    setError(null);
    
    try {
      const results = await fetchDomainRankingData(domains);
      
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

  const chartData = createChartData(domainData);

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Website Rank Tracker</h2>
        <p className="text-muted-foreground">
          Track and compare website rankings over time using Tranco data. Add up to 4 domains for comparison.
        </p>
      </div>

      <DomainInput
        domains={domains}
        loading={loading}
        error={error}
        onAddDomain={addDomainInput}
        onRemoveDomain={removeDomainInput}
        onUpdateDomain={updateDomain}
        onFetchData={fetchRankingData}
        onKeyPress={handleKeyPress}
      />

      {domainData.length > 0 && (
        <>
          <DomainStatsCards domainData={domainData} />
          <RankingChart domainData={domainData} chartData={chartData} />
        </>
      )}
    </div>
  );
};

export default WebsiteRankTracker;
