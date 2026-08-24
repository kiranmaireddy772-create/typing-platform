"use client";

import React from "react";
import { Clock, Zap, Target, SlidersHorizontal, Award } from "lucide-react";
import { Difficulty } from "@/data/typing-texts";

interface TypingHeaderProps {
  status: "idle" | "typing" | "completed";
  selectedDuration: number;
  selectedDifficulty: Difficulty;
  timeLeft: number;
  wpm: number;
  accuracy: number;
  bestWpm: number | undefined;
  onSelectDuration: (duration: number) => void;
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

export function TypingHeader({
  status,
  selectedDuration,
  selectedDifficulty,
  timeLeft,
  wpm,
  accuracy,
  bestWpm,
  onSelectDuration,
  onSelectDifficulty,
}: TypingHeaderProps) {
  const durations = [15, 30, 60];
  const difficulties: Difficulty[] = ["beginner", "intermediate", "advanced"];

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 p-4 sm:p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Practice Mode Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Duration Selector */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-950 p-1">
            <Clock className="ml-2.5 h-3.5 w-3.5 text-slate-400" />
            {durations.map((d) => (
              <button
                key={d}
                type="button"
                disabled={status === "typing"}
                onClick={() => onSelectDuration(d)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold font-mono transition-all ${
                  selectedDuration === d
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                } ${status === "typing" ? "cursor-not-allowed opacity-60" : ""}`}
              >
                {d}s
              </button>
            ))}
          </div>

          {/* Difficulty Selector */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-950 p-1">
            <SlidersHorizontal className="ml-2.5 h-3.5 w-3.5 text-slate-400" />
            {difficulties.map((diff) => (
              <button
                key={diff}
                type="button"
                disabled={status === "typing"}
                onClick={() => onSelectDifficulty(diff)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                  selectedDifficulty === diff
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                } ${status === "typing" ? "cursor-not-allowed opacity-60" : ""}`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrics Display */}
        <div className="flex items-center justify-between gap-4 md:justify-end">
          {/* Timer Display */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2">
            <Clock className="h-4 w-4 text-indigo-400 animate-pulse" />
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Time
              </div>
              <div className="text-xl font-bold font-mono text-white leading-none">
                {timeLeft}s
              </div>
            </div>
          </div>

          {/* WPM Display */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2">
            <Zap className="h-4 w-4 text-amber-400" />
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                WPM
              </div>
              <div className="text-xl font-bold font-mono text-amber-400 leading-none">
                {wpm}
              </div>
            </div>
          </div>

          {/* Accuracy Display */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2">
            <Target className="h-4 w-4 text-emerald-400" />
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Accuracy
              </div>
              <div className="text-xl font-bold font-mono text-emerald-400 leading-none">
                {accuracy}%
              </div>
            </div>
          </div>

          {/* Personal Best Badge */}
          {bestWpm !== undefined && (
            <div className="hidden sm:flex items-center gap-2 rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-3 py-2 text-indigo-300">
              <Award className="h-4 w-4 text-indigo-400" />
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">
                  Best
                </div>
                <div className="text-sm font-bold font-mono text-white leading-none">
                  {bestWpm} WPM
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
