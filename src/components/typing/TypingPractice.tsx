"use client";

import React, { useRef } from "react";
import { useTypingEngine } from "@/hooks/useTypingEngine";
import { Difficulty } from "@/data/typing-texts";
import { TypingHeader } from "./TypingHeader";
import { TypingText } from "./TypingText";
import { TypingKeyboard } from "./TypingKeyboard";
import { TypingControls } from "./TypingControls";
import { TypingResults } from "./TypingResults";

interface TypingPracticeProps {
  initialDuration?: number;
  initialDifficulty?: Difficulty;
  overrideText?: string;
}

export function TypingPractice({
  initialDuration = 30,
  initialDifficulty = "intermediate",
  overrideText,
}: TypingPracticeProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    status,
    selectedDuration,
    selectedDifficulty,
    text,
    charStates,
    currentIndex,
    errorCount,
    correctCount,
    timeLeft,
    wpm,
    accuracy,
    pressedKey,
    isNewPersonalBest,
    personalBest,
    expectedKey,
    setDuration,
    setDifficulty,
    startTest,
    restartTest,
    handleVirtualKeyPress,
  } = useTypingEngine(initialDuration, initialDifficulty, overrideText);

  const focusContainer = () => {
    containerRef.current?.focus();
  };

  return (
    <div
      ref={containerRef}
      className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-8 sm:px-6 lg:px-8 outline-none"
      onClick={focusContainer}
    >
      {/* Header Bar */}
      <TypingHeader
        status={status}
        selectedDuration={selectedDuration}
        selectedDifficulty={selectedDifficulty}
        timeLeft={timeLeft}
        wpm={wpm}
        accuracy={accuracy}
        bestWpm={personalBest?.wpm}
        onSelectDuration={setDuration}
        onSelectDifficulty={setDifficulty}
      />

      {/* Main Typing Display */}
      {status === "completed" ? (
        <TypingResults
          wpm={wpm}
          accuracy={accuracy}
          correctCount={correctCount}
          errorCount={errorCount}
          duration={selectedDuration}
          isNewPersonalBest={isNewPersonalBest}
          onTryAgain={restartTest}
        />
      ) : (
        <>
          <TypingText
            text={text}
            charStates={charStates}
            currentIndex={currentIndex}
            status={status}
            onFocusText={focusContainer}
          />

          <TypingControls
            status={status}
            onStart={startTest}
            onRestart={restartTest}
          />

          <TypingKeyboard
            pressedKey={pressedKey}
            expectedKey={expectedKey}
            onKeyPress={handleVirtualKeyPress}
          />
        </>
      )}
    </div>
  );
}
