"use client";

import React from "react";
import { CharState } from "@/hooks/useTypingEngine";

interface TypingTextProps {
  text: string;
  charStates: CharState[];
  currentIndex: number;
  status: "idle" | "typing" | "completed";
  onFocusText?: () => void;
}

export function TypingText({
  text,
  charStates,
  currentIndex,
  status,
  onFocusText,
}: TypingTextProps) {
  return (
    <div
      onClick={onFocusText}
      onPaste={(e) => e.preventDefault()}
      className="relative w-full cursor-text rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-10 font-mono text-xl sm:text-2xl leading-relaxed tracking-wide select-none shadow-inner transition-all hover:border-slate-700"
      tabIndex={0}
      aria-label="Typing practice text area. Start typing on your physical keyboard."
    >
      {/* Visual Instruction Overlay when Idle */}
      {status === "idle" && currentIndex === 0 && (
        <div className="absolute top-3 right-4 flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 animate-pulse">
          <span>Start typing to begin timer</span>
        </div>
      )}

      <div className="whitespace-pre-wrap font-mono text-xl sm:text-2xl leading-relaxed tracking-wide">
        {text.split("").map((char, index) => {
          const state = charStates[index] || "untyped";
          const isCurrent = index === currentIndex && status !== "completed";

          let styleClasses = "transition-colors duration-75 rounded-sm ";

          if (isCurrent) {
            styleClasses +=
              "bg-indigo-500/40 text-indigo-200 font-bold border-b-2 border-indigo-400 animate-pulse shadow-sm shadow-indigo-500/40 ";
          } else if (state === "correct") {
            styleClasses += "text-emerald-400 font-medium ";
          } else if (state === "incorrect") {
            styleClasses +=
              "text-rose-400 bg-rose-500/30 border-b-2 border-rose-500 font-semibold ";
          } else {
            styleClasses += "text-slate-400 opacity-60 ";
          }

          return (
            <span key={index} className={styleClasses}>
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
}
