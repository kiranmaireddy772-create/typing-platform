import { Hero } from "@/components/home/Hero";
import { FeatureSection } from "@/components/home/FeatureSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PracticePreview } from "@/components/home/PracticePreview";
import { LearningPath } from "@/components/home/LearningPath";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-950">
      <Hero />
      <FeatureSection />
      <HowItWorks />
      <PracticePreview />
      <LearningPath />
      <CTA />
    </div>
  );
}
