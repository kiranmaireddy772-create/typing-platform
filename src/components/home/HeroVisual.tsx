"use client";

import React, { useState, useEffect } from "react";
import { Zap, Target, Gauge } from "lucide-react";

export function HeroVisual() {
  const fullText = "The quick brown fox jumps over the lazy dog and keeps moving forward...";
  const [typedLength, setTypedLength] = useState(25);
  const [activeKey, setActiveKey] = useState("F");

  // Cycle typed characters to simulate active typing preview
  useEffect(() => {
    const interval = setInterval(() => {
      setTypedLength((prev) => {
        const next = prev >= fullText.length ? 15 : prev + 1;
        const char = fullText[next - 1]?.toUpperCase();
        if (char && char !== " ") {
          setActiveKey(char);
        }
        return next;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  const typedPart = fullText.slice(0, typedLength);
  const remainingPart = fullText.slice(typedLength);

  return (
    <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-2xl shadow-indigo-950/40 backdrop-blur-xl sm:p-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3.5 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500/80"></span>
            <span className="h-3 w-3 rounded-full bg-green-500/80"></span>
          </div>
          <span className="ml-2 text-xs font-mono font-medium text-slate-400">
            TYPING PRACTICE PREVIEW
          </span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
          <Gauge className="h-3.5 w-3.5" /> Live Session
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-3 mb-5 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <Zap className="h-3.5 w-3.5 text-amber-400" /> WPM
          </div>
          <div className="mt-1 text-2xl font-bold font-mono text-white">52</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <Target className="h-3.5 w-3.5 text-emerald-400" /> Accuracy
          </div>
          <div className="mt-1 text-2xl font-bold font-mono text-emerald-400">96%</div>
        </div>

        <div className="col-span-2 sm:col-span-1 rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-center">
          <div className="text-xs text-slate-400">Consistency</div>
          <div className="mt-1 text-2xl font-bold font-mono text-indigo-400">94%</div>
        </div>
      </div>

      {/* Typing Text Box */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 font-mono text-base leading-relaxed sm:text-lg mb-6 shadow-inner">
        <span className="text-indigo-400 font-semibold">{typedPart}</span>
        <span className="inline-block w-0.5 h-5 bg-indigo-400 ml-0.5 align-middle animate-cursor"></span>
        <span className="text-slate-500">{remainingPart}</span>
      </div>

      {/* QWERTY Keyboard Mockup */}
      <div className="space-y-1.5 rounded-xl border border-slate-800/80 bg-slate-950/40 p-3 sm:p-4">
        {keyboardRows.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1.5 sm:gap-2">
            {row.map((key) => {
              const isActive = key === activeKey;
              return (
                <div
                  key={key}
                  className={`key-cap flex h-8 w-7 sm:h-10 sm:w-9 items-center justify-center rounded-md font-mono text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "key-cap-active bg-indigo-600 text-white border border-indigo-400"
                      : "bg-slate-800 text-slate-300 border border-slate-700/60"
                  }`}
                >
                  {key}
                </div>
              );
            })}
          </div>
        ))}
        {/* Spacebar */}
        <div className="flex justify-center pt-1">
          <div
            className={`key-cap flex h-7 w-40 sm:h-8 sm:w-56 items-center justify-center rounded-md border text-xs font-mono font-medium ${
              activeKey === " "
                ? "key-cap-active bg-indigo-600 text-white border-indigo-400"
                : "bg-slate-800 text-slate-400 border-slate-700/60"
            }`}
          >
            SPACEBAR
          </div>
        </div>
      </div>
    </div>
  );
}
