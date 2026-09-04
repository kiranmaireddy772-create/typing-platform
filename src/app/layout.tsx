import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://typing-platform-eta.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Typing Platform – Free Typing Practice & Typing Tests",
    template: "%s | Typing Platform",
  },
  description:
    "Improve your typing speed and accuracy with free typing practice, lessons, typing tests, games, and daily challenges.",
  keywords: [
    "typing practice",
    "typing test",
    "typing speed",
    "typing accuracy",
    "learn typing",
    "typing games",
    "keyboard practice",
    "WPM speed test",
    "touch typing",
    "free typing test",
  ],
  authors: [{ name: "Typing Platform Team" }],
  creator: "Typing Platform",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/logo.svg",
  },
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "AI1rCZp9708PxeAZ9iqDhvQFxEBlCxIktrhrMQ6b3Fg",
  },
  openGraph: {
    title: "Typing Platform – Free Typing Practice & Typing Tests",
    description:
      "Improve your typing speed and accuracy with free typing practice, lessons, typing tests, games, and daily challenges.",
    url: SITE_URL,
    siteName: "Typing Platform",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Typing Platform – Free Typing Practice & Typing Tests",
    description:
      "Improve your typing speed and accuracy with free typing practice, lessons, typing tests, games, and daily challenges.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
