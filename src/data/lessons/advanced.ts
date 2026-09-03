import { Lesson } from "./types";

export const ADVANCED_LESSONS: Lesson[] = [
  {
    id: "lesson-11",
    tier: "advanced",
    lessonNumber: 11,
    title: "Advanced Word Drills",
    subtitle: "High-Frequency Vocabulary",
    description: "Build muscle memory across common English words and technical terms.",
    objectives: [
      "Type high-frequency vocabulary without hesitation",
      "Eliminate pauses between key sequences",
    ],
    type: "word_practice",
    theoryText:
      "Advanced typing relies on chunking whole words into single fluid motions rather than individual keypresses.",
    chunks: [
      "system",
      "function",
      "interface",
      "algorithm",
      "system function",
      "interface algorithm",
      "system function performance",
      "database component developer",
      "software architecture data structure execution",
      "type safe application development workflow",
    ],
    practiceText:
      "system function interface algorithm system function interface algorithm system function performance database component developer software architecture data structure execution type safe application development workflow",
    minAccuracy: 92,
    estimatedMinutes: 6,
  },
  {
    id: "lesson-12",
    tier: "advanced",
    lessonNumber: 12,
    title: "Sentence Flow & Rhythm",
    subtitle: "Pacing & Continuous Flow",
    description: "Maintain a steady typing pace across complete sentences with mixed case and punctuation.",
    objectives: [
      "Maintain constant typing cadence across long sentences",
      "Keep accuracy above 92%",
    ],
    type: "sentence_practice",
    theoryText:
      "A steady, calm typing rhythm is much faster than bursts of speed followed by corrections.",
    chunks: [
      "Clean code",
      "Clean code always reads",
      "Clean code always reads like well-written prose.",
      "Consistency and clarity naturally lead to high typing speed.",
      "Maintain a steady, calm rhythm across every long sentence.",
    ],
    practiceText:
      "Clean code Clean code always reads Clean code always reads like well-written prose. Consistency and clarity naturally lead to high typing speed. Maintain a steady, calm rhythm across every long sentence.",
    minAccuracy: 92,
    estimatedMinutes: 6,
  },
  {
    id: "lesson-13",
    tier: "advanced",
    lessonNumber: 13,
    title: "Paragraph Endurance",
    subtitle: "Long Passages",
    description: "Build endurance by typing full multi-sentence paragraphs without looking down.",
    objectives: [
      "Maintain focus and wrist relaxation over extended text passages",
      "Develop stamina for long typing sessions",
    ],
    type: "sentence_practice",
    theoryText:
      "Endurance comes from keeping your hands relaxed and avoiding tension in your shoulders and wrists.",
    chunks: [
      "Building skills",
      "daily practice",
      "Building strong touch typing skills requires patience.",
      "Building strong touch typing skills requires patience and daily practice.",
      "As you master each key row, your fingers naturally find their positions without conscious effort.",
      "Endurance comes from keeping your wrists level, hands relaxed, and posture straight.",
    ],
    practiceText:
      "Building skills daily practice Building strong touch typing skills requires patience. Building strong touch typing skills requires patience and daily practice. As you master each key row, your fingers naturally find their positions without conscious effort. Endurance comes from keeping your wrists level, hands relaxed, and posture straight.",
    minAccuracy: 92,
    estimatedMinutes: 7,
  },
  {
    id: "lesson-14",
    tier: "advanced",
    lessonNumber: 14,
    title: "Speed Building",
    subtitle: "Pushing WPM Limits",
    description: "Push your limits with fast-paced drills designed to boost your WPM.",
    objectives: [
      "Increase raw typing speed while preserving high accuracy",
      "Achieve 45+ WPM on intermediate text",
    ],
    type: "assessment",
    theoryText:
      "Push your limits! Focus on quick key releases and swift hand movements.",
    chunks: [
      "Fast typists",
      "move smoothly",
      "Fast typists move smoothly between keys.",
      "Fast typists move smoothly between keys without tense pauses.",
      "Keep your typing rhythm steady, release keys quickly, and watch your speed rise.",
      "Push your limits today while keeping your accuracy strictly above ninety percent!",
    ],
    practiceText:
      "Fast typists move smoothly Fast typists move smoothly between keys. Fast typists move smoothly between keys without tense pauses. Keep your typing rhythm steady, release keys quickly, and watch your speed rise. Push your limits today while keeping your accuracy strictly above ninety percent!",
    minAccuracy: 90,
    estimatedMinutes: 7,
  },
  {
    id: "lesson-15",
    tier: "advanced",
    lessonNumber: 15,
    title: "Final Assessment",
    subtitle: "Comprehensive Mastery Test",
    description: "Demonstrate touch typing mastery across all keys, numbers, and punctuation.",
    objectives: [
      "Complete the comprehensive touch typing exam",
      "Achieve 92%+ accuracy and prove home-row mastery",
    ],
    type: "assessment",
    theoryText:
      "Congratulations on reaching the final assessment! Show off your touch-typing skills across this comprehensive graduation test.",
    chunks: [
      "Congratulations",
      "graduation assessment",
      "Congratulations on reaching the final touch-typing graduation assessment!",
      "Your dedication to home row posture, finger independence, and daily practice has built lifelong speed.",
      "Demonstrate total mastery across letters, numbers, and symbols to claim your course certificate today!",
    ],
    practiceText:
      "Congratulations graduation assessment Congratulations on reaching the final touch-typing graduation assessment! Your dedication to home row posture, finger independence, and daily practice has built lifelong speed. Demonstrate total mastery across letters, numbers, and symbols to claim your course certificate today!",
    minAccuracy: 92,
    estimatedMinutes: 8,
  },
];
