import React from "react";
import { LessonDashboard } from "@/components/lessons/LessonDashboard";

export const metadata = {
  title: "Learn Touch Typing | Typing Platform",
  description:
    "Master touch typing step by step from beginner home-row fundamentals to advanced typing speed and accuracy certification.",
};

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <LessonDashboard />
    </div>
  );
}
