import { getLocalDateKey, isConsecutiveDay } from "./challengeDate";
import { calculateDailyChallengeScore } from "./challengeScoring";
import { saveDailyChallengeCloud } from "@/lib/supabase/syncStorage";

export interface DailyResult {
  date: string;
  wpm: number;
  accuracy: number;
  errors: number;
  score: number;
  completed: boolean;
}

export interface DailyChallengeStore {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
  dailyResults: Record<string, DailyResult>;
}

export const EMPTY_CHALLENGE_STORE: DailyChallengeStore = Object.freeze({
  currentStreak: 0,
  longestStreak: 0,
  lastCompletedDate: null,
  dailyResults: Object.freeze({}),
});

const STORAGE_KEY = "typing_platform_daily_challenge";

// In-memory reference caching for React useSyncExternalStore compliance
let rawCache: string | null = null;
let storeCache: DailyChallengeStore | null = null;

export function getDailyChallengeStore(): DailyChallengeStore {
  if (typeof window === "undefined") return EMPTY_CHALLENGE_STORE;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === rawCache && storeCache) {
      return storeCache;
    }
    rawCache = raw;
    if (!raw) {
      storeCache = {
        currentStreak: 0,
        longestStreak: 0,
        lastCompletedDate: null,
        dailyResults: {},
      };
      return storeCache;
    }
    storeCache = JSON.parse(raw) as DailyChallengeStore;
    return storeCache;
  } catch (err) {
    console.error("Failed to read daily challenge store from localStorage:", err);
    return EMPTY_CHALLENGE_STORE;
  }
}

export function saveDailyChallengeCompletion(
  wpm: number,
  accuracy: number,
  errors: number,
  dateStr: string = getLocalDateKey()
): { isNewBestScore: boolean; store: DailyChallengeStore; result: DailyResult } {
  const currentStore = getDailyChallengeStore();
  const score = calculateDailyChallengeScore(wpm, accuracy);
  const existingToday = currentStore.dailyResults[dateStr];

  let isNewBestScore = false;
  let newCurrentStreak = currentStore.currentStreak;
  let newLongestStreak = currentStore.longestStreak;
  let newLastCompletedDate = currentStore.lastCompletedDate;

  if (existingToday) {
    // Same-day retry: update score if higher, do NOT re-increment streak
    isNewBestScore = score > existingToday.score;
    const updatedResult: DailyResult = {
      date: dateStr,
      wpm: isNewBestScore ? wpm : existingToday.wpm,
      accuracy: isNewBestScore ? accuracy : existingToday.accuracy,
      errors: isNewBestScore ? errors : existingToday.errors,
      score: Math.max(existingToday.score, score),
      completed: true,
    };

    const newStore: DailyChallengeStore = {
      ...currentStore,
      dailyResults: {
        ...currentStore.dailyResults,
        [dateStr]: updatedResult,
      },
    };

    saveStoreToLocalStorage(newStore);
    return { isNewBestScore, store: newStore, result: updatedResult };
  } else {
    // First completion today
    isNewBestScore = true;
    if (currentStore.lastCompletedDate && isConsecutiveDay(currentStore.lastCompletedDate, dateStr)) {
      newCurrentStreak = currentStore.currentStreak + 1;
    } else {
      newCurrentStreak = 1;
    }

    newLongestStreak = Math.max(currentStore.longestStreak, newCurrentStreak);
    newLastCompletedDate = dateStr;

    const newResult: DailyResult = {
      date: dateStr,
      wpm,
      accuracy,
      errors,
      score,
      completed: true,
    };

    const newStore: DailyChallengeStore = {
      currentStreak: newCurrentStreak,
      longestStreak: newLongestStreak,
      lastCompletedDate: newLastCompletedDate,
      dailyResults: {
        ...currentStore.dailyResults,
        [dateStr]: newResult,
      },
    };

    saveStoreToLocalStorage(newStore);
    return { isNewBestScore, store: newStore, result: newResult };
  }
}

function saveStoreToLocalStorage(newStore: DailyChallengeStore) {
  if (typeof window !== "undefined") {
    try {
      const raw = JSON.stringify(newStore);
      localStorage.setItem(STORAGE_KEY, raw);
      rawCache = raw;
      storeCache = newStore;
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("typing_daily_challenge_updated"));
        }
      }, 0);

      // Background cloud sync for logged-in users
      saveDailyChallengeCloud(
        newStore.currentStreak,
        newStore.longestStreak,
        newStore.lastCompletedDate,
        newStore.dailyResults
      );
    } catch (err) {
      console.error("Failed to save daily challenge store to localStorage:", err);
    }
  }
}
