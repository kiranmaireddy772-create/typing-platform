"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X, Sparkles, User as UserIcon, LogIn } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const navLinks = [
    { name: "Learn", href: "/learn" },
    { name: "Practice", href: "/practice" },
    { name: "Games", href: "/games" },
    { name: "Daily Challenge", href: "/challenges" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Progress", href: "/progress" },
    { name: "About", href: "/about" },
  ];

  const displayName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || "User";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          <Image
            src="/logo.svg"
            alt="Typing Platform Logo"
            width={36}
            height={36}
            className="h-9 w-9 rounded-xl shadow-md shadow-indigo-600/30 transition-transform group-hover:scale-105"
            priority
          />
          <span className="flex items-center gap-1">
            Typing <span className="text-indigo-400">Platform</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-slate-800/80 text-indigo-400"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Side CTA & Auth Status */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:border-indigo-500/50 transition-all"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-mono text-white text-[11px]">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <span>{displayName}</span>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              <LogIn className="h-4 w-4 text-slate-400" />
              Sign In
            </Link>
          )}

          <Link
            href="/learn"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/40 active:scale-95"
          >
            <Sparkles className="h-4 w-4" />
            Start Typing
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-3.5 py-2.5 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-600/20 text-indigo-400"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="mt-4 flex flex-col gap-2.5 border-t border-slate-800 pt-4">
              {user ? (
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-800 py-2.5 text-center text-sm font-medium text-white hover:bg-slate-800"
                >
                  <UserIcon className="h-4 w-4 text-indigo-400" />
                  My Profile ({displayName})
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-800 py-2.5 text-center text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <LogIn className="h-4 w-4 text-slate-400" />
                  Sign In
                </Link>
              )}
              <Link
                href="/learn"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500"
              >
                <Sparkles className="h-4 w-4" />
                Start Typing
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
