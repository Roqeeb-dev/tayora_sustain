"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    number: "01",
    role: "Donor",
    action: "Submit your waste",
    description:
      "Upload images of your leftover fabric, select the material type and quantity, and submit. Takes under three minutes.",
  },
  {
    number: "02",
    role: "Tayora",
    action: "We review & decide",
    description:
      "Our team reviews every submission and decides whether it goes to a requester directly, or into our upcycling pipeline.",
  },
  {
    number: "03",
    role: "Logistics",
    action: "Pickup is arranged",
    description:
      "We coordinate collection from your location. You track the status in real time — from approved to collected.",
  },
  {
    number: "04",
    role: "Requester",
    action: "Materials reach hands that need them",
    description:
      "Requesters browse, submit a request, and receive matched materials. What can't be reused becomes something entirely new.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate progress line from 0 to 100 over 2s
          let start: number | null = null;
          const duration = 8000;

          const tick = (timestamp: number) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const pct = Math.min((elapsed / duration) * 100, 100);
            setProgress(pct);

            // Activate step bubbles progressively
            setActiveStep(Math.floor((pct / 100) * STEPS.length) - 1);

            if (pct < 100) requestAnimationFrame(tick);
            else setActiveStep(STEPS.length - 1);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="bg-background py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-foreground-muted mb-5">
              <span className="w-8 h-px bg-accent" />
              The Process
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground leading-tight">
              Nothing wasted.
              <br />
              <span className="text-accent">Everything intentional.</span>
            </h2>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Static base line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-border" />

          {/* Animated fill line */}
          <div
            className="hidden lg:block absolute top-8 left-0 h-px bg-primary origin-left transition-none"
            style={{ width: `${progress}%` }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => {
              const isActive = i <= activeStep;

              return (
                <div key={step.number} className="relative flex flex-col gap-5">
                  {/* Number bubble */}
                  <div
                    className="relative z-10 w-16 h-16 rounded-2xl border flex items-center justify-center transition-all duration-500"
                    style={{
                      backgroundColor: isActive
                        ? "var(--color-primary)"
                        : "var(--color-card)",
                      borderColor: isActive
                        ? "var(--color-primary)"
                        : "var(--color-border)",
                      transitionDelay: `${i * 120}ms`,
                    }}
                  >
                    <span
                      className="font-display text-xl transition-colors duration-500"
                      style={{
                        color: isActive
                          ? "var(--color-primary-foreground)"
                          : "var(--color-accent)",
                        transitionDelay: `${i * 120}ms`,
                      }}
                    >
                      {step.number}
                    </span>

                    {/* Connector dot */}
                    {i < STEPS.length - 1 && (
                      <span
                        className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-colors duration-500"
                        style={{
                          backgroundColor: isActive
                            ? "var(--color-primary)"
                            : "var(--color-border)",
                          transitionDelay: `${i * 120}ms`,
                        }}
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div
                    className="flex flex-col gap-2 transition-all duration-500"
                    style={{
                      opacity: isActive ? 1 : 0.4,
                      transitionDelay: `${i * 120}ms`,
                    }}
                  >
                    <span className="text-xs font-medium tracking-widest uppercase text-foreground-muted">
                      {step.role}
                    </span>
                    <h3 className="font-display text-xl text-foreground">
                      {step.action}
                    </h3>
                    <p className="text-foreground-muted text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
