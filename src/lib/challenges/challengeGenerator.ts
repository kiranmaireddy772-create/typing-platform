import { CHALLENGE_PASSAGES, ChallengePassage } from "@/data/challenges/passages";
import { getLocalDateKey } from "./challengeDate";

export function getDailyPassage(dateStr: string = getLocalDateKey()): ChallengePassage {
  // Deterministic string hash algorithm
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  const positiveHash = Math.abs(hash);
  const index = positiveHash % CHALLENGE_PASSAGES.length;

  return CHALLENGE_PASSAGES[index];
}
