const ONE_DAY_MS = 86_400_000;

function padDatePart(value: number): string {
  return value.toString().padStart(2, "0");
}

export function formatEpisodeDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatEpisodeDateValue(date: Date): string {
  return [
    date.getUTCFullYear(),
    padDatePart(date.getUTCMonth() + 1),
    padDatePart(date.getUTCDate()),
  ].join("-");
}

export function formatEpisodeRelativeDate(date: Date, now = new Date()): string {
  const currentDay = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const episodeDay = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const diffDays = Math.floor((currentDay - episodeDay) / ONE_DAY_MS);

  if (diffDays <= 0) return "today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}
