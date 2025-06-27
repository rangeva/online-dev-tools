
export interface RankData {
  date: string;
  rank: number;
}

export interface TrancoResponse {
  ranks: RankData[];
  domain: string;
}

export interface DomainData {
  domain: string;
  data: RankData[];
  color: string;
  currentRank: number;
  trend: number | null;
}
