"use client";

import React, { useEffect, useRef } from "react";
import { CharState } from "@/hooks/useTypingEngine";
import { BeginnerChunkDisplay } from "@/components/lessons/BeginnerChunkDisplay";

interface TypingTextProps {
  text: string;
  charStates: CharState[];
  currentIndex: number;
  status: "idle" | "typing" | "completed";
  onFocusText?: () => void;
  tier?: "beginner" | "intermediate" | "advanced";
  chunks?: string[];
}

export function TypingText({
  text,
  charStates,
  currentIndex,
  status,
  onFocusText,
  tier = "intermediate",
  chunks,
}: TypingTextProps) {
  const activeCharRef = useRef<HTMLSpanElement>(null);
  const isBeginner = tier === "beginner";

  // Use explicit chunks or auto-generate chunks for beginner tier
  const activeChunks = chunks && chunks.length > 0 ? chunks : text ? text.split(" ") : [];

  // Smooth scroll for intermediate / advanced passages
  useEffect(() => {
    if (!isBeginner && activeCharRef.current && status === "typing") {
      activeCharRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [currentIndex, status, isBeginner]);

  // If Beginner Tier, render centered chunk-by-chunk learning display
  if (isBeginner && activeChunks.length > 0) {
    return (
      <BeginnerChunkDisplay
        chunks={activeChunks}
        text={text}
        charStates={charStates}
        currentIndex={currentIndex}
        status={status}
        onFocusText={onFocusText}
      />
    );
  }

  // Standard passage view for Intermediate & Advanced tiers
  return (
    <div
      onClick={onFocusText}
      onPaste={(e) => e.preventDefault()}
      className="relative w-full cursor-text rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-10 select-none shadow-inner transition-all hover:border-slate-700 max-h-[320px] overflow-y-auto"
      tabIndex={0}
      aria-label="Typing practice text area. Start typing on your physical keyboard."
    >
      {/* Visual Instruction Overlay when Idle */}
      {status === "idle" && currentIndex === 0 && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 animate-pulse">
          <span>Start typing to begin</span>
        </div>
      )}

      <div className="whitespace-pre-wrap font-mono text-xl sm:text-2xl leading-relaxed tracking-wide">
        {text.split("").map((char, index) => {
          const state = charStates[index] || "untyped";
          const isCurrent = index === currentIndex && status !== "completed";

          let styleClasses = "transition-all duration-75 rounded-md ";

          if (isCurrent) {
            styleClasses +=
              "bg-indigo-500/50 text-white font-extrabold border-b-4 border-indigo-400 animate-pulse shadow-md shadow-indigo-500/40 px-0.5 ";
          } else if (state === "correct") {
            styleClasses += "text-emerald-400 font-medium ";
          } else if (state === "incorrect") {
            styleClasses +=
              "text-rose-300 bg-rose-500/40 border-b-2 border-rose-500 font-semibold ";
          } else {
            styleClasses += "text-slate-400 opacity-60 ";
          }

          return (
            <span
              key={index}
              ref={isCurrent ? activeCharRef : null}
              className={styleClasses}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
}
