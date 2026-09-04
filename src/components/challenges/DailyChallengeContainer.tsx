"use client";

import React, { useState, useEffect } from "react";
import { useDailyChallenge } from "@/hooks/challenges/useDailyChallenge";
import { ChallengeHeader } from "./ChallengeHeader";
import { StreakCard } from "./StreakCard";
import { DailyHistory } from "./DailyHistory";
import { ChallengeResults } from "./ChallengeResults";
import { TypingText } from "@/components/typing/TypingText";
import { TypingKeyboard } from "@/components/typing/TypingKeyboard";
import { DailyResult } from "@/lib/challenges/challengeStorage";
import { Flame, Play, Clock, Target, Zap, AlertTriangle, RefreshCw, Sparkles } from "lucide-react";

export function DailyChallengeContainer() {
  const {
    todayKey,
    passage,
    engine,
    store,
    todayResult,
    saveCurrentResult,
  } = useDailyChallenge();

  const [saveInfo, setSaveInfo] = useState<{ isNewBestScore: boolean; result: DailyResult } | null>(null);

  // Defer completion state synchronization to microtask queue to avoid synchronous effect cascading
  useEffect(() => {
    if (engine.status === "completed" && !saveInfo) {
      Promise.resolve().then(() => {
        const info = saveCurrentResult();
        setSaveInfo({ isNewBestScore: info.isNewBestScore, result: info.result });
      });
    }
  }, [engine.status, saveInfo, saveCurrentResult]);

  const handleStart = () => {
    setSaveInfo(null);
    engine.restartTest();
    engine.startTest();
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Top Header */}
      <ChallengeHeader />

      {/* 1. IDLE / DASHBOARD OVERVIEW SCREEN */}
      {engine.status === "idle" && (
        <div className="space-y-8">
          {/* Streak & History Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StreakCard
              currentStreak={store.currentStreak}
              longestStreak={store.longestStreak}
              isTodayCompleted={!!todayResult?.completed}
            />
            <DailyHistory dailyResults={store.dailyResults} />
          </div>

          {/* Today's Challenge Main Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-10 shadow-2xl space-y-6 backdrop-blur-xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2">
              <Flame className="h-8 w-8" />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400 font-mono">
              📅 {todayKey} • {passage.category}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {passage.title}
            </h2>

            <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              &ldquo;{passage.text}&rdquo;
            </p>

            {/* Target Metrics */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-amber-400" /> Duration: <strong className="text-white">60 Seconds</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Target className="h-4 w-4 text-emerald-400" /> Target: <strong className="text-emerald-400">{passage.targetWpm}+ WPM</strong>
              </span>
            </div>

            {/* Today Result Summary Banner if completed */}
            {todayResult && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 max-w-md mx-auto space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-center gap-1.5">
                  <Sparkles className="h-4 w-4" /> Today&apos;s Best Result
                </div>
                <div className="flex justify-around text-xs font-mono text-slate-200">
                  <span>Score: <strong className="text-white text-sm">{todayResult.score}</strong></span>
                  <span>WPM: <strong className="text-indigo-400 text-sm">{todayResult.wpm}</strong></span>
                  <span>Accuracy: <strong className="text-emerald-400 text-sm">{todayResult.accuracy}%</strong></span>
                </div>
              </div>
            )}

            {/* Action CTA */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleStart}
                className="inline-flex items-center gap-2.5 rounded-xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95"
              >
                {todayResult ? (
                  <>
                    <RefreshCw className="h-5 w-5" />
                    <span>Retry Challenge</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 fill-current" />
                    <span>Start Daily Challenge</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. TYPING IN PROGRESS SCREEN */}
      {engine.status === "typing" && (
        <div className="space-y-6">
          {/* Header Live HUD */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Clock className="h-4 w-4 text-amber-400" />
                <span>Time: <strong className="text-white text-sm">{engine.timeLeft}s</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Zap className="h-4 w-4 text-indigo-400" />
                <span>WPM: <strong className="text-indigo-400 text-sm">{engine.wpm}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Target className="h-4 w-4 text-emerald-400" />
                <span>Accuracy: <strong className="text-emerald-400 text-sm">{engine.accuracy}%</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <AlertTriangle className="h-4 w-4 text-rose-400" />
                <span>Errors: <strong className="text-rose-400 text-sm">{engine.errorCount}</strong></span>
              </div>
            </div>

            {/* Progress Bar Pill */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-slate-400">Progress:</span>
              <div className="w-32 h-2.5 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-150 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.round((engine.currentIndex / passage.text.length) * 100)
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Typing Text Display */}
          <TypingText
            text={passage.text}
            charStates={engine.charStates}
            currentIndex={engine.currentIndex}
            status={engine.status}
          />

          {/* Active Virtual Keyboard */}
          <div className="flex justify-center pt-2">
            <TypingKeyboard
              expectedKey={engine.expectedKey}
              pressedKey={engine.pressedKey}
              onKeyPress={engine.handleVirtualKeyPress}
            />
          </div>
        </div>
      )}

      {/* 3. COMPLETED RESULTS SCREEN */}
      {engine.status === "completed" && (
        <ChallengeResults
          score={saveInfo?.result.score || todayResult?.score || 0}
          wpm={engine.wpm}
          accuracy={engine.accuracy}
          errors={engine.errorCount}
          streak={store.currentStreak}
          bestScore={todayResult?.score}
          isNewBestScore={saveInfo?.isNewBestScore ?? false}
          onRetry={handleStart}
        />
      )}
    </div>
  );
}
