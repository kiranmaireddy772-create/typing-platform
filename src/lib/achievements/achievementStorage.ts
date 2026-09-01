import { syncAchievementCloud } from "@/lib/supabase/syncStorage";

const STORAGE_KEY = "typing_platform_unlocked_achievements";

let rawCache: string | null = null;
let unlockedCache: string[] = [];

export function getUnlockedAchievements(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === rawCache) return unlockedCache;
    rawCache = raw;
    unlockedCache = raw ? (JSON.parse(raw) as string[]) : [];
    return unlockedCache;
  } catch (err) {
    console.error("Failed to read unlocked achievements from localStorage:", err);
    return [];
  }
}

export function unlockAchievement(achievementId: string): boolean {
  if (typeof window === "undefined") return false;
  const current = getUnlockedAchievements();
  if (current.includes(achievementId)) return false;

  const updated = [...current, achievementId];
  try {
    const rawString = JSON.stringify(updated);
    localStorage.setItem(STORAGE_KEY, rawString);
    rawCache = rawString;
    unlockedCache = updated;
    window.dispatchEvent(new Event("typing_achievements_updated"));

    // Async background sync for authenticated users
    syncAchievementCloud(achievementId);
    return true;
  } catch (err) {
    console.error("Failed to save achievement to localStorage:", err);
    return false;
  }
}

export function checkAndUnlockAchievements(context: {
  wpm?: number;
  accuracy?: number;
  duration?: number;
  streak?: number;
  completedLessonsCount?: number;
  wordSprintScore?: number;
  fallingWordsLevel?: number;
  accuracyScore?: number;
  isTop10?: boolean;
}): string[] {
  const newlyUnlocked: string[] = [];

  if (context.completedLessonsCount && context.completedLessonsCount >= 1) {
    if (unlockAchievement("first_steps")) newlyUnlocked.push("first_steps");
  }
  if (context.completedLessonsCount && context.completedLessonsCount >= 15) {
    if (unlockAchievement("curriculum_graduate")) newlyUnlocked.push("curriculum_graduate");
  }

  if (context.wpm && context.duration === 30 && context.wpm >= 60) {
    if (unlockAchievement("speed_demon")) newlyUnlocked.push("speed_demon");
  }
  if (context.wpm && context.wpm >= 100) {
    if (unlockAchievement("lightning_typist")) newlyUnlocked.push("lightning_typist");
  }
  if (context.accuracy && context.accuracy >= 100) {
    if (unlockAchievement("sharpshooter")) newlyUnlocked.push("sharpshooter");
  }

  if (context.streak && context.streak >= 3) {
    if (unlockAchievement("streak_starter")) newlyUnlocked.push("streak_starter");
  }
  if (context.streak && context.streak >= 7) {
    if (unlockAchievement("streak_master")) newlyUnlocked.push("streak_master");
  }

  if (context.wordSprintScore && context.wordSprintScore >= 500) {
    if (unlockAchievement("sprint_champion")) newlyUnlocked.push("sprint_champion");
  }
  if (context.fallingWordsLevel && context.fallingWordsLevel >= 5) {
    if (unlockAchievement("word_defender")) newlyUnlocked.push("word_defender");
  }
  if (context.accuracyScore && context.accuracyScore >= 800) {
    if (unlockAchievement("accuracy_elite")) newlyUnlocked.push("accuracy_elite");
  }

  if (context.isTop10) {
    if (unlockAchievement("leaderboard_legend")) newlyUnlocked.push("leaderboard_legend");
  }

  return newlyUnlocked;
}
