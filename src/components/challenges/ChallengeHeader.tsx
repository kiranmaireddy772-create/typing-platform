"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Flame } from "lucide-react";

interface ChallengeHeaderProps {
  title?: string;
  subtitle?: string;
}

export function ChallengeHeader({
  title = "Daily Challenge",
  subtitle = "Complete today's challenge and keep your typing streak alive.",
}: ChallengeHeaderProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Home
          </Link>
          <span className="text-slate-600">•</span>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 fill-current" /> Daily Drill
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
          {title}
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}
