"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";

const WORDS = ["reimagined.", "reclaimed.", "repurposed.", "reborn."];

export default function AuthBrandPanel() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex lg:w-1/2 h-screen sticky top-0 flex-col bg-primary overflow-hidden">
      {/* Soft glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full px-12 py-10">
        {/* Top — logo */}
        <Logo invert />

        {/* Middle — headline */}
        <div className="flex flex-col gap-5">
          <span className="w-8 h-px bg-accent" />
          <h2 className="font-display text-5xl xl:text-6xl text-primary-foreground leading-[1.1]">
            Waste
            <br />
            <span
              className="text-accent transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                display: "inline-block",
              }}
            >
              {WORDS[index]}
            </span>
          </h2>
          <p className="text-primary-foreground/50 text-sm leading-relaxed max-w-xs">
            Connecting textile waste with the hands that need it — and turning
            what's left into something new.
          </p>
        </div>

        {/* Bottom — tag */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-xs text-primary-foreground/40 tracking-widest uppercase font-medium">
            Circular Fashion Economy
          </span>
        </div>
      </div>
    </div>
  );
}
