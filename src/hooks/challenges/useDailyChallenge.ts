"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import { getDailyPassage } from "@/lib/challenges/challengeGenerator";
import { getLocalDateKey } from "@/lib/challenges/challengeDate";
import {
  getDailyChallengeStore,
  saveDailyChallengeCompletion,
  EMPTY_CHALLENGE_STORE,
  DailyResult,
} from "@/lib/challenges/challengeStorage";
import { useTypingEngine, UseTypingEngineReturn } from "@/hooks/useTypingEngine";

function subscribeDailyStore(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("typing_daily_challenge_updated", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("typing_daily_challenge_updated", onStoreChange);
  };
}

const getServerSnapshot = () => EMPTY_CHALLENGE_STORE;

export function useDailyChallenge() {
  const todayKey = getLocalDateKey();
  const passage = getDailyPassage(todayKey);

  const engine: UseTypingEngineReturn = useTypingEngine(60, "intermediate", passage.text);

  const [lastResult, setLastResult] = useState<DailyResult | null>(null);
  const [isNewBestScore, setIsNewBestScore] = useState<boolean>(false);

  const store = useSyncExternalStore(
    subscribeDailyStore,
    getDailyChallengeStore,
    getServerSnapshot
  );

  const todayResult = store.dailyResults[todayKey] || null;

  const saveCurrentResult = useCallback(() => {
    const { isNewBestScore: newBest, store: updatedStore, result } = saveDailyChallengeCompletion(
      engine.wpm,
      engine.accuracy,
      engine.errorCount,
      todayKey
    );
    setLastResult(result);
    setIsNewBestScore(newBest);
    return { isNewBestScore: newBest, store: updatedStore, result };
  }, [engine.wpm, engine.accuracy, engine.errorCount, todayKey]);

  return {
    todayKey,
    passage,
    engine,
    store,
    todayResult,
    lastResult,
    isNewBestScore,
    saveCurrentResult,
  };
}
