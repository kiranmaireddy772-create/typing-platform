"use client";

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import { getRandomWord } from "@/data/games/words";
import { saveFallingWordsScore, getFallingWordsBest } from "@/lib/games/gameStorage";
import { calculateFallingWordsPoints } from "@/lib/games/gameScoring";

export interface FallingWordItem {
  id: string;
  text: string;
  xPercent: number; // 10% to 85%
  yPercent: number; // 0% to 95%
  speed: number;    // y increment per frame
  typedLength: number;
}

export type GameStatus = "idle" | "playing" | "completed";

export function useFallingWords() {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [lives, setLives] = useState<number>(3);
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [wordsCompleted, setWordsCompleted] = useState<number>(0);
  const [totalTypedChars, setTotalTypedChars] = useState<number>(0);
  const [correctTypedChars, setCorrectTypedChars] = useState<number>(0);

  const [words, setWords] = useState<FallingWordItem[]>([]);
  const [activeWordId, setActiveWordId] = useState<string | null>(null);
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
    getFallingWordsBest,
    () => null
  );

  const animFrameRef = useRef<number | null>(null);
  const spawnTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const accuracy = totalTypedChars > 0 ? Math.round((correctTypedChars / totalTypedChars) * 100) : 100;

  const stopGameLoop = useCallback(() => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (spawnTimerRef.current !== null) {
      clearInterval(spawnTimerRef.current);
      spawnTimerRef.current = null;
    }
  }, []);

  const endGame = useCallback(
    (finalScore: number, finalLevel: number, finalAccuracy: number) => {
      setStatus("completed");
      stopGameLoop();
      const { isNewBest: newBest } = saveFallingWordsScore(finalScore, finalLevel, finalAccuracy);
      setIsNewBest(newBest);
    },
    [stopGameLoop]
  );

  // Spawn a new falling word
  const spawnWord = useCallback((currentLevel: number) => {
    const difficulty = currentLevel === 1 ? "easy" : currentLevel === 2 ? "medium" : "hard";
    const wordText = getRandomWord(difficulty);
    const newWord: FallingWordItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      text: wordText,
      xPercent: Math.floor(10 + Math.random() * 70),
      yPercent: 0,
      speed: 0.08 + currentLevel * 0.04, // Speed scales with level
      typedLength: 0,
    };

    setWords((prev) => [...prev, newWord]);
  }, []);

  // Main game animation tick
  useEffect(() => {
    if (status !== "playing") {
      stopGameLoop();
      return;
    }

    // Spawning interval
    const spawnIntervalMs = Math.max(1200, 2800 - level * 300);
    spawnTimerRef.current = setInterval(() => {
      setWords((currentWords) => {
        if (currentWords.length < 5) {
          spawnWord(level);
        }
        return currentWords;
      });
    }, spawnIntervalMs);

    // Animation frame tick
    const updatePositions = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = Math.min((time - lastTimeRef.current) / 16.66, 3); // Normalize to 60fps

        setWords((prevWords) => {
          let lifeLost = false;
          let lostWordId: string | null = null;

          const updated = prevWords.map((item) => {
            const nextY = item.yPercent + item.speed * delta;
            if (nextY >= 90 && !lifeLost) {
              lifeLost = true;
              lostWordId = item.id;
            }
            return { ...item, yPercent: nextY };
          });

          if (lifeLost && lostWordId) {
            setLives((prevLives) => {
              const newLives = prevLives - 1;
              if (newLives <= 0) {
                endGame(score, level, accuracy);
              }
              return newLives;
            });
            setActiveWordId((prevActive) => (prevActive === lostWordId ? null : prevActive));
            return updated.filter((w) => w.id !== lostWordId);
          }

          return updated;
        });
      }

      lastTimeRef.current = time;
      if (status === "playing") {
        animFrameRef.current = requestAnimationFrame(updatePositions);
      }
    };

    animFrameRef.current = requestAnimationFrame(updatePositions);

    return () => {
      stopGameLoop();
    };
  }, [status, level, score, accuracy, spawnWord, endGame, stopGameLoop]);

  // Handle keyboard key typed directly by user
  const processKeyInput = useCallback(
    (charKey: string) => {
      if (status !== "playing") return;

      if (charKey === "Backspace") {
        if (activeWordId) {
          setWords((prev) =>
            prev.map((w) => (w.id === activeWordId ? { ...w, typedLength: Math.max(0, w.typedLength - 1) } : w))
          );
        }
        return;
      }

      if (charKey.length > 1) return; // Ignore Shift, Control, etc.

      setTotalTypedChars((prev) => prev + 1);

      setWords((prevWords) => {
        let currentTarget = prevWords.find((w) => w.id === activeWordId);

        // If no active target, pick the lowest word whose next char matches
        if (!currentTarget) {
          const candidates = prevWords
            .filter((w) => w.text[0] === charKey)
            .sort((a, b) => b.yPercent - a.yPercent);
          if (candidates.length > 0) {
            currentTarget = candidates[0];
            setActiveWordId(currentTarget.id);
          }
        }

        if (!currentTarget) return prevWords;

        const expectedChar = currentTarget.text[currentTarget.typedLength];
        if (charKey === expectedChar) {
          setCorrectTypedChars((prev) => prev + 1);
          const nextTyped = currentTarget.typedLength + 1;

          // Word completely typed!
          if (nextTyped >= currentTarget.text.length) {
            const addedPoints = calculateFallingWordsPoints(currentTarget.text.length, level);
            setScore((prevScore) => prevScore + addedPoints);
            setWordsCompleted((prevCount) => {
              const newCount = prevCount + 1;
              if (newCount % 5 === 0) {
                setLevel((prevLvl) => prevLvl + 1);
              }
              return newCount;
            });
            setActiveWordId(null);
            return prevWords.filter((w) => w.id !== currentTarget!.id);
          } else {
            // Advance typed length for target word
            return prevWords.map((w) =>
              w.id === currentTarget!.id ? { ...w, typedLength: nextTyped } : w
            );
          }
        } else {
          // Mismatch character typed
          return prevWords;
        }
      });
    },
    [status, activeWordId, level]
  );

  // Global physical keydown listener
  useEffect(() => {
    if (status !== "playing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Tab") {
        e.preventDefault();
      }
      processKeyInput(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, processKeyInput]);

  const startGame = useCallback(() => {
    stopGameLoop();
    setWords([]);
    setActiveWordId(null);
    setLives(3);
    setLevel(1);
    setScore(0);
    setWordsCompleted(0);
    setTotalTypedChars(0);
    setCorrectTypedChars(0);
    setIsNewBest(false);
    lastTimeRef.current = null;
    setStatus("playing");
    spawnWord(1);
  }, [spawnWord, stopGameLoop]);

  return {
    status,
    lives,
    level,
    score,
    wordsCompleted,
    accuracy,
    words,
    activeWordId,
    isNewBest,
    bestScore: storedBestScore,
    startGame,
    processKeyInput,
  };
}
