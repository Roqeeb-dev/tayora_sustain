"use client";

import { useState } from "react";
import { Package, CheckCircle, XCircle, Trash2 } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import {
  useAllDonations,
  useUpdateDonation,
  useDeleteDonation,
} from "@/hooks/useDonor";
import { Donation, DonationStatus } from "@/types/donation";

const FILTERS: { label: string; value: DonationStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Collected", value: "collected" },
  { label: "Redistributed", value: "redistributed" },
];

function DonationRow({ donation }: { donation: Donation }) {
  const { mutate: updateDonation, isPending: updating } = useUpdateDonation(
    String(donation.id),
  );
  const { mutate: deleteDonation, isPending: deleting } = useDeleteDonation();

  const busy = updating || deleting;

  return (
    <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-background-subtle transition-colors">
      <div className="w-9 h-9 rounded-lg bg-background-subtle flex items-center justify-center shrink-0">
        <Package size={15} className="text-accent" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {donation.fabric_type} — {donation.quantity}
        </p>
        <p className="text-xs text-foreground-muted truncate">
          {donation.description}
        </p>
        <p className="text-xs text-foreground-muted/70 mt-0.5">
          {donation.location} · Donor #{donation.donor_id}
        </p>
      </div>

      <StatusBadge status={donation.status} />

      {/* Inline actions */}
      <div className="flex items-center gap-2 shrink-0">
        {donation.status === "pending" && (
          <>
            <button
              onClick={() => updateDonation({ status: "approved" } as any)}
              disabled={busy}
              className="w-7 h-7 rounded-lg bg-success/10 text-success
                         hover:bg-success/20 flex items-center justify-center
                         transition-colors disabled:opacity-50"
              title="Approve"
            >
              <CheckCircle size={14} />
            </button>
            <button
              onClick={() => updateDonation({ status: "rejected" } as any)}
              disabled={busy}
              className="w-7 h-7 rounded-lg bg-destructive/10 text-destructive
                         hover:bg-destructive/20 flex items-center justify-center
                         transition-colors disabled:opacity-50"
              title="Reject"
            >
              <XCircle size={14} />
            </button>
          </>
        )}
        <button
          onClick={() => deleteDonation(String(donation.id))}
          disabled={busy}
          className="w-7 h-7 rounded-lg bg-muted text-foreground-muted
                     hover:bg-destructive/10 hover:text-destructive
                     flex items-center justify-center transition-colors disabled:opacity-50"
          title="Delete"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}

export default function AdminListingsPage() {
  const { data: donations, isLoading, error } = useAllDonations();
  const [filter, setFilter] = useState<DonationStatus | "all">("all");

  const filtered =
    donations?.filter((d) => filter === "all" || d.status === filter) ?? [];

  return (
    <div>
      <PageHeader
        title="All Listings"
        description="Every textile donation submitted across the platform."
      />

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
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
            {f.value !== "all" && donations && (
              <span className="ml-1.5 text-xs opacity-70">
                ({donations.filter((d) => d.status === f.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {isLoading && <LoadingState title="Loading listings..." />}

      {error && (
        <ErrorState
          title="Could not load listings."
          description={error.message}
        />
      )}

      {!isLoading && !error && filtered.length === 0 && (
        <EmptyState
          icon={Package}
          title="No listings found."
          description={
            filter === "all"
              ? "No donations have been submitted yet."
              : `No ${filter} listings.`
          }
        />
      )}

      {!isLoading && filtered.length > 0 && (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="divide-y divide-border">
            {filtered.map((donation) => (
              <DonationRow key={donation.id} donation={donation} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
