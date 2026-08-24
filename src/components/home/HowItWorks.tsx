import React from "react";
import { BookOpen, Activity, TrendingUp, Gamepad2, Swords } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Learn",
      icon: BookOpen,
      description: "Start with structured touch-typing lessons.",
    },
    {
      num: "02",
      title: "Practice",
      icon: Activity,
      description: "Build muscle memory through focused exercises.",
    },
    {
      num: "03",
      title: "Improve",
      icon: TrendingUp,
      description: "Track WPM, accuracy, and weak keys.",
    },
    {
      num: "04",
      title: "Play",
      icon: Gamepad2,
      description: "Use typing games to make practice fun.",
    },
    {
      num: "05",
      title: "Compete",
      icon: Swords,
      description: "Take challenges and improve your personal best.",
    },
  ];

  return (
    <section className="w-full bg-slate-950 py-20 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Step-By-Step Journey
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            How It Works
          </p>
          <p className="mt-4 text-base text-slate-400">
            A proven methodology designed to transform your typing speed and muscle memory.
          </p>
        </div>

        {/* Steps Grid with Connected Pipeline Visual */}
        <div className="relative mt-16">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-indigo-600 via-indigo-400 to-sky-400 -translate-y-12 z-0 opacity-30" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center rounded-2xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-lg backdrop-blur-sm transition-transform hover:-translate-y-1"
                >
                  <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 shadow-md">
                    <Icon className="h-6 w-6" />
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold font-mono text-white shadow-sm">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
