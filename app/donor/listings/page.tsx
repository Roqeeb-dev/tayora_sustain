"use client";

import Link from "next/link";
import { Package, Upload } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { useDonations } from "@/hooks/useDonor";

export default function ListingsPage() {
  const { data: donations, isLoading, error } = useDonations();

  return (
    <div>
      <PageHeader
        title="My Listings"
        description="All textile donations you have submitted."
        action={
          <Link
            href="/donor/upload"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            <Upload size={14} />
            Upload New
          </Link>
        }
      />

      {/* Loading */}
      {isLoading && <LoadingState title="Loading your listings..." />}

      {/* Error */}
      {error && (
        <ErrorState
          title="Could not load listings."
          description={error.message}
        />
      )}

      {/* Empty */}
      {!isLoading && !error && donations?.length === 0 && (
        <EmptyState
          icon={Package}
          title="No listings yet."
          description="Upload your first textile donation to get started."
          action={
            <Link
              href="/donor/upload"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              <Upload size={14} />
              Upload Waste
            </Link>
          }
        />
      )}

      {/* Grid */}
      {!isLoading && donations && donations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {donations.map((donation) => (
            <Link
              key={donation.id}
              href={`/donor/listings/${donation.id}`}
              className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
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
