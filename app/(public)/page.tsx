import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Works from "@/components/landing/Works";
import Impact from "@/components/landing/Impact";

export const metadata: Metadata = {
  title: "Home | Tayora Sustain",
  description:
    "Turn textile waste into opportunity — submit, request, and repurpose fabric through Tayora Sustain.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Works />
      <Impact />
    </main>
  );
}
