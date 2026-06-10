// src/app/admin/dashboard/page.tsx
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
  XCircle,
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";

const STATS = [
  {
    label: "Total users",
    value: 3200,
    icon: Users,
    trend: { value: "+24 this week", positive: true },
  },
  {
    label: "Total listings",
    value: 148,
    icon: Package,
    trend: { value: "+12 today", positive: true },
  },
  {
    label: "Pending approvals",
    value: 12,
    icon: Clock,
    sub: "Requires attention",
  },
  {
    label: "Active requests",
    value: 34,
    icon: ClipboardList,
    trend: { value: "+5 today", positive: true },
  },
  {
    label: "Successful matches",
    value: 870,
    icon: GitMerge,
    trend: { value: "+8 this week", positive: true },
  },
  {
    label: "Upcycled products",
    value: 340,
    icon: Recycle,
    trend: { value: "+14 this month", positive: true },
  },
  {
    label: "Waste collected",
    value: "12,400kg",
    icon: Truck,
    trend: { value: "+340kg", positive: true },
  },
  {
    label: "Cities active",
    value: 6,
    icon: Users,
    sub: "Across Nigeria",
  },
];

const PENDING_LISTINGS = [
  {
    id: "1",
    supplier: "Fatima A.",
    title: "Ankara offcuts — 5kg",
    fabric: "Ankara",
    submitted: "2 hours ago",
  },
  {
    id: "2",
    supplier: "Chidi O.",
    title: "Denim remnants — 8kg",
    fabric: "Denim",
    submitted: "4 hours ago",
  },
  {
    id: "3",
    supplier: "Amara N.",
    title: "Cotton scraps — 3kg",
    fabric: "Cotton",
    submitted: "Yesterday",
  },
  {
    id: "4",
    supplier: "Tolu B.",
    title: "Mixed fabric — 6kg",
    fabric: "Mixed",
    submitted: "Yesterday",
  },
];

const RECENT_ACTIVITY = [
  {
    id: "1",
    action: "Listing approved",
    detail: "Silk blend — 4kg by Kemi A.",
    time: "10 min ago",
    type: "approved" as const,
  },
  {
    id: "2",
    action: "Match created",
    detail: "Cotton 3kg → Requester Bola",
    time: "32 min ago",
    type: "matched" as const,
  },
  {
    id: "3",
    action: "Pickup scheduled",
    detail: "Ankara 5kg — Tomorrow 10AM",
    time: "1 hour ago",
    type: "pending" as const,
  },
  {
    id: "4",
    action: "Listing rejected",
    detail: "Unidentified fabric — 2kg",
    time: "2 hours ago",
    type: "rejected" as const,
  },
  {
    id: "5",
    action: "Delivery confirmed",
    detail: "Linen 7kg → Requester Tunde",
    time: "3 hours ago",
    type: "delivered" as const,
  },
];

export default function AdminDashboardPage() {
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
              <span
                className="text-xs font-semibold bg-warning/10 text-warning
                               px-2 py-0.5 rounded-full"
              >
                {PENDING_LISTINGS.length}
              </span>
            </div>
            <Link
              href="/admin/listings"
              className="text-xs text-accent hover:underline flex items-center gap-1"
            >
              Manage all <ArrowRight size={12} />
            </Link>
          </div>

          <div className="divide-y divide-border">
            {PENDING_LISTINGS.map((listing) => (
              <div
                key={listing.id}
                className="flex items-center gap-4 px-5 py-3.5
                           hover:bg-background-subtle transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-lg bg-background-subtle
                                flex items-center justify-center shrink-0"
                >
                  <Package size={14} className="text-accent" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {listing.title}
                  </p>
                  <p className="text-xs text-foreground-muted">
                    {listing.supplier} · {listing.fabric} · {listing.submitted}
                  </p>
                </div>

                {/* Inline approve / reject */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    className="w-7 h-7 rounded-lg bg-success/10 text-success
                               hover:bg-success/20 flex items-center justify-center
                               transition-colors"
                    title="Approve"
                  >
                    <CheckCircle size={14} />
                  </button>
                  <button
                    className="w-7 h-7 rounded-lg bg-destructive/10 text-destructive
                               hover:bg-destructive/20 flex items-center justify-center
                               transition-colors"
                    title="Reject"
                  >
                    <XCircle size={14} />
                  </button>
                  <Link
                    href={`/admin/listings/${listing.id}`}
                    className="text-xs bg-primary text-primary-foreground px-3 py-1.5
                               rounded-lg hover:bg-primary-hover transition-colors font-medium"
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-display text-base text-foreground">
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-border">
            {RECENT_ACTIVITY.map((item) => (
              <div key={item.id} className="px-5 py-3.5 flex gap-3">
                <div className="mt-0.5 shrink-0">
                  <StatusBadge status={item.type} />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {item.action}
                  </p>
                  <p className="text-xs text-foreground-muted truncate">
                    {item.detail}
                  </p>
                  <p className="text-[11px] text-foreground-muted/60">
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
