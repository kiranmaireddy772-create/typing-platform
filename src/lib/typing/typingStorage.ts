import { savePersonalBestCloud } from "@/lib/supabase/syncStorage";

export interface PersonalBest {
  wpm: number;
  accuracy: number;
  duration: number;
  date: string;
}

const STORAGE_PREFIX = "typing_platform_pb_";

// Memory cache for object reference stability (required for React useSyncExternalStore)
const rawCache: Record<number, string | null> = {};
const recordCache: Record<number, PersonalBest | null> = {};

export function getPersonalBest(duration: number): PersonalBest | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${duration}`);
    if (raw === rawCache[duration]) {
      return recordCache[duration] ?? null;
    }
    rawCache[duration] = raw;
    recordCache[duration] = raw ? (JSON.parse(raw) as PersonalBest) : null;
    return recordCache[duration];
  } catch (err) {
    console.error("Failed to read personal best from localStorage:", err);
    return null;
  }
}

export function savePersonalBest(
  duration: number,
  wpm: number,
  accuracy: number
): { isNewBest: boolean; record: PersonalBest } {
  const currentBest = getPersonalBest(duration);
  const dateStr = new Date().toISOString().split("T")[0];

  const newRecord: PersonalBest = {
    wpm,
    accuracy,
    duration,
    date: dateStr,
  };

  const isNewBest =
    !currentBest ||
    wpm > currentBest.wpm ||
    (wpm === currentBest.wpm && accuracy > currentBest.accuracy);

  if (isNewBest && typeof window !== "undefined") {
    try {
      const rawString = JSON.stringify(newRecord);
      localStorage.setItem(`${STORAGE_PREFIX}${duration}`, rawString);
      rawCache[duration] = rawString;
      recordCache[duration] = newRecord;
      window.dispatchEvent(new Event("typing_pb_updated"));

      // Background cloud sync for logged-in users
      savePersonalBestCloud(duration, wpm, accuracy);
    } catch (err) {
      console.error("Failed to save personal best to localStorage:", err);
    }
  }

  return {
    isNewBest,
    record: isNewBest ? newRecord : currentBest || newRecord,
  };
}
