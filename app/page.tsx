import { AIDemo } from "@/components/AIDemo";
import { BeforeAfter } from "@/components/BeforeAfter";
import { FAQ } from "@/components/FAQ";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { LifeTree } from "@/components/LifeTree";
import { MemoryTimeline } from "@/components/MemoryTimeline";
import { StoryIntro } from "@/components/StoryIntro";

export default function Home() {
  return (
    <>
      <Hero />
      <StoryIntro />
      <MemoryTimeline />
      <AIDemo />
      <Gallery />
      <BeforeAfter />
      <LifeTree />
      <HowItWorks />

      <FAQ />
    </>
  );
}
