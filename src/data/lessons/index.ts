import { Lesson, LessonTier } from "./types";
import { BEGINNER_LESSONS } from "./beginner";
import { INTERMEDIATE_LESSONS } from "./intermediate";
import { ADVANCED_LESSONS } from "./advanced";

export * from "./types";

export const ALL_LESSONS: Lesson[] = [
  ...BEGINNER_LESSONS,
  ...INTERMEDIATE_LESSONS,
  ...ADVANCED_LESSONS,
];

export function getLessonsByTier(tier: LessonTier): Lesson[] {
  return ALL_LESSONS.filter((l) => l.tier === tier);
}

export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id);
}

export function getLessonByNumber(number: number): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.lessonNumber === number);
}

export function getNextLesson(currentNumber: number): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.lessonNumber === currentNumber + 1);
}
