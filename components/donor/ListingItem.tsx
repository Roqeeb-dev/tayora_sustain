"use client";

import Link from "next/link";
import { Edit, Trash2, Package } from "lucide-react";
import { Donation } from "@/types/donation";
import StatusBadge from "@/components/dashboard/StatusBadge";

export interface ListingItemProps {
  donation: Donation;
  href?: string;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function ListingItem({
  donation,
  href,
  onEdit,
  onDelete,
}: ListingItemProps) {
  return (
    <Link
      href={href ?? "#"}
      className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="relative h-40 bg-muted overflow-hidden">
        {donation.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
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

        {/* Action buttons  */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            type="button"
            aria-label="Edit listing"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onEdit?.(donation.id);
            }}
            className="w-9 h-9 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-white"
          >
            <Edit size={16} />
          </button>

          <button
            type="button"
            aria-label="Delete listing"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onDelete?.(donation.id);
            }}
            className="w-9 h-9 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-white"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

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
  );
}
