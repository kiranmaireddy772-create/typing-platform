export type LessonTier = "beginner" | "intermediate" | "advanced";

export type LessonType =
  | "theory"
  | "key_practice"
  | "word_practice"
  | "sentence_practice"
  | "assessment";

export interface Lesson {
  id: string;
  tier: LessonTier;
  lessonNumber: number; // 1 to 15
  title: string;
  subtitle: string;
  description: string;
  objectives: string[];
  type: LessonType;
  theoryText?: string;
  practiceText?: string;
  chunks?: string[]; // Optional beginner chunk progression sequence
  targetKeys?: string[]; // Keys to highlight on virtual keyboard e.g. ["F", "J"]
  minAccuracy?: number; // e.g. 85 or 90
  estimatedMinutes: number;
}
