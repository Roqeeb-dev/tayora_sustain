"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Donation } from "@/types/donation";
import { useUpdateDonation } from "@/hooks/useDonor";
import { Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  donation: Donation | null;
  onClose: () => void;
  onSaved?: () => void;
}

export default function UpdateListingModal({
  open,
  donation,
  onClose,
  onSaved,
}: Props) {
  const [fabricType, setFabricType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (donation) {
      setFabricType(donation.fabric_type ?? "");
      setQuantity(donation.quantity ?? "");
      setDescription(donation.description ?? "");
      setLocation(donation.location ?? "");
    }
  }, [donation]);

  const update = useUpdateDonation(donation ? String(donation.id) : "");

  if (!open || !donation) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await update.mutateAsync({
        fabric_type: fabricType,
        quantity,
        description,
        location,
      });
      onSaved?.();
      onClose();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-lg bg-card border border-border rounded-xl shadow-xl flex flex-col gap-4 p-6 z-10"
      >
        <h3 className="text-sm font-semibold">Update Listing</h3>

        <div className="grid grid-cols-1 gap-3">
          <label className="text-xs text-foreground-muted">Fabric type</label>
          <input
            value={fabricType}
            onChange={(e) => setFabricType(e.target.value)}
            className="px-3 py-2 rounded-md border border-border bg-background"
          />

          <label className="text-xs text-foreground-muted">Quantity</label>
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="px-3 py-2 rounded-md border border-border bg-background"
          />

          <label className="text-xs text-foreground-muted">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-3 py-2 rounded-md border border-border bg-background"
          />

          <label className="text-xs text-foreground-muted">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-3 py-2 rounded-md border border-border bg-background resize-none h-24"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-border bg-background text-foreground hover:bg-muted disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
}
