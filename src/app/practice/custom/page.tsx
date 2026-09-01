"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TypingPractice } from "@/components/typing/TypingPractice";
import { Code, FileText, ArrowLeft, ShieldCheck, Sparkles, RefreshCw } from "lucide-react";

const PRESET_CODE_SNIPPETS = {
  js: `function calculateWPM(correctChars, seconds) {
  const words = correctChars / 5;
  const minutes = seconds / 60;
  return Math.round(words / minutes);
}`,
  python: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
  html: `<section className="hero-banner bg-slate-950 text-white">
  <div className="container mx-auto px-4 py-12">
    <h1 className="text-4xl font-extrabold">Master Touch Typing</h1>
    <p className="text-slate-400">Practice custom text and code syntax.</p>
  </div>
</section>`,
};

export default function CustomPracticePage() {
  const [inputText, setInputText] = useState("");
  const [activeText, setActiveText] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(60);
  const [error, setError] = useState<string | null>(null);

  const handleStartCustomPractice = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();

    if (trimmed.length < 10) {
      setError("Custom text must contain at least 10 characters.");
      return;
    }

    if (trimmed.length > 5000) {
      setError("Custom text is limited to 5,000 characters maximum.");
      return;
    }

    setError(null);
    // Replace tabs with 2 spaces for clean typing engine rendering
    const sanitized = trimmed.replace(/\t/g, "  ");
    setActiveText(sanitized);
  };

  const handleSelectPreset = (snippet: string) => {
    setInputText(snippet);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 mb-2">
              <Code className="h-3.5 w-3.5" /> Custom Text & Code Importer
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Custom Typing Practice
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Practice your own articles, documentation, or programming language syntax.
            </p>
          </div>

          <Link
            href="/practice"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-all self-start sm:self-auto"
          >
            <ArrowLeft className="h-4 w-4" /> Standard Practice
          </Link>
        </div>

        {!activeText ? (
          /* Importer Setup Form */
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6">
            <form onSubmit={handleStartCustomPractice} className="space-y-6">
              {/* Preset Snippets */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                  Quick Code Presets
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleSelectPreset(PRESET_CODE_SNIPPETS.js)}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-mono text-indigo-300 hover:border-indigo-500/40 transition-all"
                  >
                    JavaScript Function
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectPreset(PRESET_CODE_SNIPPETS.python)}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-mono text-sky-300 hover:border-sky-500/40 transition-all"
                  >
                    Python Algorithm
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectPreset(PRESET_CODE_SNIPPETS.html)}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-mono text-amber-300 hover:border-amber-500/40 transition-all"
                  >
                    HTML Component
                  </button>
                </div>
              </div>

              {/* Text Input Area */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Paste Custom Text or Code</span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {inputText.length} / 5,000 characters
                  </span>
                </label>
                <textarea
                  required
                  rows={8}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste any custom passage, article, or code snippet here..."
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                  {error}
                </div>
              )}

              {/* Timer Duration Selection */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Duration
                  </label>
                  <div className="flex items-center gap-2">
                    {([15, 30, 60, 120] as number[]).map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setDuration(dur)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                          duration === dur
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                            : "border border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
                        }`}
                      >
                        {dur}s
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95 self-stretch sm:self-auto"
                >
                  <FileText className="h-4 w-4" /> Start Custom Practice
                </button>
              </div>
            </form>

            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Private Content Guarantee: Custom text stays 100% in local browser memory and is never uploaded to external servers.</span>
            </div>
          </div>
        ) : (
          /* Active Custom Typing Engine */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveText(null)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Change Custom Passage
              </button>
            </div>

            <TypingPractice initialDuration={duration} overrideText={activeText} />
          </div>
        )}
      </div>
    </div>
  );
}
