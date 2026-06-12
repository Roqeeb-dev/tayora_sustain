import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function LoadingState({
  title = "Loading...",
  description,
  className = "",
}: LoadingStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-16 px-6 gap-4 ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-background-subtle text-accent flex items-center justify-center">
        <Loader2 size={20} className="animate-spin" />
      </div>
      <div className="flex flex-col gap-1 max-w-xs">
        <p className="font-display text-lg text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-foreground-muted leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
