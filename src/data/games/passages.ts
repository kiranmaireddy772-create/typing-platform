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
  {
    id: "accuracy-4",
    title: "Focus Under Pressure",
    text: "True typing mastery shines when you remain calm under time pressure. Rushing leads to accidental miskeys, while deliberate focus keeps your accuracy at a flawless high percentage.",
    targetWpm: 45,
  },
  {
    id: "accuracy-5",
    title: "Clean Code Syntax",
    text: "Software engineering relies on precise syntax details. A single missing semicolon or misplaced bracket can break a build, making finger precision an essential developer asset.",
    targetWpm: 55,
  },
  {
    id: "accuracy-6",
    title: "Ergonomics and Flow",
    text: "Relaxing your wrists and keeping your elbows at ninety degrees prevents muscle fatigue. Ergonomic alignment allows typists to maintain peak speed during long coding sessions.",
    targetWpm: 50,
  },
  {
    id: "accuracy-7",
    title: "Cognitive Processing",
    text: "Touch typing turns thought directly into written text without visual distraction. Once finger movements become subconscious memory, your creative and analytical writing flows freely.",
    targetWpm: 65,
  },
  {
    id: "accuracy-8",
    title: "Home Row Anchor",
    text: "Always return your index fingers to the tactile bumps on F and J keys. Anchoring on the home row ensures accurate finger reaches across top and bottom letter rows effortlessly.",
    targetWpm: 40,
  },
];

export function getRandomAccuracyPassage(excludeId?: string): AccuracyPassage {
  const available = excludeId
    ? ACCURACY_PASSAGES.filter((p) => p.id !== excludeId)
    : ACCURACY_PASSAGES;
  return available[Math.floor(Math.random() * available.length)] || ACCURACY_PASSAGES[0];
}
