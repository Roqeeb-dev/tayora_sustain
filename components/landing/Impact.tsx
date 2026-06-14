import { Recycle, Users, Handshake, Package } from "lucide-react";

const STATS = [
  {
    icon: Recycle,
    value: "12,400kg",
    label: "Textile waste collected",
  },
  {
    icon: Users,
    value: "3,200+",
    label: "Donors & requesters",
  },
  {
    icon: Handshake,
    value: "870",
    label: "Successful matches made",
  },
  {
    icon: Package,
    value: "340",
    label: "Upcycled products created",
  },
];

const REASONS = [
  {
    heading: "Fashion is the world's second largest polluter",
    body: "The industry produces 92 million tonnes of textile waste annually. A significant portion of that originates in markets like Nigeria — where offcuts, deadstock, and unsold fabric have no formal second-life infrastructure.",
  },
  {
    heading: "Creatives are priced out of quality materials",
    body: "Independent designers and fashion students often can't afford new fabric at commercial rates. Meanwhile, donors discard perfectly usable textile because there's no efficient channel to move it.",
  },
];

export default function Impact() {
  return (
    <section
      id="impact"
      className="bg-background py-24 lg:py-32 border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-foreground-muted mb-14">
          <span className="w-8 h-px bg-accent" />
          Why It Exists
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Stats */}
          <div className="flex flex-col gap-6">
            <h2 className="font-display text-4xl sm:text-5xl text-foreground leading-tight mb-2">
              The numbers
              <br />
              <span className="text-accent">speak clearly.</span>
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex flex-col gap-3 bg-card border border-border
                             rounded-2xl p-5 hover:border-accent/40 hover:shadow-card
                             transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-background-subtle flex items-center justify-center">
                    <Icon size={15} className="text-accent" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-display text-3xl text-foreground leading-none">
                      {value}
                    </span>
                    <span className="text-xs text-foreground-muted leading-snug">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-foreground-muted border-l-2 border-accent/40 pl-3 leading-relaxed">
              Figures are illustrative placeholders and will be updated as the
              platform scales.
            </p>
          </div>

          {/* Right — Why it's necessary */}
          <div className="flex flex-col gap-10">
            <h2 className="font-display text-4xl sm:text-5xl text-foreground leading-tight">
              A gap that
              <br />
              <span className="text-accent">needed closing.</span>
            </h2>

            <div className="flex flex-col gap-8">
              {REASONS.map((reason, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <h3 className="font-display text-xl text-foreground leading-snug">
                      {reason.heading}
                    </h3>
                  </div>
                  <p className="text-foreground-muted text-sm leading-relaxed pl-4">
                    {reason.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider quote */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <p className="font-display text-lg text-foreground leading-relaxed">
                "The best material is the one already made — it just needs to
                find the right hands."
              </p>
              <span className="text-xs text-foreground-muted mt-3 block">
                — Tayora Sustain
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
