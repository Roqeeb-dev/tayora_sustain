import { LucideIcon, Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  icon: Icon = Inbox,
  title = "Nothing here yet.",
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-16 px-6 gap-4 ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-muted text-foreground-muted flex items-center justify-center">
        <Icon size={20} />
      </div>
      <div className="flex flex-col gap-1 max-w-xs">
        <p className="font-display text-lg text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-foreground-muted leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
