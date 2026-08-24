"use client";

import React from "react";
import Link from "next/link";
import { Play, RotateCcw, CheckCircle2, SlidersHorizontal } from "lucide-react";

export function PracticePreview() {
  const sampleText = "Practice makes progress. Every keystroke brings you closer to faster and more accurate typing.";
  const typedLength = 46;

  const typedPart = sampleText.slice(0, typedLength);
  const remainingPart = sampleText.slice(typedLength);

  return (
    <section className="w-full bg-slate-950 py-20 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Interactive Practice Interface
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Clean, Distraction-Free Practice Environment
          </p>
          <p className="mt-4 text-base text-slate-400">
            Get a glimpse of the upcoming real-time practice suite.
          </p>
        </div>

        {/* Practice Shell Container */}
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl shadow-indigo-950/30">
          {/* Top Control Bar Mockup */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <SlidersHorizontal className="h-4 w-4 text-indigo-400" />
              <span>Mode: <strong className="text-white">Sentences</strong></span>
              <span className="text-slate-600">•</span>
              <span>Time: <strong className="text-white">60s</strong></span>
              <span className="text-slate-600">•</span>
              <span>Difficulty: <strong className="text-white">Intermediate</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white"
                onClick={() => alert("Practice restart will function when the typing engine is active.")}
              >
                <RotateCcw className="h-3.5 w-3.5" /> Restart
              </button>
            </div>
          </div>

          {/* Real-time Metric Bar */}
          <div className="my-6 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-4">
              <div className="text-xs font-medium uppercase tracking-wider text-slate-400">WPM</div>
              <div className="mt-1 text-3xl font-extrabold font-mono text-indigo-400">48</div>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-4">
              <div className="text-xs font-medium uppercase tracking-wider text-slate-400">Accuracy</div>
              <div className="mt-1 text-3xl font-extrabold font-mono text-emerald-400">96%</div>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-4">
              <div className="text-xs font-medium uppercase tracking-wider text-slate-400">Progress</div>
              <div className="mt-1 text-3xl font-extrabold font-mono text-sky-400">72%</div>
            </div>
          </div>

          {/* Typing Display Box */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 sm:p-8 font-mono text-lg sm:text-xl leading-relaxed text-slate-300">
            <span className="text-indigo-400 font-semibold bg-indigo-500/10 px-1 py-0.5 rounded">
              {typedPart}
            </span>
            <span className="inline-block w-0.5 h-6 bg-indigo-400 ml-0.5 align-middle animate-cursor"></span>
            <span className="text-slate-500">{remainingPart}</span>
          </div>

          {/* Footer Callout */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-4">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-indigo-300">
              <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0" />
              <span>Full typing engine with custom text, instant WPM analytics, and error heatmaps launching in Phase 3.</span>
            </div>
            <Link
              href="/practice"
              className="inline-flex items-center gap-1.5 shrink-0 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-indigo-500 transition-colors"
            >
              <Play className="h-3.5 w-3.5" /> Try Practice Hub
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
