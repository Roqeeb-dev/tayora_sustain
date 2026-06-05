import DashboardShell from "@/components/dashboard/DashboardShell";
import { NavItem } from "@/components/dashboard/types";

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
  { label: "Listings", href: "/admin/listings", icon: "Package", badge: 12 },
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
    <DashboardShell navItems={NAV} variant="admin">
      {children}
    </DashboardShell>
  );
}
