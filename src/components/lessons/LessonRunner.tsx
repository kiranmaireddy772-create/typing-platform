"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lesson, getNextLesson } from "@/data/lessons";
import { saveLessonCompletion, useLessonProgress } from "@/lib/lessons/lessonProgress";
import { useTypingEngine } from "@/hooks/useTypingEngine";
import { TypingText } from "@/components/typing/TypingText";
import { TypingKeyboard } from "@/components/typing/TypingKeyboard";
import {
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Trophy,
  Target,
  Sparkles,
  Zap,
  Lock,
} from "lucide-react";

interface LessonRunnerProps {
  lesson: Lesson;
  initialIsUnlocked?: boolean;
}

export function LessonRunner({ lesson, initialIsUnlocked }: LessonRunnerProps) {
  const { isUnlocked: checkIsUnlocked } = useLessonProgress();
  const isUnlocked = checkIsUnlocked(lesson.lessonNumber) || Boolean(initialIsUnlocked);

  const [step, setStep] = useState<"theory" | "practice" | "complete">(
    lesson.type === "theory" ? "theory" : "practice"
  );

  const practiceText = lesson.practiceText || "f j f j ff jj fff jjj";

  const {
    status,
    charStates,
    currentIndex,
    wpm,
    accuracy,
    pressedKey,
    expectedKey,
    restartTest,
    handleVirtualKeyPress,
  } = useTypingEngine(60, lesson.tier, practiceText);

  const minAcc = lesson.minAccuracy || 85;
  const isPassed = status === "completed" && accuracy >= minAcc;

  // Save lesson completion when passed
  React.useEffect(() => {
    if (isPassed) {
      saveLessonCompletion(lesson.id, wpm, accuracy);
    }
  }, [isPassed, lesson.id, wpm, accuracy]);

  const activeStep = isPassed ? "complete" : step;
  const nextLesson = getNextLesson(lesson.lessonNumber);

  if (!isUnlocked) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 mb-6">
            <Lock className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Lesson {lesson.lessonNumber} is Locked
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Please complete the preceding lesson to unlock this training module.
          </p>
          <div className="mt-6">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Learning Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Top Lesson Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/learn"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
            </Link>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
              {lesson.tier} Tier
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            Lesson {lesson.lessonNumber}: {lesson.title}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">{lesson.subtitle}</p>
        </div>

        {/* Step Indicator Pill */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-slate-800 bg-slate-950 p-1">
          <button
            type="button"
            onClick={() => setStep("theory")}
            className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors ${
              activeStep === "theory"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            1. Overview
          </button>
          <button
            type="button"
            onClick={() => setStep("practice")}
            className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors ${
              activeStep === "practice"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            2. Practice
          </button>
          <button
            type="button"
            disabled={!isPassed}
            onClick={() => isPassed && setStep("complete")}
            className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors ${
              activeStep === "complete"
                ? "bg-emerald-600 text-white"
                : "text-slate-500 cursor-not-allowed"
            }`}
          >
            3. Complete
          </button>
        </div>
      </div>

      {/* STEP 1: THEORY / OVERVIEW */}
      {activeStep === "theory" && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
            <BookOpen className="h-4 w-4" /> Learning Objectives
          </div>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
            {lesson.theoryText || lesson.description}
          </p>

          {/* Objectives Check-list */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Key Takeaways
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Keyboard Visual Preview for Target Keys */}
          {lesson.targetKeys && lesson.targetKeys.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Target className="h-4 w-4 text-indigo-400" /> Target Keys For This Lesson
              </h3>
              <div className="flex justify-center">
                <TypingKeyboard
                  expectedKey={lesson.targetKeys[0]}
                  pressedKey={null}
                  targetKeys={lesson.targetKeys}
                />
              </div>
            </div>
          )}

          {/* Action CTA */}
          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setStep("practice")}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95"
            >
              <span>Begin Practice Exercise</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PRACTICE / TEST */}
      {activeStep === "practice" && (
        <div className="space-y-6">
          {/* Header metrics bar */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Zap className="h-3.5 w-3.5 text-amber-400" /> Speed:{" "}
                <strong className="font-mono text-white text-sm">{wpm} WPM</strong>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Target className="h-3.5 w-3.5 text-emerald-400" /> Accuracy:{" "}
                <strong className="font-mono text-emerald-400 text-sm">{accuracy}%</strong>
              </div>
            </div>

            <div className="text-xs text-slate-400">
              Min Accuracy Required:{" "}
              <strong className="text-indigo-300 font-mono">
                {minAcc}%
              </strong>
            </div>
          </div>

          {/* Practice Text Display */}
          <TypingText
            text={practiceText}
            charStates={charStates}
            currentIndex={currentIndex}
            status={status}
            tier={lesson.tier}
            chunks={lesson.chunks}
          />

          {/* Active Virtual Keyboard */}
          <div className="flex justify-center pt-2">
            <TypingKeyboard
              expectedKey={expectedKey}
              pressedKey={pressedKey}
              targetKeys={lesson.targetKeys}
              onKeyPress={handleVirtualKeyPress}
            />
          </div>

          {/* Prompt Retry if accuracy insufficient on finish */}
          {status === "completed" && accuracy < minAcc && (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 text-center space-y-3">
              <p className="text-sm font-semibold text-rose-400">
                You reached {accuracy}% accuracy. This lesson requires at least{" "}
                {minAcc}% accuracy to complete.
              </p>
              <button
                type="button"
                onClick={restartTest}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-500"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Retry Exercise
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: LESSON COMPLETE */}
      {activeStep === "complete" && (
        <div className="rounded-3xl border border-emerald-500/30 bg-slate-900/95 p-8 sm:p-12 text-center shadow-2xl space-y-6 backdrop-blur-xl animate-fade-in">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-2">
            <Trophy className="h-8 w-8" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
            <Sparkles className="h-4 w-4" /> Lesson Complete! 🎉
          </div>

          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Great Job! Module Finished.
          </h2>

          {/* Results Summary */}
          <div className="mx-auto max-w-sm grid grid-cols-2 gap-4 my-6">
            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-4">
              <div className="text-xs uppercase font-bold text-indigo-400">Speed</div>
              <div className="mt-1 text-3xl font-extrabold font-mono text-white">
                {wpm}
              </div>
              <div className="text-[10px] text-slate-400">Words Per Minute</div>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
              <div className="text-xs uppercase font-bold text-emerald-400">Accuracy</div>
              <div className="mt-1 text-3xl font-extrabold font-mono text-emerald-400">
                {accuracy}%
              </div>
              <div className="text-[10px] text-slate-400">Precision Rate</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {nextLesson ? (
              <Link
                href={`/learn/${nextLesson.tier}/${nextLesson.lessonNumber}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95"
              >
                <span>Continue to Next Lesson</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                href="/learn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500"
              >
                <Trophy className="h-4 w-4" /> View Course Certificate
              </Link>
            )}

            <Link
              href="/learn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-700"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
