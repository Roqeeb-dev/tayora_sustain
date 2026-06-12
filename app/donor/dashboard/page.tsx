"use client";

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
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { useDonations } from "@/hooks/useDonor";

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

export default function DonorDashboardPage() {
  const { data: donations, isLoading, error } = useDonations();

  const totalListings = donations?.length ?? 0;
  const pendingCount =
    donations?.filter((d) => d.status === "pending").length ?? 0;
  const collectedCount =
    donations?.filter((d) => d.status === "collected").length ?? 0;

  const STATS = [
    {
      label: "Total listings",
      value: totalListings,
      icon: Package,
    },
    {
      label: "Pending review",
      value: pendingCount,
      icon: Clock,
      sub: "Awaiting admin approval",
    },
    {
      label: "Collections completed",
      value: collectedCount,
      icon: CheckCircle,
    },
    {
      label: "Total kg donated",
      value: "340kg",
      icon: Truck,
    },
  ];

  const recentListings = donations?.slice(0, 4) ?? [];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome back. Here's an overview of your activity."
        action={
          <Link
            href="/donor/upload"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors"
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
              href="/donor/listings"
              className="text-xs text-accent hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>

          {isLoading && <LoadingState title="Loading listings..." />}

          {error && (
            <ErrorState
              title="Could not load listings."
              description={error.message}
            />
          )}

          {!isLoading && !error && recentListings.length === 0 && (
            <EmptyState
              icon={Package}
              title="No listings yet."
              description="Upload your first textile donation to get started."
            />
          )}

          {!isLoading && recentListings.length > 0 && (
            <div className="divide-y divide-border">
              {recentListings.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center gap-4 px-5 py-3.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-background-subtle flex items-center justify-center shrink-0">
                    <Package size={14} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {donation.fabric_type} — {donation.quantity}
                    </p>
                    <p className="text-xs text-foreground-muted line-clamp-1">
                      {donation.description}
                    </p>
                  </div>
                  <StatusBadge status={donation.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming pickups */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-display text-base text-foreground">
              Upcoming Pickups
            </h2>
            <Link
              href="/donor/pickups"
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
            <EmptyState icon={Truck} title="No pickups scheduled yet." />
          )}
        </div>
      </div>
    </div>
  );
}
