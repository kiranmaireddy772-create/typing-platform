"use client";

import { useState, useEffect, useCallback, useRef, useSyncExternalStore, useMemo } from "react";
import { getRandomPassage, Difficulty, TypingPassage } from "@/data/typing-texts";
import { calculateWPM, calculateAccuracy } from "@/lib/typing/typingCalculations";
import { savePersonalBest, getPersonalBest, PersonalBest } from "@/lib/typing/typingStorage";
import { recordKeyAttempt } from "@/lib/analytics/keyAnalytics";
import { checkAndUnlockAchievements } from "@/lib/achievements/achievementStorage";

export type TestStatus = "idle" | "typing" | "completed";
export type CharState = "untyped" | "correct" | "incorrect";

export interface UseTypingEngineReturn {
  status: TestStatus;
  selectedDuration: number;
  selectedDifficulty: Difficulty;
  text: string;
  charStates: CharState[];
  currentIndex: number;
  correctCount: number;
  errorCount: number;
  totalTypedCount: number;
  backspaceCount: number;
  timeLeft: number;
  elapsedSeconds: number;
  wpm: number;
  accuracy: number;
  pressedKey: string | null;
  isNewPersonalBest: boolean;
  personalBest: PersonalBest | null;
  expectedKey: string;
  setDuration: (duration: number) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  startTest: () => void;
  restartTest: () => void;
  handleVirtualKeyPress: (key: string) => void;
}

export function useTypingEngine(
  initialDuration = 30,
  initialDifficulty: Difficulty = "intermediate",
  overrideText?: string
): UseTypingEngineReturn {
  const [selectedDuration, setSelectedDuration] = useState<number>(initialDuration);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(initialDifficulty);

  const [randomPassage, setRandomPassage] = useState<TypingPassage>(() =>
    getRandomPassage(initialDifficulty)
  );

  const activePassage: TypingPassage = useMemo(() => {
    if (overrideText) {
      return { id: "custom", difficulty: selectedDifficulty, text: overrideText };
    }
    return randomPassage;
  }, [overrideText, selectedDifficulty, randomPassage]);

  const [status, setStatus] = useState<TestStatus>("idle");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [charStates, setCharStates] = useState<CharState[]>(() =>
    new Array(activePassage.text.length).fill("untyped")
  );
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [totalTypedCount, setTotalTypedCount] = useState<number>(0);
  const [backspaceCount, setBackspaceCount] = useState<number>(0);

  const [timeLeft, setTimeLeft] = useState<number>(initialDuration);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const [isNewPersonalBest, setIsNewPersonalBest] = useState<boolean>(false);

  // Derive state reset when activePassage or selectedDuration changes (React recommended pattern)
  const [prevPassageText, setPrevPassageText] = useState(activePassage.text);
  const [prevDuration, setPrevDuration] = useState(selectedDuration);

  if (activePassage.text !== prevPassageText || selectedDuration !== prevDuration) {
    setPrevPassageText(activePassage.text);
    setPrevDuration(selectedDuration);
    setCharStates(new Array(activePassage.text.length).fill("untyped"));
    setCurrentIndex(0);
    setCorrectCount(0);
    setErrorCount(0);
    setTotalTypedCount(0);
    setBackspaceCount(0);
    setStatus("idle");
    setTimeLeft(selectedDuration);
    setElapsedSeconds(0);
    setIsNewPersonalBest(false);
  }

  // SSR-safe, reference-stable personal best store subscription
  const subscribePB = useCallback((onStoreChange: () => void) => {
    if (typeof window === "undefined") return () => {};
    window.addEventListener("storage", onStoreChange);
    window.addEventListener("typing_pb_updated", onStoreChange);
    return () => {
      window.removeEventListener("storage", onStoreChange);
      window.removeEventListener("typing_pb_updated", onStoreChange);
    };
  }, []);

  const getSnapshotPB = useCallback(
    () => getPersonalBest(selectedDuration),
    [selectedDuration]
  );

  const getServerSnapshotPB = useCallback(() => null, []);

  const storedPersonalBest = useSyncExternalStore(
    subscribePB,
    getSnapshotPB,
    getServerSnapshotPB
  );

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset engine state for a passage & duration
  const resetEngineState = useCallback((newPassage: TypingPassage, duration: number) => {
    setCharStates(new Array(newPassage.text.length).fill("untyped"));
    setCurrentIndex(0);
    setCorrectCount(0);
    setErrorCount(0);
    setTotalTypedCount(0);
    setBackspaceCount(0);
    setStatus("idle");
    setTimeLeft(duration);
    setElapsedSeconds(0);
    setIsNewPersonalBest(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Expected next key for virtual keyboard highlight
  const expectedKey =
    currentIndex < activePassage.text.length ? activePassage.text[currentIndex] : " ";

  // WPM and Accuracy derived calculations
  const wpm = calculateWPM(correctCount, elapsedSeconds || 1);
  const accuracy = calculateAccuracy(correctCount, totalTypedCount);

  // Complete test handler
  const completeTest = useCallback(
    (finalCorrect: number, finalTotal: number, finalTime: number) => {
      setStatus("completed");
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      const finalWpm = calculateWPM(finalCorrect, finalTime);
      const finalAcc = calculateAccuracy(finalCorrect, finalTotal);

      const { isNewBest } = savePersonalBest(
        selectedDuration,
        finalWpm,
        finalAcc
      );

      setIsNewPersonalBest(isNewBest);

      // Evaluate milestone achievements
      checkAndUnlockAchievements({
        wpm: finalWpm,
        accuracy: finalAcc,
        duration: selectedDuration,
      });
    },
    [selectedDuration]
  );

  // Countdown timer effect
  useEffect(() => {
    if (status === "typing") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            completeTest(correctCount, totalTypedCount, selectedDuration);
            return 0;
          }
          return prevTime - 1;
        });

        setElapsedSeconds((prevElapsed) => prevElapsed + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [status, selectedDuration, correctCount, totalTypedCount, completeTest]);

  // Process typed character input
  const processKey = useCallback(
    (key: string) => {
      if (status === "completed") return;

      if (key === "Backspace") {
        if (currentIndex > 0) {
          setBackspaceCount((prev) => prev + 1);
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

      // Ignore multi-character modifier keys (Shift, Control, Alt, Meta, CapsLock, Tab, etc.)
      if (key.length > 1) return;

      if (status === "idle") {
        setStatus("typing");
      }

      const targetChar = activePassage.text[currentIndex];
      const isCorrect = key === targetChar;

      // Record keystroke analytics for key error heatmap
      recordKeyAttempt(targetChar, isCorrect);

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

      if (nextIndex >= activePassage.text.length) {
        completeTest(
          isCorrect ? correctCount + 1 : correctCount,
          totalTypedCount + 1,
          elapsedSeconds || 1
        );
      }
    },
    [
      status,
      currentIndex,
      activePassage.text,
      correctCount,
      totalTypedCount,
      elapsedSeconds,
      completeTest,
    ]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent spacebar scroll & tab focus jumping
      if (e.key === " " || e.key === "Tab") {
        e.preventDefault();
      }

      setPressedKey(e.key);
      setTimeout(() => setPressedKey(null), 150);

      processKey(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [processKey]);

  const setDuration = (duration: number) => {
    setSelectedDuration(duration);
  };

  const setDifficulty = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    if (!overrideText) {
      setRandomPassage(getRandomPassage(difficulty));
    }
  };

  const startTest = () => {
    resetEngineState(activePassage, selectedDuration);
  };

  const restartTest = () => {
    if (!overrideText) {
      const newP = getRandomPassage(selectedDifficulty);
      setRandomPassage(newP);
      resetEngineState(newP, selectedDuration);
    } else {
      resetEngineState(activePassage, selectedDuration);
    }
  };

  const handleVirtualKeyPress = (key: string) => {
    setPressedKey(key);
    setTimeout(() => setPressedKey(null), 150);
    processKey(key);
  };

  return {
    status,
    selectedDuration,
    selectedDifficulty,
    text: activePassage.text,
    charStates,
    currentIndex,
    correctCount,
    errorCount,
    totalTypedCount,
    backspaceCount,
    timeLeft,
    elapsedSeconds,
    wpm,
    accuracy,
    pressedKey,
    isNewPersonalBest,
    personalBest: storedPersonalBest,
    expectedKey,
    setDuration,
    setDifficulty,
    startTest,
    restartTest,
    handleVirtualKeyPress,
  };
}
