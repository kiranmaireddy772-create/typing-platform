import React from "react";
import { notFound } from "next/navigation";
import { ALL_LESSONS, getLessonByNumber, getLessonById } from "@/data/lessons";
import { LessonRunner } from "@/components/lessons/LessonRunner";

interface PageProps {
  params: Promise<{
    tier: string;
    lessonNumber: string;
  }>;
}

export async function generateStaticParams() {
  return ALL_LESSONS.map((lesson) => ({
    tier: lesson.tier.toLowerCase(),
    lessonNumber: String(lesson.lessonNumber),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const lessonNumberStr = resolvedParams?.lessonNumber || "";
  let num = parseInt(lessonNumberStr, 10);
  if (isNaN(num)) {
    num = parseInt(lessonNumberStr.replace(/\D/g, ""), 10);
  }

  const lesson = getLessonByNumber(num) || getLessonById(lessonNumberStr);

  if (!lesson) {
    return { title: "Lesson Not Found | Typing Platform" };
  }

  return {
    title: `Lesson ${lesson.lessonNumber}: ${lesson.title} | Typing Platform`,
    description: lesson.description,
  };
}

export default async function IndividualLessonPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const tierStr = resolvedParams?.tier || "";
  const lessonNumberStr = resolvedParams?.lessonNumber || "";

  let num = parseInt(lessonNumberStr, 10);
  if (isNaN(num)) {
    num = parseInt(lessonNumberStr.replace(/\D/g, ""), 10);
  }

  const lesson = getLessonByNumber(num) || getLessonById(lessonNumberStr);

  if (!lesson) {
    notFound();
  }

  // Validate tier case-insensitively if specified
  if (tierStr && lesson.tier.toLowerCase() !== tierStr.toLowerCase()) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <LessonRunner lesson={lesson} />
    </div>
  );
}
