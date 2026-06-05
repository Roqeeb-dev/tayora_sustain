"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { NavItem, DashboardVariant } from "./types";
import { ICON_MAP } from "./navConfig";

interface SidebarProps {
  navItems: NavItem[];
  variant: DashboardVariant;
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({
  navItems,
  variant,
  open,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const isAdmin = variant === "admin";

  return (
    <>
      {/* Desktop */}
      <aside
        className={`hidden lg:flex flex-col w-64 min-h-screen border-r shrink-0
                    ${isAdmin ? "bg-primary border-primary-hover" : "bg-background border-border"}`}
      >
        <SidebarContent
          navItems={navItems}
          pathname={pathname}
          isAdmin={isAdmin}
          onClose={onClose}
        />
      </aside>

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 flex flex-col border-r
                    transition-transform duration-300 ease-in-out lg:hidden
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    ${isAdmin ? "bg-primary border-primary-hover" : "bg-background border-border"}`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors
                      ${
                        isAdmin
                          ? "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-hover"
                          : "text-foreground-muted hover:text-foreground hover:bg-muted"
                      }`}
        >
          <X size={16} />
        </button>
        <SidebarContent
          navItems={navItems}
          pathname={pathname}
          isAdmin={isAdmin}
          onClose={onClose}
        />
      </aside>
    </>
  );
}

function SidebarContent({
  navItems,
  pathname,
  isAdmin,
  onClose,
}: {
  navItems: NavItem[];
  pathname: string;
  isAdmin: boolean;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <div
        className={`h-16 flex items-center px-5 border-b shrink-0
                    ${isAdmin ? "border-primary-hover" : "border-border"}`}
      >
        <Link
          href="/"
          className={`font-display font-semibold text-lg
                      ${isAdmin ? "text-primary-foreground" : "text-primary"}`}
        >
          Tayora Sustain
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = ICON_MAP[item.icon];
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl
                          text-sm font-medium transition-all duration-150
                          ${
                            isAdmin
                              ? isActive
                                ? "bg-primary-foreground/10 text-primary-foreground"
                                : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/[0.08]"
                              : isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-foreground-muted hover:text-foreground hover:bg-muted"
                          }`}
            >
              {Icon && (
                <Icon
                  size={17}
                  className={`shrink-0 transition-colors
                              ${
                                isAdmin
                                  ? isActive
                                    ? "text-accent"
                                    : "text-primary-foreground/40 group-hover:text-primary-foreground/70"
                                  : isActive
                                    ? "text-primary-foreground"
                                    : "text-foreground-muted group-hover:text-foreground"
                              }`}
                />
              )}
              <span className="flex-1">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className={`text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-[20px] text-center
                              ${
                                isAdmin
                                  ? "bg-accent text-primary-foreground"
                                  : "bg-primary text-primary-foreground"
                              }`}
                >
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div
        className={`px-4 py-4 border-t shrink-0
                    ${isAdmin ? "border-primary-hover" : "border-border"}`}
      >
        <div
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                      ${isAdmin ? "bg-primary-foreground/[0.08]" : "bg-muted"}`}
        >
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold
                        ${isAdmin ? "bg-accent text-primary-foreground" : "bg-primary text-primary-foreground"}`}
          >
            T
          </div>
          <div className="flex flex-col min-w-0">
            <span
              className={`text-xs font-medium truncate ${isAdmin ? "text-primary-foreground" : "text-foreground"}`}
            >
              Tayora Sustain
            </span>
            <span
              className={`text-[11px] truncate ${isAdmin ? "text-primary-foreground/50" : "text-foreground-muted"}`}
            >
              {isAdmin ? "Admin Portal" : "Member Portal"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
