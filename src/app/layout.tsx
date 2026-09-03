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

export const metadata: Metadata = {
  title: {
    default: "Typing Platform — Learn, Practice & Improve Your Typing",
    template: "%s | Typing Platform",
  },
  description:
    "Improve your typing speed and accuracy with structured lessons, typing practice, fun games, and daily challenges.",
  keywords: [
    "typing practice",
    "touch typing lessons",
    "typing test",
    "WPM speed test",
    "typing games",
    "word sprint",
    "daily typing challenge",
  ],
  authors: [{ name: "Typing Platform Team" }],
  creator: "Typing Platform",
    verification: {
    google: "AI1rCZp9708PxeAZ9iqDhvQFxEBlCxIktrhrMQ6b3Fg",
  },
  openGraph: {
    title: "Typing Platform — Learn, Practice & Improve Your Typing",
    description:
      "Improve your typing speed and accuracy with structured lessons, typing practice, fun games, and daily challenges.",
    siteName: "Typing Platform",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Typing Platform — Learn, Practice & Improve Your Typing",
    description:
      "Improve your typing speed and accuracy with structured lessons, typing practice, fun games, and daily challenges.",
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
