// src/components/auth/AuthBrandPanel.tsx

export default function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative flex-col overflow-hidden bg-primary">
      {/* Background image — swap src when ready */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/auth-panel.jpg')" }}
      />

      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/20 blur-[120px]" />

      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px]" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px),
                            linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-12">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
          </div>
          <span className="font-display font-semibold text-lg text-primary-foreground">
            Tayora Sustain
          </span>
        </div>

        <div className="flex items-center justify-center flex-1">
          <span className="font-display text-[180px] leading-none text-primary-foreground/5 select-none pointer-events-none">
            T
          </span>
        </div>

        <div className="flex flex-col gap-6">
          {/* Accent rule */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-accent" />
            <span className="text-xs text-accent/70 tracking-[0.2em] uppercase font-medium">
              Circular Fashion Economy
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-5xl xl:text-6xl text-primary-foreground leading-[1.05]">
            Waste has
            <br />a new{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-accent">address.</span>
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-primary-foreground/50 text-sm leading-relaxed max-w-xs">
            Join thousands of suppliers and requesters already closing the loop
            on fashion waste across Nigeria.
          </p>
        </div>
      </div>
    </div>
  );
}
