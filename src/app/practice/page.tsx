import React from "react";
import { TypingPractice } from "@/components/typing/TypingPractice";

export const metadata = {
  title: "Typing Practice | Typing Platform",
  description:
    "Test and improve your typing speed and accuracy with real-time WPM analytics, interactive keyboard feedback, and custom practice modes.",
};

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Typing Practice
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Type on your physical keyboard to start the countdown timer.
        </p>
      </div>

      <TypingPractice />
    </div>
  );
}
