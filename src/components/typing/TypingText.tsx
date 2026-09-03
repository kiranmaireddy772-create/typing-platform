"use client";

import React, { useEffect, useRef } from "react";
import { CharState } from "@/hooks/useTypingEngine";
import { BeginnerChunkDisplay } from "@/components/lessons/BeginnerChunkDisplay";
import { LessonChunkDisplay } from "@/components/lessons/LessonChunkDisplay";

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
  const hasChunks = Boolean(chunks && chunks.length > 0);

  // Smooth scroll for standard practice passages without chunks
  useEffect(() => {
    if (!hasChunks && activeCharRef.current && status === "typing") {
      activeCharRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [currentIndex, status, hasChunks]);

  // 1. Beginner Tier uses dedicated BeginnerChunkDisplay
  if (tier === "beginner" && hasChunks && chunks) {
    return (
      <BeginnerChunkDisplay
        chunks={chunks}
        text={text}
        charStates={charStates}
        currentIndex={currentIndex}
        status={status}
        onFocusText={onFocusText}
      />
    );
  }

  // 2. Intermediate and Advanced Tiers use LessonChunkDisplay for progressive chunks
  if ((tier === "intermediate" || tier === "advanced") && hasChunks && chunks) {
    return (
      <LessonChunkDisplay
        chunks={chunks}
        text={text}
        charStates={charStates}
        currentIndex={currentIndex}
        status={status}
        onFocusText={onFocusText}
        tier={tier}
      />
    );
  }

  // 3. Standard full-passage view for general practice & custom tests without chunks
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
