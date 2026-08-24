import Link from "next/link";
import { Keyboard, BookOpen, Gamepad2, Flame, Award, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us | Typing Platform",
  description:
    "Learn about Typing Platform — a modern startup website for touch typing practice, structured lessons, and interactive speed games.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400">
            <Keyboard className="h-3.5 w-3.5" /> Modern Touch Typing Startup
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About Typing Platform
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Typing Platform is designed to help students, developers, and professionals build fast, error-free touch typing skills through deliberate, structured practice.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Structured Learning Path</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              15 sequential lessons taking beginners from home row basics through top/bottom row extensions, shift key capitals, numbers, and advanced sentence rhythm.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
              <Gamepad2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Interactive Typing Arcade</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Engaging games like Word Sprint, Falling Words, and Accuracy Challenge make muscle memory practice fun and repeatable.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Flame className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Daily Streak Drills</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Deterministic daily passages keep you consistent. Build consecutive calendar streaks and track 7-day performance history.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">100% Client-Side Privacy</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              All personal bests, lesson unlocks, game high scores, and daily streaks are stored safely in your browser via LocalStorage. No account required.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl border border-indigo-500/30 bg-indigo-950/30 p-8 sm:p-10 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Ready to elevate your typing speed?</h2>
          <div className="pt-2">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95"
            >
              <span>Start Touch Typing Course</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
