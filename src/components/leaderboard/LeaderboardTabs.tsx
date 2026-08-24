"use client";

import React from "react";
import { Zap, Gamepad2, Flame } from "lucide-react";

export type LeaderboardCategory = "typing" | "games" | "streaks";
export type TypingDuration = 15 | 30 | 60;
export type GameId = "word_sprint" | "falling_words" | "accuracy";

interface LeaderboardTabsProps {
  category: LeaderboardCategory;
  onCategoryChange: (cat: LeaderboardCategory) => void;
  typingDuration: TypingDuration;
  onTypingDurationChange: (dur: TypingDuration) => void;
  gameId: GameId;
  onGameIdChange: (game: GameId) => void;
}

export function LeaderboardTabs({
  category,
  onCategoryChange,
  typingDuration,
  onTypingDurationChange,
  gameId,
  onGameIdChange,
}: LeaderboardTabsProps) {
  return (
    <div className="space-y-4">
      {/* Primary Category Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl">
        <button
          type="button"
          onClick={() => onCategoryChange("typing")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            category === "typing"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <Zap className="h-4 w-4" />
          <span>Typing Speed</span>
        </button>

        <button
          type="button"
          onClick={() => onCategoryChange("games")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            category === "games"
              ? "bg-sky-600 text-white shadow-lg shadow-sky-600/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <Gamepad2 className="h-4 w-4" />
          <span>Arcade Games</span>
        </button>

        <button
          type="button"
          onClick={() => onCategoryChange("streaks")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            category === "streaks"
              ? "bg-amber-600 text-white shadow-lg shadow-amber-600/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <Flame className="h-4 w-4" />
          <span>Daily Streaks</span>
        </button>
      </div>

      {/* Sub-Category Selector */}
      {category === "typing" && (
        <div className="flex items-center justify-center gap-2">
          {([15, 30, 60] as TypingDuration[]).map((dur) => (
            <button
              key={dur}
              type="button"
              onClick={() => onTypingDurationChange(dur)}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                typingDuration === dur
                  ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/40"
                  : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {dur} Seconds
            </button>
          ))}
        </div>
      )}

      {category === "games" && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {(
            [
              { id: "word_sprint", label: "Word Sprint" },
              { id: "falling_words", label: "Falling Words" },
              { id: "accuracy", label: "Accuracy Challenge" },
            ] as { id: GameId; label: string }[]
          ).map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => onGameIdChange(g.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                gameId === g.id
                  ? "bg-sky-500/20 text-sky-400 border border-sky-500/40"
                  : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
