export interface AccuracyPassage {
  id: string;
  title: string;
  text: string;
  targetWpm: number;
}

export const ACCURACY_PASSAGES: AccuracyPassage[] = [
  {
    id: "accuracy-1",
    title: "Precision and Consistency",
    text: "Precision is far more valuable than raw speed when developing touch-typing skills. Focusing on clear finger posture and smooth key transitions naturally increases speed over time.",
    targetWpm: 40,
  },
  {
    id: "accuracy-2",
    title: "Rhythm of Typing",
    text: "Maintaining a steady rhythm allows your mind to stay ahead of your hands. When every keystroke is accurate, backspaces become unnecessary and overall typing output dramatically improves.",
    targetWpm: 50,
  },
  {
    id: "accuracy-3",
    title: "The Art of Mastery",
    text: "Mastering the keyboard requires discipline, patience, and repetition. By deliberately practicing challenging punctuation and number keys, you unlock seamless coding and professional writing.",
    targetWpm: 60,
  },
];

export function getRandomAccuracyPassage(): AccuracyPassage {
  return ACCURACY_PASSAGES[Math.floor(Math.random() * ACCURACY_PASSAGES.length)];
}
