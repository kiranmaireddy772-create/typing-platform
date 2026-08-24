"use client";

import React from "react";
import { getPast7DateKeys, getLocalDateKey } from "@/lib/challenges/challengeDate";
import { DailyResult } from "@/lib/challenges/challengeStorage";

interface DailyHistoryProps {
  dailyResults: Record<string, DailyResult>;
}

export function DailyHistory({ dailyResults }: DailyHistoryProps) {
  const todayKey = getLocalDateKey();
  const past7Keys = getPast7DateKeys(todayKey);

  const getDayAbbrev = (dateStr: string) => {
    const parts = dateStr.split("-");
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return d.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 shadow-xl space-y-4">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
        7-Day Activity History
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {past7Keys.map((dateKey) => {
          const res = dailyResults[dateKey];
          const isToday = dateKey === todayKey;
          const abbrev = getDayAbbrev(dateKey);

          let statusIcon = "❌";
          let badgeBg = "border-slate-800 bg-slate-950/60 text-slate-500";

          if (res?.completed) {
            statusIcon = "✅";
            badgeBg = "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
          } else if (isToday) {
            statusIcon = "🔵";
            badgeBg = "border-indigo-500/30 bg-indigo-500/10 text-indigo-400 font-bold";
          }

          return (
            <div
              key={dateKey}
              className={`rounded-2xl border p-2.5 flex flex-col items-center justify-center gap-1 transition-all ${badgeBg}`}
            >
              <span className="text-[10px] uppercase font-mono font-semibold text-slate-400">
                {abbrev}
              </span>
              <span className="text-sm">{statusIcon}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
