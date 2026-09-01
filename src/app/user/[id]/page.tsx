"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/supabaseClient";
import { ACHIEVEMENTS } from "@/lib/achievements/achievementDefs";
import { User, Flame, Zap, Award, ArrowLeft, RefreshCw, ShieldCheck } from "lucide-react";

interface PublicProfileData {
  display_name: string;
  avatar_url: string | null;
  created_at: string;
  pb_15_wpm: number | null;
  pb_15_acc: number | null;
  pb_30_wpm: number | null;
  pb_30_acc: number | null;
  pb_60_wpm: number | null;
  pb_60_acc: number | null;
  current_streak: number;
  longest_streak: number;
  achievements: string[];
}

export default function PublicProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const identifier = resolvedParams.id;

  const [profile, setProfile] = useState<PublicProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isSubscribed = true;

    const fetchPublicProfile = async () => {
      setLoading(true);
      if (!isSupabaseConfigured || !supabase || !identifier) {
        if (isSubscribed) setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc("get_public_profile", {
          p_identifier: decodeURIComponent(identifier),
        });

        if (error) {
          console.error("Error fetching public profile:", error);
        } else if (data && data.length > 0) {
          if (isSubscribed) setProfile(data[0] as PublicProfileData);
        }
      } catch (err) {
        console.error("Failed to query public profile:", err);
      } finally {
        if (isSubscribed) setLoading(false);
      }
    };

    fetchPublicProfile();

    return () => {
      isSubscribed = false;
    };
  }, [identifier]);

  if (loading) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400 text-sm font-mono">
          <RefreshCw className="h-5 w-5 animate-spin text-indigo-400" />
          <span>Loading typist profile...</span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 text-center">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 sm:p-12 shadow-2xl backdrop-blur-xl max-w-md w-full space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 text-slate-400">
            <User className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-white">Profile Not Found</h1>
            <p className="text-xs sm:text-sm text-slate-400">
              No public typist profile exists for &quot;{identifier}&quot;.
            </p>
          </div>

          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500"
          >
            <ArrowLeft className="h-4 w-4" /> Return to Leaderboard
          </Link>
        </div>
      </div>
    );
  }

  const unlockedBadgeIds = profile.achievements || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Back Link */}
        <div>
          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Global Leaderboard
          </Link>
        </div>

        {/* Profile Header Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white text-2xl font-bold shadow-lg shadow-indigo-600/30 font-mono">
                {profile.display_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white">{profile.display_name}</h1>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Member since {profile.created_at || "2026"}
                </p>
              </div>
            </div>

            {/* Streak Pill */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-3 flex items-center gap-3">
              <Flame className="h-6 w-6 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs uppercase font-bold text-amber-400">Daily Streak</div>
                <div className="text-xl font-extrabold font-mono text-white">
                  {profile.current_streak} Days
                </div>
              </div>
            </div>
          </div>

          {/* Practice Records Grid */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-indigo-400" /> Practice Personal Bests
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase">15s Test</div>
                <div className="text-2xl font-extrabold font-mono text-white">
                  {profile.pb_15_wpm ? `${profile.pb_15_wpm} WPM` : "—"}
                </div>
                <div className="text-xs text-emerald-400 font-mono">
                  {profile.pb_15_acc ? `${profile.pb_15_acc}% Acc` : ""}
                </div>
              </div>

              <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/30 p-4 space-y-1">
                <div className="text-xs font-bold text-indigo-400 uppercase">30s Test</div>
                <div className="text-2xl font-extrabold font-mono text-white">
                  {profile.pb_30_wpm ? `${profile.pb_30_wpm} WPM` : "—"}
                </div>
                <div className="text-xs text-emerald-400 font-mono">
                  {profile.pb_30_acc ? `${profile.pb_30_acc}% Acc` : ""}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase">60s Test</div>
                <div className="text-2xl font-extrabold font-mono text-white">
                  {profile.pb_60_wpm ? `${profile.pb_60_wpm} WPM` : "—"}
                </div>
                <div className="text-xs text-emerald-400 font-mono">
                  {profile.pb_60_acc ? `${profile.pb_60_acc}% Acc` : ""}
                </div>
              </div>
            </div>
          </div>

          {/* Unlocked Badges Section */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Award className="h-4 w-4 text-amber-400" />
                <span>Unlocked Achievements ({unlockedBadgeIds.length} / {ACHIEVEMENTS.length})</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ACHIEVEMENTS.map((ach) => {
                const isUnlocked = unlockedBadgeIds.includes(ach.id);
                return (
                  <div
                    key={ach.id}
                    className={`rounded-xl border p-3 flex items-center gap-3 ${
                      isUnlocked
                        ? "border-amber-500/30 bg-slate-950 text-white"
                        : "border-slate-800/60 bg-slate-950/40 opacity-40"
                    }`}
                  >
                    <span className="text-2xl">{ach.icon}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{ach.title}</div>
                      <div className="text-[11px] text-slate-400 truncate">{ach.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Public Profile Security: Only explicitly approved public stats and badges are rendered.</span>
        </div>
      </div>
    </div>
  );
}
