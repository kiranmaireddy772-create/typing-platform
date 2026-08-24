import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 border-t border-slate-900">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[350px] w-[600px] rounded-full bg-indigo-600/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 to-slate-900/90 p-8 sm:p-14 text-center shadow-2xl backdrop-blur-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Start Free Today
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Improve Your Typing?
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
            Start with a lesson, practice at your own pace, and watch your skills improve.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/learn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/40 active:scale-95"
            >
              <span>Start Learning</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/practice"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-6 py-4 text-base font-semibold text-slate-200 transition-all hover:bg-slate-800 hover:text-white"
            >
              <span>Explore Practice Hub</span>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> No credit card required
            </span>
            <span>•</span>
            <span>Instant access</span>
            <span>•</span>
            <span>Self-paced</span>
          </div>
        </div>
      </div>
    </section>
  );
}
