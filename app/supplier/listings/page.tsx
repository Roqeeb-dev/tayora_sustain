"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { apiClient } from "@/lib/apiClient";
import Link from "next/link";

type Listing = {
  id: string;
  title: string;
  fabric?: string;
  weight?: number | string;
  status?: string;
  date?: string;
};

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchListings() {
      try {
        const res = await apiClient.get<Listing[]>("/supplier/listings");
        if (mounted) setListings(res ?? []);
      } catch (err: any) {
        if (mounted) setError(err?.message ?? "Could not load listings");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchListings();
    return () => {
      mounted = false;
    };
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this listing?")) return;
    try {
      await apiClient.delete(`/supplier/listings/${id}`);
      setListings((s) => s.filter((l) => l.id !== id));
    } catch (err: any) {
      alert(err?.message ?? "Delete failed");
    }
  }

  return (
    <main>
      <PageHeader
        title="My Listings"
        description="Manage the waste listings you've uploaded."
        action={
          <Link
            href="/supplier/upload"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            Upload waste
          </Link>
        }
      />

      <div className="mt-6 bg-card border border-border rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-6 text-sm text-foreground-muted">Loading...</div>
        ) : error ? (
          <div className="p-6 text-sm text-destructive">{error}</div>
        ) : listings.length === 0 ? (
          <div className="p-6 text-sm text-foreground-muted">
            No listings yet.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {listings.map((l) => (
              <div key={l.id} className="flex items-center gap-4 px-5 py-4">
                <div className="w-10 h-10 rounded-lg bg-background-subtle flex items-center justify-center shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 7h18v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 7V5a4 4 0 0 1 8 0v2"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {l.title}
                  </p>
                  <p className="text-xs text-foreground-muted">
                    {l.fabric ?? "—"} · {l.weight ?? "—"} kg
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge status={(l.status ?? "pending") as any} />
                  <button
                    onClick={() => handleDelete(l.id)}
                    className="text-xs text-destructive hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
