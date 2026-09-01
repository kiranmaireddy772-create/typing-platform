"use client";

import React, { useSyncExternalStore } from "react";
import { ACHIEVEMENTS } from "@/lib/achievements/achievementDefs";
import { getUnlockedAchievements } from "@/lib/achievements/achievementStorage";
import { Award, Lock, CheckCircle2 } from "lucide-react";

const emptySubscribe = () => () => {};

export function AchievementGrid() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const unlockedIds = isMounted ? getUnlockedAchievements() : [];
  const unlockedCount = unlockedIds.length;
  const totalCount = ACHIEVEMENTS.length;
  const percentUnlocked = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <Award className="h-5 w-5 text-amber-400" />
            <span>Milestone Achievements</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Unlock badges as you improve speed, master accuracy, and build your typing streak.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-mono">Unlocked</div>
            <div className="text-sm font-bold font-mono text-amber-400">
              {unlockedCount} / {totalCount} ({percentUnlocked}%)
            </div>
          </div>
          <div className="w-24 h-2.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-indigo-500 transition-all duration-500 rounded-full"
              style={{ width: `${percentUnlocked}%` }}
            />
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = unlockedIds.includes(ach.id);
          return (
            <div
              key={ach.id}
              className={`rounded-2xl border p-4 transition-all flex items-start gap-3.5 ${
                isUnlocked
                  ? "border-amber-500/30 bg-slate-900/90 shadow-lg shadow-amber-500/5 backdrop-blur-xl"
                  : "border-slate-800/80 bg-slate-950/60 opacity-60"
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl font-mono border ${
                  isUnlocked
                    ? "bg-amber-500/10 border-amber-500/30 shadow-md shadow-amber-500/10"
                    : "bg-slate-900 border-slate-800 grayscale"
                }`}
              >
                {ach.icon}
              </div>

              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-sm font-bold text-white truncate">{ach.title}</h4>
                  {isUnlocked ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Lock className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-snug">{ach.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
