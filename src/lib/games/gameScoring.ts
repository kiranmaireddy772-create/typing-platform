export function calculateWordSprintScore(wordsCompleted: number, wpm: number): number {
  const basePoints = wordsCompleted * 10;
  const speedBonus = Math.floor(wpm * 2);
  return basePoints + speedBonus;
}

export function calculateFallingWordsPoints(wordLength: number, level: number): number {
  return wordLength * level * 5;
}

export function calculateAccuracyGameScore(accuracy: number, wpm: number, totalErrors: number): number {
  let accuracyTierBonus = 400;
  if (accuracy >= 100) {
    accuracyTierBonus = 1000;
  } else if (accuracy >= 95) {
    accuracyTierBonus = 800;
  } else if (accuracy >= 90) {
    accuracyTierBonus = 600;
  }

  const speedPoints = Math.floor(wpm * 5);
  const errorPenalty = totalErrors * 25;

  return Math.max(0, accuracyTierBonus + speedPoints - errorPenalty);
}
