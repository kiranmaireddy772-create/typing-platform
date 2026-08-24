export interface ChallengePassage {
  id: string;
  title: string;
  category: "General" | "Technology" | "Productivity" | "Learning" | "Science" | "Programming";
  text: string;
  targetWpm: number;
}

export const CHALLENGE_PASSAGES: ChallengePassage[] = [
  {
    id: "passage-01",
    title: "The Discipline of Daily Practice",
    category: "Productivity",
    text: "Consistency is the key to building enduring skills. Dedicating just ten minutes every day to focused touch-typing will yield far greater speed and precision than sporadic hours of random practice.",
    targetWpm: 45,
  },
  {
    id: "passage-02",
    title: "Understanding Code Structures",
    category: "Programming",
    text: "Writing elegant code requires both logical clarity and rapid typing accuracy. Programmers who master key bindings and special punctuation symbols complete complex algorithms with ease.",
    targetWpm: 50,
  },
  {
    id: "passage-03",
    title: "The Physics of Keyboard Switches",
    category: "Science",
    text: "Mechanical keyboard switches use spring mechanisms and contact leaves to actuate keystrokes. Each key switch offers distinct tactile feedback, travel distance, and actuation forces for optimal typing comfort.",
    targetWpm: 48,
  },
  {
    id: "passage-04",
    title: "Digital Mindsets and Focus",
    category: "Technology",
    text: "Deep work in a modern digital environment demands eliminating distractions. Developing muscle memory for typing enables your mind to flow seamlessly from thought to written expression.",
    targetWpm: 42,
  },
  {
    id: "passage-05",
    title: "The Joy of Learning",
    category: "Learning",
    text: "Every new skill acquired opens doors to fresh opportunities. Embracing mistakes as natural steps in the learning journey empowers you to overcome challenges with confidence and resilience.",
    targetWpm: 40,
  },
  {
    id: "passage-06",
    title: "Optimizing Your Daily Routine",
    category: "Productivity",
    text: "Structuring your daily routine with intentional habits creates space for meaningful achievement. Small daily improvements compound over weeks and months into extraordinary performance.",
    targetWpm: 46,
  },
  {
    id: "passage-07",
    title: "Algorithms and Data Representation",
    category: "Programming",
    text: "Computers process data through structured algorithms and memory allocation. Efficient data structures like trees, hash tables, and arrays allow applications to execute complex queries instantly.",
    targetWpm: 52,
  },
  {
    id: "passage-08",
    title: "The History of Typewriters",
    category: "General",
    text: "The QWERTY keyboard layout was created in the nineteenth century for mechanical typewriters. Designed to prevent mechanical jam, it remains the global standard for modern digital devices.",
    targetWpm: 44,
  },
  {
    id: "passage-09",
    title: "Neuroplasticity and Skill Acquisition",
    category: "Science",
    text: "The human brain reorganizes itself by forming new neural connections during repetitive practice. Muscle memory formed through typing practice strengthens pathways in the motor cortex.",
    targetWpm: 47,
  },
  {
    id: "passage-10",
    title: "Effective Communication in Writing",
    category: "General",
    text: "Clear writing reflects clear thinking. Being able to type quickly allows writers to capture fleeting ideas before they fade, leading to richer essays and persuasive arguments.",
    targetWpm: 45,
  },
  {
    id: "passage-11",
    title: "Clean Code Principles",
    category: "Programming",
    text: "Clean code reads like well-crafted prose. Variable names should clearly state their intent, functions should be small and focused, and logic should remain predictable and testable.",
    targetWpm: 50,
  },
  {
    id: "passage-12",
    title: "The Evolution of Cloud Computing",
    category: "Technology",
    text: "Cloud infrastructure transformed how software applications deploy globally. Distributed systems now deliver real-time data across continents in fractions of a second.",
    targetWpm: 49,
  },
  {
    id: "passage-13",
    title: "Building Positive Habits",
    category: "Productivity",
    text: "Habits are the compound interest of self-improvement. By repeating a simple habit daily, you establish momentum that makes complex tasks feel natural and effortless.",
    targetWpm: 43,
  },
  {
    id: "passage-14",
    title: "Ergonomics at work",
    category: "General",
    text: "Proper posture, wrist support, and monitor alignment prevent fatigue during long computer sessions. Keeping wrists neutral and taking periodic breaks keeps your body healthy and energetic.",
    targetWpm: 42,
  },
  {
    id: "passage-15",
    title: "Artificial Intelligence Essentials",
    category: "Technology",
    text: "Machine learning algorithms analyze vast datasets to discover underlying patterns. Neural networks process inputs through artificial layers to make intelligent predictions.",
    targetWpm: 48,
  },
  {
    id: "passage-16",
    title: "Mastering the Home Row",
    category: "Learning",
    text: "Returning your fingers to the home row keys after every stroke builds spatial awareness. Guide marks on the F and J keys orient your hands without requiring a visual check.",
    targetWpm: 45,
  },
  {
    id: "passage-17",
    title: "The Architecture of Web Engines",
    category: "Programming",
    text: "Browser layout engines parse HTML documents and execute JavaScript scripts concurrently. Rendering pipelines convert styled DOM nodes into pixels on modern high-refresh screens.",
    targetWpm: 51,
  },
  {
    id: "passage-18",
    title: "Curiosity and Exploration",
    category: "Learning",
    text: "Curiosity drives innovation and discovery across every scientific field. Asking thoughtful questions leads to breakthrough discoveries that reshape our understanding of the universe.",
    targetWpm: 44,
  },
  {
    id: "passage-19",
    title: "Focus in an Age of Noise",
    category: "Productivity",
    text: "Sustained focus is becoming a rare and valuable superpower. Protecting your time from constant notifications empowers you to solve complex technical problems with precision.",
    targetWpm: 46,
  },
  {
    id: "passage-20",
    title: "Principles of Software Testing",
    category: "Programming",
    text: "Automated unit tests ensure code changes preserve existing functionality. Writing test cases before refactoring software provides confidence that edge cases are properly handled.",
    targetWpm: 49,
  },
];
