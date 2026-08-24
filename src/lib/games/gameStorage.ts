import { saveGameScoreCloud } from "@/lib/supabase/syncStorage";

export interface WordSprintBest {
  bestScore: number;
  bestWpm: number;
  bestAccuracy: number;
}

export interface FallingWordsBest {
  bestScore: number;
  highestLevel: number;
  bestAccuracy: number;
}

export interface AccuracyBest {
  bestScore: number;
  bestWpm: number;
  bestAccuracy: number;
}

export interface GameScores {
  wordSprint: WordSprintBest | null;
  fallingWords: FallingWordsBest | null;
  accuracy: AccuracyBest | null;
}

export const EMPTY_GAME_SCORES: GameScores = Object.freeze({
  wordSprint: null,
  fallingWords: null,
  accuracy: null,
});

const STORAGE_KEYS = {
  wordSprint: "typing_platform_game_word_sprint",
  fallingWords: "typing_platform_game_falling_words",
  accuracy: "typing_platform_game_accuracy",
} as const;

// Memory cache for reference stability (React compliance)
const rawCache: Record<string, string | null> = {};
const scoreCache: Record<string, unknown> = {};

let cachedAllGameScores: GameScores | null = null;
let lastCombinedRawKey = "";

function getParsedStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (raw === rawCache[key]) {
      return (scoreCache[key] as T) ?? null;
    }
    rawCache[key] = raw;
    scoreCache[key] = raw ? JSON.parse(raw) : null;
    return (scoreCache[key] as T) ?? null;
  } catch (err) {
    console.error(`Failed to read ${key} from localStorage:`, err);
    return null;
  }
}

export function getWordSprintBest(): WordSprintBest | null {
  return getParsedStorage<WordSprintBest>(STORAGE_KEYS.wordSprint);
}

export function getFallingWordsBest(): FallingWordsBest | null {
  return getParsedStorage<FallingWordsBest>(STORAGE_KEYS.fallingWords);
}

export function getAccuracyBest(): AccuracyBest | null {
  return getParsedStorage<AccuracyBest>(STORAGE_KEYS.accuracy);
}

export function getAllGameScores(): GameScores {
  if (typeof window === "undefined") return EMPTY_GAME_SCORES;

  const rawWS = localStorage.getItem(STORAGE_KEYS.wordSprint);
  const rawFW = localStorage.getItem(STORAGE_KEYS.fallingWords);
  const rawAC = localStorage.getItem(STORAGE_KEYS.accuracy);

  const combinedRawKey = `${rawWS}::${rawFW}::${rawAC}`;

  if (cachedAllGameScores && combinedRawKey === lastCombinedRawKey) {
    return cachedAllGameScores;
  }

  lastCombinedRawKey = combinedRawKey;
  cachedAllGameScores = {
    wordSprint: getWordSprintBest(),
    fallingWords: getFallingWordsBest(),
    accuracy: getAccuracyBest(),
  };

  return cachedAllGameScores;
}

function notifyGameScoresUpdated() {
  if (typeof window !== "undefined") {
    setTimeout(() => {
      window.dispatchEvent(new Event("typing_game_scores_updated"));
    }, 0);
  }
}

export function saveWordSprintScore(score: number, wpm: number, accuracy: number): { isNewBest: boolean; best: WordSprintBest } {
  const current = getWordSprintBest();
  const isNewBest = !current || score > current.bestScore;
  const newBest: WordSprintBest = {
    bestScore: current ? Math.max(current.bestScore, score) : score,
    bestWpm: current ? Math.max(current.bestWpm, wpm) : wpm,
    bestAccuracy: current ? Math.max(current.bestAccuracy, accuracy) : accuracy,
  };

  if (typeof window !== "undefined") {
    try {
      const raw = JSON.stringify(newBest);
      localStorage.setItem(STORAGE_KEYS.wordSprint, raw);
      rawCache[STORAGE_KEYS.wordSprint] = raw;
      scoreCache[STORAGE_KEYS.wordSprint] = newBest;
      lastCombinedRawKey = ""; // Invalidate combined cache
      notifyGameScoresUpdated();

      // Background cloud sync for logged-in users
      saveGameScoreCloud("word_sprint", newBest.bestScore, newBest.bestWpm, newBest.bestAccuracy);
    } catch (err) {
      console.error("Failed to save Word Sprint score:", err);
    }
  }

  return { isNewBest, best: newBest };
}

export function saveFallingWordsScore(score: number, level: number, accuracy: number): { isNewBest: boolean; best: FallingWordsBest } {
  const current = getFallingWordsBest();
  const isNewBest = !current || score > current.bestScore;
  const newBest: FallingWordsBest = {
    bestScore: current ? Math.max(current.bestScore, score) : score,
    highestLevel: current ? Math.max(current.highestLevel, level) : level,
    bestAccuracy: current ? Math.max(current.bestAccuracy, accuracy) : accuracy,
  };

  if (typeof window !== "undefined") {
    try {
      const raw = JSON.stringify(newBest);
      localStorage.setItem(STORAGE_KEYS.fallingWords, raw);
      rawCache[STORAGE_KEYS.fallingWords] = raw;
      scoreCache[STORAGE_KEYS.fallingWords] = newBest;
      lastCombinedRawKey = ""; // Invalidate combined cache
      notifyGameScoresUpdated();

      // Background cloud sync for logged-in users
      saveGameScoreCloud("falling_words", newBest.bestScore, newBest.highestLevel, newBest.bestAccuracy);
    } catch (err) {
      console.error("Failed to save Falling Words score:", err);
    }
  }

  return { isNewBest, best: newBest };
}

export function saveAccuracyScore(score: number, wpm: number, accuracy: number): { isNewBest: boolean; best: AccuracyBest } {
  const current = getAccuracyBest();
  const isNewBest = !current || score > current.bestScore;
  const newBest: AccuracyBest = {
    bestScore: current ? Math.max(current.bestScore, score) : score,
    bestWpm: current ? Math.max(current.bestWpm, wpm) : wpm,
    bestAccuracy: current ? Math.max(current.bestAccuracy, accuracy) : accuracy,
  };

  if (typeof window !== "undefined") {
    try {
      const raw = JSON.stringify(newBest);
      localStorage.setItem(STORAGE_KEYS.accuracy, raw);
      rawCache[STORAGE_KEYS.accuracy] = raw;
      scoreCache[STORAGE_KEYS.accuracy] = newBest;
      lastCombinedRawKey = ""; // Invalidate combined cache
      notifyGameScoresUpdated();

      // Background cloud sync for logged-in users
      saveGameScoreCloud("accuracy", newBest.bestScore, newBest.bestWpm, newBest.bestAccuracy);
    } catch (err) {
      console.error("Failed to save Accuracy score:", err);
    }
  }

  return { isNewBest, best: newBest };
}
