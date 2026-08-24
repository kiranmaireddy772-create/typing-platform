"use client";

import React, { useSyncExternalStore } from "react";
import { GameCard } from "./GameCard";
import { getAllGameScores, EMPTY_GAME_SCORES } from "@/lib/games/gameStorage";
import { Gamepad2, Flame, Sparkles, Target, Zap } from "lucide-react";

function subscribeGameScores(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("typing_game_scores_updated", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("typing_game_scores_updated", onStoreChange);
  };
}

const getServerSnapshot = () => EMPTY_GAME_SCORES;

export function GameDashboard() {
  const scores = useSyncExternalStore(
    subscribeGameScores,
    getAllGameScores,
    getServerSnapshot
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Hero Header Banner */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-indigo-950/40 via-slate-900/90 to-slate-950 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 mb-4">
              <Gamepad2 className="h-3.5 w-3.5" /> Interactive Arcade
            </div>

            <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
              Typing Games
            </h1>

            <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
              Practice your typing skills through fast, fun challenges designed to increase muscle memory, WPM speed, and target accuracy.
            </p>
          </div>

          {/* Quick Summary Pill */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-xl space-y-3 w-full lg:w-80">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Flame className="h-4 w-4 text-amber-400" /> Game Highlights
            </div>
            <div className="space-y-2 text-xs text-slate-300 font-mono">
              <div className="flex justify-between border-b border-slate-900 pb-1.5">
                <span className="text-slate-400">Word Sprint Best:</span>
                <span className="text-indigo-400 font-bold">{scores.wordSprint?.bestScore ?? "—"} pts</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-1.5">
                <span className="text-slate-400">Falling Words High:</span>
                <span className="text-sky-400 font-bold">{scores.fallingWords?.bestScore ?? "—"} pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Accuracy Record:</span>
                <span className="text-emerald-400 font-bold">{scores.accuracy?.bestScore ?? "—"} pts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Game 1: Word Sprint */}
        <GameCard
          id="word-sprint"
          title="Word Sprint"
          description="How many words can you type before time runs out? Fast-paced speed training drill."
          href="/games/word-sprint"
          badge="30s / 60s"
          difficultyText="Easy → Hard"
          icon={<Zap className="h-7 w-7 text-amber-400" />}
          accentColor="bg-amber-500/10 border border-amber-500/20"
          bestScoreText={scores.wordSprint ? `${scores.wordSprint.bestScore} pts` : null}
          bestWpmText={scores.wordSprint ? `${scores.wordSprint.bestWpm} WPM` : null}
        />

        {/* Game 2: Falling Words */}
        <GameCard
          id="falling-words"
          title="Falling Words"
          description="Type the falling words before they reach the bottom of the screen. Watch out for 3 lives!"
          href="/games/falling-words"
          badge="Arcade Survival"
          difficultyText="Speed Scales with Level"
          icon={<Sparkles className="h-7 w-7 text-sky-400" />}
          accentColor="bg-sky-500/10 border border-sky-500/20"
          bestScoreText={scores.fallingWords ? `${scores.fallingWords.bestScore} pts` : null}
          bestWpmText={scores.fallingWords ? `Level ${scores.fallingWords.highestLevel}` : null}
        />

        {/* Game 3: Accuracy Challenge */}
        <GameCard
          id="accuracy"
          title="Accuracy Challenge"
          description="Slow down, stay focused, and aim for perfect accuracy. Precision is heavily rewarded."
          href="/games/accuracy"
          badge="Precision Drill"
          difficultyText="60s Focus Passage"
          icon={<Target className="h-7 w-7 text-emerald-400" />}
          accentColor="bg-emerald-500/10 border border-emerald-500/20"
          bestScoreText={scores.accuracy ? `${scores.accuracy.bestScore} pts` : null}
          bestWpmText={scores.accuracy ? `${scores.accuracy.bestAccuracy}% Acc` : null}
        />
      </div>
    </div>
  );
}
