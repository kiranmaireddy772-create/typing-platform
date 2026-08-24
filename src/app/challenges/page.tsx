import { DailyChallengeContainer } from "@/components/challenges/DailyChallengeContainer";

export const metadata = {
  title: "Daily Challenge | Typing Platform",
  description: "Complete today's challenge and keep your typing streak alive.",
};

export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 sm:py-10">
      <DailyChallengeContainer />
    </div>
  );
}
