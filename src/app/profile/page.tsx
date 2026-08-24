"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, Cloud, RefreshCw, ShieldCheck, ArrowRight, LogIn, Sparkles } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, isSyncing, signOut, syncNow } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400 text-sm font-mono">
          <RefreshCw className="h-5 w-5 animate-spin text-indigo-400" />
          <span>Loading user profile...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 text-center">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 sm:p-12 shadow-2xl backdrop-blur-xl max-w-lg w-full space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mb-2">
            <Cloud className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400">
              <Sparkles className="h-3.5 w-3.5" /> Optional Cloud Sync
            </div>
            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
              Cloud Backup & Sync
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Create an optional account or sign in to sync your touch typing speed, completed lessons, game high scores, and daily streaks across all your devices.
            </p>
            <p className="text-xs text-emerald-400 font-mono pt-1">
              ✨ All typing lessons, practice drills, and games remain 100% free and fully usable without an account!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/auth/login"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95"
            >
              <LogIn className="h-4 w-4" /> Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700"
            >
              Create Account
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <Link
              href="/practice"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Continue typing without an account →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const displayName = user.user_metadata?.display_name || user.email?.split("@")[0] || "Typist";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white text-2xl font-bold shadow-lg shadow-indigo-600/30 font-mono">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white">{displayName}</h1>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{user.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={async () => {
                await signOut();
                router.push("/");
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-all self-start sm:self-auto"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>

          {/* Sync Status Banner */}
          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/30 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Cloud className="h-6 w-6 text-indigo-400 shrink-0" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Cloud Progress Synchronization Active
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Your typing records are backed up to Supabase Cloud Storage.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={syncNow}
              disabled={isSyncing}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-indigo-500 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Syncing..." : "Sync Now"}</span>
            </button>
          </div>

          {/* Quick Nav Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Link
              href="/progress"
              className="rounded-2xl border border-slate-800 bg-slate-950 p-4 flex items-center justify-between hover:border-indigo-500/50 transition-all"
            >
              <span className="text-xs font-bold text-white">View Performance Progress</span>
              <ArrowRight className="h-4 w-4 text-indigo-400" />
            </Link>
            <Link
              href="/learn"
              className="rounded-2xl border border-slate-800 bg-slate-950 p-4 flex items-center justify-between hover:border-indigo-500/50 transition-all"
            >
              <span className="text-xs font-bold text-white">Continue Lessons</span>
              <ArrowRight className="h-4 w-4 text-indigo-400" />
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Row Level Security (RLS) protects your cloud records. Only you can view or modify your data.</span>
        </div>
      </div>
    </div>
  );
}
