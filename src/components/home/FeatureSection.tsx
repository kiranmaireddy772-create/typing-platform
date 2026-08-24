import React from "react";
import { BookOpen, Keyboard, BarChart3, Gamepad2, Flame, Trophy } from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      icon: BookOpen,
      emoji: "📚",
      title: "Structured Lessons",
      description: "Learn touch typing step by step from beginner to advanced.",
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      icon: Keyboard,
      emoji: "⌨️",
      title: "Focused Practice",
      description: "Practice speed, accuracy, difficult keys, words, sentences, and paragraphs.",
      color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    },
    {
      icon: BarChart3,
      emoji: "📊",
      title: "Track Your Progress",
      description: "See your WPM, accuracy, practice time, and improvement over time.",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      icon: Gamepad2,
      emoji: "🎮",
      title: "Typing Games",
      description: "Turn practice into fun challenges that help you improve while playing.",
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      icon: Flame,
      emoji: "🔥",
      title: "Daily Challenges",
      description: "Take a new typing challenge every day and try to beat your best score.",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      icon: Trophy,
      emoji: "🏆",
      title: "Compete",
      description: "Compare your performance and eventually challenge friends and other players.",
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
  ];

  return (
    <section className="w-full bg-slate-950 py-20 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Comprehensive Training System
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Everything You Need to Become a Better Typist
          </p>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Designed for learners of all levels—whether starting from scratch or aiming for lightning-fast speeds.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-indigo-950/20"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border ${feature.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-2xl">{feature.emoji}</span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
