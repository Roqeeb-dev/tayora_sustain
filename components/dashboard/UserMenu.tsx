"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User, ChevronDown } from "lucide-react";
import { DashboardVariant } from "./types";
import { useAuth } from "@/hooks/useAuth";

interface UserMenuProps {
  variant: DashboardVariant;
}

export default function UserMenu({ variant }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isAdmin = variant === "admin";
  const { user, logout, logoutPending } = useAuth();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-muted transition-colors"
      >
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0
                      ${isAdmin ? "bg-accent text-primary-foreground" : "bg-primary text-primary-foreground"}`}
        >
          {initials}
        </div>

        <div className="hidden sm:flex flex-col items-start">
          <span className="text-xs font-medium text-foreground leading-none">
            {user?.name ?? "—"}
          </span>
          <span className="text-[11px] text-foreground-muted leading-none mt-0.5 capitalize">
            {user?.role ?? "Member"}
          </span>
        </div>

        <ChevronDown
          size={14}
          className={`hidden sm:block text-foreground-muted transition-transform duration-200
                      ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-48 bg-card border border-border
                        rounded-xl shadow-modal z-50 overflow-hidden py-1"
        >
          <div className="px-3 py-2.5 border-b border-border">
            <p className="text-xs font-medium text-foreground truncate">
              {user?.name ?? "User"}
            </p>
            <p className="text-[11px] text-foreground-muted truncate">
              {user?.email ?? "user@tayorasustain.com"}
            </p>
          </div>

          <button
            onClick={() => {
              setOpen(false);
              router.push(isAdmin ? "/admin/profile" : "/profile");
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-foreground-muted hover:text-foreground hover:bg-muted transition-colors"
          >
            <User size={14} />
            Profile
          </button>

          <button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            disabled={logoutPending}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {logoutPending ? (
              <span className="w-3.5 h-3.5 border-2 border-destructive/30 border-t-destructive rounded-full animate-spin" />
            ) : (
              <LogOut size={14} />
            )}
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
