"use client";

import React from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { LogIn, Sparkles, ShieldCheck } from "lucide-react";

interface UserRankCardProps {
  user: User | null;
}

export function UserRankCard({ user }: UserRankCardProps) {
  if (user) {
    const displayName = user.user_metadata?.display_name || user.email?.split("@")[0] || "Typist";
    return (
      <div className="rounded-3xl border border-indigo-500/30 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white font-mono text-xl font-bold shadow-lg shadow-indigo-600/30">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white">{displayName}</span>
              <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                Cloud Sync Active
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Your new personal bests and high scores submit automatically to the global leaderboard.
            </p>
          </div>
        </div>

        <Link
          href="/profile"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-all self-start sm:self-auto"
        >
          View Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-indigo-950/30 via-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div className="space-y-2 max-w-xl">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
          <Sparkles className="h-3.5 w-3.5" /> Optional Cloud Account
        </div>
        <h3 className="text-lg sm:text-xl font-extrabold text-white">
          Join the Global Leaderboard
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Sign in or create an optional free account to submit your typing speed records, arcade game scores, and daily streaks to the global hall of fame.
        </p>
        <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono pt-1">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>All typing tests and local scores remain 100% usable without logging in.</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/auth/login"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95"
        >
          <LogIn className="h-4 w-4" /> Sign In
        </Link>
        <Link
          href="/auth/signup"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-all"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
