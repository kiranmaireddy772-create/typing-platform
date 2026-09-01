export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface TypingPassage {
  id: string;
  difficulty: Difficulty;
  text: string;
}

export const TYPING_PASSAGES: TypingPassage[] = [
  // Beginner Passages (Home row, short simple words, friendly rhythm)
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
  {
    id: "beg-5",
    difficulty: "beginner",
    text: "look straight ahead at the screen while keeping your hands relaxed and steady.",
  },
  {
    id: "beg-6",
    difficulty: "beginner",
    text: "take a soft breath and let your fingers find the guide bumps on f and j.",
  },
  {
    id: "beg-7",
    difficulty: "beginner",
    text: "small steps every day lead to high accuracy and smooth typing confidence.",
  },
  {
    id: "beg-8",
    difficulty: "beginner",
    text: "red apples and green pears rest on a wooden table near the sunny window.",
  },
  {
    id: "beg-9",
    difficulty: "beginner",
    text: "blue birds sing sweet songs high in the leafy branches during early spring.",
  },
  {
    id: "beg-10",
    difficulty: "beginner",
    text: "fresh water flows down the clear mountain stream under the bright blue sky.",
  },
  {
    id: "beg-11",
    difficulty: "beginner",
    text: "kind words and gentle actions make every single day feel brighter and warmer.",
  },
  {
    id: "beg-12",
    difficulty: "beginner",
    text: "learning to type without looking down opens up faster writing for a lifetime.",
  },
  {
    id: "beg-13",
    difficulty: "beginner",
    text: "practice makes progress when you focus on clean rhythm and low mistakes.",
  },
  {
    id: "beg-14",
    difficulty: "beginner",
    text: "bright stars shine softly in the dark night sky as the cool wind blows.",
  },
  {
    id: "beg-15",
    difficulty: "beginner",
    text: "stay calm and keep a steady pace while your hands learn key locations naturally.",
  },

  // Intermediate Passages (Standard sentences, punctuation, mixed capitalization, tech & life)
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
  {
    id: "int-5",
    difficulty: "intermediate",
    text: "Building software with Next.js and React allows developers to render dynamic components smoothly on both server and client.",
  },
  {
    id: "int-6",
    difficulty: "intermediate",
    text: "Clear communication in remote teams starts with well-formatted documentation, thoughtful comments, and concise pull requests.",
  },
  {
    id: "int-7",
    difficulty: "intermediate",
    text: "When writing prose or code, accurate touch typing lets your ideas flow effortlessly from thought directly to digital text.",
  },
  {
    id: "int-8",
    difficulty: "intermediate",
    text: "Maintaining proper desk posture with uncrossed legs and level wrists reduces physical strain during extended typing sessions.",
  },
  {
    id: "int-9",
    difficulty: "intermediate",
    text: "Effective debugging requires systematic testing, reading stack traces carefully, and isolating unexpected state mutations.",
  },
  {
    id: "int-10",
    difficulty: "intermediate",
    text: "Designing responsive user interfaces means crafting layouts that adapt seamlessly from mobile screens to desktop monitors.",
  },
  {
    id: "int-11",
    difficulty: "intermediate",
    text: "Mastering terminal commands and CLI utilities increases daily productivity by automating repetitive file tasks instantly.",
  },
  {
    id: "int-12",
    difficulty: "intermediate",
    text: "Continuous practice develops strong muscle memory, allowing your brain to focus entirely on problem solving rather than key searching.",
  },
  {
    id: "int-13",
    difficulty: "intermediate",
    text: "A well-structured database schema with clean indexes speeds up query response times and supports application scalability.",
  },
  {
    id: "int-14",
    difficulty: "intermediate",
    text: "Collaborating on GitHub with clear commit messages and modular feature branches keeps codebase history readable and manageable.",
  },
  {
    id: "int-15",
    difficulty: "intermediate",
    text: "Balancing speed with ninety-eight percent accuracy ensures your typing output requires minimal editing or correction later.",
  },

  // Advanced Passages (Technical terms, code snippets, numbers, symbols, complex sentence structures)
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
  {
    id: "adv-5",
    difficulty: "advanced",
    text: "PostgreSQL row-level security (RLS) policies enforce strict tenant isolation using auth.uid() = user_id checks across all API requests.",
  },
  {
    id: "adv-6",
    difficulty: "advanced",
    text: "Asynchronous I/O pipelines using async/await syntax prevent blocking the main event loop during heavy payload processing tasks.",
  },
  {
    id: "adv-7",
    difficulty: "advanced",
    text: "RESTful endpoints return HTTP status code 200 OK for successful fetches, 401 Unauthorized for invalid tokens, and 500 for internal errors.",
  },
  {
    id: "adv-8",
    difficulty: "advanced",
    text: "Microservices communicate via gRPC protocols or JSON over HTTPS, relying on distributed tracing (e.g. OpenTelemetry) for observability.",
  },
  {
    id: "adv-9",
    difficulty: "advanced",
    text: "Docker containers wrap application binaries, node_modules, and configuration files into reproducible images for Kubernetes deployment.",
  },
  {
    id: "adv-10",
    difficulty: "advanced",
    text: "CSS Grid and Flexbox properties like grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) create fluid responsive web pages.",
  },
  {
    id: "adv-11",
    difficulty: "advanced",
    text: "Garbage collection in modern JavaScript engines (V8) uses generational mark-and-sweep sweeps to reclaim unused heap memory pages.",
  },
  {
    id: "adv-12",
    difficulty: "advanced",
    text: "Git commands like git rebase -i HEAD~3 allow developers to squash commits cleanly before merging feature branches to production.",
  },
  {
    id: "adv-13",
    difficulty: "advanced",
    text: "WebSockets establish bi-directional TCP connections with minimal header overhead, enabling real-time chat and live leaderboard updates.",
  },
  {
    id: "adv-14",
    difficulty: "advanced",
    text: "State management using React's useSyncExternalStore hook ensures concurrent rendering hydration safety without tearing glitches.",
  },
  {
    id: "adv-15",
    difficulty: "advanced",
    text: "Content delivery networks (CDNs) cache static assets globally at edge nodes (latency < 20ms), accelerating dynamic page load speeds.",
  },
];

const recentPassageIds: string[] = [];

export function getRandomPassage(difficulty?: Difficulty, excludeId?: string): TypingPassage {
  const filtered = difficulty
    ? TYPING_PASSAGES.filter((p) => p.difficulty === difficulty)
    : TYPING_PASSAGES;

  const available = filtered.filter(
    (p) => p.id !== excludeId && !recentPassageIds.includes(p.id)
  );

  const pool = available.length > 0 ? available : filtered.filter((p) => p.id !== excludeId);
  const chosen = pool[Math.floor(Math.random() * pool.length)] || filtered[0] || TYPING_PASSAGES[0];

  recentPassageIds.push(chosen.id);
  if (recentPassageIds.length > 10) {
    recentPassageIds.shift();
  }

  return chosen;
}
