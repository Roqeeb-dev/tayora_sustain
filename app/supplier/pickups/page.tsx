"use client";

import { Truck, Clock, MapPin, Package } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useDonations } from "@/hooks/useSupplier";
import { Donation } from "@/types/donation";

const PICKUP_STATUSES = ["approved", "collected"];

function PickupCard({ donation }: { donation: Donation }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-background-subtle flex items-center justify-center shrink-0">
            <Package size={16} className="text-accent" />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium text-foreground">
              {donation.fabric_type} — {donation.quantity}
            </p>
            <p className="text-xs text-foreground-muted line-clamp-1">
              {donation.description}
            </p>
          </div>
        </div>
        <StatusBadge status={donation.status} />
      </div>

      <div className="flex flex-col gap-2 pt-1 border-t border-border">
        <div className="flex items-center gap-2">
          <MapPin size={13} className="text-foreground-muted shrink-0" />
          <span className="text-xs text-foreground-muted">
            {donation.location}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={13} className="text-foreground-muted shrink-0" />
          <span className="text-xs text-foreground-muted">
            {donation.status === "approved"
              ? "Awaiting pickup scheduling"
              : "Pickup completed"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PickupsPage() {
  const { data: donations, isLoading, error } = useDonations();

  const pickups = donations?.filter((d) => PICKUP_STATUSES.includes(d.status));

  return (
    <div>
      <PageHeader
        title="Pickups"
        description="Donations that have been approved and are scheduled for collection."
      />

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-5 animate-pulse flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-muted shrink-0" />
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="h-3.5 bg-muted rounded w-2/3" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-1 border-t border-border">
                <div className="h-3 bg-muted rounded w-1/3" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 px-4 py-3 rounded-xl">
          {error.message}
        </p>
      )}

      {/* Empty */}
      {!isLoading && !error && pickups?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
            <Truck size={20} className="text-foreground-muted" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-display text-lg text-foreground">
              No pickups yet.
            </p>
            <p className="text-sm text-foreground-muted max-w-xs">
              Once your donations are approved, they will appear here with
              pickup details.
            </p>
          </div>
        </div>
      )}

      {/* Pickups split by status */}
      {!isLoading && pickups && pickups.length > 0 && (
        <div className="flex flex-col gap-8">
          {/* Approved — awaiting pickup */}
          {pickups.filter((d) => d.status === "approved").length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-base text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-warning" />
                Awaiting Pickup
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pickups
                  .filter((d) => d.status === "approved")
                  .map((d) => (
                    <PickupCard key={d.id} donation={d} />
                  ))}
              </div>
            </div>
          )}

          {/* Collected */}
          {pickups.filter((d) => d.status === "collected").length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-base text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success" />
                Collected
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pickups
                  .filter((d) => d.status === "collected")
                  .map((d) => (
                    <PickupCard key={d.id} donation={d} />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
