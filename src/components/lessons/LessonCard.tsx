"use client";

import React from "react";
import Link from "next/link";
import { Lesson } from "@/data/lessons";
import { LessonRecord } from "@/lib/lessons/lessonProgress";
import { CheckCircle2, Lock, Play, RotateCcw, Clock, Target } from "lucide-react";

interface LessonCardProps {
  lesson: Lesson;
  isUnlocked: boolean;
  record?: LessonRecord;
}

export function LessonCard({ lesson, isUnlocked, record }: LessonCardProps) {
  const isCompleted = Boolean(record?.completed);

  const getBadgeColor = (type: Lesson["type"]) => {
    switch (type) {
      case "theory":
        return "bg-sky-500/10 text-sky-400 border-sky-500/20";
      case "key_practice":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "word_practice":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "sentence_practice":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "assessment":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    }
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 ${
        isCompleted
          ? "border-emerald-500/40 bg-slate-900/90 hover:border-emerald-500/60"
          : isUnlocked
          ? "border-slate-800 bg-slate-900/60 hover:-translate-y-1 hover:border-indigo-500/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-indigo-950/20"
          : "border-slate-900 bg-slate-950/40 opacity-60 cursor-not-allowed"
      }`}
    >
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
              LESSON {lesson.lessonNumber}
            </span>
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getBadgeColor(
                lesson.type
              )}`}
            >
              {lesson.type.replace("_", " ")}
            </span>
          </div>

          {isCompleted ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="h-3.5 w-3.5" /> Completed
            </span>
          ) : isUnlocked ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-0.5 rounded-full">
              Unlocked
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full">
              <Lock className="h-3.5 w-3.5" /> Locked
            </span>
          )}
        </div>

        {/* Lesson Title & Subtitle */}
        <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
          {lesson.title}
        </h3>
        <p className="text-xs font-medium text-indigo-400 mt-0.5">{lesson.subtitle}</p>

        <p className="mt-2.5 text-xs text-slate-400 leading-relaxed line-clamp-2">
          {lesson.description}
        </p>

        {/* Target Keys Preview */}
        {lesson.targetKeys && lesson.targetKeys.length > 0 && (
          <div className="mt-3.5 flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Target className="h-3 w-3" /> Target Keys:
            </span>
            {lesson.targetKeys.map((key) => (
              <span
                key={key}
                className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-indigo-300"
              >
                {key}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Details & CTA */}
      <div className="mt-5 border-t border-slate-800/80 pt-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Clock className="h-3.5 w-3.5 text-slate-500" />
          <span>{lesson.estimatedMinutes} mins</span>
          {record && (
            <span className="text-emerald-400 font-semibold ml-2">
              Best: {record.wpm} WPM ({record.accuracy}%)
            </span>
          )}
        </div>

        {isUnlocked ? (
          <Link
            href={`/learn/${lesson.tier}/${lesson.lessonNumber}`}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold shadow-md transition-all active:scale-95 ${
              isCompleted
                ? "bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
                : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/30"
            }`}
          >
            {isCompleted ? (
              <>
                <RotateCcw className="h-3.5 w-3.5" /> Revisit
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" /> Start
              </>
            )}
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-1 rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-600 cursor-not-allowed"
          >
            <Lock className="h-3.5 w-3.5" /> Locked
          </button>
        )}
      </div>
    </div>
  );
}
