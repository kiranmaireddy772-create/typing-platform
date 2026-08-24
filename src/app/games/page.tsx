import { GameDashboard } from "@/components/games/GameDashboard";

export const metadata = {
  title: "Typing Games | Typing Platform",
  description: "Practice your typing skills through fast, fun challenges.",
};

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 sm:py-10">
      <GameDashboard />
    </div>
  );
}
