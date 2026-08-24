"use client";

import React from "react";
import { Flame, Trophy, CheckCircle2 } from "lucide-react";

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  isTodayCompleted: boolean;
}

export function StreakCard({ currentStreak, longestStreak, isTodayCompleted }: StreakCardProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Flame className="h-7 w-7" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Daily Streak
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {currentStreak} {currentStreak === 1 ? "Day" : "Days"}
            </div>
          </div>
        </div>

        {isTodayCompleted ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="h-4 w-4" /> Today Done
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-400">
            <Flame className="h-4 w-4" /> Active
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
        <span className="flex items-center gap-1">
          <Trophy className="h-3.5 w-3.5 text-amber-400" /> Longest Streak:
          <strong className="text-white font-mono">{longestStreak} Days</strong>
        </span>
        <span>Resets if a day is missed</span>
      </div>
    </div>
  );
}
