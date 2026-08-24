import React from "react";
import { notFound } from "next/navigation";
import { getLessonByNumber } from "@/data/lessons";
import { LessonRunner } from "@/components/lessons/LessonRunner";

interface PageProps {
  params: Promise<{
    tier: string;
    lessonNumber: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lessonNumber } = await params;
  const num = parseInt(lessonNumber, 10);
  const lesson = getLessonByNumber(num);

  if (!lesson) {
    return { title: "Lesson Not Found | Typing Platform" };
  }

  return {
    title: `Lesson ${lesson.lessonNumber}: ${lesson.title} | Typing Platform`,
    description: lesson.description,
  };
}

export default async function IndividualLessonPage({ params }: PageProps) {
  const { lessonNumber } = await params;
  const num = parseInt(lessonNumber, 10);

  if (isNaN(num)) {
    notFound();
  }

  const lesson = getLessonByNumber(num);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <LessonRunner lesson={lesson} />
    </div>
  );
}
