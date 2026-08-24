import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Keyboard } from "lucide-react";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-24 lg:py-28">
      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-900/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Hero Left Content */}
          <div className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-400 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>The Next Generation Typing Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">
              Learn to Type. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-300 to-sky-400">
                Practice. Improve. Compete.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-5 max-w-xl text-lg text-slate-300 leading-relaxed">
              Build real typing skills through structured lessons, focused practice, and fun typing challenges.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/learn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/40 active:scale-95"
              >
                <span>Start Learning</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/practice"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-base font-semibold text-slate-200 transition-all hover:bg-slate-800 hover:text-white active:scale-95"
              >
                <Keyboard className="h-4 w-4 text-indigo-400" />
                <span>Practice Typing</span>
              </Link>
            </div>

            {/* Micro Feature Indicators */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-800/80 pt-6 text-left w-full max-w-md">
              <div>
                <div className="text-lg font-bold text-white">100%</div>
                <div className="text-xs text-slate-400">Free to Learn</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">0–120+</div>
                <div className="text-xs text-slate-400">Target WPM</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">Step-by-Step</div>
                <div className="text-xs text-slate-400">Structured Path</div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual */}
          <div className="flex justify-center lg:col-span-6">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
