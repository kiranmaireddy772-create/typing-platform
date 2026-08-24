"use client";

import React from "react";
import { Zap, Target, AlertTriangle, CheckCircle2, Clock, RefreshCw, Trophy, Sparkles } from "lucide-react";

interface TypingResultsProps {
  wpm: number;
  accuracy: number;
  errorCount: number;
  correctCount: number;
  duration: number;
  isNewPersonalBest: boolean;
  onTryAgain: () => void;
}

export function TypingResults({
  wpm,
  accuracy,
  errorCount,
  correctCount,
  duration,
  isNewPersonalBest,
  onTryAgain,
}: TypingResultsProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/95 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
        {/* Personal Best Banner */}
        {isNewPersonalBest && (
          <div className="mb-6 flex items-center justify-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-amber-400 font-semibold text-sm animate-bounce shadow-md">
            <Trophy className="h-5 w-5 text-amber-400 shrink-0" />
            <span>🎉 New Personal Best! You reached {wpm} WPM!</span>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" /> Test Completed
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Practice Results
          </h2>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* WPM Card */}
          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-5 text-center shadow-lg">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              <Zap className="h-4 w-4 text-amber-400" /> Speed
            </div>
            <div className="mt-2 text-4xl sm:text-5xl font-extrabold font-mono text-white">
              {wpm}
            </div>
            <div className="text-xs text-slate-400 mt-1">Words Per Minute</div>
          </div>

          {/* Accuracy Card */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center shadow-lg">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Target className="h-4 w-4 text-emerald-400" /> Accuracy
            </div>
            <div className="mt-2 text-4xl sm:text-5xl font-extrabold font-mono text-emerald-400">
              {accuracy}%
            </div>
            <div className="text-xs text-slate-400 mt-1">Precision Rate</div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 mb-8 grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <div className="flex items-center justify-center gap-1 text-slate-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Correct Chars
            </div>
            <div className="mt-1 text-lg font-bold font-mono text-white">
              {correctCount}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-slate-400">
              <AlertTriangle className="h-3.5 w-3.5 text-rose-400" /> Errors
            </div>
            <div className="mt-1 text-lg font-bold font-mono text-rose-400">
              {errorCount}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-slate-400">
              <Clock className="h-3.5 w-3.5 text-indigo-400" /> Duration
            </div>
            <div className="mt-1 text-lg font-bold font-mono text-white">
              {duration}s
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onTryAgain}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 active:scale-95 transition-all"
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </button>
          <button
            type="button"
            onClick={onTryAgain}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 active:scale-95 transition-all"
          >
            Practice Again
          </button>
        </div>
      </div>
    </div>
  );
}
