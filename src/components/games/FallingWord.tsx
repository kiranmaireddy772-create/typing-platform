"use client";

import React from "react";
import { FallingWordItem } from "@/hooks/games/useFallingWords";

interface FallingWordProps {
  item: FallingWordItem;
  isActive: boolean;
}

export function FallingWord({ item, isActive }: FallingWordProps) {
  const { text, xPercent, yPercent, typedLength } = item;

  const typedPart = text.slice(0, typedLength);
  const remainingPart = text.slice(typedLength);

  return (
    <div
      className={`absolute transition-transform duration-75 select-none rounded-xl px-3 py-1.5 shadow-lg border font-mono text-sm sm:text-base ${
        isActive
          ? "border-amber-400/80 bg-slate-900/95 text-white ring-2 ring-amber-400/50 shadow-amber-500/20 scale-105"
          : "border-slate-700/60 bg-slate-900/80 text-slate-300 backdrop-blur-sm"
      }`}
      style={{
        left: `${xPercent}%`,
        top: `${yPercent}%`,
        transform: "translateX(-50%)",
      }}
    >
      <span className="text-emerald-400 font-extrabold underline">{typedPart}</span>
      <span className={isActive ? "text-white font-bold" : "text-slate-300"}>
        {remainingPart}
      </span>
    </div>
  );
}
