"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { NavItem } from "./types";

interface DashboardShellProps {
  children: React.ReactNode;
  navItems: NavItem[];
  variant?: "user" | "admin";
  pageTitle?: string;
  topbarAction?: React.ReactNode;
}

export default function DashboardShell({
  children,
  navItems,
  variant = "user",
  pageTitle,
  topbarAction,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-primary/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        navItems={navItems}
        variant={variant}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          pageTitle={pageTitle}
          action={topbarAction}
          variant={variant}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
