import type { Metadata } from "next";
import Link from "next/link";
import {
  Package,
  Truck,
  Upload,
  CheckCircle,
  ArrowRight,
  Clock,
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";

const STATS = [
  {
    label: "Total listings",
    value: 12,
    icon: Package,
    trend: { value: "+2 this month", positive: true },
  },
  {
    label: "Pending review",
    value: 3,
    icon: Clock,
    sub: "Awaiting admin approval",
  },
  {
    label: "Collections completed",
    value: 8,
    icon: CheckCircle,
    trend: { value: "+1 this week", positive: true },
  },
  {
    label: "Total kg donated",
    value: "340kg",
    icon: Truck,
    trend: { value: "+40kg", positive: true },
  },
];

const RECENT_LISTINGS = [
  {
    id: "1",
    title: "Ankara offcuts — 5kg",
    fabric: "Ankara",
    status: "approved" as const,
    date: "2 days ago",
  },
  {
    id: "2",
    title: "Denim remnants — 3kg",
    fabric: "Denim",
    status: "pending" as const,
    date: "4 days ago",
  },
  {
    id: "3",
    title: "Cotton scraps — 8kg",
    fabric: "Cotton",
    status: "collected" as const,
    date: "1 week ago",
  },
  {
    id: "4",
    title: "Mixed fabric — 2kg",
    fabric: "Mixed",
    status: "rejected" as const,
    date: "1 week ago",
  },
];

const UPCOMING_PICKUPS = [
  {
    id: "1",
    listing: "Ankara offcuts — 5kg",
    date: "Tomorrow, 10:00 AM",
    location: "Yaba, Lagos",
  },
  {
    id: "2",
    listing: "Linen blend — 4kg",
    date: "Friday, 2:00 PM",
    location: "Ikeja, Lagos",
  },
];

export default function SupplierDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome back. Here's an overview of your activity."
        action={
          <Link
            href="/supplier/upload"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground
                       px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover
                       transition-colors"
          >
            <Upload size={15} />
            Upload Waste
          </Link>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent listings */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-display text-base text-foreground">
              Recent Listings
            </h2>
            <Link
              href="/supplier/listings"
              className="text-xs text-accent hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {RECENT_LISTINGS.map((listing) => (
              <div
                key={listing.id}
                className="flex items-center gap-4 px-5 py-3.5"
              >
                <div className="w-8 h-8 rounded-lg bg-background-subtle flex items-center justify-center shrink-0">
                  <Package size={14} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {listing.title}
                  </p>
                  <p className="text-xs text-foreground-muted">
                    {listing.fabric} · {listing.date}
                  </p>
                </div>
                <StatusBadge status={listing.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming pickups */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-display text-base text-foreground">
              Upcoming Pickups
            </h2>
            <Link
              href="/supplier/pickups"
              className="text-xs text-accent hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {UPCOMING_PICKUPS.length > 0 ? (
            <div className="divide-y divide-border">
              {UPCOMING_PICKUPS.map((pickup) => (
                <div
                  key={pickup.id}
                  className="px-5 py-4 flex flex-col gap-1.5"
                >
                  <p className="text-sm font-medium text-foreground">
                    {pickup.listing}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <Clock size={11} className="text-accent shrink-0" />
                    <span className="text-xs text-foreground-muted">
                      {pickup.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck
                      size={11}
                      className="text-foreground-muted shrink-0"
                    />
                    <span className="text-xs text-foreground-muted">
                      {pickup.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-foreground-muted">
                No pickups scheduled yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Dashboard | Supplier — Tayora Sustain",
  description:
    "Your supplier dashboard — overview of listings, pickups, and activity.",
};
