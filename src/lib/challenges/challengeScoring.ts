export function calculateDailyChallengeScore(wpm: number, accuracy: number): number {
  let accuracyMultiplier = 0.70;
  if (accuracy >= 100) {
    accuracyMultiplier = 1.20;
  } else if (accuracy >= 98) {
    accuracyMultiplier = 1.10;
  } else if (accuracy >= 95) {
    accuracyMultiplier = 1.00;
  } else if (accuracy >= 90) {
    accuracyMultiplier = 0.85;
  }

  return Math.round(wpm * 10 * accuracyMultiplier);
}
