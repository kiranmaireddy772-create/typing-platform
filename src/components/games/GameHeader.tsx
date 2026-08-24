"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface GameHeaderProps {
  title: string;
  subtitle: string;
  badgeText?: string;
  metrics: React.ReactNode;
}

export function GameHeader({ title, subtitle, badgeText, metrics }: GameHeaderProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/games"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All Games
            </Link>
            {badgeText && (
              <>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
                  {badgeText}
                </span>
              </>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            {title}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        </div>
      </div>

      {/* Live Metrics Row */}
      <div className="pt-3 border-t border-slate-800/80">
        {metrics}
      </div>
    </div>
  );
}
