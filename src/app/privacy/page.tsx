import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Typing Platform",
  description: "Privacy policy for Typing Platform — learn how local browser storage is used.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Privacy Policy</h1>
            <p className="text-xs text-slate-400">Last updated: August 22, 2026</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Local Browser Storage</h2>
            <p>
              Typing Platform prioritizes user privacy. All typing performance analytics (WPM, accuracy, personal best scores), completed lesson records, game high scores, and daily streak counts are stored exclusively in your local web browser via <code className="text-indigo-400 font-mono">localStorage</code>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. No Account or Registration Required</h2>
            <p>
              You are not required to create an account, log in, or provide personal information (such as name, email, or passwords) to access lessons, practice drills, typing games, or daily challenges.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Zero Third-Party Data Selling</h2>
            <p>
              We do not sell, rent, or trade your typing data to third parties. Your data remains strictly within your browser environment.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Updates to This Policy</h2>
            <p>
              If future platform updates introduce optional cloud accounts or optional analytics services, this policy will be updated accordingly with explicit notice.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-slate-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-800 border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
