"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ALL_LESSONS,
  getLessonsByTier,
  getLessonByNumber,
  LessonTier,
} from "@/data/lessons";
import {
  getCompletedLessons,
  isLessonUnlocked,
  calculateProgressStats,
} from "@/lib/lessons/lessonProgress";
import { LessonCard } from "./LessonCard";
import { BookOpen, Sparkles, Trophy, Award, ArrowRight } from "lucide-react";

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function LessonDashboard() {
  const isMounted = useIsMounted();
  const [activeTab, setActiveTab] = useState<LessonTier | "all">("all");

  const stats = isMounted ? calculateProgressStats() : null;
  const completedRecords = isMounted ? getCompletedLessons() : {};

  const beginnerLessons = getLessonsByTier("beginner");
  const intermediateLessons = getLessonsByTier("intermediate");
  const advancedLessons = getLessonsByTier("advanced");

  const nextLesson = stats ? getLessonByNumber(stats.nextUnlockedLessonNumber) : undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Hero Header */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-indigo-950/40 via-slate-900/90 to-slate-950 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 mb-4">
              <BookOpen className="h-3.5 w-3.5" /> Structured Touch Typing Course
            </div>

            <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
              Learn to Type
            </h1>

            <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
              Build strong typing fundamentals step by step, from your first key to advanced speed training.
            </p>

            {nextLesson && (
              <div className="mt-6">
                <Link
                  href={`/learn/${nextLesson.tier}/${nextLesson.lessonNumber}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>
                    Continue: Lesson {nextLesson.lessonNumber} — {nextLesson.title}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Overall Progress Summary Card */}
          <div className="w-full lg:w-80 rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Trophy className="h-4 w-4 text-amber-400" /> Overall Completion
              </div>
              <span className="font-mono text-xl font-bold text-indigo-400">
                {stats?.overallPercent || 0}%
              </span>
            </div>

            {/* Main Progress Bar */}
            <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${stats?.overallPercent || 0}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>{stats?.totalCompleted || 0} / {ALL_LESSONS.length} Lessons</span>
              <span>15 Total Modules</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tier Progress Overview Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Beginner Progress Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Award className="h-4 w-4" /> Beginner Tier
            </span>
            <span className="font-mono text-sm font-bold text-white">
              {stats?.beginnerCompleted || 0}/{beginnerLessons.length}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-500 rounded-full"
              style={{ width: `${stats?.beginnerPercent || 0}%` }}
            />
          </div>
          <p className="text-xs text-slate-400">Lessons 1–5: Posture, Home Row & Guide Keys</p>
        </div>

        {/* Intermediate Progress Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Award className="h-4 w-4" /> Intermediate Tier
            </span>
            <span className="font-mono text-sm font-bold text-white">
              {stats?.intermediateCompleted || 0}/{intermediateLessons.length}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
            <div
              className="h-full bg-sky-500 transition-all duration-500 rounded-full"
              style={{ width: `${stats?.intermediatePercent || 0}%` }}
            />
          </div>
          <p className="text-xs text-slate-400">Lessons 6–10: Top/Bottom Row, Shift, Numbers & Punctuation</p>
        </div>

        {/* Advanced Progress Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Award className="h-4 w-4" /> Advanced Tier
            </span>
            <span className="font-mono text-sm font-bold text-white">
              {stats?.advancedCompleted || 0}/{advancedLessons.length}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${stats?.advancedPercent || 0}%` }}
            />
          </div>
          <p className="text-xs text-slate-400">Lessons 11–15: Sentences, Paragraphs & Speed Certification</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          {(["all", "beginner", "intermediate", "advanced"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-4 py-2 text-xs font-bold capitalize transition-all ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {tab === "all" ? "All Curriculum" : `${tab} Tier`}
            </button>
          ))}
        </div>
      </div>

      {/* Beginner Section */}
      {(activeTab === "all" || activeTab === "beginner") && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800/60 pb-2">
            <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
            <h2 className="text-xl font-bold text-white">Beginner Level</h2>
            <span className="text-xs text-slate-400">— Lessons 1 to 5</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beginnerLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                isUnlocked={isLessonUnlocked(lesson.lessonNumber)}
                record={completedRecords[lesson.id]}
              />
            ))}
          </div>
        </section>
      )}

      {/* Intermediate Section */}
      {(activeTab === "all" || activeTab === "intermediate") && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-slate-800/60 pb-2">
            <div className="h-3 w-3 rounded-full bg-sky-500"></div>
            <h2 className="text-xl font-bold text-white">Intermediate Level</h2>
            <span className="text-xs text-slate-400">— Lessons 6 to 10</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intermediateLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                isUnlocked={isLessonUnlocked(lesson.lessonNumber)}
                record={completedRecords[lesson.id]}
              />
            ))}
          </div>
        </section>
      )}

      {/* Advanced Section */}
      {(activeTab === "all" || activeTab === "advanced") && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-slate-800/60 pb-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
            <h2 className="text-xl font-bold text-white">Advanced Level</h2>
            <span className="text-xs text-slate-400">— Lessons 11 to 15</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                isUnlocked={isLessonUnlocked(lesson.lessonNumber)}
                record={completedRecords[lesson.id]}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
