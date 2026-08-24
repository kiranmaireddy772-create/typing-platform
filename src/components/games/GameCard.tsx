"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Trophy, Zap, Target } from "lucide-react";

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  href: string;
  badge: string;
  difficultyText: string;
  icon: React.ReactNode;
  accentColor: string;
  bestScoreText?: string | null;
  bestWpmText?: string | null;
}

export function GameCard({
  title,
  description,
  href,
  badge,
  difficultyText,
  icon,
  accentColor,
  bestScoreText,
  bestWpmText,
}: GameCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl backdrop-blur-xl">
      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${accentColor} shadow-lg`}>
            {icon}
          </div>
          <span className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1 text-xs font-semibold text-slate-400">
            {badge}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">
          {description}
        </p>

        {/* Metadata badges */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1 font-mono">
            <Zap className="h-3.5 w-3.5 text-amber-400" /> {difficultyText}
          </span>
        </div>
      </div>

      {/* Footer / Best Score Stats & CTA */}
      <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
        <div>
          {bestScoreText ? (
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
              <Trophy className="h-3.5 w-3.5 text-amber-400" /> Best:{" "}
              <strong className="font-mono text-indigo-400 text-sm">{bestScoreText}</strong>
              {bestWpmText && <span className="text-slate-500 font-mono">({bestWpmText})</span>}
            </div>
          ) : (
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <Target className="h-3.5 w-3.5" /> No high score yet
            </div>
          )}
        </div>

        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95"
        >
          <span>Play Game</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
