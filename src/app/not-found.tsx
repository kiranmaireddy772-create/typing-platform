import Link from "next/link";
import { ArrowLeft, Keyboard, Sparkles } from "lucide-react";

export const metadata = {
  title: "Page Not Found | Typing Platform",
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 sm:p-12 shadow-2xl backdrop-blur-xl max-w-md w-full space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mb-2">
          <Keyboard className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-white">404</h1>
          <h2 className="text-xl font-bold text-slate-200">
            Oops! This page doesn&apos;t exist.
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            The page you are looking for might have been moved, deleted, or does not exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" /> Go Home
          </Link>
          <Link
            href="/practice"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700"
          >
            <Sparkles className="h-4 w-4" /> Start Typing
          </Link>
        </div>
      </div>
    </div>
  );
}
