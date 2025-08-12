export function timeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
  
    const timeUnits = [
      { unit: 'year', value: 60 * 60 * 24 * 365 },
      { unit: 'day', value: 60 * 60 * 24 },
      { unit: 'hour', value: 60 * 60 },
      { unit: 'minute', value: 60 },
      { unit: 'second', value: 1 }
    ];
  
    for (let { unit, value } of timeUnits) {
      const diff = Math.floor(diffInSeconds / value);
      if (diff >= 1) {
        return `${diff} ${unit}${diff > 1 ? 's' : ''} ago`;
      }
    }
  
    return "A few seconds ago";
  }
  