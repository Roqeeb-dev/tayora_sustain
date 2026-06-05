import DashboardShell from "@/components/dashboard/DashboardShell";
import { LayoutDashboard, Upload, Package, Truck } from "lucide-react";
import { NavItem } from "@/components/dashboard/types";
import Link from "next/link";

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/supplier/dashboard", icon: LayoutDashboard },
  { label: "Upload Waste", href: "/supplier/upload", icon: Upload },
  { label: "My Listings", href: "/supplier/listings", icon: Package },
  { label: "Pickups", href: "/supplier/pickups", icon: Truck },
];

export default function SupplierLayout({
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
          href="/supplier/upload"
          className="text-sm bg-primary text-primary-foreground px-4 py-2
                     rounded-xl hover:bg-primary-hover transition-colors font-medium"
        >
          + Upload Waste
        </Link>
      }
    >
      {children}
    </DashboardShell>
  );
}
