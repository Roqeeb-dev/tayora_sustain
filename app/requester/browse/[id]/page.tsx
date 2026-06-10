// src/app/requester/browse/[id]/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import { useCreateRequest } from "@/hooks/useRequester";

const MOCK_MATERIALS: Record<
  string,
  {
    id: string;
    fabric_type: string;
    quantity: string;
    description: string;
    location: string;
  }
> = {
  "1": {
    id: "1",
    fabric_type: "Ankara",
    quantity: "5kg",
    description: "Assorted ankara prints in good condition, vibrant colours.",
    location: "Ikeja, Lagos",
  },
  "2": {
    id: "2",
    fabric_type: "Cotton",
    quantity: "8kg",
    description: "White and off-white cotton offcuts from a garment factory.",
    location: "Yaba, Lagos",
  },
  "3": {
    id: "3",
    fabric_type: "Denim",
    quantity: "3kg",
    description: "Mixed denim remnants, various weights and washes.",
    location: "Surulere, Lagos",
  },
  "4": {
    id: "4",
    fabric_type: "Linen",
    quantity: "6kg",
    description: "Natural linen blend offcuts, perfect for summer pieces.",
    location: "VI, Lagos",
  },
  "5": {
    id: "5",
    fabric_type: "Silk",
    quantity: "2kg",
    description: "Silk blend scraps from a bridal atelier.",
    location: "Lekki, Lagos",
  },
};

const FABRIC_PURPOSES = [
  "Final year collection",
  "Client order",
  "Personal project",
  "Workshop / class",
  "Small brand production",
  "Other",
];

export default function MaterialDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const material = MOCK_MATERIALS[id];

  const { mutateAsync, isPending, error } = useCreateRequest();

  const [quantityNeeded, setQuantityNeeded] = useState("");
  const [purpose, setPurpose] = useState("");
  const [customPurpose, setCustomPurpose] = useState("");
  const [purposeError, setPurposeError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!material) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <p className="font-display text-lg text-foreground">
          Material not found.
        </p>
        <Link
          href="/requester/browse"
          className="text-sm text-accent hover:underline"
        >
          Back to browse
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!purpose) {
      setPurposeError("Please select a purpose.");
      return;
    }
    setPurposeError("");

    await mutateAsync({
      fabric_type: material.fabric_type,
      quantity_needed: quantityNeeded,
      purpose: purpose === "Other" ? customPurpose : purpose,
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="max-w-md mx-auto flex flex-col items-center justify-center
                      py-20 gap-6 text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center">
          <ArrowRight size={22} className="text-success" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-2xl text-foreground">
            Request submitted.
          </h2>
          <p className="text-sm text-foreground-muted leading-relaxed">
            We&apos;ve received your request for{" "}
            <span className="text-foreground font-medium">
              {material.fabric_type}
            </span>
            . You&apos;ll be notified when it&apos;s reviewed.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/requester/requests"
            className="text-sm bg-primary text-primary-foreground px-4 py-2.5
                       rounded-xl font-medium hover:bg-primary-hover transition-colors"
          >
            View my requests
          </Link>
          <Link
            href="/requester/browse"
            className="text-sm bg-card border border-border text-foreground px-4 py-2.5
                       rounded-xl font-medium hover:bg-background-subtle transition-colors"
          >
            Browse more
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      {/* Back */}
      <Link
        href="/requester/browse"
        className="inline-flex items-center gap-2 text-sm text-foreground-muted
                   hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={14} /> Back to browse
      </Link>

      {/* Material card */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
        <div className="h-48 bg-background-subtle flex items-center justify-center border-b border-border">
          <Package size={36} className="text-border" />
        </div>
        <div className="p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-widest uppercase text-foreground-muted">
              {material.fabric_type}
            </span>
            <span
              className="text-xs bg-success/10 text-success px-2.5 py-1
                             rounded-full font-medium"
            >
              Available
            </span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            {material.description}
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-border">
            <span className="text-sm font-medium text-foreground">
              {material.quantity} available
            </span>
            <div className="flex items-center gap-1.5">
              <MapPin size={12} className="text-foreground-muted" />
              <span className="text-xs text-foreground-muted">
                {material.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Request form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <p className="text-sm font-medium text-foreground">Your Request</p>
            <p className="text-xs text-foreground-muted mt-0.5">
              Tell us what you need and why
            </p>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <Input
              label="Quantity needed"
              type="text"
              placeholder="e.g. 2kg or 1 bag"
              value={quantityNeeded}
              onChange={(e) => setQuantityNeeded(e.target.value)}
              required
            />

            {/* Purpose selector */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                Purpose
              </span>
              <div className="flex flex-wrap gap-2">
                {FABRIC_PURPOSES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPurpose(p);
                      setPurposeError("");
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-sm border transition-all duration-150
                                ${
                                  purpose === p
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-background text-foreground-muted border-border hover:border-primary/40 hover:text-foreground"
                                }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              {purpose === "Other" && (
                <Input
                  type="text"
                  placeholder="Describe your purpose"
                  value={customPurpose}
                  onChange={(e) => setCustomPurpose(e.target.value)}
                  required
                />
              )}
              {purposeError && (
                <p className="text-xs text-destructive">{purposeError}</p>
              )}
            </div>
          </div>
        </div>

        {error && (
          <p
            className="text-sm text-destructive bg-destructive/10 border
                        border-destructive/20 px-4 py-3 rounded-xl"
          >
            {error.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="group h-11 w-full flex items-center justify-center gap-2
                     bg-primary text-primary-foreground rounded-xl font-medium text-sm
                     hover:bg-primary-hover transition-all duration-200
                     hover:-translate-y-0.5 hover:shadow-lg
                     disabled:opacity-60 disabled:cursor-not-allowed
                     disabled:translate-y-0 disabled:shadow-none"
        >
          {isPending ? (
            <span
              className="w-4 h-4 border-2 border-primary-foreground/30
                             border-t-primary-foreground rounded-full animate-spin"
            />
          ) : (
            <>
              Submit Request
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
