"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import {
  fetchTypingLeaderboard,
  fetchGameLeaderboard,
  fetchStreakLeaderboard,
  TypingLeaderboardEntry,
  GameLeaderboardEntry,
  StreakLeaderboardEntry,
} from "@/lib/supabase/leaderboardService";
import { LeaderboardTabs, LeaderboardCategory, TypingDuration, GameId } from "@/components/leaderboard/LeaderboardTabs";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { UserRankCard } from "@/components/leaderboard/UserRankCard";
import { getPersonalBest } from "@/lib/typing/typingStorage";
import { getAllGameScores } from "@/lib/games/gameStorage";
import { getDailyChallengeStore } from "@/lib/challenges/challengeStorage";
import { Trophy, Zap, Sparkles, Flame, ShieldCheck, ArrowRight } from "lucide-react";

const emptySubscribe = () => () => {};

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [category, setCategory] = useState<LeaderboardCategory>("typing");
  const [typingDuration, setTypingDuration] = useState<TypingDuration>(30);
  const [gameId, setGameId] = useState<GameId>("word_sprint");

  const [typingEntries, setTypingEntries] = useState<TypingLeaderboardEntry[]>([]);
  const [gameEntries, setGameEntries] = useState<GameLeaderboardEntry[]>([]);
  const [streakEntries, setStreakEntries] = useState<StreakLeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Local scores fallback via useSyncExternalStore
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const pb30 = isMounted ? getPersonalBest(30) : null;
  const pb60 = isMounted ? getPersonalBest(60) : null;
  const gameScores = isMounted ? getAllGameScores() : { wordSprint: null, fallingWords: null, accuracy: null };
  const dailyStore = isMounted ? getDailyChallengeStore() : { currentStreak: 0, longestStreak: 0, dailyResults: {} };

  useEffect(() => {
    let isSubscribed = true;

    const loadData = async () => {
      setLoading(true);
      try {
        if (category === "typing") {
          const data = await fetchTypingLeaderboard(typingDuration);
          if (isSubscribed) setTypingEntries(data);
        } else if (category === "games") {
          const data = await fetchGameLeaderboard(gameId);
          if (isSubscribed) setGameEntries(data);
        } else if (category === "streaks") {
          const data = await fetchStreakLeaderboard();
          if (isSubscribed) setStreakEntries(data);
        }
      } finally {
        if (isSubscribed) setLoading(false);
      }
    };

    loadData();

    return () => {
      isSubscribed = false;
    };
  }, [category, typingDuration, gameId]);

  const currentUserDisplayName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400">
            <Trophy className="h-3.5 w-3.5" /> High Scores & Global Rankings
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Global Leaderboard
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Compete with typists worldwide across speed drills, arcade games, and daily challenge streaks.
          </p>
        </div>

        {/* User Rank / Sign-in Card */}
        <UserRankCard user={user} />

        {/* Leaderboard Category & Duration Tabs */}
        <LeaderboardTabs
          category={category}
          onCategoryChange={setCategory}
          typingDuration={typingDuration}
          onTypingDurationChange={setTypingDuration}
          gameId={gameId}
          onGameIdChange={setGameId}
        />

        {/* Live Leaderboard Table */}
        <LeaderboardTable
          category={category}
          typingEntries={typingEntries}
          gameEntries={gameEntries}
          streakEntries={streakEntries}
          currentUserDisplayName={currentUserDisplayName}
          loading={loading}
        />

        {/* Section: My Local Hall of Fame */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-400" />
              <h2 className="text-xl font-bold text-white">My Local Hall of Fame</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">Saved in Browser</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 30s Practice Score */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-slate-400">30s Practice WPM</div>
                  <div className="text-2xl font-extrabold font-mono text-white">
                    {pb30 ? `${pb30.wpm} WPM` : "—"}
                  </div>
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-mono">
                {pb30 ? `${pb30.accuracy}% Acc` : ""}
              </span>
            </div>

            {/* 60s Practice Score */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-slate-400">60s Practice WPM</div>
                  <div className="text-2xl font-extrabold font-mono text-white">
                    {pb60 ? `${pb60.wpm} WPM` : "—"}
                  </div>
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-mono">
                {pb60 ? `${pb60.accuracy}% Acc` : ""}
              </span>
            </div>

            {/* Word Sprint High Score */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-slate-400">Word Sprint Score</div>
                  <div className="text-2xl font-extrabold font-mono text-white">
                    {gameScores.wordSprint ? `${gameScores.wordSprint.bestScore} pts` : "—"}
                  </div>
                </div>
              </div>
              <span className="text-xs text-indigo-400 font-mono">
                {gameScores.wordSprint ? `${gameScores.wordSprint.bestWpm} WPM` : ""}
              </span>
            </div>

            {/* Daily Streak */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-slate-400">Daily Challenge Streak</div>
                  <div className="text-2xl font-extrabold font-mono text-white">
                    {dailyStore.currentStreak} Days
                  </div>
                </div>
              </div>
              <span className="text-xs text-amber-400 font-mono">
                Max: {dailyStore.longestStreak} Days
              </span>
            </div>
          </div>
        </div>

        {/* Action Link */}
        <div className="text-center pt-4">
          <Link
            href="/challenges"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95"
          >
            <span>Play Today&apos;s Daily Challenge</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Local high scores are saved safely in your web browser. Cloud rankings update automatically for signed-in typists.</span>
        </div>
      </div>
    </div>
  );
}
