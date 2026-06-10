// src/app/supplier/upload/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Input from "@/components/ui/Input";
import PageHeader from "@/components/dashboard/PageHeader";
import { useCreateDonation } from "@/hooks/useSupplier";

const FABRIC_TYPES = [
  "Cotton",
  "Denim",
  "Ankara",
  "Linen",
  "Silk",
  "Polyester",
  "Wool",
  "Mixed",
];

export default function UploadPage() {
  const router = useRouter();
  const { mutateAsync, isPending, error } = useCreateDonation();

  const [fabricType, setFabricType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState("");
  const [fabricError, setFabricError] = useState("");

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setImageError("");
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    if (!imageFile) {
      setImageError("Please upload a photo of the textile.");
      valid = false;
    }
    if (!fabricType) {
      setFabricError("Please select a fabric type.");
      valid = false;
    }
    if (!valid) return;

    await mutateAsync({
      image_url: imageFile!.name,
      fabric_type: fabricType,
      description,
      quantity,
      location,
    });

    router.push("/supplier/listings");
  };

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Upload Textile Waste"
        description="Fill in the details below and we'll take it from there."
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* ── Image upload ─────────────────────────────── */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <p className="text-sm font-medium text-foreground">Photo</p>
            <p className="text-xs text-foreground-muted mt-0.5">
              Upload a clear image of the textile
            </p>
          </div>

          <div className="p-5">
            {imagePreview ? (
              <div className="relative w-full h-56 rounded-xl overflow-hidden">
                <Image
                  src={imagePreview}
                  alt="Textile preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full
                             bg-primary/80 text-primary-foreground
                             flex items-center justify-center
                             hover:bg-primary transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label
                className="flex flex-col items-center justify-center gap-3
                                w-full h-48 rounded-xl border-2 border-dashed
                                border-border bg-background cursor-pointer
                                hover:border-primary/40 hover:bg-background-subtle
                                transition-all duration-200"
              >
                <div
                  className="w-11 h-11 rounded-xl bg-card border border-border
                                flex items-center justify-center"
                >
                  <ImagePlus size={18} className="text-foreground-muted" />
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-sm font-medium text-foreground">
                    Click to upload
                  </span>
                  <span className="text-xs text-foreground-muted">
                    JPG, PNG or WEBP · Max 5MB
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleImage}
                />
              </label>
            )}
            {imageError && (
              <p className="text-xs text-destructive mt-2">{imageError}</p>
            )}
          </div>
        </div>

        {/* ── Fabric type ───────────────────────────────── */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <p className="text-sm font-medium text-foreground">Fabric Type</p>
            <p className="text-xs text-foreground-muted mt-0.5">
              Select the closest match
            </p>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap gap-2">
              {FABRIC_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setFabricType(type);
                    setFabricError("");
                  }}
                  className={`px-4 py-2 rounded-xl text-sm border transition-all duration-150
                              ${
                                fabricType === type
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-background text-foreground-muted border-border hover:border-primary/40 hover:text-foreground"
                              }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {fabricError && (
              <p className="text-xs text-destructive mt-3">{fabricError}</p>
            )}
          </div>
        </div>

        {/* ── Details ───────────────────────────────────── */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <p className="text-sm font-medium text-foreground">Details</p>
            <p className="text-xs text-foreground-muted mt-0.5">
              Help us understand what you're donating
            </p>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <Input
              label="Quantity"
              type="text"
              placeholder="e.g. 5kg or 3 bags"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the condition, colour, and any other relevant details..."
                required
                rows={3}
                className="w-full px-3.5 py-3 rounded-xl border border-border bg-input
                           text-sm text-foreground placeholder:text-foreground-muted/60
                           outline-none transition-all duration-200 resize-none
                           focus:ring-2 focus:ring-primary/20 focus:border-input-focus"
              />
            </div>

            <Input
              label="Pickup location"
              type="text"
              placeholder="e.g. Yaba, Lagos"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
        </div>

        {/* ── Server error ──────────────────────────────── */}
        {error && (
          <p
            className="text-sm text-destructive bg-destructive/10 border
                        border-destructive/20 px-4 py-3 rounded-xl"
          >
            {error.message}
          </p>
        )}

        {/* ── Submit ────────────────────────────────────── */}
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
              Submit Donation
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
