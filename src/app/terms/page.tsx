import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Use | Typing Platform",
  description: "Terms of use and service guidelines for Typing Platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Terms of Use</h1>
            <p className="text-xs text-slate-400">Last updated: August 22, 2026</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing Typing Platform, you agree to use the site for personal educational, practice, and skill-building purposes in compliance with these terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Educational & Practice Purpose</h2>
            <p>
              Typing Platform provides typing lessons, practice drills, games, and daily challenge tools on an &ldquo;as is&rdquo; basis for learning and entertainment.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Acceptable Use</h2>
            <p>
              You agree not to use automated scripts, bots, or malicious exploits to artificially manipulate game scores or disrupt website availability.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Changes to Service</h2>
            <p>
              We reserve the right to add, modify, or update lessons, typing passages, and features at any time without prior notice.
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
