import React from "react";
import { Award, CheckCircle, Lock } from "lucide-react";

export function LearningPath() {
  const pathNodes = [
    { name: "BEGINNER", desc: "Posture, finger placement, and key orientation", status: "unlocked" },
    { name: "HOME ROW", desc: "A S D F J K L ; keys mastery", status: "unlocked" },
    { name: "TOP ROW", desc: "Q W E R T Y U I O P keys integration", status: "unlocked" },
    { name: "BOTTOM ROW", desc: "Z X C V B N M keys integration", status: "unlocked" },
    { name: "WORDS", desc: "Common 100 & 200 word practice drills", status: "unlocked" },
    { name: "SENTENCES", desc: "Punctuation, spacing, and rhythm flow", status: "unlocked" },
    { name: "NUMBERS & SYMBOLS", desc: "1-0 digit keys and special characters", status: "unlocked" },
    { name: "ADVANCED", desc: "Code syntax, technical passages, speed building", status: "locked" },
    { name: "MASTERY", desc: "100+ WPM precision and blind touch-typing", status: "locked" },
  ];

  return (
    <section className="w-full bg-slate-950 py-20 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Curriculum Roadmap
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Structured Learning Path
          </p>
          <p className="mt-4 text-base text-slate-400">
            Progress step by step through custom modules engineered to build muscle memory without looking at the keyboard.
          </p>
        </div>

        {/* Visual Roadmap Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {pathNodes.map((node, idx) => {
            const isUnlocked = node.status === "unlocked";
            return (
              <div
                key={idx}
                className={`relative rounded-2xl border p-5 transition-all ${
                  isUnlocked
                    ? "border-slate-800 bg-slate-900/80 hover:border-indigo-500/50 hover:bg-slate-900"
                    : "border-slate-900 bg-slate-950/40 opacity-70"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    STAGE 0{idx + 1}
                  </span>
                  {isUnlocked ? (
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Lock className="h-4 w-4 text-slate-500" />
                  )}
                </div>
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  {node.name}
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  {node.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-xs text-slate-300">
            <Award className="h-4 w-4 text-indigo-400" />
            <span>Earn badges and track module completion as you advance.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
