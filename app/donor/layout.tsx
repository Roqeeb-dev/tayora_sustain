import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { NavItem } from "@/components/dashboard/types";
import Link from "next/link";
import { Upload } from "lucide-react";
import AuthGuard from "@/components/dashboard/AuthGuard";

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/donor/dashboard", icon: "LayoutDashboard" },
  { label: "Upload Waste", href: "/donor/upload", icon: "Upload" },
  { label: "My Listings", href: "/donor/listings", icon: "Package" },
  { label: "Pickups", href: "/donor/pickups", icon: "Truck" },
];

export default function DonorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRole="donor">
      <DashboardShell
        navItems={NAV}
        variant="user"
        topbarAction={
          <Link
            href="/donor/upload"
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
    </AuthGuard>
  );
}

export const metadata: Metadata = {
  title: "Donor",
  description:
    "Donor dashboard — manage listings, uploads, and pickups on Tayora Sustain.",
};
