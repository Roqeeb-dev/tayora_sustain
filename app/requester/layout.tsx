import DashboardShell from "@/components/dashboard/DashboardShell";
import { NavItem } from "@/components/dashboard/types";
import Link from "next/link";
import { Search } from "lucide-react";

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/requester/dashboard", icon: "LayoutDashboard" },
  { label: "Browse", href: "/requester/browse", icon: "Search" },
  { label: "My Requests", href: "/requester/requests", icon: "ClipboardList" },
  { label: "Saved", href: "/requester/saved", icon: "Bookmark" },
];

export default function RequesterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      navItems={NAV}
      variant="user"
      topbarAction={
        <Link
          href="/requester/browse"
          className="inline-flex items-center gap-2 text-sm bg-primary text-primary-foreground
                     px-4 py-2 rounded-xl hover:bg-primary-hover transition-colors font-medium"
        >
          <Search size={14} />
          Browse Materials
        </Link>
      }
    >
      {children}
    </DashboardShell>
  );
}
