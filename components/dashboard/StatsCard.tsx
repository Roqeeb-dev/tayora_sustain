import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  sub?: string;
  trend?: { value: string; positive: boolean };
}

export default function StatsCard({
  label,
  value,
  icon: Icon,
  sub,
  trend,
}: StatsCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-3 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="w-7 h-7 rounded-xl bg-background-subtle flex items-center justify-center">
          <Icon size={16} className="text-accent" />
        </div>
        {trend && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              trend.positive
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-display text-2xl text-foreground">{value}</span>
        <span className="text-xs text-foreground-muted">{label}</span>
        {sub && (
          <span className="text-xs text-foreground-muted/60 mt-1">{sub}</span>
        )}
      </div>
    </div>
  );
}
