export interface KeyStat {
  total: number;
  errors: number;
}

export type KeyStatsMap = Record<string, KeyStat>;

const STORAGE_KEY = "typing_platform_key_stats";

let rawCache: string | null = null;
let statsCache: KeyStatsMap = {};

export function getKeyStats(): KeyStatsMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === rawCache) return statsCache;
    rawCache = raw;
    statsCache = raw ? (JSON.parse(raw) as KeyStatsMap) : {};
    return statsCache;
  } catch (err) {
    console.error("Failed to read key stats from localStorage:", err);
    return {};
  }
}

export function recordKeyAttempt(char: string, isCorrect: boolean): void {
  if (typeof window === "undefined" || !char || char.length !== 1) return;

  const key = char.toLowerCase();
  const currentStats = getKeyStats();
  const existing = currentStats[key] || { total: 0, errors: 0 };

  const updatedStats: KeyStatsMap = {
    ...currentStats,
    [key]: {
      total: existing.total + 1,
      errors: existing.errors + (isCorrect ? 0 : 1),
    },
  };

  try {
    const rawString = JSON.stringify(updatedStats);
    localStorage.setItem(STORAGE_KEY, rawString);
    rawCache = rawString;
    statsCache = updatedStats;
  } catch (err) {
    console.error("Failed to save key stats to localStorage:", err);
  }
}

export function calculateKeyAccuracy(stat: KeyStat): number {
  if (!stat || stat.total === 0) return 100;
  const correct = Math.max(0, stat.total - stat.errors);
  return Math.round((correct / stat.total) * 1000) / 10;
}
