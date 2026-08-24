import Link from "next/link";
import { Mail, MessageSquare, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Contact & Support | Typing Platform",
  description: "Get in touch with the Typing Platform team for feedback, questions, or support.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mb-2">
          <Mail className="h-8 w-8" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Contact & Feedback
        </h1>

        <p className="text-base text-slate-300 leading-relaxed">
          We welcome your suggestions, bug reports, and feedback to help make Typing Platform the best touch typing resource on the web.
        </p>

        {/* Notice Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl space-y-4">
          <div className="flex justify-center text-indigo-400">
            <MessageSquare className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-white">Direct Messaging Coming Soon</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Contact details will be available soon. In the meantime, all lesson progress, games, and daily challenges are stored directly in your browser.
          </p>
        </div>

        <div className="pt-4">
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
