"use client";

import Link from "next/link";
import { Package, Upload } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useDonations } from "@/hooks/useSupplier";

export default function ListingsPage() {
  const { data: donations, isLoading, error } = useDonations();

  return (
    <div>
      <PageHeader
        title="My Listings"
        description="All textile donations you have submitted."
        action={
          <Link
            href="/supplier/upload"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground
                       px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover
                       transition-colors"
          >
            <Upload size={14} />
            Upload New
          </Link>
        }
      />

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="h-40 bg-muted" />
              <div className="p-4 flex flex-col gap-2">
                <div className="h-3 bg-muted rounded w-1/3" />
                <div className="h-4 bg-muted rounded w-2/3" />
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
      {!isLoading && !error && donations?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
            <Package size={20} className="text-foreground-muted" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-display text-lg text-foreground">
              No listings yet.
            </p>
            <p className="text-sm text-foreground-muted">
              Upload your first textile donation to get started.
            </p>
          </div>
          <Link
            href="/supplier/upload"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground
                       px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover
                       transition-colors"
          >
            <Upload size={14} />
            Upload Waste
          </Link>
        </div>
      )}

      {/* Grid */}
      {!isLoading && donations && donations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {donations.map((donation) => (
            <Link
              key={donation.id}
              href={`/supplier/listings/${donation.id}`}
              className="group flex flex-col bg-card border border-border rounded-2xl
                         overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5
                         transition-all duration-200"
            >
              {/* Image */}
              <div className="relative h-40 bg-muted overflow-hidden">
                {donation.image_url ? (
                  <img
                    src={donation.image_url}
                    alt={donation.fabric_type}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package size={28} className="text-border" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <StatusBadge status={donation.status} />
                </div>
              </div>

              {/* Details */}
              <div className="p-4 flex flex-col gap-1.5 border-t border-border">
                <span className="text-xs text-foreground-muted tracking-widest uppercase font-medium">
                  {donation.fabric_type}
                </span>
                <p className="text-sm font-medium text-foreground line-clamp-2">
                  {donation.description}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-foreground-muted">
                    {donation.quantity}
                  </span>
                  <span className="text-xs text-foreground-muted">
                    {donation.location}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
