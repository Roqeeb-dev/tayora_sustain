"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Recycle, ShoppingBag } from "lucide-react";

type Role = "supplier" | "requester";

const CONTENT = {
  supplier: {
    eyebrow: "For Suppliers",
    headline: (
      <>
        Your textile waste
        <br />
        has a{" "}
        <span className="relative inline-block">
          <span className="relative z-10 text-accent">new purpose.</span>
          <span className="absolute bottom-1 left-0 right-0 h-3 bg-secondary/40 -z-0 rounded" />
        </span>
      </>
    ),
    subtext:
      "Stop letting leftover fabric pile up. Submit your textile waste in minutes — we review it, arrange collection, and put it back into the fashion supply chain or upcycle it into something new.",
    cta: {
      primary: {
        label: "Start Donating",
        href: "/auth/register?role=supplier",
      },
      secondary: { label: "See how it works", href: "/#how-it-works" },
    },
    pills: ["Free pickup scheduling", "Full status tracking", "Zero hassle"],
  },
  requester: {
    eyebrow: "For Requesters",
    headline: (
      <>
        Quality materials,
        <br />
        at a{" "}
        <span className="relative inline-block">
          <span className="relative z-10 text-accent">fraction of cost.</span>
          <span className="absolute bottom-1 left-0 right-0 h-3 bg-secondary/40 -z-0 rounded" />
        </span>
      </>
    ),
    subtext:
      "Browse verified textile materials sourced from suppliers across Nigeria. Filter by fabric type, quantity, and location — then request exactly what you need for your next collection or project.",
    cta: {
      primary: {
        label: "Browse Materials",
        href: "/auth/register?role=requester",
      },
      secondary: { label: "See how it works", href: "/#how-it-works" },
    },
  },
};

export default function Hero() {
  const [role, setRole] = useState<Role>("supplier");
  const content = CONTENT[role];

  return (
    <section className="relative min-h-screen bg-background flex flex-col">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('/images/hero-placeholder.jpg')] bg-cover bg-center opacity-10" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
          <div className="max-w-3xl">
            {/* Role toggle */}
            <div className="inline-flex items-center bg-card border border-border rounded-xl p-1 mb-10">
              {(["supplier", "requester"] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    role === r
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  {r === "supplier" ? (
                    <Recycle size={14} />
                  ) : (
                    <ShoppingBag size={14} />
                  )}
                  {r === "supplier" ? "I have waste" : "I need materials"}
                </button>
              ))}
            </div>

            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-foreground-muted text-xs font-medium tracking-widest uppercase">
                {content.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.05] tracking-tight mb-6">
              {content.headline}
            </h1>

            {/* Subtext */}
            <p className="text-foreground-muted text-lg sm:text-xl leading-relaxed mb-10">
              {content.subtext}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href={content.cta.primary.href}
                className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl font-medium hover:bg-primary-hover transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {content.cta.primary.label}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href={content.cta.secondary.href}
                className="inline-flex items-center justify-center gap-2 bg-card border
                           border-border text-foreground px-6 py-3.5 rounded-xl font-medium
                           hover:bg-background-subtle hover:border-primary transition-all duration-200"
              >
                {content.cta.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
