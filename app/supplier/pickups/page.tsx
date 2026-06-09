"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import { apiClient } from "@/lib/apiClient";
import Link from "next/link";

type Pickup = {
  id: string;
  listing?: string;
  date?: string;
  location?: string;
  status?: string;
};

export default function PickupsPage() {
  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchPickups() {
      try {
        const res = await apiClient.get<Pickup[]>("/supplier/pickups");
        if (mounted) setPickups(res ?? []);
      } catch (err: any) {
        if (mounted) setError(err?.message ?? "Could not load pickups");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchPickups();
    return () => {
      mounted = false;
    };
  }, []);

  async function confirmCollected(id: string) {
    try {
      await apiClient.patch(`/supplier/pickups/${id}/confirm`, {
        collected: true,
      });
      setPickups((p) =>
        p.map((x) => (x.id === id ? { ...x, status: "collected" } : x)),
      );
    } catch (err: any) {
      alert(err?.message ?? "Could not confirm pickup");
    }
  }

  return (
    <main>
      <PageHeader
        title="Pickups"
        description="See and manage scheduled pickups."
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
        ) : pickups.length === 0 ? (
          <div className="p-6 text-sm text-foreground-muted">
            No pickups scheduled.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {pickups.map((pu) => (
              <div key={pu.id} className="flex items-center gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {pu.listing}
                  </p>
                  <p className="text-xs text-foreground-muted">
                    {pu.date} · {pu.location}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-foreground-muted">
                    {pu.status ?? "scheduled"}
                  </span>
                  {pu.status !== "collected" && (
                    <button
                      onClick={() => confirmCollected(pu.id)}
                      className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-lg"
                    >
                      Mark collected
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
