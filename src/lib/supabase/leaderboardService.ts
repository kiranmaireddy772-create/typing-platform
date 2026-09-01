import { supabase, isSupabaseConfigured } from "./supabaseClient";

export interface TypingLeaderboardEntry {
  username: string | null;
  display_name: string;
  avatar_url: string | null;
  duration: number;
  wpm: number;
  accuracy: number;
  date: string;
}

export interface GameLeaderboardEntry {
  username: string | null;
  display_name: string;
  avatar_url: string | null;
  game_id: string;
  best_score: number;
  metric_value: number;
  best_accuracy: number;
}

export interface StreakLeaderboardEntry {
  username: string | null;
  display_name: string;
  avatar_url: string | null;
  current_streak: number;
  longest_streak: number;
  last_completed_date: string | null;
}

export async function fetchTypingLeaderboard(
  duration: 15 | 30 | 60,
  limit = 50
): Promise<TypingLeaderboardEntry[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  try {
    const { data, error } = await supabase.rpc("get_global_typing_leaderboard", {
      p_duration: duration,
      p_limit: limit,
    });

    if (error) {
      console.error("Error fetching typing leaderboard:", error);
      return [];
    }

    return (data as TypingLeaderboardEntry[]) || [];
  } catch (err) {
    console.error("Failed to query typing leaderboard:", err);
    return [];
  }
}

export async function fetchGameLeaderboard(
  gameId: "word_sprint" | "falling_words" | "accuracy",
  limit = 50
): Promise<GameLeaderboardEntry[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  try {
    const { data, error } = await supabase.rpc("get_global_game_leaderboard", {
      p_game_id: gameId,
      p_limit: limit,
    });

    if (error) {
      console.error("Error fetching game leaderboard:", error);
      return [];
    }

    return (data as GameLeaderboardEntry[]) || [];
  } catch (err) {
    console.error("Failed to query game leaderboard:", err);
    return [];
  }
}

export async function fetchStreakLeaderboard(
  limit = 50
): Promise<StreakLeaderboardEntry[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  try {
    const { data, error } = await supabase.rpc("get_global_streak_leaderboard", {
      p_limit: limit,
    });

    if (error) {
      console.error("Error fetching streak leaderboard:", error);
      return [];
    }

    return (data as StreakLeaderboardEntry[]) || [];
  } catch (err) {
    console.error("Failed to query streak leaderboard:", err);
    return [];
  }
}
