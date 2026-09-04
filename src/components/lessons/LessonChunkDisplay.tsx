"use client";

import React from "react";
import { CharState } from "@/hooks/useTypingEngine";
import { parseLessonChunks, getActiveChunkRange } from "@/lib/lessons/lessonChunks";
import { CheckCircle2, Sparkles } from "lucide-react";

interface LessonChunkDisplayProps {
  chunks: string[];
  text: string;
  charStates: CharState[];
  currentIndex: number;
  status: "idle" | "typing" | "completed";
  onFocusText?: () => void;
  tier?: "beginner" | "intermediate" | "advanced";
}

export function LessonChunkDisplay({
  chunks,
  text,
  charStates,
  currentIndex,
  status,
  onFocusText,
  tier = "intermediate",
}: LessonChunkDisplayProps) {
  const { ranges } = parseLessonChunks(chunks);
  const activeRange = getActiveChunkRange(ranges, currentIndex);

  const activeChunkNum = activeRange.chunkIndex + 1;
  const totalChunks = ranges.length;
  const stepPercent = Math.round((activeChunkNum / totalChunks) * 100);

  const chunkLength = activeRange.text.length;

  // Responsive font & layout based on chunk length
  const getChunkTypography = () => {
    if (chunkLength < 25) {
      return "text-3xl sm:text-4xl lg:text-5xl tracking-widest text-center leading-relaxed";
    }
    if (chunkLength < 60) {
      return "text-xl sm:text-2xl lg:text-3xl tracking-wide text-left sm:text-center leading-relaxed";
    }
    return "text-lg sm:text-xl lg:text-2xl tracking-normal text-left leading-relaxed";
  };

  return (
    <div
      onClick={onFocusText}
      onPaste={(e) => e.preventDefault()}
      className="relative w-full max-w-4xl mx-auto cursor-text rounded-3xl border border-slate-800 bg-slate-950/90 p-6 sm:p-10 shadow-2xl select-none backdrop-blur-xl transition-all hover:border-slate-700 space-y-6"
      tabIndex={0}
      aria-label="Progressive lesson chunk display."
    >
      {/* Top Step Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600/20 text-indigo-400 font-mono text-xs font-bold border border-indigo-500/30">
            {activeChunkNum}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Step {activeChunkNum} of {totalChunks}
          </span>
          <span className="text-xs text-slate-500 capitalize">({tier} Tier)</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-32 h-2.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-emerald-400 transition-all duration-300 rounded-full"
              style={{ width: `${stepPercent}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-indigo-400">
            {stepPercent}%
          </span>
        </div>
      </div>

      {/* Visual Instruction Overlay when Idle */}
      {status === "idle" && currentIndex === 0 && (
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-400 animate-pulse">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Type Step 1 to begin</span>
          </div>
        </div>
      )}

      {/* Main Active Chunk Display Box */}
      <div className="flex flex-col justify-center py-4 min-h-[120px]">
        <div className={`whitespace-pre-wrap font-mono font-bold ${getChunkTypography()}`}>
          {text.split("").map((char, index) => {
            // Only render characters belonging to the active range
            if (index < activeRange.startIndex || index > activeRange.endIndex) {
              return null;
            }

            const state = charStates[index] || "untyped";
            const isCurrent = index === currentIndex && status !== "completed";

            let styleClasses =
              "inline px-0.5 py-0.5 transition-all duration-75 rounded-md ";

            if (isCurrent) {
              styleClasses +=
                "bg-indigo-600 text-white font-extrabold border-b-4 border-indigo-400 animate-pulse shadow-lg shadow-indigo-500/50 ";
            } else if (state === "correct") {
              styleClasses += "text-emerald-400 font-bold ";
            } else if (state === "incorrect") {
              styleClasses +=
                "text-rose-300 bg-rose-500/40 border-b-2 border-rose-500 font-semibold ";
            } else {
              styleClasses += "text-slate-400 opacity-70 ";
            }

            return (
              <span key={index} className={styleClasses}>
                {char}
              </span>
            );
          })}
        </div>
      </div>

      {/* Bottom Step Dots Indicator */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-slate-800/80 max-w-2xl mx-auto">
        {ranges.map((range) => {
          const isDone = currentIndex > range.endIndex;
          const isActive = range.chunkIndex === activeRange.chunkIndex;

          return (
            <div
              key={range.chunkIndex}
              className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                isDone
                  ? "h-3 w-3 bg-emerald-400 text-slate-950"
                  : isActive
                  ? "h-3.5 w-6 bg-indigo-600 shadow-md shadow-indigo-600/50"
                  : "h-2.5 w-2.5 bg-slate-800"
              }`}
              title={`Step ${range.chunkIndex + 1}: ${range.text}`}
            >
              {isDone && <CheckCircle2 className="h-3 w-3 text-slate-950 stroke-[3]" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
