"use client";

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import { getRandomWord } from "@/data/games/words";
import { saveWordSprintScore, getWordSprintBest } from "@/lib/games/gameStorage";
import { calculateWPM, calculateAccuracy } from "@/lib/typing/typingCalculations";
import { calculateWordSprintScore } from "@/lib/games/gameScoring";

export type GameStatus = "idle" | "playing" | "completed";

export function useWordSprint(initialDuration: 30 | 60 = 30) {
  const [duration, setDuration] = useState<30 | 60>(initialDuration);
  const [status, setStatus] = useState<GameStatus>("idle");
  const [timeLeft, setTimeLeft] = useState<number>(initialDuration);

  const [currentWord, setCurrentWord] = useState<string>(() => getRandomWord("medium"));
  const [inputVal, setInputVal] = useState<string>("");

  const [score, setScore] = useState<number>(0);
  const [wordsTypedCount, setWordsTypedCount] = useState<number>(0);
  const [correctWordsCount, setCorrectWordsCount] = useState<number>(0);
  const [totalTypedChars, setTotalTypedChars] = useState<number>(0);
  const [correctTypedChars, setCorrectTypedChars] = useState<number>(0);

  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isNewBest, setIsNewBest] = useState<boolean>(false);

  const subscribeScores = useCallback((onStoreChange: () => void) => {
    if (typeof window === "undefined") return () => {};
    window.addEventListener("storage", onStoreChange);
    window.addEventListener("typing_game_scores_updated", onStoreChange);
    return () => {
      window.removeEventListener("storage", onStoreChange);
      window.removeEventListener("typing_game_scores_updated", onStoreChange);
    };
  }, []);

  const storedBestScore = useSyncExternalStore(
    subscribeScores,
    getWordSprintBest,
    () => null
  );

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const wpm = calculateWPM(correctTypedChars, elapsedSeconds || 1);
  const accuracy = calculateAccuracy(correctTypedChars, totalTypedChars);

  const endGame = useCallback(
    (finalScore: number, finalWpm: number, finalAccuracy: number) => {
      setStatus("completed");
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      const { isNewBest: newBest } = saveWordSprintScore(finalScore, finalWpm, finalAccuracy);
      setIsNewBest(newBest);
    },
    []
  );

  // Countdown timer
  useEffect(() => {
    if (status === "playing") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame(score, wpm, accuracy);
            return 0;
          }
          return prev - 1;
        });
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [status, score, wpm, accuracy, endGame]);

  const startGame = useCallback(() => {
    const nextWord = getRandomWord("medium");
    setCurrentWord(nextWord);
    setInputVal("");
    setScore(0);
    setWordsTypedCount(0);
    setCorrectWordsCount(0);
    setTotalTypedChars(0);
    setCorrectTypedChars(0);
    setElapsedSeconds(0);
    setTimeLeft(duration);
    setIsNewBest(false);
    setStatus("playing");
  }, [duration]);

  const handleInputChange = useCallback(
    (newVal: string) => {
      if (status !== "playing") return;

      const typedLength = newVal.length;
      const prevLength = inputVal.length;

      // Track total typed characters when adding text
      if (typedLength > prevLength) {
        const addedChar = newVal[typedLength - 1];
        const targetChar = currentWord[typedLength - 1];
        setTotalTypedChars((prev) => prev + 1);
        if (addedChar === targetChar) {
          setCorrectTypedChars((prev) => prev + 1);
        }
      }

      setInputVal(newVal);

      // Check if complete word matches
      if (newVal.trim() === currentWord) {
        const newWordsTyped = wordsTypedCount + 1;
        const newScore = calculateWordSprintScore(newWordsTyped, wpm);

        setWordsTypedCount(newWordsTyped);
        setCorrectWordsCount((prev) => prev + 1);
        setScore(newScore);

        // Load next word
        const nextWord = getRandomWord("medium", currentWord);
        setCurrentWord(nextWord);
        setInputVal("");
      }
    },
    [status, inputVal, currentWord, wordsTypedCount, wpm]
  );

  const setDurationMode = (newDur: 30 | 60) => {
    setDuration(newDur);
    setTimeLeft(newDur);
  };

  return {
    status,
    duration,
    timeLeft,
    currentWord,
    inputVal,
    score,
    wordsTypedCount,
    correctWordsCount,
    wpm,
    accuracy,
    isNewBest,
    bestScore: storedBestScore,
    setDurationMode,
    startGame,
    handleInputChange,
  };
}
