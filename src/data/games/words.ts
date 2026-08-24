export interface CategorizedWords {
  easy: string[];
  medium: string[];
  hard: string[];
}

export const GAME_WORDS: CategorizedWords = {
  easy: [
    "cat", "dog", "book", "tree", "home", "star", "sun", "moon", "fire", "water",
    "wind", "rock", "fish", "bird", "door", "desk", "park", "city", "road", "fast",
    "bold", "cool", "wave", "blue", "gold", "kind", "pure", "hope", "lamp", "ship",
    "farm", "rain", "snow", "warm", "rich", "mind", "play", "time", "word", "song",
  ],
  medium: [
    "keyboard", "computer", "student", "practice", "learning", "challenge",
    "mastery", "accuracy", "progress", "standard", "velocity", "terminal",
    "monitor", "network", "function", "variable", "software", "hardware",
    "spectrum", "platform", "feedback", "routine", "protocol", "scenery",
    "movement", "strategy", "sequence", "language", "instance", "template",
  ],
  hard: [
    "development", "programming", "technology", "application", "information",
    "architecture", "performance", "optimization", "infrastructure", "synchronous",
    "multithreading", "computational", "encapsulation", "polymorphism", "implementation",
    "transformation", "quantification", "authentication", "responsiveness", "customization",
    "reusability", "interoperability", "orchestration", "parallelism", "systematic",
  ],
};

export function getRandomWord(difficulty: "easy" | "medium" | "hard" = "easy", excludeWord?: string): string {
  const pool = GAME_WORDS[difficulty];
  let chosen: string;
  do {
    chosen = pool[Math.floor(Math.random() * pool.length)];
  } while (excludeWord && pool.length > 1 && chosen === excludeWord);
  return chosen;
}

export function getRandomWords(count: number, difficulty: "easy" | "medium" | "hard" = "medium"): string[] {
  const pool = GAME_WORDS[difficulty];
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(pool[Math.floor(Math.random() * pool.length)]);
  }
  return result;
}
