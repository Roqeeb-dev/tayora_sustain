"use client";

import { User as UserIcon, Mail, Shield, Calendar, LogOut } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import LoadingState from "@/components/ui/LoadingState";
import { useAuth } from "@/hooks/useAuth";

function formatDate(date?: Date) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function ProfilePage() {
  const { user, isLoading, logout, logoutPending } = useAuth();

  if (isLoading) {
    return <LoadingState title="Loading your profile..." />;
  }

  if (!user) {
    return <LoadingState title="No user data found." />;
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="My Profile"
        description="Your account details and information."
      />

      {/* Identity card */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
        <div className="px-5 py-6 flex items-center gap-4 border-b border-border">
          <div
            className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground
                          flex items-center justify-center text-lg font-bold shrink-0"
          >
            {initials}
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="font-display text-xl text-foreground">{user.name}</p>
            <span
              className="text-xs bg-background-subtle text-foreground-muted
                             px-2.5 py-1 rounded-full font-medium capitalize w-fit"
            >
              {user.role}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="divide-y divide-border">
          <div className="flex items-center gap-3 px-5 py-3.5">
            <UserIcon size={15} className="text-accent shrink-0" />
            <span className="text-xs text-foreground-muted w-28 shrink-0">
              Full name
            </span>
            <span className="text-sm text-foreground font-medium">
              {user.name}
            </span>
          </div>

          <div className="flex items-center gap-3 px-5 py-3.5">
            <Mail size={15} className="text-accent shrink-0" />
            <span className="text-xs text-foreground-muted w-28 shrink-0">
              Email
            </span>
            <span className="text-sm text-foreground font-medium">
              {user.email}
            </span>
          </div>

          <div className="flex items-center gap-3 px-5 py-3.5">
            <Shield size={15} className="text-accent shrink-0" />
            <span className="text-xs text-foreground-muted w-28 shrink-0">
              Role
            </span>
            <span className="text-sm text-foreground font-medium capitalize">
              {user.role}
            </span>
          </div>

          {user.createdAt && (
            <div className="flex items-center gap-3 px-5 py-3.5">
              <Calendar size={15} className="text-accent shrink-0" />
              <span className="text-xs text-foreground-muted w-28 shrink-0">
                Member since
              </span>
              <span className="text-sm text-foreground font-medium">
                {formatDate(user.createdAt)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Account actions */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <p className="text-sm font-medium text-foreground">Account</p>
        </div>
        <div className="p-5">
          <button
            onClick={() => logout()}
            disabled={logoutPending}
            className="inline-flex items-center gap-2 text-sm text-destructive bg-destructive/10 px-4 py-2.5 rounded-xl font-medium hover:bg-destructive/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {logoutPending ? (
              <span className="w-3.5 h-3.5 border-2 border-destructive/30 border-t-destructive rounded-full animate-spin" />
            ) : (
              <LogOut size={14} />
            )}
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
