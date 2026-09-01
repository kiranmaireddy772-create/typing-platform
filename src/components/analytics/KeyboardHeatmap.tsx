"use client";

import React, { useSyncExternalStore } from "react";
import { getKeyStats, calculateKeyAccuracy } from "@/lib/analytics/keyAnalytics";
import { Keyboard, Activity } from "lucide-react";

const KEYBOARD_ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

const emptySubscribe = () => () => {};

export function KeyboardHeatmap() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const statsMap = isMounted ? getKeyStats() : {};

  const getKeyColor = (key: string) => {
    const stat = statsMap[key];
    if (!stat || stat.total === 0) {
      return "border-slate-800 bg-slate-900/60 text-slate-400";
    }
    const acc = calculateKeyAccuracy(stat);
    if (acc >= 95) {
      return "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 shadow-sm shadow-emerald-500/10";
    }
    if (acc >= 85) {
      return "border-amber-500/40 bg-amber-500/10 text-amber-300 shadow-sm shadow-amber-500/10";
    }
    return "border-rose-500/40 bg-rose-500/10 text-rose-300 shadow-sm shadow-rose-500/10";
  };

  // Find weakest keys
  const keyAccuracyList = Object.entries(statsMap)
    .filter(([, stat]) => stat.total >= 5)
    .map(([key, stat]) => ({
      key: key.toUpperCase(),
      acc: calculateKeyAccuracy(stat),
      total: stat.total,
      errors: stat.errors,
    }))
    .sort((a, b) => a.acc - b.acc);

  const weakestKeys = keyAccuracyList.slice(0, 3);

  return (
    <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xl font-bold text-white">
          <Keyboard className="h-5 w-5 text-indigo-400" />
          <span>Finger Accuracy Heatmap</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="text-slate-400">95%+</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="text-slate-400">85-94%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="text-slate-400">&lt;85%</span>
          </div>
        </div>
      </div>

      {/* QWERTY Heatmap Grid */}
      <div className="space-y-2 max-w-xl mx-auto py-2">
        {KEYBOARD_ROWS.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1.5 sm:gap-2">
            {row.map((key) => {
              const stat = statsMap[key];
              const acc = stat && stat.total > 0 ? calculateKeyAccuracy(stat) : null;
              return (
                <div
                  key={key}
                  className={`flex flex-col items-center justify-center h-10 sm:h-12 w-8 sm:w-11 rounded-xl border text-xs sm:text-sm font-bold font-mono transition-transform hover:scale-105 ${getKeyColor(
                    key
                  )}`}
                  title={
                    stat && stat.total > 0
                      ? `${key.toUpperCase()}: ${acc}% accuracy (${stat.total} typed)`
                      : `${key.toUpperCase()}: No data yet`
                  }
                >
                  <span>{key.toUpperCase()}</span>
                  {acc !== null && (
                    <span className="text-[9px] font-mono opacity-80">{Math.round(acc)}%</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Weakest Key Recommendation Banner */}
      {weakestKeys.length > 0 && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-rose-300">
            <Activity className="h-4 w-4 shrink-0" />
            <span>
              Targeted Recommendation: Focus on keys{" "}
              <strong className="font-mono text-white">
                {weakestKeys.map((k) => k.key).join(", ")}
              </strong>{" "}
              (accuracy averages {Math.round(weakestKeys[0].acc)}%).
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
