"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import Input from "@/components/ui/Input";
import { apiClient } from "@/lib/apiClient";
import Link from "next/link";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [fabric, setFabric] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!title || !fabric || !quantity || !location) {
      setMessage("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      // If images were selected, submit as multipart/form-data
      if (images && images.length > 0) {
        const form = new FormData();
        form.append("title", title);
        form.append("fabric", fabric);
        form.append("quantity", String(quantity));
        form.append("description", description);
        form.append("location", location);
        Array.from(images).forEach((f) => form.append("images", f));

        const res = await fetch("/supplier/listings", {
          method: "POST",
          body: form,
          credentials: "include",
        });
        if (!res.ok) {
          const data = await res.text();
          throw new Error(data || `Request failed: ${res.status}`);
        }
      } else {
        await apiClient.post("/supplier/listings", {
          title,
          fabric,
          quantity,
          description,
          location,
        });
      }
      setMessage("Listing submitted successfully.");
      setTitle("");
      setFabric("");
      setQuantity("");
      setDescription("");
      setLocation("");
      setImages(null);
    } catch (err: any) {
      setMessage(err?.message ?? "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <PageHeader
        title="Upload Waste"
        description="Create a new listing for available waste materials."
        action={
          <Link
            href="/supplier/listings"
            className="text-sm text-accent hover:underline"
          >
            View my listings
          </Link>
        }
      />

      <form
        onSubmit={handleSubmit}
        className="mt-6 max-w-2xl bg-card border border-border rounded-2xl p-6"
      >
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Listing title"
            placeholder="E.g. Denim remnants — 3kg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">
                Fabric type
              </label>
              <select
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                required
                className="w-full h-11 px-3.5 rounded-xl border bg-input text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Select fabric</option>
                <option value="Cotton">Cotton</option>
                <option value="Denim">Denim</option>
                <option value="Linen">Linen</option>
                <option value="Mixed">Mixed</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <Input
                label="Quantity (kg)"
                type="number"
                placeholder="e.g. 3.5"
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                required
                min={0.1}
                step={0.1}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Location"
              placeholder="e.g. Yaba, Lagos"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <div>
              <label className="text-sm font-medium text-foreground inline-block mb-2">
                Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImages(e.target.files)}
                className="block w-full text-sm text-foreground"
              />

              {images && images.length > 0 && (
                <div className="mt-3 flex gap-3 flex-wrap">
                  {Array.from(images).map((f, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(f)}
                      alt={f.name}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[120px] p-3.5 rounded-xl border bg-input text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Optional details about the material, condition, or notes for pickup"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit listing"}
            </button>
          </div>

          {message && (
            <p className="text-sm text-foreground-muted">{message}</p>
          )}
        </div>
      </form>
    </main>
  );
}
