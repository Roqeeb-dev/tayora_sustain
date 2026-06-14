"use client";

import {
  Users,
  Package,
  ClipboardList,
  CheckCircle,
  Recycle,
  Truck,
  TrendingUp,
  BarChart2,
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import { useImpact } from "@/hooks/useAdmin";
import { useAllDonations } from "@/hooks/useDonor";
import { useAllRequests } from "@/hooks/useRequester";

export default function ImpactDashboard() {
  const {
    data: impact,
    isLoading: impactLoading,
    error: impactError,
  } = useImpact();
  const { data: donations } = useAllDonations();
  const { data: requests } = useAllRequests();

  const collectedCount =
    donations?.filter((d) => d.status === "collected").length ?? 0;
  const redistributedCount =
    donations?.filter((d) => d.status === "redistributed").length ?? 0;
  const fulfilledCount =
    requests?.filter((r) => r.status === "fulfilled").length ?? 0;
  const openCount = requests?.filter((r) => r.status === "open").length ?? 0;

  if (impactLoading) return <LoadingState title="Loading impact data..." />;
  if (impactError)
    return (
      <ErrorState
        title="Could not load impact data."
        description={impactError.message}
      />
    );

  const STATS = [
    {
      label: "Total users",
      value: impact?.total_users ?? "—",
      icon: Users,
    },
    {
      label: "Total donations",
      value: impact?.total_donations ?? "—",
      icon: Package,
    },
    {
      label: "Approved donations",
      value: impact?.approved_donations ?? "—",
      icon: CheckCircle,
      sub: "Reviewed and accepted",
    },
    {
      label: "Total requests",
      value: impact?.total_requests ?? "—",
      icon: ClipboardList,
    },
    {
      label: "Collected donations",
      value: collectedCount,
      icon: Truck,
      sub: "Picked up from suppliers",
    },
    {
      label: "Redistributed",
      value: redistributedCount,
      icon: Recycle,
      sub: "Given a second life",
    },
    {
      label: "Requests fulfilled",
      value: fulfilledCount,
      icon: TrendingUp,
      sub: "Materials delivered",
    },
    {
      label: "Open requests",
      value: openCount,
      icon: BarChart2,
      sub: "Awaiting matching",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Impact Dashboard"
        description="Platform-wide metrics and circular economy impact."
      />

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {STATS.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      {/* Breakdown cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donations breakdown */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-display text-base text-foreground">
              Donations Breakdown
            </h2>
          </div>
          <div className="divide-y divide-border">
            {[
              { label: "Total submitted", value: impact?.total_donations ?? 0 },
              { label: "Approved", value: impact?.approved_donations ?? 0 },
              { label: "Collected", value: collectedCount },
              { label: "Redistributed", value: redistributedCount },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between px-5 py-3.5"
              >
                <span className="text-sm text-foreground-muted">{label}</span>
                <span className="text-sm font-semibold text-foreground font-display">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Requests breakdown */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-display text-base text-foreground">
              Requests Breakdown
            </h2>
          </div>
          <div className="divide-y divide-border">
            {[
              { label: "Total submitted", value: impact?.total_requests ?? 0 },
              { label: "Open", value: openCount },
              {
                label: "Matched",
                value:
                  requests?.filter((r) => r.status === "matched").length ?? 0,
              },
              { label: "Fulfilled", value: fulfilledCount },
              {
                label: "Closed",
                value:
                  requests?.filter((r) => r.status === "closed").length ?? 0,
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between px-5 py-3.5"
              >
                <span className="text-sm text-foreground-muted">{label}</span>
                <span className="text-sm font-semibold text-foreground font-display">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Platform health */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-display text-base text-foreground">
              Platform Health
            </h2>
          </div>
          <div className="divide-y divide-border">
            {[
              {
                label: "Approval rate",
                value: impact?.total_donations
                  ? `${Math.round((impact.approved_donations / impact.total_donations) * 100)}%`
                  : "—",
              },
              {
                label: "Fulfilment rate",
                value: impact?.total_requests
                  ? `${Math.round((fulfilledCount / impact.total_requests) * 100)}%`
                  : "—",
              },
              {
                label: "Total users",
                value: impact?.total_users ?? "—",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between px-5 py-3.5"
              >
                <span className="text-sm text-foreground-muted">{label}</span>
                <span className="text-sm font-semibold text-foreground font-display">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
