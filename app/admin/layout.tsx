import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { NavItem } from "@/components/dashboard/types";
import AuthGuard from "@/components/dashboard/AuthGuard";

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
  { label: "Listings", href: "/admin/listings", icon: "Package" },
  { label: "Requests", href: "/admin/requests", icon: "ClipboardList" },
  { label: "Matching", href: "/admin/matching", icon: "GitMerge" },
  { label: "Logistics", href: "/admin/logistics", icon: "Truck" },
  { label: "Upcycling", href: "/admin/upcycling", icon: "Recycle" },
  { label: "Impact", href: "/admin/impact", icon: "BarChart2" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRole="admin">
      <DashboardShell navItems={NAV} variant="admin">
        {children}
      </DashboardShell>
    </AuthGuard>
  );
}

export const metadata: Metadata = {
  title: "Admin",
  description:
    "Admin dashboard — manage listings, requests, logistics and impact metrics.",
};
