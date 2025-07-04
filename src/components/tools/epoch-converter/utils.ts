
export const parseTimestamp = (timestamp: string, format: string) => {
  const num = parseInt(timestamp);
  if (isNaN(num)) return null;
  
  switch (format) {
    case 'seconds':
      return num * 1000;
    case 'milliseconds':
      return num;
    case 'microseconds':
      return num / 1000;
    case 'nanoseconds':
      return num / 1000000;
    default:
      return num * 1000;
  }
};

export const convertHumanToTimestamp = (dateStr: string) => {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    
    return {
      original: dateStr,
      timestamp: Math.floor(date.getTime() / 1000),
      milliseconds: date.getTime(),
      date: date,
      iso: date.toISOString(),
      utc: date.toUTCString()
    };
  } catch {
    return null;
  }
};

export const getCurrentTimestampInFormat = (format: string) => {
  const now = Math.floor(Date.now() / 1000);
  
  switch (format) {
    case 'milliseconds':
      return (now * 1000).toString();
    case 'microseconds':
      return (now * 1000000).toString();
    case 'nanoseconds':
      return (now * 1000000000).toString();
    default:
      return now.toString();
  }
};

export const getDynamicDates = () => {
  const now = new Date();
  const dates = [
    { label: 'Now', date: now },
    { label: '1 hour ago', date: new Date(now.getTime() - 3600000) },
    { label: '1 day ago', date: new Date(now.getTime() - 86400000) },
    { label: '1 week ago', date: new Date(now.getTime() - 604800000) },
    { label: '1 month ago', date: new Date(now.getTime() - 2592000000) },
    { label: 'Next hour', date: new Date(now.getTime() + 3600000) },
    { label: 'Next day', date: new Date(now.getTime() + 86400000) },
    { label: 'Next week', date: new Date(now.getTime() + 604800000) },
    { label: 'Next month', date: new Date(now.getTime() + 2592000000) }
  ];
  
  return dates.map(item => ({
    ...item,
    epoch: Math.floor(item.date.getTime() / 1000)
  }));
};

export const calculateStartEndDates = (year: string, month: string, day: string) => {
  const yearNum = parseInt(year);
  const monthNum = parseInt(month);
  const dayNum = parseInt(day);
  
  // Start and end of day
  const dayStart = new Date(yearNum, monthNum - 1, dayNum, 0, 0, 0);
  const dayEnd = new Date(yearNum, monthNum - 1, dayNum, 23, 59, 59);
  
  // Start and end of month
  const monthStart = new Date(yearNum, monthNum - 1, 1, 0, 0, 0);
  const monthEnd = new Date(yearNum, monthNum, 0, 23, 59, 59);
  
  // Start and end of year
  const yearStart = new Date(yearNum, 0, 1, 0, 0, 0);
  const yearEnd = new Date(yearNum, 11, 31, 23, 59, 59);
  
  return {
    day: {
      start: { date: dayStart, epoch: Math.floor(dayStart.getTime() / 1000) },
      end: { date: dayEnd, epoch: Math.floor(dayEnd.getTime() / 1000) }
    },
    month: {
      start: { date: monthStart, epoch: Math.floor(monthStart.getTime() / 1000) },
      end: { date: monthEnd, epoch: Math.floor(monthEnd.getTime() / 1000) }
    },
    year: {
      start: { date: yearStart, epoch: Math.floor(yearStart.getTime() / 1000) },
      end: { date: yearEnd, epoch: Math.floor(yearEnd.getTime() / 1000) }
    }
  };
};

export const convertSecondsToTime = (totalSeconds: number) => {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return {
    total: totalSeconds,
    days,
    hours,
    minutes,
    seconds
  };
};
