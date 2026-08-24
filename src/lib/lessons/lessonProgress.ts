import { useSyncExternalStore } from "react";
import { ALL_LESSONS, getLessonsByTier } from "@/data/lessons";

export interface LessonRecord {
  lessonId: string;
  completed: boolean;
  wpm: number;
  accuracy: number;
  completedAt: string;
}

export interface OverallProgressStats {
  totalCompleted: number;
  totalLessons: number;
  overallPercent: number;
  beginnerCompleted: number;
  beginnerTotal: number;
  beginnerPercent: number;
  intermediateCompleted: number;
  intermediateTotal: number;
  intermediatePercent: number;
  advancedCompleted: number;
  advancedTotal: number;
  advancedPercent: number;
  nextUnlockedLessonNumber: number;
}

const STORAGE_KEY = "typing_platform_lesson_progress";

export const EMPTY_COMPLETED_LESSONS: Record<string, LessonRecord> = Object.freeze({});

// Memory cache for reference stability (React useSyncExternalStore compliance)
let rawCache: string | null = null;
let storeCache: Record<string, LessonRecord> | null = null;

export function getCompletedLessons(): Record<string, LessonRecord> {
  if (typeof window === "undefined") return EMPTY_COMPLETED_LESSONS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === rawCache && storeCache) {
      return storeCache;
    }
    rawCache = raw;
    if (!raw) {
      storeCache = EMPTY_COMPLETED_LESSONS;
      return storeCache;
    }
    storeCache = JSON.parse(raw) as Record<string, LessonRecord>;
    return storeCache;
  } catch (err) {
    console.error("Failed to parse lesson progress from localStorage:", err);
    return EMPTY_COMPLETED_LESSONS;
  }
}

export function subscribeLessonProgress(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("typing_lesson_progress_updated", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("typing_lesson_progress_updated", onStoreChange);
  };
}

export function isLessonUnlocked(
  lessonNumber: number,
  completedRecords: Record<string, LessonRecord> = getCompletedLessons()
): boolean {
  // Lesson 1 is always unlocked
  if (lessonNumber <= 1) return true;

  // Lesson N is unlocked if Lesson N-1 is completed
  const previousLessonId = `lesson-${lessonNumber - 1}`;
  return Boolean(completedRecords[previousLessonId]?.completed);
}

export function saveLessonCompletion(
  lessonId: string,
  wpm: number,
  accuracy: number
): void {
  if (typeof window === "undefined") return;

  try {
    const records = { ...getCompletedLessons() };
    records[lessonId] = {
      lessonId,
      completed: true,
      wpm: Math.max(records[lessonId]?.wpm || 0, wpm),
      accuracy: Math.max(records[lessonId]?.accuracy || 0, accuracy),
      completedAt: new Date().toISOString(),
    };
    const raw = JSON.stringify(records);
    localStorage.setItem(STORAGE_KEY, raw);
    rawCache = raw;
    storeCache = records;

    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("typing_lesson_progress_updated"));
      }
    }, 0);
  } catch (err) {
    console.error("Failed to save lesson completion to localStorage:", err);
  }
}

export function calculateProgressStats(
  records: Record<string, LessonRecord> = getCompletedLessons()
): OverallProgressStats {
  const totalLessons = ALL_LESSONS.length;

  const completedIds = Object.keys(records).filter((id) => records[id]?.completed);
  const totalCompleted = completedIds.length;

  const beginnerList = getLessonsByTier("beginner");
  const intermediateList = getLessonsByTier("intermediate");
  const advancedList = getLessonsByTier("advanced");

  const beginnerCompleted = beginnerList.filter((l) => records[l.id]?.completed).length;
  const intermediateCompleted = intermediateList.filter((l) => records[l.id]?.completed).length;
  const advancedCompleted = advancedList.filter((l) => records[l.id]?.completed).length;

  // Find next unlocked lesson number
  let nextUnlocked = 1;
  for (let i = 1; i <= totalLessons; i++) {
    if (!records[`lesson-${i}`]?.completed) {
      nextUnlocked = i;
      break;
    }
    nextUnlocked = i;
  }

  return {
    totalCompleted,
    totalLessons,
    overallPercent: Math.round((totalCompleted / totalLessons) * 100),
    beginnerCompleted,
    beginnerTotal: beginnerList.length,
    beginnerPercent: Math.round((beginnerCompleted / beginnerList.length) * 100),
    intermediateCompleted,
    intermediateTotal: intermediateList.length,
    intermediatePercent: Math.round((intermediateCompleted / intermediateList.length) * 100),
    advancedCompleted,
    advancedTotal: advancedList.length,
    advancedPercent: Math.round((advancedCompleted / advancedList.length) * 100),
    nextUnlockedLessonNumber: nextUnlocked,
  };
}

const getServerSnapshot = () => EMPTY_COMPLETED_LESSONS;

export function useLessonProgress() {
  const completedRecords = useSyncExternalStore(
    subscribeLessonProgress,
    getCompletedLessons,
    getServerSnapshot
  );

  const stats = calculateProgressStats(completedRecords);

  return {
    completedRecords,
    stats,
    isUnlocked: (lessonNumber: number) => isLessonUnlocked(lessonNumber, completedRecords),
  };
}
