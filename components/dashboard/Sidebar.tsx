"use client";

import { usePathname } from "next/navigation";
import SidebarContent from "./SidebarContent";
import { X } from "lucide-react";
import { NavItem, DashboardVariant } from "./types";

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
