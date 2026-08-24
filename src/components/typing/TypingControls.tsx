"use client";

import React from "react";
import { Play, RotateCcw, RefreshCw } from "lucide-react";
import { TestStatus } from "@/hooks/useTypingEngine";

interface TypingControlsProps {
  status: TestStatus;
  onStart: () => void;
  onRestart: () => void;
}

export function TypingControls({ status, onStart, onRestart }: TypingControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      {status === "idle" && (
        <button
          type="button"
          onClick={onStart}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/40 active:scale-95"
        >
          <Play className="h-4 w-4" /> Start Typing
        </button>
      )}

      {status === "typing" && (
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-200 transition-all hover:bg-slate-800 hover:text-white active:scale-95"
        >
          <RotateCcw className="h-4 w-4" /> Restart
        </button>
      )}

      {status === "completed" && (
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 active:scale-95"
        >
          <RefreshCw className="h-4 w-4" /> Try Again
        </button>
      )}
    </div>
  );
}
