export const getLocalTimeString = (date: unknown) => {
  if (typeof date === "string") {
    const parsedDate = new Date(date);
    if (parsedDate instanceof Date) {
      return parsedDate.toLocaleString();
    }
  } else if (date instanceof Date) {
    return date.toLocaleDateString();
  }

  return null;
};

export const getIsoDate = (date: unknown) => {
  if (typeof date === "string") {
    const parsedDate = new Date(date);
    if (parsedDate instanceof Date) {
      return parsedDate.toISOString();
    }
  } else if (date instanceof Date) {
    return date.toISOString();
  }

  return null;
};

const intervals = [
  { label: "year", seconds: 31536000 },
  { label: "month", seconds: 2592000 },
  { label: "day", seconds: 86400 },
  { label: "hour", seconds: 3600 },
  { label: "minute", seconds: 60 },
  { label: "second", seconds: 1 },
];

export const timeSince = (date: any) => {
  date = new Date(date);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const interval = intervals.find((i) => i.seconds < seconds);
  if (interval) {
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? "s" : ""}`;
  }
  return null;
};
