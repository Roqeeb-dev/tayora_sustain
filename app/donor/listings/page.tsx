"use client";

import Link from "next/link";
import { Package, Upload } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { useDeleteDonation, useDonations } from "@/hooks/useDonor";
import ListingItem from "@/components/donor/ListingItem";
import { useState } from "react";
import Dialog from "@/components/dashboard/Dialog";

export default function ListingsPage() {
  const { data: donations, isLoading, error } = useDonations();

  const [isDialogShown, setIsDialogShown] = useState(false);
  const deleteDonation = useDeleteDonation();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [dialogLoading, setDialogLoading] = useState(false);

  const requestDelete = (id: number) => {
    setSelectedId(id);
    setIsDialogShown(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;
    setDialogLoading(true);
    try {
      await deleteDonation.mutateAsync(String(selectedId));
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDialogLoading(false);
      setIsDialogShown(false);
      setSelectedId(null);
    }
  };

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
            <ListingItem
              key={donation.id}
              donation={donation}
              href={`/donor/listings/${donation.id}`}
              onDelete={requestDelete}
            />
          ))}
        </div>
      )}

      <Dialog
        open={isDialogShown}
        onClose={() => setIsDialogShown(false)}
        title="Delete Confirmation"
        type="confirm"
        message="Are you sure you want to delete this item?"
        confirmText="Yes, Delete it"
        cancelText="No, Keep it"
        onConfirm={confirmDelete}
        loading={dialogLoading}
      />
    </div>
  );
}
