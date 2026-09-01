"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Medal, Award } from "lucide-react";
import {
  TypingLeaderboardEntry,
  GameLeaderboardEntry,
  StreakLeaderboardEntry,
} from "@/lib/supabase/leaderboardService";

interface LeaderboardTableProps {
  category: "typing" | "games" | "streaks";
  typingEntries: TypingLeaderboardEntry[];
  gameEntries: GameLeaderboardEntry[];
  streakEntries: StreakLeaderboardEntry[];
  currentUserDisplayName?: string | null;
  loading?: boolean;
}

export function LeaderboardTable({
  category,
  typingEntries,
  gameEntries,
  streakEntries,
  currentUserDisplayName,
  loading = false,
}: LeaderboardTableProps) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-12 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-800 rounded w-1/4 mx-auto" />
          <div className="h-8 bg-slate-800/60 rounded max-w-md mx-auto" />
          <div className="h-8 bg-slate-800/40 rounded max-w-md mx-auto" />
        </div>
      </div>
    );
  }

  const renderRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 font-bold border border-amber-500/40 shadow-md shadow-amber-500/10">
          <Trophy className="h-4 w-4" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-300/20 text-slate-300 font-bold border border-slate-300/40">
          <Medal className="h-4 w-4" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-700/20 text-amber-600 font-bold border border-amber-700/40">
          <Award className="h-4 w-4" />
        </div>
      );
    }
    return (
      <span className="font-mono text-xs text-slate-400 font-bold w-8 text-center">
        #{rank}
      </span>
    );
  };

  const isTyping = category === "typing";
  const isGames = category === "games";
  const isStreaks = category === "streaks";

  const entriesCount = isTyping
    ? typingEntries.length
    : isGames
    ? gameEntries.length
    : streakEntries.length;

  if (entriesCount === 0) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-12 text-center space-y-3">
        <Trophy className="h-10 w-10 text-slate-600 mx-auto" />
        <h3 className="text-lg font-bold text-white">No Cloud Scores Yet</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Be the first authenticated typist to submit a score to the global leaderboard!
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="border-b border-slate-800 bg-slate-950/80 text-xs uppercase font-mono tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="py-4 px-4 sm:px-6 w-16 text-center">Rank</th>
              <th scope="col" className="py-4 px-4 sm:px-6">Typist</th>
              <th scope="col" className="py-4 px-4 sm:px-6 text-right">
                {isTyping ? "Speed" : isGames ? "High Score" : "Current Streak"}
              </th>
              <th scope="col" className="py-4 px-4 sm:px-6 text-right">
                {isTyping ? "Accuracy" : isGames ? "Secondary Metric" : "Longest Streak"}
              </th>
              <th scope="col" className="py-4 px-4 sm:px-6 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {isTyping &&
              typingEntries.map((entry, idx) => {
                const isCurrentUser =
                  currentUserDisplayName &&
                  entry.display_name.toLowerCase() === currentUserDisplayName.toLowerCase();
                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isCurrentUser ? "bg-indigo-600/10 hover:bg-indigo-600/20" : "hover:bg-slate-800/40"
                    }`}
                  >
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <div className="flex justify-center">{renderRankBadge(idx + 1)}</div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600/20 text-indigo-400 font-mono text-xs border border-indigo-500/30">
                          {entry.display_name.charAt(0).toUpperCase()}
                        </div>
                        <Link
                          href={`/user/${encodeURIComponent(entry.username ?? entry.display_name)}`}
                          className="hover:text-indigo-400 transition-colors"
                        >
                          {entry.display_name}
                        </Link>
                        {isCurrentUser && (
                          <span className="rounded bg-indigo-500/20 border border-indigo-500/30 px-1.5 py-0.5 text-[10px] font-mono text-indigo-300">
                            YOU
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right font-mono font-extrabold text-white text-base">
                      {entry.wpm} <span className="text-xs text-indigo-400">WPM</span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right font-mono text-emerald-400">
                      {entry.accuracy}%
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right font-mono text-xs text-slate-400">
                      {entry.date}
                    </td>
                  </tr>
                );
              })}

            {isGames &&
              gameEntries.map((entry, idx) => {
                const isCurrentUser =
                  currentUserDisplayName &&
                  entry.display_name.toLowerCase() === currentUserDisplayName.toLowerCase();
                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isCurrentUser ? "bg-sky-600/10 hover:bg-sky-600/20" : "hover:bg-slate-800/40"
                    }`}
                  >
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <div className="flex justify-center">{renderRankBadge(idx + 1)}</div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600/20 text-sky-400 font-mono text-xs border border-sky-500/30">
                          {entry.display_name.charAt(0).toUpperCase()}
                        </div>
                        <Link
                          href={`/user/${encodeURIComponent(entry.username ?? entry.display_name)}`}
                          className="hover:text-sky-400 transition-colors"
                        >
                          {entry.display_name}
                        </Link>
                        {isCurrentUser && (
                          <span className="rounded bg-sky-500/20 border border-sky-500/30 px-1.5 py-0.5 text-[10px] font-mono text-sky-300">
                            YOU
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right font-mono font-extrabold text-white text-base">
                      {entry.best_score} <span className="text-xs text-sky-400">pts</span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right font-mono text-slate-300 text-xs">
                      {entry.game_id === "falling_words"
                        ? `Level ${entry.metric_value}`
                        : `${entry.metric_value} WPM (${entry.best_accuracy}%)`}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right font-mono text-xs text-slate-400">
                      Global
                    </td>
                  </tr>
                );
              })}

            {isStreaks &&
              streakEntries.map((entry, idx) => {
                const isCurrentUser =
                  currentUserDisplayName &&
                  entry.display_name.toLowerCase() === currentUserDisplayName.toLowerCase();
                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isCurrentUser ? "bg-amber-600/10 hover:bg-amber-600/20" : "hover:bg-slate-800/40"
                    }`}
                  >
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <div className="flex justify-center">{renderRankBadge(idx + 1)}</div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600/20 text-amber-400 font-mono text-xs border border-amber-500/30">
                          {entry.display_name.charAt(0).toUpperCase()}
                        </div>
                        <Link
                          href={`/user/${encodeURIComponent(entry.username ?? entry.display_name)}`}
                          className="hover:text-amber-400 transition-colors"
                        >
                          {entry.display_name}
                        </Link>
                        {isCurrentUser && (
                          <span className="rounded bg-amber-500/20 border border-amber-500/30 px-1.5 py-0.5 text-[10px] font-mono text-amber-300">
                            YOU
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right font-mono font-extrabold text-white text-base">
                      {entry.current_streak} <span className="text-xs text-amber-400">Days</span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right font-mono text-amber-400 text-xs">
                      {entry.longest_streak} Days Max
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right font-mono text-xs text-slate-400">
                      {entry.last_completed_date || "—"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
