"use client";

import React from "react";
import { useAccuracyChallenge } from "@/hooks/games/useAccuracyChallenge";
import { GameHeader } from "@/components/games/GameHeader";
import { GameResults } from "@/components/games/GameResults";
import { TypingText } from "@/components/typing/TypingText";
import { Target, Zap, Clock, Trophy, AlertTriangle, Play } from "lucide-react";

export default function AccuracyChallengePage() {
  const {
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
    bestScore,
    startGame,
  } = useAccuracyChallenge();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 sm:py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <GameHeader
          title="Accuracy Challenge"
          subtitle="Slow down, stay focused, and aim for perfect precision!"
          badgeText="Precision Drill"
          metrics={
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-6 font-mono">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="h-4 w-4 text-amber-400" />
                  <span>Time: <strong className="text-white text-sm">{timeLeft}s</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Target className="h-4 w-4 text-emerald-400" />
                  <span>Accuracy: <strong className="text-emerald-400 text-sm">{accuracy}%</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <AlertTriangle className="h-4 w-4 text-rose-400" />
                  <span>Errors: <strong className="text-rose-400 text-sm">{errorCount}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Zap className="h-4 w-4 text-indigo-400" />
                  <span>WPM: <strong className="text-indigo-400 text-sm">{wpm}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono">
                <Trophy className="h-4 w-4 text-amber-400" />
                <span className="text-slate-400">Score:</span>
                <strong className="text-xl text-white font-extrabold">{currentScore}</strong>
              </div>
            </div>
          }
        />

        {/* 1. START SCREEN */}
        {status === "idle" && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 sm:p-12 text-center shadow-2xl space-y-6 backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-2">
              <Target className="h-8 w-8" />
            </div>

            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready for Accuracy Challenge?
            </h2>

            <p className="max-w-md mx-auto text-sm sm:text-base text-slate-300">
              Type the precision passage cleanly in 60 seconds. High accuracy yields maximum bonus multiplier points!
            </p>

            {/* Rules checklist */}
            <div className="max-w-md mx-auto rounded-2xl border border-slate-800 bg-slate-950 p-4 text-left space-y-2 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">🎯</span> 100% accuracy = 1000 base bonus points
              </div>
              <div className="flex items-center gap-2">
                <span className="text-indigo-400">⚡</span> 95–99% accuracy = 800 base bonus points
              </div>
              <div className="flex items-center gap-2">
                <span className="text-rose-400">⚠️</span> Each error subtracts points from your total
              </div>
            </div>

            {/* Start CTA */}
            <div className="pt-4">
              <button
                type="button"
                onClick={startGame}
                className="inline-flex items-center gap-2.5 rounded-xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95"
              >
                <Play className="h-5 w-5 fill-current" />
                <span>Start Game</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. PLAYING GAMEPLAY SCREEN */}
        {status === "typing" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>Passage: {passage.title}</span>
              <span>Target WPM: {passage.targetWpm}+</span>
            </div>

            <TypingText
              text={passage.text}
              charStates={charStates}
              currentIndex={currentIndex}
              status={status}
            />
          </div>
        )}

        {/* 3. GAME OVER RESULTS SCREEN */}
        {status === "completed" && (
          <GameResults
            title="Accuracy Challenge Complete!"
            score={currentScore}
            wpm={wpm}
            accuracy={accuracy}
            bestScore={bestScore?.bestScore}
            isNewBest={isNewBest}
            extraStatLabel="Total Errors"
            extraStatValue={errorCount}
            onPlayAgain={startGame}
          />
        )}
      </div>
    </div>
  );
}
