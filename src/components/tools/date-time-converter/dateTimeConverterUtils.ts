
export const formatDate = (date: Date) => {
  const pad = (num: number) => num.toString().padStart(2, '0');
  
  return {
    "ISO 8601": date.toISOString(),
    "Unix Timestamp": Math.floor(date.getTime() / 1000).toString(),
    "Milliseconds": date.getTime().toString(),
    "UTC String": date.toUTCString(),
    "Local String": date.toLocaleString(),
    "Date Only": date.toDateString(),
    "Time Only": date.toTimeString(),
    "DD/MM/YYYY": date.toLocaleDateString('en-GB'),
    "MM/DD/YYYY": date.toLocaleDateString('en-US'),
    "YYYY-MM-DD": date.toISOString().split('T')[0],
    "YYYY/MM/DD": `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`,
    "DD-MM-YYYY": `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`,
    "Month DD, YYYY": date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    "HH:MM:SS": `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`,
    "HH:MM": `${pad(date.getHours())}:${pad(date.getMinutes())}`,
    "12-Hour Time": date.toLocaleTimeString('en-US', { hour12: true })
  };
};

export const getRelativeTime = (date: Date, t: (key: string, options?: any) => string) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (Math.abs(diffMinutes) < 1) return t('dateTime.justNow');
  if (Math.abs(diffMinutes) < 60) {
    const key = Math.abs(diffMinutes) === 1 ? 'dateTime.minuteAgo' : 'dateTime.minutesAgo';
    return t(key, { count: Math.abs(diffMinutes) }) + (diffMinutes < 0 ? ` ${t('dateTime.fromNow')}` : ` ${t('dateTime.ago')}`);
  }
  if (Math.abs(diffHours) < 24) {
    const key = Math.abs(diffHours) === 1 ? 'dateTime.hourAgo' : 'dateTime.hoursAgo';
    return t(key, { count: Math.abs(diffHours) }) + (diffHours < 0 ? ` ${t('dateTime.fromNow')}` : ` ${t('dateTime.ago')}`);
  }
  if (Math.abs(diffDays) < 30) {
    const key = Math.abs(diffDays) === 1 ? 'dateTime.dayAgo' : 'dateTime.daysAgo';
    return t(key, { count: Math.abs(diffDays) }) + (diffDays < 0 ? ` ${t('dateTime.fromNow')}` : ` ${t('dateTime.ago')}`);
  }
  
  return date.toLocaleDateString();
};

export const exampleInputs = {
  iso: "2024-01-15T10:30:00.000Z",
  timestamp: "1705312200",
  milliseconds: "1705312200000",
  auto: "January 15, 2024"
};

export const convertDateTime = (inputValue: string, inputFormat: string) => {
  let date: Date;
  
  switch (inputFormat) {
    case "iso":
      date = new Date(inputValue);
      break;
    case "timestamp":
      const timestamp = parseInt(inputValue);
      date = new Date(timestamp < 10000000000 ? timestamp * 1000 : timestamp);
      break;
    case "milliseconds":
      date = new Date(parseInt(inputValue));
      break;
    case "auto":
      if (/^\d{10}$/.test(inputValue)) {
        date = new Date(parseInt(inputValue) * 1000);
      } else if (/^\d{13}$/.test(inputValue)) {
        date = new Date(parseInt(inputValue));
      } else {
        date = new Date(inputValue);
      }
      break;
    default:
      date = new Date(inputValue);
  }

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  return date;
};
