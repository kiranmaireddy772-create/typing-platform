export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface TypingPassage {
  id: string;
  difficulty: Difficulty;
  text: string;
}

export const TYPING_PASSAGES: TypingPassage[] = [
  // Beginner Passages (Focus on home row, simple words, short sentences)
  {
    id: "beg-1",
    difficulty: "beginner",
    text: "all fall sad dad glad ask flask salad fall dad as a glass full of water.",
  },
  {
    id: "beg-2",
    difficulty: "beginner",
    text: "the quick brown fox jumps over the lazy dog near the quiet riverbank.",
  },
  {
    id: "beg-3",
    difficulty: "beginner",
    text: "keep your fingers light on the home row keys for maximum comfort and speed.",
  },
  {
    id: "beg-4",
    difficulty: "beginner",
    text: "simple daily typing practice helps you build strong touch typing habits over time.",
  },

  // Intermediate Passages (Standard sentences, punctuation, mixed capitalization)
  {
    id: "int-1",
    difficulty: "intermediate",
    text: "Consistency is far more important than raw speed. Focus on accuracy first, and typing speed will naturally follow with practice.",
  },
  {
    id: "int-2",
    difficulty: "intermediate",
    text: "Modern web applications require efficient keyboard shortcuts and clean coding practices to maximize developer productivity every single day.",
  },
  {
    id: "int-3",
    difficulty: "intermediate",
    text: "Learning to touch type without looking down at your keyboard frees your eyes to stay focused on your work screen continuously.",
  },
  {
    id: "int-4",
    difficulty: "intermediate",
    text: "Great typists maintain a steady, relaxed rhythm across long paragraphs rather than rushing through short word bursts.",
  },

  // Advanced Passages (Technical terms, numbers, symbols, complex structure)
  {
    id: "adv-1",
    difficulty: "advanced",
    text: "In JavaScript, array.map((x, i) => x * 2) returns a new array with transformed values at O(n) runtime complexity; always verify edge cases!",
  },
  {
    id: "adv-2",
    difficulty: "advanced",
    text: "Deploying production builds to Vercel requires configuring SSL/TLS, environment variables like PORT=3000, and HTTP/2 headers efficiently.",
  },
  {
    id: "adv-3",
    difficulty: "advanced",
    text: "Type-safe interfaces in TypeScript version 5.0+ enforce strict null checks, preventing unexpected undefined errors during runtime execution.",
  },
  {
    id: "adv-4",
    difficulty: "advanced",
    text: "Keyboard ergonomics, proper wrist posture (angle: 90°), and periodic 5-minute rest breaks prevent repetitive strain injury (RSI) effectively.",
  },
];

export function getRandomPassage(difficulty?: Difficulty): TypingPassage {
  const filtered = difficulty
    ? TYPING_PASSAGES.filter((p) => p.difficulty === difficulty)
    : TYPING_PASSAGES;
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex] || TYPING_PASSAGES[0];
}
