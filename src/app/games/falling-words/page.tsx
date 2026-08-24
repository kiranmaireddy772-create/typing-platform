"use client";

import React, { useState } from "react";
import { useFallingWords } from "@/hooks/games/useFallingWords";
import { GameHeader } from "@/components/games/GameHeader";
import { GameResults } from "@/components/games/GameResults";
import { FallingWord } from "@/components/games/FallingWord";
import { Sparkles, Play, Trophy, Heart, Award } from "lucide-react";

export default function FallingWordsPage() {
  const {
    status,
    lives,
    level,
    score,
    wordsCompleted,
    accuracy,
    words,
    activeWordId,
    isNewBest,
    bestScore,
    startGame,
    processKeyInput,
  } = useFallingWords();

  const [mobileVal, setMobileVal] = useState<string>("");

  const handleMobileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setMobileVal(val);
    if (val.length > 0) {
      const charTyped = val[val.length - 1];
      processKeyInput(charTyped);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 sm:py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <GameHeader
          title="Falling Words"
          subtitle="Type the falling words before they hit the ground!"
          badgeText="Arcade Survival"
          metrics={
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-6 font-mono">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-slate-400">Lives:</span>
                  <div className="flex gap-1 text-rose-500">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Heart
                        key={i}
                        className={`h-4 w-4 ${
                          i < lives ? "fill-rose-500 text-rose-500" : "text-slate-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-300">
                  <Award className="h-4 w-4 text-sky-400" />
                  <span>Level: <strong className="text-sky-400 text-sm">{level}</strong></span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-300">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <span>Cleared: <strong className="text-emerald-400 text-sm">{wordsCompleted}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono">
                <Trophy className="h-4 w-4 text-amber-400" />
                <span className="text-slate-400">Score:</span>
                <strong className="text-xl text-white font-extrabold">{score}</strong>
              </div>
            </div>
          }
        />

        {/* 1. START SCREEN */}
        {status === "idle" && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 sm:p-12 text-center shadow-2xl space-y-6 backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 mb-2">
              <Sparkles className="h-8 w-8" />
            </div>

            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready for Falling Words?
            </h2>

            <p className="max-w-md mx-auto text-sm sm:text-base text-slate-300">
              Words will drop from the top of the screen. Type them on your physical keyboard before they hit the bottom line!
            </p>

            {/* Rules checklist */}
            <div className="max-w-md mx-auto rounded-2xl border border-slate-800 bg-slate-950 p-4 text-left space-y-2 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-rose-400">❤️</span> You start with 3 lives. Missing a word loses 1 life.
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sky-400">🚀</span> Every 5 cleared words increases the level speed.
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400">⌨️</span> Type directly on your physical keyboard!
              </div>
            </div>

            {/* Start CTA */}
            <div className="pt-4">
              <button
                type="button"
                onClick={startGame}
                className="inline-flex items-center gap-2.5 rounded-xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95"
              >
                <Play className="h-5 w-5 fill-current" />
                <span>Start Game</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. PLAYING GAMEPLAY SCREEN */}
        {status === "playing" && (
          <div className="space-y-4">
            {/* Arcade Playing Arena */}
            <div className="relative h-[420px] sm:h-[480px] w-full overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 shadow-2xl">
              {/* Target Danger Red Line */}
              <div className="absolute bottom-10 left-0 right-0 h-0.5 bg-rose-500/40 border-b border-dashed border-rose-500/80 flex items-center justify-end px-4">
                <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest bg-slate-950/80 px-2 py-0.5 rounded">
                  Danger Boundary
                </span>
              </div>

              {/* Render Falling Words */}
              {words.map((item) => (
                <FallingWord
                  key={item.id}
                  item={item}
                  isActive={item.id === activeWordId}
                />
              ))}
            </div>

            {/* Hidden / Mobile Input area for soft keyboard compatibility */}
            <div className="flex justify-center pt-2">
              <input
                type="text"
                value={mobileVal}
                onChange={handleMobileInputChange}
                placeholder="Touch here for mobile keyboard..."
                className="w-full sm:w-auto rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-center text-xs font-mono text-slate-300 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}

        {/* 3. GAME OVER RESULTS SCREEN */}
        {status === "completed" && (
          <GameResults
            title="Arcade Game Over!"
            score={score}
            accuracy={accuracy}
            bestScore={bestScore?.bestScore}
            isNewBest={isNewBest}
            extraStatLabel="Level Reached"
            extraStatValue={`Level ${level}`}
            onPlayAgain={startGame}
          />
        )}
      </div>
    </div>
  );
}
