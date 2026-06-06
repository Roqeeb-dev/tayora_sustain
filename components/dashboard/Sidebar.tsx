"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { NavItem, DashboardVariant } from "./types";
import { ICON_MAP } from "./navConfig";
import Logo from "../ui/Logo";

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
        className={`hidden lg:flex flex-col w-55 min-h-screen border-r shrink-0 bg-primary border-primary-hover`}
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
        className={`fixed inset-y-0 left-0 z-30 w-55 flex flex-col border-r transition-transform duration-300 ease-in-out lg:hidden
                    ${open ? "translate-x-0" : "-translate-x-full"} bg-primary border-primary-hover`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-hover`}
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
        className={`h-16 flex items-center px-5 border-b shrink-0 border-primary-hover`}
      >
        <Logo size="md" invert />
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
                          ${isActive ? "bg-primary-foreground/10 text-primary-foreground" : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/[0.08]"}`}
            >
              {Icon && (
                <Icon
                  size={17}
                  className={`shrink-0 transition-colors ${isActive ? "text-accent" : "text-primary-foreground/40 group-hover:text-primary-foreground/70"}`}
                />
              )}
              <span className="flex-1">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className={`text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-[20px] text-center bg-accent text-primary-foreground`}
                >
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className={`px-4 py-4 border-t shrink-0 border-primary-hover`}>
        <div
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-primary-foreground/[0.08]`}
        >
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold bg-accent text-primary-foreground`}
          >
            T
          </div>
          <div className="flex flex-col min-w-0">
            <span
              className={`text-xs font-medium truncate text-primary-foreground`}
            >
              Tayora Sustain
            </span>
            <span className={`text-[11px] truncate text-primary-foreground/50`}>
              {isAdmin ? "Admin Portal" : "Member Portal"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
