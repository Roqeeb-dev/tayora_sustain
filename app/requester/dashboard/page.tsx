"use client";

import Link from "next/link";
import {
  ClipboardList,
  CheckCircle,
  Bookmark,
  Package,
  ArrowRight,
  Search,
  MapPin,
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { useRequests } from "@/hooks/useRequester";

// Mock until materials/saved services exist
const AVAILABLE_MATERIALS = [
  {
    id: "1",
    title: "Silk blend offcuts",
    fabric: "Silk",
    quantity: "3kg",
    location: "Surulere, Lagos",
  },
  {
    id: "2",
    title: "Linen remnants",
    fabric: "Linen",
    quantity: "7kg",
    location: "Yaba, Lagos",
  },
  {
    id: "3",
    title: "Ankara assorted",
    fabric: "Ankara",
    quantity: "5kg",
    location: "Ikeja, Lagos",
  },
];

export default function RequesterDashboardPage() {
  const { data: requests, isLoading, error } = useRequests();

  const totalRequests = requests?.length ?? 0;
  const approvedCount =
    requests?.filter((r) => r.status === "matched" || r.status === "fulfilled")
      .length ?? 0;
  const fulfilledCount =
    requests?.filter((r) => r.status === "fulfilled").length ?? 0;

  const STATS = [
    {
      label: "Total requests",
      value: totalRequests,
      icon: ClipboardList,
    },
    {
      label: "Approved requests",
      value: approvedCount,
      icon: CheckCircle,
    },
    {
      label: "Materials received",
      value: fulfilledCount,
      icon: Package,
      sub: "Successfully delivered",
    },
    {
      label: "Saved listings",
      value: 0, // placeholder until saved service exists
      icon: Bookmark,
      sub: "Across all fabric types",
    },
  ];

  const recentRequests = requests?.slice(0, 4) ?? [];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Here's what's happening with your material requests."
        action={
          <Link
            href="/requester/browse"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            <Search size={14} />
            Browse Materials
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
        {/* Recent requests */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-display text-base text-foreground">
              Recent Requests
            </h2>
            <Link
              href="/requester/requests"
              className="text-xs text-accent hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>

          {isLoading && <LoadingState title="Loading requests..." />}

          {error && (
            <ErrorState
              title="Could not load requests."
              description={error.message}
            />
          )}

          {!isLoading && !error && recentRequests.length === 0 && (
            <EmptyState
              icon={ClipboardList}
              title="No requests yet."
              description="Browse available materials and submit your first request."
            />
          )}

          {!isLoading && recentRequests.length > 0 && (
            <div className="divide-y divide-border">
              {recentRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-background-subtle transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-background-subtle flex items-center justify-center shrink-0">
                    <ClipboardList size={14} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {req.fabric_type} — {req.quantity_needed}
                    </p>
                    <p className="text-xs text-foreground-muted line-clamp-1">
                      {req.purpose}
                    </p>
                  </div>
                  <StatusBadge status={req.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* New arrivals */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-display text-base text-foreground">
              New Arrivals
            </h2>
            <Link
              href="/requester/browse"
              className="text-xs text-accent hover:underline flex items-center gap-1"
            >
              Browse all <ArrowRight size={12} />
            </Link>
          </div>

          {AVAILABLE_MATERIALS.length > 0 ? (
            <div className="divide-y divide-border">
              {AVAILABLE_MATERIALS.map((mat) => (
                <div key={mat.id} className="px-5 py-4 flex flex-col gap-1.5">
                  <p className="text-sm font-medium text-foreground">
                    {mat.title}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-foreground-muted">
                      {mat.fabric}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-xs text-foreground-muted">
                      {mat.quantity}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin
                      size={11}
                      className="text-foreground-muted shrink-0"
                    />
                    <span className="text-xs text-foreground-muted">
                      {mat.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={Package} title="No new arrivals." />
          )}
        </div>
      </div>
    </div>
  );
}
