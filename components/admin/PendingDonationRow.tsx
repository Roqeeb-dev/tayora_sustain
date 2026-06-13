"use client";

import { useUpdateDonation } from "@/hooks/useDonor";
import { Donation } from "@/types/donation";
import { Package, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function PendingDonationRow({ listing }: { listing: Donation }) {
  const { mutate, isPending } = useUpdateDonation(String(listing.id));

  return (
    <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-background-subtle transition-colors">
      <div className="w-8 h-8 rounded-lg bg-background-subtle flex items-center justify-center shrink-0">
        <Package size={14} className="text-accent" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {listing.fabric_type} — {listing.quantity}
        </p>
        <p className="text-xs text-foreground-muted truncate">
          {listing.description} · {listing.location}
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => mutate({ status: "approved" } as any)}
          disabled={isPending}
          className="w-7 h-7 rounded-lg bg-success/10 text-success hover:bg-success/20 flex items-center justify-center transition-colors disabled:opacity-50"
          title="Approve"
        >
          <CheckCircle size={14} />
        </button>
        <button
          onClick={() => mutate({ status: "rejected" } as any)}
          disabled={isPending}
          className="w-7 h-7 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 flex items-center justify-center transition-colors disabled:opacity-50"
          title="Reject"
        >
          <XCircle size={14} />
        </button>
        <Link
          href="/admin/listings"
          className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary-hover transition-colors font-medium"
        >
          Review
        </Link>
      </div>
    </div>
  );
}
