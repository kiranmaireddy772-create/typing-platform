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
    const { data: cloudPbs } = await supabase
      .from("user_personal_bests")
      .select("*")
      .eq("user_id", userId);

    const cloudPbMap: Record<number, { wpm: number; accuracy: number; date: string }> = {};
    cloudPbs?.forEach((pb) => {
      cloudPbMap[pb.duration] = { wpm: pb.wpm, accuracy: Number(pb.accuracy), date: pb.date };
    });

    for (const d of durations) {
      const local = getPersonalBest(d);
      const cloud = cloudPbMap[d];

      if (local && (!cloud || local.wpm > cloud.wpm || (local.wpm === cloud.wpm && local.accuracy > cloud.accuracy))) {
        // Local is better, push to cloud
        await supabase.from("user_personal_bests").upsert(
          {
            user_id: userId,
            duration: d,
            wpm: local.wpm,
            accuracy: local.accuracy,
            date: local.date,
          },
          { onConflict: "user_id,duration" }
        );
      } else if (cloud && (!local || cloud.wpm > local.wpm || (cloud.wpm === local.wpm && cloud.accuracy > local.accuracy))) {
        // Cloud is better, update local
        savePersonalBest(d, cloud.wpm, cloud.accuracy);
      }
    }

    // 2. Sync Lesson Progress
    const localLessons = getCompletedLessons();
    const { data: cloudLessons } = await supabase
      .from("user_lesson_progress")
      .select("*")
      .eq("user_id", userId);

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
          await supabase.from("user_lesson_progress").upsert(
            {
              user_id: userId,
              lesson_id: id,
              completed: true,
              wpm: bestWpm,
              accuracy: bestAcc,
              completed_at: new Date().toISOString(),
            },
            { onConflict: "user_id,lesson_id" }
          );
        }
      }
    }

    // 3. Sync Game Scores
    const localGames = getAllGameScores();
    const { data: cloudGames } = await supabase
      .from("user_game_scores")
      .select("*")
      .eq("user_id", userId);

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
      await supabase.from("user_game_scores").upsert(
        {
          user_id: userId,
          game_id: "word_sprint",
          best_score: localWS.bestScore,
          metric_value: localWS.bestWpm,
          best_accuracy: localWS.bestAccuracy,
        },
        { onConflict: "user_id,game_id" }
      );
    } else if (cloudWS && (!localWS || cloudWS.best_score > localWS.bestScore)) {
      saveWordSprintScore(cloudWS.best_score, cloudWS.metric_value, cloudWS.best_accuracy);
    }

    // Falling Words
    const localFW = localGames.fallingWords;
    const cloudFW = cloudGameMap["falling_words"];
    if (localFW && (!cloudFW || localFW.bestScore > cloudFW.best_score)) {
      await supabase.from("user_game_scores").upsert(
        {
          user_id: userId,
          game_id: "falling_words",
          best_score: localFW.bestScore,
          metric_value: localFW.highestLevel,
          best_accuracy: localFW.bestAccuracy,
        },
        { onConflict: "user_id,game_id" }
      );
    } else if (cloudFW && (!localFW || cloudFW.best_score > localFW.bestScore)) {
      saveFallingWordsScore(cloudFW.best_score, cloudFW.metric_value, cloudFW.best_accuracy);
    }

    // Accuracy Challenge
    const localAC = localGames.accuracy;
    const cloudAC = cloudGameMap["accuracy"];
    if (localAC && (!cloudAC || localAC.bestScore > cloudAC.best_score)) {
      await supabase.from("user_game_scores").upsert(
        {
          user_id: userId,
          game_id: "accuracy",
          best_score: localAC.bestScore,
          metric_value: localAC.bestWpm,
          best_accuracy: localAC.bestAccuracy,
        },
        { onConflict: "user_id,game_id" }
      );
    } else if (cloudAC && (!localAC || cloudAC.best_score > localAC.bestScore)) {
      saveAccuracyScore(cloudAC.best_score, cloudAC.metric_value, cloudAC.best_accuracy);
    }

    // 4. Sync Daily Challenge & Streak
    const localDaily = getDailyChallengeStore();
    const { data: cloudDaily } = await supabase
      .from("user_daily_challenges")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (cloudDaily) {
      const cloudResults = (cloudDaily.daily_results || {}) as Record<string, DailyResult>;
      const mergedStreak = Math.max(localDaily.currentStreak, cloudDaily.current_streak);
      const mergedLongest = Math.max(localDaily.longestStreak, cloudDaily.longest_streak);
      const mergedResults: Record<string, DailyResult> = {
        ...(localDaily.dailyResults || {}),
        ...cloudResults,
      };

      await supabase.from("user_daily_challenges").upsert({
        user_id: userId,
        current_streak: mergedStreak,
        longest_streak: mergedLongest,
        last_completed_date: localDaily.lastCompletedDate || cloudDaily.last_completed_date,
        daily_results: mergedResults,
      });

      // Update local storage
      Object.values(mergedResults).forEach((res) => {
        if (res && res.wpm) {
          saveDailyChallengeCompletion(res.wpm, res.accuracy, res.errors, res.date);
        }
      });
    } else if (localDaily.currentStreak > 0 || Object.keys(localDaily.dailyResults).length > 0) {
      await supabase.from("user_daily_challenges").upsert({
        user_id: userId,
        current_streak: localDaily.currentStreak,
        longest_streak: localDaily.longestStreak,
        last_completed_date: localDaily.lastCompletedDate,
        daily_results: localDaily.dailyResults,
      });
    }

    return true;
  } catch (err) {
    console.error("Error during cloud storage sync:", err);
    return false;
  }
}
