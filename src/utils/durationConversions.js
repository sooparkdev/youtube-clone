export function formatDuration(durationString) {
  const match = durationString.match(/P(\d+D)?T(\d+H)?(\d+M)?(\d+S)?/);

  if (!match) {
     console.error("Invalid duration format");
     return undefined; 
  }

  const days = parseInt(match[1]?.replace("D", "")) || 0;
  const hours = parseInt(match[2]?.replace("H", "")) || 0;
  const minutes = match[3]?.replace("M", "") || "0";
  const seconds = match[4]?.replace("S", "") || "0";

  const totalHours = days * 24 + hours;

  if(totalHours) {
    return `${totalHours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
  } else if(minutes) {
    return `${minutes}:${seconds.padStart(2, '0')}`;
  } else if(seconds) {
    return `0:${seconds.padStart(2, '0')}`;
  }
}

