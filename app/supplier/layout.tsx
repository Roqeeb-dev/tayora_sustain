import DashboardShell from "@/components/dashboard/DashboardShell";
import { NavItem } from "@/components/dashboard/types";
import Link from "next/link";
import { Upload } from "lucide-react";

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/supplier/dashboard", icon: "LayoutDashboard" },
  { label: "Upload Waste", href: "/supplier/upload", icon: "Upload" },
  { label: "My Listings", href: "/supplier/listings", icon: "Package" },
  { label: "Pickups", href: "/supplier/pickups", icon: "Truck" },
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
          className="inline-flex items-center gap-2 text-sm bg-primary text-primary-foreground
                     px-4 py-2 rounded-xl hover:bg-primary-hover transition-colors font-medium"
        >
          <Upload size={14} />
          Upload Waste
        </Link>
      }
    >
      {children}
    </DashboardShell>
  );
}
