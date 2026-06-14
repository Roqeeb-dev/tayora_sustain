"use client";

import { useState } from "react";
import {
  Truck,
  MapPin,
  Package,
  Clock,
  CheckCircle,
  ArrowRight,
  Calendar,
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/ui/EmptyState";

type PickupStatus = "scheduled" | "in_transit" | "collected";

interface Pickup {
  id: string;
  donation_id: string;
  fabric_type: string;
  quantity: string;
  supplier_name: string;
  location: string;
  scheduled_date: string;
  status: PickupStatus;
}

const MOCK_PICKUPS: Pickup[] = [
  {
    id: "1",
    donation_id: "D-001",
    fabric_type: "Ankara",
    quantity: "5kg",
    supplier_name: "Fatima Abubakar",
    location: "Yaba, Lagos",
    scheduled_date: "Today, 10:00 AM",
    status: "scheduled",
  },
  {
    id: "2",
    donation_id: "D-002",
    fabric_type: "Denim",
    quantity: "8kg",
    supplier_name: "Chidi Okonkwo",
    location: "Surulere, Lagos",
    scheduled_date: "Today, 2:00 PM",
    status: "in_transit",
  },
  {
    id: "3",
    donation_id: "D-003",
    fabric_type: "Cotton",
    quantity: "3kg",
    supplier_name: "Amara Nwosu",
    location: "Ikeja, Lagos",
    scheduled_date: "Yesterday, 11:00 AM",
    status: "collected",
  },
];

const FILTER_TABS: { label: string; value: PickupStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Scheduled", value: "scheduled" },
  { label: "In Transit", value: "in_transit" },
  { label: "Collected", value: "collected" },
];

const STATUS_CONFIG: Record<
  PickupStatus,
  {
    label: string;
    icon: React.ElementType;
    classes: string;
    next?: PickupStatus;
    nextLabel?: string;
  }
> = {
  scheduled: {
    label: "Scheduled",
    icon: Calendar,
    classes: "bg-warning/10 text-warning",
    next: "in_transit",
    nextLabel: "Mark In Transit",
  },
  in_transit: {
    label: "In Transit",
    icon: Truck,
    classes: "bg-blue-100 text-blue-700",
    next: "collected",
    nextLabel: "Mark Collected",
  },
  collected: {
    label: "Collected",
    icon: CheckCircle,
    classes: "bg-success/10 text-success",
  },
};

function PickupCard({ pickup }: { pickup: Pickup }) {
  const [status, setStatus] = useState<PickupStatus>(pickup.status);
  const [updating, setUpdating] = useState(false);
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  const handleAdvance = async () => {
    if (!config.next) return;
    setUpdating(true);
    // TODO: await apiClient.patch(`/admin/pickups/${pickup.id}/status`, { status: config.next })
    await new Promise((r) => setTimeout(r, 600));
    setStatus(config.next);
    setUpdating(false);
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Status bar */}
      <div
        className={`h-1 w-full ${
          status === "scheduled"
            ? "bg-warning"
            : status === "in_transit"
              ? "bg-blue-400"
              : "bg-success"
        }`}
      />

      <div className="p-5 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-background-subtle flex items-center justify-center shrink-0">
              <Package size={16} className="text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {pickup.fabric_type} — {pickup.quantity}
              </p>
              <p className="text-xs text-foreground-muted">
                Donation #{pickup.donation_id}
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${config.classes}`}
          >
            <Icon size={11} />
            {config.label}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-2 text-xs text-foreground-muted">
          <div className="flex items-center gap-2">
            <MapPin size={12} className="text-accent shrink-0" />
            {pickup.location}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={12} className="text-accent shrink-0" />
            {pickup.scheduled_date}
          </div>
          <div className="flex items-center gap-2">
            <Truck size={12} className="shrink-0" />
            {pickup.supplier_name}
          </div>
        </div>

        {/* Action */}
        {config.next && (
          <button
            onClick={handleAdvance}
            disabled={updating}
            className="w-full h-9 flex items-center justify-center gap-2 rounded-xl
                       bg-primary text-primary-foreground text-xs font-medium
                       hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {updating ? (
              <span className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                {config.nextLabel}
                <ArrowRight size={12} />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default function LogisticsPage() {
  const [filter, setFilter] = useState<PickupStatus | "all">("all");

  const filtered = MOCK_PICKUPS.filter(
    (p) => filter === "all" || p.status === filter,
  );

  const counts = {
    scheduled: MOCK_PICKUPS.filter((p) => p.status === "scheduled").length,
    in_transit: MOCK_PICKUPS.filter((p) => p.status === "in_transit").length,
    collected: MOCK_PICKUPS.filter((p) => p.status === "collected").length,
  };

  return (
    <div>
      <PageHeader
        title="Logistics"
        description="Track and manage textile pickups and collection schedules."
      />

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          {
            label: "Scheduled",
            count: counts.scheduled,
            color: "bg-warning/10 text-warning",
          },
          {
            label: "In Transit",
            count: counts.in_transit,
            color: "bg-blue-100 text-blue-700",
          },
          {
            label: "Collected",
            count: counts.collected,
            color: "bg-success/10 text-success",
          },
        ].map(({ label, count, color }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-1"
          >
            <span
              className={`text-2xl font-display font-bold ${color.split(" ")[1]}`}
            >
              {count}
            </span>
            <span className="text-xs text-foreground-muted">{label}</span>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_TABS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3.5 py-1.5 rounded-xl text-sm border transition-all duration-150
                        ${
                          filter === f.value
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-foreground-muted border-border hover:border-primary/40 hover:text-foreground"
                        }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState icon={Truck} title="No pickups found." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((pickup) => (
            <PickupCard key={pickup.id} pickup={pickup} />
          ))}
        </div>
      )}
    </div>
  );
}
