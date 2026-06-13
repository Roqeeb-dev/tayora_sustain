import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Coming Soon | Tayora Sustain",
  description: "We're working on something great — coming soon.",
};

export default function ComingSoon() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-beige p-6">
      <div className="max-w-xl w-full text-center">
        <div className="mb-6">
          <Logo href="/" size="lg" />
        </div>

        <h1 className="font-display text-4xl sm:text-5xl mb-3 text-foreground">
          Coming soon
        </h1>
        <p className="text-foreground-muted mb-6">
          We’re putting the finishing touches on this page. Check back shortly
          or explore the site in the meantime.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            <ArrowLeft size={14} />
            Go back home
          </Link>

          <Link
            href="/"
            className="text-sm text-foreground-muted hover:underline"
          >
            Browse the homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
