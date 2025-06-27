
export interface TimezoneInfo {
  timezone: string;
  abbreviation: string;
  offset: string;
  utcOffset: number;
  isDst: boolean;
  currentTime: string;
  location: string;
}

export interface PopularLocation {
  name: string;
  query: string;
}
