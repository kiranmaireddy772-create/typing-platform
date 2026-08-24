import { Lesson } from "./types";

export const INTERMEDIATE_LESSONS: Lesson[] = [
  {
    id: "lesson-6",
    tier: "intermediate",
    lessonNumber: 6,
    title: "Top Row Reach",
    subtitle: "Q W E R T & Y U I O P",
    description: "Reach upward from home row to master top-row letters without losing your home position.",
    objectives: [
      "Reach up with fingers to Q W E R T and Y U I O P",
      "Always return fingers to home row after typing top-row letters",
    ],
    type: "key_practice",
    theoryText:
      "To reach the top row, extend your fingers slightly upward while keeping your wrists still. Immediately return your fingers to the home row after striking each key.",
    practiceText: "q w e r t y u i o p quiet water power write report quiet water",
    targetKeys: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    minAccuracy: 88,
    estimatedMinutes: 5,
  },
  {
    id: "lesson-7",
    tier: "intermediate",
    lessonNumber: 7,
    title: "Bottom Row Reach",
    subtitle: "Z X C V B & N M",
    description: "Reach downward from home row to master bottom-row letters.",
    objectives: [
      "Reach down with fingers to Z X C V B and N M",
      "Maintain home-row anchor awareness",
    ],
    type: "key_practice",
    theoryText:
      "Reach your fingers down to the bottom row. Left pinky takes Z, ring takes X, middle takes C, index takes V and B. Right index takes N and M.",
    practiceText: "z x c v b n m voice cab zinc box move combine voice cab box",
    targetKeys: ["Z", "X", "C", "V", "B", "N", "M"],
    minAccuracy: 88,
    estimatedMinutes: 5,
  },
  {
    id: "lesson-8",
    tier: "intermediate",
    lessonNumber: 8,
    title: "Capital Letters & Shift",
    subtitle: "Proper Capitalization",
    description: "Use the opposite hand's Shift key to type capital letters effortlessly.",
    objectives: [
      "Use right Shift when typing left-hand capital letters",
      "Use left Shift when typing right-hand capital letters",
    ],
    type: "key_practice",
    theoryText:
      "Always use the OPPOSITE hand to hold the Shift key! If you want a capital 'A' (left hand), hold Right Shift with your right pinky while pressing 'A' with your left pinky.",
    practiceText: "Alice Bob Charlie David Emma Frank Grace Henry Isaac Julia",
    targetKeys: ["Shift", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    minAccuracy: 90,
    estimatedMinutes: 5,
  },
  {
    id: "lesson-9",
    tier: "intermediate",
    lessonNumber: 9,
    title: "Number Row",
    subtitle: "Digits 1 through 0",
    description: "Reach up to the number row for precise numeric typing.",
    objectives: [
      "Reach up to top number keys 1 2 3 4 5 6 7 8 9 0",
      "Maintain posture while extending fingers upward",
    ],
    type: "key_practice",
    theoryText:
      "Reaching the number row requires a larger extension. Practice reaching up to digits 1 to 5 with your left hand and 6 to 0 with your right hand.",
    practiceText: "123 456 789 0 2026 100% 42 7 99 365 12345 67890",
    targetKeys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    minAccuracy: 88,
    estimatedMinutes: 6,
  },
  {
    id: "lesson-10",
    tier: "intermediate",
    lessonNumber: 10,
    title: "Punctuation & Flow",
    subtitle: "Periods, Commas, Question Marks",
    description: "Master essential punctuation marks for natural sentence typing.",
    objectives: [
      "Type period (.), comma (,), exclamation mark (!), and question mark (?)",
      "Maintain smooth sentence rhythm",
    ],
    type: "sentence_practice",
    theoryText:
      "Punctuation keys are located on the bottom right and top number row. Use your right pinky and ring finger for commas, periods, and question marks.",
    practiceText: "Hello, world! Are you ready to type? Yes, practice makes progress.",
    targetKeys: [".", ",", "!", "?"],
    minAccuracy: 90,
    estimatedMinutes: 6,
  },
];
