"use client";

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import { getRandomAccuracyPassage, AccuracyPassage } from "@/data/games/passages";
import { saveAccuracyScore, getAccuracyBest } from "@/lib/games/gameStorage";
import { calculateWPM, calculateAccuracy } from "@/lib/typing/typingCalculations";
import { calculateAccuracyGameScore } from "@/lib/games/gameScoring";
import { CharState, TestStatus } from "@/hooks/useTypingEngine";

export function useAccuracyChallenge() {
  const [passage, setPassage] = useState<AccuracyPassage>(() => getRandomAccuracyPassage());
  const [status, setStatus] = useState<TestStatus>("idle");
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [charStates, setCharStates] = useState<CharState[]>(() =>
    new Array(passage.text.length).fill("untyped")
  );

  const [correctCount, setCorrectCount] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [totalTypedCount, setTotalTypedCount] = useState<number>(0);

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
    getAccuracyBest,
    () => null
  );

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const wpm = calculateWPM(correctCount, elapsedSeconds || 1);
  const accuracy = calculateAccuracy(correctCount, totalTypedCount);
  const currentScore = calculateAccuracyGameScore(accuracy, wpm, errorCount);

  const endGame = useCallback(
    (finalAcc: number, finalWpm: number, finalErrors: number) => {
      setStatus("completed");
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      const finalScore = calculateAccuracyGameScore(finalAcc, finalWpm, finalErrors);
      const { isNewBest: newBest } = saveAccuracyScore(finalScore, finalWpm, finalAcc);
      setIsNewBest(newBest);
    },
    []
  );

  // Timer countdown
  useEffect(() => {
    if (status === "typing") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame(accuracy, wpm, errorCount);
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
  }, [status, accuracy, wpm, errorCount, endGame]);

  const processKey = useCallback(
    (key: string) => {
      if (status === "completed") return;

      if (key === "Backspace") {
        if (currentIndex > 0) {
          const newIndex = currentIndex - 1;
          setCurrentIndex(newIndex);
          setCharStates((prev) => {
            const copy = [...prev];
            copy[newIndex] = "untyped";
            return copy;
          });
        }
        return;
      }

      if (key.length > 1) return; // Ignore Shift, Control, etc.

      if (status === "idle") {
        setStatus("typing");
      }

      const targetChar = passage.text[currentIndex];
      const isCorrect = key === targetChar;

      setTotalTypedCount((prev) => prev + 1);

      if (isCorrect) {
        setCorrectCount((prev) => prev + 1);
        setCharStates((prev) => {
          const copy = [...prev];
          copy[currentIndex] = "correct";
          return copy;
        });
      } else {
        setErrorCount((prev) => prev + 1);
        setCharStates((prev) => {
          const copy = [...prev];
          copy[currentIndex] = "incorrect";
          return copy;
        });
      }

      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      if (nextIndex >= passage.text.length) {
        endGame(
          calculateAccuracy(isCorrect ? correctCount + 1 : correctCount, totalTypedCount + 1),
          calculateWPM(isCorrect ? correctCount + 1 : correctCount, elapsedSeconds || 1),
          isCorrect ? errorCount : errorCount + 1
        );
      }
    },
    [status, currentIndex, passage.text, correctCount, totalTypedCount, errorCount, elapsedSeconds, endGame]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Tab") {
        e.preventDefault();
      }
      processKey(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [processKey]);

  const startGame = useCallback(() => {
    const nextPassage = getRandomAccuracyPassage();
    setPassage(nextPassage);
    setCharStates(new Array(nextPassage.text.length).fill("untyped"));
    setCurrentIndex(0);
    setCorrectCount(0);
    setErrorCount(0);
    setTotalTypedCount(0);
    setTimeLeft(60);
    setElapsedSeconds(0);
    setIsNewBest(false);
    setStatus("typing");
  }, []);

  return {
    status,
    passage,
    charStates,
    currentIndex,
    timeLeft,
    wpm,
    accuracy,
    errorCount,
    currentScore,
    isNewBest,
    bestScore: storedBestScore,
    startGame,
    handleVirtualKeyPress: processKey,
  };
}
