"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Sparkles, RefreshCw, ArrowLeft } from "lucide-react";

interface GameResultsProps {
  title?: string;
  score: number;
  wpm?: number;
  accuracy: number;
  bestScore?: number | null;
  isNewBest: boolean;
  extraStatLabel?: string;
  extraStatValue?: string | number;
  onPlayAgain: () => void;
}

export function GameResults({
  title = "Game Over!",
  score,
  wpm,
  accuracy,
  bestScore,
  isNewBest,
  extraStatLabel,
  extraStatValue,
  onPlayAgain,
}: GameResultsProps) {
  return (
    <div className="rounded-3xl border border-indigo-500/30 bg-slate-900/95 p-8 sm:p-12 text-center shadow-2xl space-y-6 backdrop-blur-xl animate-fade-in max-w-xl mx-auto">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2">
        <Trophy className="h-8 w-8" />
      </div>

      {isNewBest ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400">
          <Sparkles className="h-4 w-4" /> 🎉 New Personal Best!
        </div>
      ) : (
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-1.5 text-xs font-semibold text-slate-300">
          Challenge Complete
        </div>
      )}

      <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
        {title}
      </h2>

      {/* Main Score Box */}
      <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-6 max-w-sm mx-auto">
        <div className="text-xs uppercase font-bold text-indigo-400 tracking-wider">Final Score</div>
        <div className="mt-1 text-5xl font-extrabold font-mono text-white">
          {score}
        </div>
        {bestScore !== undefined && bestScore !== null && (
          <div className="mt-2 text-xs text-slate-400 font-mono">
            Best Score: <strong className="text-amber-400">{Math.max(score, bestScore)}</strong>
          </div>
        )}
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6">
        {wpm !== undefined && (
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
            <div className="text-[10px] uppercase font-bold text-slate-400">Speed</div>
            <div className="text-lg font-bold font-mono text-white">{wpm} WPM</div>
          </div>
        )}

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
          <div className="text-[10px] uppercase font-bold text-slate-400">Accuracy</div>
          <div className="text-lg font-bold font-mono text-emerald-400">{accuracy}%</div>
        </div>

        {extraStatLabel && extraStatValue !== undefined && (
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 col-span-2 sm:col-span-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">{extraStatLabel}</div>
            <div className="text-lg font-bold font-mono text-sky-400">{extraStatValue}</div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          type="button"
          onClick={onPlayAgain}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Play Again</span>
        </button>

        <Link
          href="/games"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Games</span>
        </Link>
      </div>
    </div>
  );
}
