"use client";

import { Menu, Bell } from "lucide-react";
import { DashboardVariant } from "./types";
import UserMenu from "./UserMenu";

interface TopbarProps {
  pageTitle?: string;
  action?: React.ReactNode;
  variant: DashboardVariant;
  onMenuClick: () => void;
}

export default function Topbar({
  pageTitle,
  action,
  variant,
  onMenuClick,
}: TopbarProps) {
  const isAdmin = variant === "admin";

  return (
    <header
      className={`h-16 shrink-0 flex items-center gap-4 px-4 sm:px-6 border-b bg-background
                  ${isAdmin ? "border-border" : "border-border"}`}
    >
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted transition-colors"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Page title */}
      {pageTitle && (
        <h1 className="font-display text-lg text-foreground hidden sm:block">
          {pageTitle}
        </h1>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Action slot */}
      {action && <div className="hidden sm:block">{action}</div>}

      {/* Notification bell */}
      <NotificationBell />

      {/* User menu */}
      <UserMenu variant={variant} />
    </header>
  );
}

function NotificationBell() {
  const count = 3;

  return (
    <button
      className="relative p-2 rounded-lg text-foreground-muted hover:text-foreground
                 hover:bg-muted transition-colors"
      aria-label="Notifications"
    >
      <Bell size={18} />
      {count > 0 && (
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
      )}
    </button>
  );
}
