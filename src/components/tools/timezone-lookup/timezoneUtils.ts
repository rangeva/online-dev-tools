
import { TimezoneInfo } from './types';
import { timezoneMap } from './timezoneData';

export const getTimezoneInfo = async (location: string): Promise<TimezoneInfo> => {
  const normalizedLocation = location.toLowerCase().trim();
  const timezoneData = timezoneMap[normalizedLocation];

  if (!timezoneData) {
    throw new Error(`Timezone information not found for "${location}". Try searching for US states, major cities, or international locations.`);
  }

  const now = new Date();
  const timeInTimezone = new Intl.DateTimeFormat('en-US', {
    timeZone: timezoneData.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(now);

  // Get timezone offset
  const tempDate = new Date().toLocaleString("en", {timeZone: timezoneData.timezone});
  const utcTime = new Date().toLocaleString("en", {timeZone: "UTC"});
  const utcOffset = (Date.parse(tempDate) - Date.parse(utcTime)) / (1000 * 60 * 60);

  // Get timezone abbreviation
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezoneData.timezone,
    timeZoneName: 'short'
  });
  const parts = formatter.formatToParts(now);
  const abbreviation = parts.find(part => part.type === 'timeZoneName')?.value || '';

  return {
    timezone: timezoneData.timezone,
    abbreviation,
    offset: `UTC${utcOffset >= 0 ? '+' : ''}${utcOffset}`,
    utcOffset,
    isDst: false, // Simplified - would need more complex logic for accurate DST detection
    currentTime: timeInTimezone,
    location: `${location}, ${timezoneData.country}`
  };
};

export const formatTime = (timezone: string, format: string): string => {
  const now = new Date();
  switch (format) {
    case '12hour':
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(now);
    case '24hour':
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
    case 'iso':
      return new Date().toLocaleString('sv-SE', { timeZone: timezone }).replace(' ', 'T');
    case 'full':
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(now);
    default:
      return '';
  }
};
