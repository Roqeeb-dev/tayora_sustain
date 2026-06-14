"use client";

import { useState } from "react";
import {
  Recycle,
  Package,
  Tag,
  ArrowRight,
  Scissors,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/ui/EmptyState";

type UpcyclingStatus = "raw" | "in_production" | "finished";

interface UpcyclingItem {
  id: string;
  donation_id: string;
  fabric_type: string;
  quantity: string;
  origin: string;
  product_type: string;
  status: UpcyclingStatus;
  entered_at: string;
}

const MOCK_ITEMS: UpcyclingItem[] = [
  {
    id: "1",
    donation_id: "D-006",
    fabric_type: "Ankara",
    quantity: "3kg",
    origin: "Ikeja, Lagos",
    product_type: "Tote Bags",
    status: "raw",
    entered_at: "2 days ago",
  },
  {
    id: "2",
    donation_id: "D-007",
    fabric_type: "Denim",
    quantity: "5kg",
    origin: "Yaba, Lagos",
    product_type: "Scrunchies & Accessories",
    status: "in_production",
    entered_at: "4 days ago",
  },
  {
    id: "3",
    donation_id: "D-008",
    fabric_type: "Cotton",
    quantity: "4kg",
    origin: "Surulere, Lagos",
    product_type: "Market Bags",
    status: "finished",
    entered_at: "1 week ago",
  },
];

const STATUS_CONFIG: Record<
  UpcyclingStatus,
  {
    label: string;
    icon: React.ElementType;
    classes: string;
    barColor: string;
    next?: UpcyclingStatus;
    nextLabel?: string;
  }
> = {
  raw: {
    label: "Raw Material",
    icon: Package,
    classes: "bg-warning/10 text-warning",
    barColor: "bg-warning",
    next: "in_production",
    nextLabel: "Send to Production",
  },
  in_production: {
    label: "In Production",
    icon: Scissors,
    classes: "bg-blue-100 text-blue-700",
    barColor: "bg-blue-400",
    next: "finished",
    nextLabel: "Mark as Finished",
  },
  finished: {
    label: "Finished",
    icon: Sparkles,
    classes: "bg-success/10 text-success",
    barColor: "bg-success",
  },
};

const FILTER_TABS: { label: string; value: UpcyclingStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Raw Material", value: "raw" },
  { label: "In Production", value: "in_production" },
  { label: "Finished", value: "finished" },
];

function UpcyclingCard({ item }: { item: UpcyclingItem }) {
  const [status, setStatus] = useState<UpcyclingStatus>(item.status);
  const [updating, setUpdating] = useState(false);
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  const handleAdvance = async () => {
    if (!config.next) return;
    setUpdating(true);
    // TODO: await apiClient.patch(`/admin/upcycling/${item.id}/status`, { status: config.next })
    await new Promise((r) => setTimeout(r, 600));
    setStatus(config.next);
    setUpdating(false);
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Status color bar */}
      <div className={`h-1 w-full ${config.barColor}`} />

      <div className="p-5 flex flex-col gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-background-subtle flex items-center justify-center shrink-0">
              <Recycle size={16} className="text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {item.fabric_type} — {item.quantity}
              </p>
              <p className="text-xs text-foreground-muted">
                Donation #{item.donation_id}
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${config.classes}`}
          >
            <Icon size={11} />
            {config.label}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs text-foreground-muted">
            <Tag size={12} className="text-accent shrink-0" />
            <span className="font-medium text-foreground">
              {item.product_type}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground-muted">
            <Package size={12} className="shrink-0" />
            From {item.origin}
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground-muted">
            <Recycle size={12} className="shrink-0" />
            Entered pipeline {item.entered_at}
          </div>
        </div>

        {/* Pipeline progress dots */}
        <div className="flex items-center gap-2">
          {(["raw", "in_production", "finished"] as UpcyclingStatus[]).map(
            (s, i) => {
              const steps = [
                "raw",
                "in_production",
                "finished",
              ] as UpcyclingStatus[];
              const currentIndex = steps.indexOf(status);
              const done = i <= currentIndex;
              return (
                <div
                  key={s}
                  className="flex items-center gap-2 flex-1 last:flex-none"
                >
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 transition-colors ${done ? "bg-primary" : "bg-border"}`}
                  />
                  {i < 2 && (
                    <div
                      className={`flex-1 h-px transition-colors ${done && i < currentIndex ? "bg-primary" : "bg-border"}`}
                    />
                  )}
                </div>
              );
            },
          )}
        </div>

        {/* Action button */}
        {config.next ? (
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
        ) : (
          <div
            className="w-full h-9 flex items-center justify-center gap-2 rounded-xl
                          bg-success/10 text-success text-xs font-medium"
          >
            <CheckCircle size={13} />
            Product Complete
          </div>
        )}
      </div>
    </div>
  );
}

export default function UpcyclingPage() {
  const [filter, setFilter] = useState<UpcyclingStatus | "all">("all");

  const filtered = MOCK_ITEMS.filter(
    (item) => filter === "all" || item.status === filter,
  );

  const counts = {
    raw: MOCK_ITEMS.filter((i) => i.status === "raw").length,
    in_production: MOCK_ITEMS.filter((i) => i.status === "in_production")
      .length,
    finished: MOCK_ITEMS.filter((i) => i.status === "finished").length,
  };

  return (
    <div>
      <PageHeader
        title="Upcycling Pipeline"
        description="Track textile donations being transformed into finished products."
      />

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Raw Material", count: counts.raw, color: "text-warning" },
          {
            label: "In Production",
            count: counts.in_production,
            color: "text-blue-600",
          },
          { label: "Finished", count: counts.finished, color: "text-success" },
        ].map(({ label, count, color }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-1"
          >
            <span className={`text-2xl font-display font-bold ${color}`}>
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
        <EmptyState
          icon={Recycle}
          title="No items in this stage."
          description="Donations routed to upcycling will appear here."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <UpcyclingCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
