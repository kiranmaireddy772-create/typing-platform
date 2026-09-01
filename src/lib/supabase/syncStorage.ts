import { User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { getPersonalBest, savePersonalBest } from "@/lib/typing/typingStorage";
import { getCompletedLessons, saveLessonCompletion } from "@/lib/lessons/lessonProgress";
import { getAllGameScores, saveWordSprintScore, saveFallingWordsScore, saveAccuracyScore } from "@/lib/games/gameStorage";
import { getDailyChallengeStore, saveDailyChallengeCompletion, DailyResult } from "@/lib/challenges/challengeStorage";

export async function syncLocalStorageToCloud(userId: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase || !userId) {
    return false;
  }

  try {
    // 1. Sync Personal Bests (15s, 30s, 60s)
    const durations = [15, 30, 60];
    const { data: cloudPbs, error: fetchPbErr } = await supabase
      .from("user_personal_bests")
      .select("*")
      .eq("user_id", userId);

    if (fetchPbErr) {
      console.error("Error fetching cloud personal bests during sync:", fetchPbErr);
    }

    const cloudPbMap: Record<number, { wpm: number; accuracy: number; date: string }> = {};
    cloudPbs?.forEach((pb) => {
      cloudPbMap[pb.duration] = { wpm: pb.wpm, accuracy: Number(pb.accuracy), date: pb.date };
    });

    for (const d of durations) {
      const local = getPersonalBest(d);
      const cloud = cloudPbMap[d];

      if (local && (!cloud || local.wpm > cloud.wpm || (local.wpm === cloud.wpm && local.accuracy > cloud.accuracy))) {
        // Local is better, push to cloud
        const { error } = await supabase.from("user_personal_bests").upsert(
          {
            user_id: userId,
            duration: d,
            wpm: Math.round(local.wpm),
            accuracy: Math.round(local.accuracy * 100) / 100,
            date: local.date,
          },
          { onConflict: "user_id,duration" }
        );
        if (error) {
          console.error(`Error upserting PB duration ${d} to cloud during sync:`, error);
        }
      } else if (cloud && (!local || cloud.wpm > local.wpm || (cloud.wpm === local.wpm && cloud.accuracy > local.accuracy))) {
        // Cloud is better, update local
        savePersonalBest(d, cloud.wpm, cloud.accuracy);
      }
    }

    // 2. Sync Lesson Progress
    const localLessons = getCompletedLessons();
    const { data: cloudLessons, error: fetchLessonErr } = await supabase
      .from("user_lesson_progress")
      .select("*")
      .eq("user_id", userId);

    if (fetchLessonErr) {
      console.error("Error fetching cloud lesson progress during sync:", fetchLessonErr);
    }

    const cloudLessonMap: Record<string, { wpm: number; accuracy: number }> = {};
    cloudLessons?.forEach((l) => {
      cloudLessonMap[l.lesson_id] = { wpm: l.wpm, accuracy: Number(l.accuracy) };
    });

    // Merge union of lessons
    const allLessonIds = new Set([...Object.keys(localLessons), ...Object.keys(cloudLessonMap)]);
    for (const id of allLessonIds) {
      const local = localLessons[id];
      const cloud = cloudLessonMap[id];

      const bestWpm = Math.max(local?.wpm || 0, cloud?.wpm || 0);
      const bestAcc = Math.max(local?.accuracy || 0, cloud?.accuracy || 0);

      if (bestWpm > 0) {
        saveLessonCompletion(id, bestWpm, bestAcc);
        if (!cloud || bestWpm > cloud.wpm || bestAcc > cloud.accuracy) {
          const { error } = await supabase.from("user_lesson_progress").upsert(
            {
              user_id: userId,
              lesson_id: id,
              completed: true,
              wpm: Math.round(bestWpm),
              accuracy: Math.round(bestAcc * 100) / 100,
              completed_at: new Date().toISOString(),
            },
            { onConflict: "user_id,lesson_id" }
          );
          if (error) {
            console.error(`Error upserting lesson ${id} to cloud during sync:`, error);
          }
        }
      }
    }

    // 3. Sync Game Scores
    const localGames = getAllGameScores();
    const { data: cloudGames, error: fetchGameErr } = await supabase
      .from("user_game_scores")
      .select("*")
      .eq("user_id", userId);

    if (fetchGameErr) {
      console.error("Error fetching cloud game scores during sync:", fetchGameErr);
    }

    const cloudGameMap: Record<string, { best_score: number; metric_value: number; best_accuracy: number }> = {};
    cloudGames?.forEach((g) => {
      cloudGameMap[g.game_id] = {
        best_score: g.best_score,
        metric_value: g.metric_value,
        best_accuracy: Number(g.best_accuracy),
      };
    });

    // Word Sprint
    const localWS = localGames.wordSprint;
    const cloudWS = cloudGameMap["word_sprint"];
    if (localWS && (!cloudWS || localWS.bestScore > cloudWS.best_score)) {
      const { error } = await supabase.from("user_game_scores").upsert(
        {
          user_id: userId,
          game_id: "word_sprint",
          best_score: Math.round(localWS.bestScore),
          metric_value: Math.round(localWS.bestWpm),
          best_accuracy: Math.round(localWS.bestAccuracy * 100) / 100,
        },
        { onConflict: "user_id,game_id" }
      );
      if (error) console.error("Error upserting Word Sprint score to cloud during sync:", error);
    } else if (cloudWS && (!localWS || cloudWS.best_score > localWS.bestScore)) {
      saveWordSprintScore(cloudWS.best_score, cloudWS.metric_value, cloudWS.best_accuracy);
    }

    // Falling Words
    const localFW = localGames.fallingWords;
    const cloudFW = cloudGameMap["falling_words"];
    if (localFW && (!cloudFW || localFW.bestScore > cloudFW.best_score)) {
      const { error } = await supabase.from("user_game_scores").upsert(
        {
          user_id: userId,
          game_id: "falling_words",
          best_score: Math.round(localFW.bestScore),
          metric_value: Math.round(localFW.highestLevel),
          best_accuracy: Math.round(localFW.bestAccuracy * 100) / 100,
        },
        { onConflict: "user_id,game_id" }
      );
      if (error) console.error("Error upserting Falling Words score to cloud during sync:", error);
    } else if (cloudFW && (!localFW || cloudFW.best_score > localFW.bestScore)) {
      saveFallingWordsScore(cloudFW.best_score, cloudFW.metric_value, cloudFW.best_accuracy);
    }

    // Accuracy Challenge
    const localAC = localGames.accuracy;
    const cloudAC = cloudGameMap["accuracy"];
    if (localAC && (!cloudAC || localAC.bestScore > cloudAC.best_score)) {
      const { error } = await supabase.from("user_game_scores").upsert(
        {
          user_id: userId,
          game_id: "accuracy",
          best_score: Math.round(localAC.bestScore),
          metric_value: Math.round(localAC.bestWpm),
          best_accuracy: Math.round(localAC.bestAccuracy * 100) / 100,
        },
        { onConflict: "user_id,game_id" }
      );
      if (error) console.error("Error upserting Accuracy score to cloud during sync:", error);
    } else if (cloudAC && (!localAC || cloudAC.best_score > localAC.bestScore)) {
      saveAccuracyScore(cloudAC.best_score, cloudAC.metric_value, cloudAC.best_accuracy);
    }

    // 4. Sync Daily Challenge & Streak
    const localDaily = getDailyChallengeStore();
    const { data: cloudDaily, error: fetchDailyErr } = await supabase
      .from("user_daily_challenges")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (fetchDailyErr && fetchDailyErr.code !== "PGRST116") {
      console.error("Error fetching cloud daily challenge during sync:", fetchDailyErr);
    }

    if (cloudDaily) {
      const cloudResults = (cloudDaily.daily_results || {}) as Record<string, DailyResult>;
      const mergedStreak = Math.max(localDaily.currentStreak, cloudDaily.current_streak);
      const mergedLongest = Math.max(localDaily.longestStreak, cloudDaily.longest_streak);
      const mergedResults: Record<string, DailyResult> = {
        ...(localDaily.dailyResults || {}),
        ...cloudResults,
      };

      const { error } = await supabase.from("user_daily_challenges").upsert({
        user_id: userId,
        current_streak: Math.round(mergedStreak),
        longest_streak: Math.round(mergedLongest),
        last_completed_date: localDaily.lastCompletedDate || cloudDaily.last_completed_date,
        daily_results: mergedResults,
      });
      if (error) console.error("Error upserting Daily Challenge to cloud during sync:", error);

      // Update local storage
      Object.values(mergedResults).forEach((res) => {
        if (res && res.wpm) {
          saveDailyChallengeCompletion(res.wpm, res.accuracy, res.errors, res.date);
        }
      });
    } else if (localDaily.currentStreak > 0 || Object.keys(localDaily.dailyResults).length > 0) {
      const { error } = await supabase.from("user_daily_challenges").upsert({
        user_id: userId,
        current_streak: Math.round(localDaily.currentStreak),
        longest_streak: Math.round(localDaily.longestStreak),
        last_completed_date: localDaily.lastCompletedDate,
        daily_results: localDaily.dailyResults,
      });
      if (error) console.error("Error upserting Daily Challenge to cloud during sync:", error);
    }

    return true;
  } catch (err) {
    console.error("Error during cloud storage sync:", err);
    return false;
  }
}

// Background Cloud Save Helpers for Logged-In Users
export async function savePersonalBestCloud(duration: number, wpm: number, accuracy: number): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    const sessionRes = await supabase.auth.getSession();
    let user: User | null | undefined = sessionRes.data.session?.user;
    if (!user) {
      const userRes = await supabase.auth.getUser();
      user = userRes.data.user;
    }
    if (!user) return;

    const { error } = await supabase.from("user_personal_bests").upsert(
      {
        user_id: user.id,
        duration: Math.round(duration),
        wpm: Math.round(wpm),
        accuracy: Math.round(accuracy * 100) / 100,
        date: new Date().toISOString().split("T")[0],
      },
      { onConflict: "user_id,duration" }
    );

    if (error) {
      console.error("Error upserting personal best to Supabase:", error);
    }
  } catch (err) {
    console.error("Failed to sync personal best to cloud:", err);
  }
}

export async function saveGameScoreCloud(
  gameId: string,
  bestScore: number,
  metricValue: number,
  bestAccuracy: number
): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    const sessionRes = await supabase.auth.getSession();
    let user: User | null | undefined = sessionRes.data.session?.user;
    if (!user) {
      const userRes = await supabase.auth.getUser();
      user = userRes.data.user;
    }
    if (!user) return;

    const { error } = await supabase.from("user_game_scores").upsert(
      {
        user_id: user.id,
        game_id: gameId,
        best_score: Math.round(bestScore),
        metric_value: Math.round(metricValue),
        best_accuracy: Math.round(bestAccuracy * 100) / 100,
      },
      { onConflict: "user_id,game_id" }
    );

    if (error) {
      console.error("Error upserting game score to Supabase:", error);
    }
  } catch (err) {
    console.error("Failed to sync game score to cloud:", err);
  }
}

export async function saveDailyChallengeCloud(
  currentStreak: number,
  longestStreak: number,
  lastDate: string | null,
  dailyResults: Record<string, unknown>
): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    const sessionRes = await supabase.auth.getSession();
    let user: User | null | undefined = sessionRes.data.session?.user;
    if (!user) {
      const userRes = await supabase.auth.getUser();
      user = userRes.data.user;
    }
    if (!user) return;

    const { error } = await supabase.from("user_daily_challenges").upsert(
      {
        user_id: user.id,
        current_streak: Math.round(currentStreak),
        longest_streak: Math.round(longestStreak),
        last_completed_date: lastDate,
        daily_results: dailyResults,
      },
      { onConflict: "user_id" }
    );

    if (error) {
      console.error("Error upserting daily challenge to Supabase:", error);
    }
  } catch (err) {
    console.error("Failed to sync daily challenge to cloud:", err);
  }
}

export async function syncAchievementCloud(achievementId: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    const sessionRes = await supabase.auth.getSession();
    let user: User | null | undefined = sessionRes.data.session?.user;
    if (!user) {
      const userRes = await supabase.auth.getUser();
      user = userRes.data.user;
    }
    if (!user) return;

    const { error } = await supabase.from("user_achievements").upsert(
      {
        user_id: user.id,
        achievement_id: achievementId,
      },
      { onConflict: "user_id,achievement_id" }
    );

    if (error) {
      console.error("Error syncing achievement to cloud:", error);
    }
  } catch (err) {
    console.error("Failed to sync achievement to cloud:", err);
  }
}
