"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { getPersonalBest } from "@/lib/typing/typingStorage";
import { useLessonProgress } from "@/lib/lessons/lessonProgress";
import { getAllGameScores } from "@/lib/games/gameStorage";
import { getDailyChallengeStore } from "@/lib/challenges/challengeStorage";
import { KeyboardHeatmap } from "@/components/analytics/KeyboardHeatmap";
import { AchievementGrid } from "@/components/achievements/AchievementGrid";
import { Trophy, Zap, BookOpen, Flame, Sparkles, ArrowRight, ShieldCheck, Cloud } from "lucide-react";

const emptySubscribe = () => () => {};

export default function ProgressPage() {
  const { user } = useAuth();

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const { stats: lessonStats } = useLessonProgress();

  const pb15 = isMounted ? getPersonalBest(15) : null;
  const pb30 = isMounted ? getPersonalBest(30) : null;
  const pb60 = isMounted ? getPersonalBest(60) : null;

  const gameScores = isMounted ? getAllGameScores() : { wordSprint: null, fallingWords: null, accuracy: null };
  const dailyStore = isMounted ? getDailyChallengeStore() : { currentStreak: 0, longestStreak: 0, dailyResults: {} };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Hero Banner */}
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-indigo-950/40 via-slate-900/90 to-slate-950 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 mb-4">
                <Trophy className="h-3.5 w-3.5" /> Performance Dashboard
              </div>
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
                Your Typing Progress
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Track your speed records, completed curriculum modules, key error analytics, and unlocked milestone badges.
              </p>
            </div>

            {/* Streak Highlights Box */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 shadow-xl space-y-3 w-full lg:w-80">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Flame className="h-4 w-4" /> Active Streak
              </div>
              <div className="text-3xl font-extrabold font-mono text-white">
                {dailyStore.currentStreak} {dailyStore.currentStreak === 1 ? "Day" : "Days"}
              </div>
              <div className="text-xs text-slate-400 font-mono flex justify-between border-t border-amber-500/20 pt-2">
                <span>Longest Streak:</span>
                <strong className="text-amber-400">{dailyStore.longestStreak} Days</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Typing Practice Bests */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <Zap className="h-5 w-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Practice Personal Bests</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-2">
              <div className="text-xs uppercase font-bold text-slate-400">15 Seconds Test</div>
              <div className="text-3xl font-extrabold font-mono text-white">
                {pb15 ? `${pb15.wpm} WPM` : "—"}
              </div>
              <div className="text-xs text-emerald-400 font-mono">
                {pb15 ? `${pb15.accuracy}% Accuracy` : "No test taken yet"}
              </div>
            </div>

            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-6 space-y-2">
              <div className="text-xs uppercase font-bold text-indigo-400">30 Seconds Test</div>
              <div className="text-3xl font-extrabold font-mono text-white">
                {pb30 ? `${pb30.wpm} WPM` : "—"}
              </div>
              <div className="text-xs text-emerald-400 font-mono">
                {pb30 ? `${pb30.accuracy}% Accuracy` : "No test taken yet"}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-2">
              <div className="text-xs uppercase font-bold text-slate-400">60 Seconds Test</div>
              <div className="text-3xl font-extrabold font-mono text-white">
                {pb60 ? `${pb60.wpm} WPM` : "—"}
              </div>
              <div className="text-xs text-emerald-400 font-mono">
                {pb60 ? `${pb60.accuracy}% Accuracy` : "No test taken yet"}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Keyboard Accuracy Heatmap */}
        <section className="pt-2">
          <KeyboardHeatmap />
        </section>

        {/* Section 3: Milestone Achievements Badges */}
        <section className="pt-2">
          <AchievementGrid />
        </section>

        {/* Section 4: Learning System Curriculum Progress */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">Course Curriculum</h2>
            </div>
            <Link
              href="/learn"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              Go to Lessons <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-white">Overall Course Completion</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {lessonStats.totalCompleted} of 15 Lessons Completed
                </div>
              </div>
              <div className="text-2xl font-extrabold font-mono text-indigo-400">
                {lessonStats.overallPercent}%
              </div>
            </div>

            <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${lessonStats.overallPercent}%` }}
              />
            </div>
          </div>
        </section>

        {/* Section 5: Arcade Game High Scores */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-sky-400" />
              <h2 className="text-xl font-bold text-white">Game High Scores</h2>
            </div>
            <Link
              href="/games"
              className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
            >
              Play Games <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
              <div className="text-xs font-bold text-amber-400 uppercase">Word Sprint</div>
              <div className="text-2xl font-extrabold font-mono text-white">
                {gameScores.wordSprint ? `${gameScores.wordSprint.bestScore} pts` : "—"}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {gameScores.wordSprint ? `${gameScores.wordSprint.bestWpm} WPM` : "No game played"}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
              <div className="text-xs font-bold text-sky-400 uppercase">Falling Words</div>
              <div className="text-2xl font-extrabold font-mono text-white">
                {gameScores.fallingWords ? `${gameScores.fallingWords.bestScore} pts` : "—"}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {gameScores.fallingWords ? `Level ${gameScores.fallingWords.highestLevel}` : "No game played"}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase">Accuracy Challenge</div>
              <div className="text-2xl font-extrabold font-mono text-white">
                {gameScores.accuracy ? `${gameScores.accuracy.bestScore} pts` : "—"}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {gameScores.accuracy ? `${gameScores.accuracy.bestAccuracy}% Acc` : "No game played"}
              </div>
            </div>
          </div>
        </section>

        {/* Local Storage / Cloud Sync Status Badge */}
        {user ? (
          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/30 p-4 text-center text-xs text-indigo-300 flex items-center justify-center gap-2">
            <Cloud className="h-4 w-4 text-indigo-400" />
            <span>Cloud Sync Active for <strong>{user.email}</strong>. Progress & Achievements are backed up to Supabase.</span>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>
              All statistics are saved locally in your browser.{" "}
              <Link href="/auth/login" className="text-indigo-400 underline font-semibold hover:text-indigo-300">
                Sign in (Optional)
              </Link>{" "}
              to enable cloud backup across devices.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
