"use client";

import React from "react";
import { useWordSprint } from "@/hooks/games/useWordSprint";
import { GameHeader } from "@/components/games/GameHeader";
import { GameResults } from "@/components/games/GameResults";
import { WordInput } from "@/components/games/WordInput";
import { Zap, Target, Trophy, Clock, Play } from "lucide-react";

export default function WordSprintPage() {
  const {
    status,
    duration,
    timeLeft,
    currentWord,
    inputVal,
    score,
    wordsTypedCount,
    wpm,
    accuracy,
    isNewBest,
    bestScore,
    setDurationMode,
    startGame,
    handleInputChange,
  } = useWordSprint(30);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 sm:py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <GameHeader
          title="Word Sprint"
          subtitle="How many words can you type before time runs out?"
          badgeText="Speed Drill"
          metrics={
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-6 font-mono">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="h-4 w-4 text-amber-400" />
                  <span>Time: <strong className="text-white text-sm">{timeLeft}s</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Zap className="h-4 w-4 text-indigo-400" />
                  <span>WPM: <strong className="text-indigo-400 text-sm">{wpm}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Target className="h-4 w-4 text-emerald-400" />
                  <span>Accuracy: <strong className="text-emerald-400 text-sm">{accuracy}%</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono">
                <Trophy className="h-4 w-4 text-amber-400" />
                <span className="text-slate-400">Score:</span>
                <strong className="text-xl text-white font-extrabold">{score}</strong>
              </div>
            </div>
          }
        />

        {/* 1. START SCREEN */}
        {status === "idle" && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 sm:p-12 text-center shadow-2xl space-y-6 backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2">
              <Zap className="h-8 w-8" />
            </div>

            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready for Word Sprint?
            </h2>

            <p className="max-w-md mx-auto text-sm sm:text-base text-slate-300">
              Type as many individual words as you can before the clock reaches zero.
            </p>

            {/* Rules checklist */}
            <div className="max-w-md mx-auto rounded-2xl border border-slate-800 bg-slate-950 p-4 text-left space-y-2 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-amber-400">⚡</span> Each completed word = +10 base points
              </div>
              <div className="flex items-center gap-2">
                <span className="text-indigo-400">📈</span> Higher WPM adds bonus points
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">🎯</span> Accuracy tracks typed character precision
              </div>
            </div>

            {/* Duration Selector */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="text-xs font-semibold text-slate-400">Duration:</span>
              <button
                type="button"
                onClick={() => setDurationMode(30)}
                className={`rounded-xl px-4 py-2 text-xs font-bold font-mono transition-all ${
                  duration === 30
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                30 Seconds
              </button>
              <button
                type="button"
                onClick={() => setDurationMode(60)}
                className={`rounded-xl px-4 py-2 text-xs font-bold font-mono transition-all ${
                  duration === 60
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                60 Seconds
              </button>
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
        {status === "playing" && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 sm:p-12 text-center shadow-2xl space-y-8 backdrop-blur-xl">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider">
                Type this word:
              </span>
              <div className="text-4xl sm:text-6xl font-extrabold font-mono text-indigo-400 tracking-wider drop-shadow-md">
                {currentWord}
              </div>
            </div>

            {/* Input area */}
            <div className="max-w-md mx-auto">
              <WordInput
                value={inputVal}
                onChange={handleInputChange}
                placeholder="Type here..."
                autoFocus
              />
            </div>
          </div>
        )}

        {/* 3. GAME OVER RESULTS SCREEN */}
        {status === "completed" && (
          <GameResults
            title="Sprint Finished!"
            score={score}
            wpm={wpm}
            accuracy={accuracy}
            bestScore={bestScore?.bestScore}
            isNewBest={isNewBest}
            extraStatLabel="Words Typed"
            extraStatValue={wordsTypedCount}
            onPlayAgain={startGame}
          />
        )}
      </div>
    </div>
  );
}
