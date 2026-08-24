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

export function getCompletedLessons(): Record<string, LessonRecord> {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, LessonRecord>;
  } catch (err) {
    console.error("Failed to parse lesson progress from localStorage:", err);
    return {};
  }
}

export function isLessonUnlocked(lessonNumber: number): boolean {
  // Lesson 1 is always unlocked
  if (lessonNumber <= 1) return true;

  const records = getCompletedLessons();
  // Lesson N is unlocked if Lesson N-1 is completed
  const previousLessonId = `lesson-${lessonNumber - 1}`;
  return Boolean(records[previousLessonId]?.completed);
}

export function saveLessonCompletion(
  lessonId: string,
  wpm: number,
  accuracy: number
): void {
  if (typeof window === "undefined") return;

  try {
    const records = getCompletedLessons();
    records[lessonId] = {
      lessonId,
      completed: true,
      wpm: Math.max(records[lessonId]?.wpm || 0, wpm),
      accuracy: Math.max(records[lessonId]?.accuracy || 0, accuracy),
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (err) {
    console.error("Failed to save lesson completion to localStorage:", err);
  }
}

export function calculateProgressStats(): OverallProgressStats {
  const records = getCompletedLessons();
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
