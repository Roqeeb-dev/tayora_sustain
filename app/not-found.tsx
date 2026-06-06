import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "404 Not Found | Tayora Sustain",
  description: "The page you are looking for can't be found.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-beige p-6">
      <div className="max-w-xl w-full text-center">
        <div className="mb-6">
          <Logo href="/" size="lg" />
        </div>

        <h1 className="font-display text-4xl sm:text-5xl mb-3 text-foreground">
          404 — Page not found
        </h1>
        <p className="text-foreground-muted mb-6">
          Oops — we couldn’t find the page you were looking for. It may have
          been moved or removed.
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
