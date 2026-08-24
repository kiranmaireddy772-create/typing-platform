import React from "react";
import Link from "next/link";
import { Keyboard } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-lg font-bold text-white transition-opacity hover:opacity-90"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
                <Keyboard className="h-4 w-4" />
              </div>
              <span>
                Typing <span className="text-indigo-400">Platform</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-slate-400 leading-relaxed">
              Build touch-typing muscle memory, boost your WPM, and master keyboard accuracy with structured practice and interactive challenges.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span>Learn</span> • <span>Practice</span> • <span>Improve</span> • <span>Compete</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Platform
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/learn" className="transition-colors hover:text-white">
                  Learn to Type
                </Link>
              </li>
              <li>
                <Link href="/practice" className="transition-colors hover:text-white">
                  Focused Practice
                </Link>
              </li>
              <li>
                <Link href="/games" className="transition-colors hover:text-white">
                  Typing Games
                </Link>
              </li>
              <li>
                <Link href="/challenges" className="transition-colors hover:text-white">
                  Daily Challenge
                </Link>
              </li>
              <li>
                <Link href="/progress" className="transition-colors hover:text-white">
                  Progress Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Company / Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/leaderboard" className="transition-colors hover:text-white">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Legal
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-900 pt-6 flex flex-col items-center justify-between gap-4 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Typing Platform. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            Built for peak typing speed & precision
          </div>
        </div>
      </div>
    </footer>
  );
}
