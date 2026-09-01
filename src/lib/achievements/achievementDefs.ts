export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "practice" | "lessons" | "games" | "streak" | "leaderboard";
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_steps",
    title: "First Steps",
    description: "Complete your first structured typing lesson",
    icon: "🚀",
    category: "lessons",
  },
  {
    id: "speed_demon",
    title: "Speed Demon",
    description: "Reach 60+ WPM in a 30-second practice test",
    icon: "⚡",
    category: "practice",
  },
  {
    id: "lightning_typist",
    title: "Lightning Typist",
    description: "Reach 100+ WPM in any practice test",
    icon: "🏎️",
    category: "practice",
  },
  {
    id: "sharpshooter",
    title: "Sharpshooter",
    description: "Complete a practice test with 100% accuracy",
    icon: "🎯",
    category: "practice",
  },
  {
    id: "streak_starter",
    title: "Streak Starter",
    description: "Maintain a 3-day active Daily Challenge streak",
    icon: "🔥",
    category: "streak",
  },
  {
    id: "streak_master",
    title: "Streak Master",
    description: "Reach a 7-day Daily Challenge streak",
    icon: "🌋",
    category: "streak",
  },
  {
    id: "curriculum_graduate",
    title: "Curriculum Graduate",
    description: "Complete all 15 structured course lessons",
    icon: "📚",
    category: "lessons",
  },
  {
    id: "arcade_runner",
    title: "Arcade Runner",
    description: "Play all 3 arcade games (Sprint, Falling, Accuracy)",
    icon: "🕹️",
    category: "games",
  },
  {
    id: "sprint_champion",
    title: "Sprint Champion",
    description: "Score 500+ points in Word Sprint",
    icon: "🏃",
    category: "games",
  },
  {
    id: "word_defender",
    title: "Word Defender",
    description: "Reach Level 5 or higher in Falling Words",
    icon: "👾",
    category: "games",
  },
  {
    id: "accuracy_elite",
    title: "Accuracy Elite",
    description: "Score 800+ points in Accuracy Challenge",
    icon: "🛡️",
    category: "games",
  },
  {
    id: "leaderboard_legend",
    title: "Leaderboard Legend",
    description: "Reach the Top 10 on any global leaderboard",
    icon: "👑",
    category: "leaderboard",
  },
];
