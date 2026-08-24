"use client";

import React, { useRef } from "react";
import { useTypingEngine } from "@/hooks/useTypingEngine";
import { TypingHeader } from "./TypingHeader";
import { TypingText } from "./TypingText";
import { TypingKeyboard } from "./TypingKeyboard";
import { TypingControls } from "./TypingControls";
import { TypingResults } from "./TypingResults";

export function TypingPractice() {
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
  } = useTypingEngine(30, "intermediate");

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
      <TypingText
        text={text}
        charStates={charStates}
        currentIndex={currentIndex}
        status={status}
        onFocusText={focusContainer}
      />

      {/* Controls */}
      <TypingControls
        status={status}
        onStart={startTest}
        onRestart={restartTest}
      />

      {/* Interactive Keyboard Visualization */}
      <div className="w-full flex justify-center pt-2">
        <TypingKeyboard
          expectedKey={expectedKey}
          pressedKey={pressedKey}
          onKeyPress={handleVirtualKeyPress}
        />
      </div>

      {/* Results Screen Modal */}
      {status === "completed" && (
        <TypingResults
          wpm={wpm}
          accuracy={accuracy}
          errorCount={errorCount}
          correctCount={correctCount}
          duration={selectedDuration}
          isNewPersonalBest={isNewPersonalBest}
          onTryAgain={restartTest}
        />
      )}
    </div>
  );
}
