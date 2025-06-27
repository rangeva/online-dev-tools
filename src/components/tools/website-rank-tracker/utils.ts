
import { DomainData, TrancoResponse } from "./types";
import { CHART_COLORS } from "./constants";

export const cleanDomainInput = (domain: string): string => {
  return domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
};

// Helper function to add delay between API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchDomainRankingData = async (domains: string[]): Promise<DomainData[]> => {
  const validDomains = domains.filter(d => d.trim());
  if (validDomains.length === 0) return [];

  const results: DomainData[] = [];
  
  for (let i = 0; i < validDomains.length; i++) {
    const domain = validDomains[i];
    const cleanDomain = cleanDomainInput(domain);
    
    // Add delay between requests to avoid rate limiting (except for the first request)
    if (i > 0) {
      console.log(`Waiting 2 seconds before fetching ${cleanDomain} to avoid rate limiting...`);
      await delay(2000); // 2 second delay between requests
    }
    
    try {
      console.log(`Fetching data for domain: ${cleanDomain}`);
      const response = await fetch(`https://tranco-list.eu/api/ranks/domain/${cleanDomain}`);
      
      if (!response.ok) {
        if (response.status === 429) {
          console.warn(`Rate limit hit for ${cleanDomain}. Waiting 5 seconds and retrying...`);
          await delay(5000);
          // Retry the request once
          const retryResponse = await fetch(`https://tranco-list.eu/api/ranks/domain/${cleanDomain}`);
          if (!retryResponse.ok) {
            console.warn(`Failed to fetch data for ${cleanDomain} after retry: ${retryResponse.status}`);
            continue;
          }
          const retryResult: TrancoResponse = await retryResponse.json();
          console.log(`Successfully fetched data for ${cleanDomain} after retry`);
          
          // Process retry result
          if (!retryResult.ranks || retryResult.ranks.length === 0) {
            console.warn(`No ranking data found for ${cleanDomain}`);
            continue;
          }
          
          const sortedData = retryResult.ranks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          const currentRank = sortedData[sortedData.length - 1].rank;
          const trend = sortedData.length >= 2 ? 
            currentRank - sortedData[sortedData.length - 2].rank : null;
          
          results.push({
            domain: retryResult.domain || cleanDomain,
            data: sortedData,
            color: CHART_COLORS[i % CHART_COLORS.length],
            currentRank,
            trend
          });
          
          console.log(`Successfully added data for ${retryResult.domain || cleanDomain}`);
          continue;
        }
        
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
  return results;
};

export const createChartData = (domainData: DomainData[]) => {
  if (domainData.length === 0) return [];
  
  console.log("Creating chart data for domains:", domainData.map(d => d.domain));
  
  // Get all unique dates from all domains
  const allDates = new Set<string>();
  domainData.forEach(domain => {
    domain.data.forEach(item => allDates.add(item.date));
  });
  
  const sortedDates = Array.from(allDates).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );
  
  console.log("All unique dates:", sortedDates);
  
  // Create data points for each date
  const chartData = sortedDates.map(date => {
    const dataPoint: any = { date };
    
    // Add rank data for each domain on this date
    domainData.forEach(domain => {
      const rankData = domain.data.find(item => item.date === date);
      // Use the domain name as the key, and set to null if no data for this date
      dataPoint[domain.domain] = rankData ? rankData.rank : null;
    });
    
    return dataPoint;
  });
  
  console.log("Final chart data:", chartData);
  console.log("Sample data point:", chartData[0]);
  console.log("Domain keys in data:", Object.keys(chartData[0] || {}).filter(key => key !== 'date'));
  
  return chartData;
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
};
