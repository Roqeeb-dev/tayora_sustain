"use client";

import Link from "next/link";
import {
  Users,
  Package,
  ClipboardList,
  GitMerge,
  Recycle,
  Truck,
  ArrowRight,
  Clock,
  CheckCircle,
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import PendingDonationRow from "@/components/admin/PendingDonationRow";
import { useAllDonations } from "@/hooks/useDonor";
import { useAllRequests } from "@/hooks/useRequester";

export default function AdminDashboardPage() {
  const {
    data: donations,
    isLoading: donationsLoading,
    error: donationsError,
  } = useAllDonations();
  const {
    data: requests,
    isLoading: requestsLoading,
    error: requestsError,
  } = useAllRequests();

  const totalListings = donations?.length ?? 0;
  const totalRequests = requests?.length ?? 0;
  const pendingCount =
    donations?.filter((d) => d.status === "pending").length ?? 0;
  const collectedCount =
    donations?.filter((d) => d.status === "collected").length ?? 0;
  const matchedCount =
    requests?.filter((r) => r.status === "matched" || r.status === "fulfilled")
      .length ?? 0;
  const activeRequests =
    requests?.filter((r) => r.status === "open").length ?? 0;

  const STATS = [
    { label: "Total listings", value: totalListings, icon: Package },
    {
      label: "Pending approvals",
      value: pendingCount,
      icon: Clock,
      sub: "Requires attention",
    },
    { label: "Active requests", value: activeRequests, icon: ClipboardList },
    { label: "Successful matches", value: matchedCount, icon: GitMerge },
    { label: "Total requests", value: totalRequests, icon: Users },
    { label: "Collected donations", value: collectedCount, icon: CheckCircle },
    {
      label: "Waste collected",
      value: "12,400kg",
      icon: Truck,
      sub: "Placeholder — needs aggregate endpoint",
    },
    {
      label: "Upcycled products",
      value: 0,
      icon: Recycle,
      sub: "Placeholder — needs endpoint",
    },
  ];

  const pendingDonations =
    donations?.filter((d) => d.status === "pending").slice(0, 5) ?? [];

  return (
    <div>
      <PageHeader
        title="Platform Overview"
        description="Real-time summary of activity across Tayora Sustain."
      />

      {/* Stats — 4 col grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {STATS.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending approvals */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <h2 className="font-display text-base text-foreground">
                Pending Approvals
              </h2>
              {pendingDonations.length > 0 && (
                <span className="text-xs font-semibold bg-warning/10 text-warning px-2 py-0.5 rounded-full">
                  {pendingDonations.length}
                </span>
              )}
            </div>
            <Link
              href="/admin/listings"
              className="text-xs text-accent hover:underline flex items-center gap-1"
            >
              Manage all <ArrowRight size={12} />
            </Link>
          </div>

          {donationsLoading && (
            <LoadingState title="Loading pending listings..." />
          )}

          {donationsError && (
            <ErrorState
              title="Could not load listings."
              description={donationsError.message}
            />
          )}

          {!donationsLoading &&
            !donationsError &&
            pendingDonations.length === 0 && (
              <EmptyState
                icon={Package}
                title="No pending listings."
                description="All caught up."
              />
            )}

          {!donationsLoading && pendingDonations.length > 0 && (
            <div className="divide-y divide-border">
              {pendingDonations.map((listing) => (
                <PendingDonationRow key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>

        {/* Recent requests feed */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-display text-base text-foreground">
              Recent Requests
            </h2>
            <Link
              href="/admin/requests"
              className="text-xs text-accent hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>

          {requestsLoading && <LoadingState title="Loading requests..." />}

          {requestsError && (
            <ErrorState
              title="Could not load requests."
              description={requestsError.message}
            />
          )}

          {!requestsLoading &&
            !requestsError &&
            (requests?.length ?? 0) === 0 && (
              <EmptyState icon={ClipboardList} title="No requests yet." />
            )}

          {!requestsLoading && requests && requests.length > 0 && (
            <div className="divide-y divide-border">
              {requests.slice(0, 6).map((req) => (
                <div key={req.id} className="px-5 py-3.5 flex gap-3">
                  <div className="mt-0.5 shrink-0">
                    <StatusBadge status={req.status} />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {req.fabric_type} — {req.quantity_needed}
                    </p>
                    <p className="text-xs text-foreground-muted truncate">
                      {req.purpose}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
