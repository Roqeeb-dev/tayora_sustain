import Link from "next/link";
import { ArrowRight, Recycle, ShoppingBag } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-background flex flex-col">
      {/* Background texture layer */}
      <div className="absolute inset-0 bg-[url('/images/hero-placeholder.jpg')] bg-cover bg-center opacity-10" />

      {/* Decorative grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content */}
      <div className="relative flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 lg:py-32">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-secondary/30 border border-border text-foreground-muted text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Circular Fashion Economy
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.05] tracking-tight mb-6">
              Fashion waste,{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-accent">reimagined.</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-secondary/40 -z-0 rounded" />
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-foreground-muted text-lg sm:text-xl leading-relaxed max-w-2xl mb-12">
              Tayora Sustain connects people who have textile waste with people
              who need it — and turns what's left into something new. Join the
              movement closing the loop on fashion.
            </p>

            {/* Role split CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Supplier CTA */}
              <Link
                href="/auth/register?role=supplier"
                className="group flex items-center gap-4 bg-primary text-primary-foreground
                           px-6 py-4 rounded-xl hover:bg-primary-hover transition-all
                           duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <span className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <Recycle size={18} />
                </span>
                <div className="text-left">
                  <p className="text-xs text-primary-foreground/60 font-medium uppercase tracking-wide">
                    I have textile waste
                  </p>
                  <p className="text-base font-semibold">Become a Supplier</p>
                </div>
                <ArrowRight
                  size={16}
                  className="ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                />
              </Link>

              {/* Requester CTA */}
              <Link
                href="/auth/register?role=requester"
                className="group flex items-center gap-4 bg-card border border-border
                           text-foreground px-6 py-4 rounded-xl hover:border-primary
                           hover:bg-background-subtle transition-all duration-200
                           hover:shadow-lg hover:-translate-y-0.5"
              >
                <span className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <ShoppingBag size={18} className="text-accent" />
                </span>
                <div className="text-left">
                  <p className="text-xs text-foreground-muted font-medium uppercase tracking-wide">
                    I need materials
                  </p>
                  <p className="text-base font-semibold">Browse Materials</p>
                </div>
                <ArrowRight
                  size={16}
                  className="ml-auto opacity-30 group-hover:opacity-70 group-hover:translate-x-1 transition-all"
                />
              </Link>
            </div>

            {/* Trust line */}
            <p className="mt-8 text-foreground-muted text-sm">
              Free to join · No commitment · Available across Nigeria
            </p>
          </div>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
