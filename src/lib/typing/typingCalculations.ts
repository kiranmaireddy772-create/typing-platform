/**
 * Calculates Words Per Minute (WPM) based on correct characters typed.
 * Standard calculation: (correct characters / 5) / (time in minutes)
 */
export function calculateWPM(correctChars: number, timeInSeconds: number): number {
  if (timeInSeconds <= 0 || correctChars <= 0) return 0;
  const elapsedMinutes = timeInSeconds / 60;
  const wordsTyped = correctChars / 5;
  const wpm = wordsTyped / elapsedMinutes;
  return Math.max(0, Math.round(wpm));
}

/**
 * Calculates typing accuracy percentage.
 * Formula: (correct characters / total typed characters) * 100
 * Returns 100 if no characters have been typed yet.
 */
export function calculateAccuracy(correctChars: number, totalTypedChars: number): number {
  if (totalTypedChars <= 0) return 100;
  const accuracy = (correctChars / totalTypedChars) * 100;
  return Math.min(100, Math.max(0, Math.round(accuracy)));
}
