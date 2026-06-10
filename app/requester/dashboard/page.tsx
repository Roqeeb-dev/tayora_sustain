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

const STATS = [
  {
    label: "Total requests",
    value: 7,
    icon: ClipboardList,
    trend: { value: "+2 this month", positive: true },
  },
  {
    label: "Approved requests",
    value: 4,
    icon: CheckCircle,
    trend: { value: "+1 this week", positive: true },
  },
  {
    label: "Materials received",
    value: 3,
    icon: Package,
    sub: "Successfully delivered",
  },
  {
    label: "Saved listings",
    value: 11,
    icon: Bookmark,
    sub: "Across all fabric types",
  },
];

const RECENT_REQUESTS = [
  {
    id: "1",
    title: "Cotton fabric — 4kg",
    purpose: "Final year collection",
    status: "delivered" as const,
    date: "3 days ago",
  },
  {
    id: "2",
    title: "Ankara prints — 2kg",
    purpose: "Client order",
    status: "matched" as const,
    date: "5 days ago",
  },
  {
    id: "3",
    title: "Denim offcuts — 6kg",
    purpose: "Personal project",
    status: "approved" as const,
    date: "1 week ago",
  },
  {
    id: "4",
    title: "Mixed remnants — 3kg",
    purpose: "Workshop materials",
    status: "pending" as const,
    date: "1 week ago",
  },
];

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
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Here's what's happening with your material requests."
        action={
          <Link
            href="/requester/browse"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground
                       px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover
                       transition-colors"
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
          <div className="divide-y divide-border">
            {RECENT_REQUESTS.map((req) => (
              <div
                key={req.id}
                className="flex items-center gap-4 px-5 py-3.5
                           hover:bg-background-subtle transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-lg bg-background-subtle
                                flex items-center justify-center shrink-0"
                >
                  <ClipboardList size={14} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {req.title}
                  </p>
                  <p className="text-xs text-foreground-muted">
                    {req.purpose} · {req.date}
                  </p>
                </div>
                <StatusBadge status={req.status} />
              </div>
            ))}
          </div>
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
        </div>
      </div>
    </div>
  );
}
