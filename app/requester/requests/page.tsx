"use client";

import Link from "next/link";
import { ClipboardList, ArrowRight } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useRequests } from "@/hooks/useRequester";

const STATUS_LABEL: Record<string, string> = {
  open: "Your request is open and under review.",
  matched: "A material has been matched to your request.",
  fulfilled: "Your request has been fulfilled and delivered.",
  closed: "This request has been closed.",
};

export default function MyRequestsPage() {
  const { data: requests, isLoading, error } = useRequests();

  return (
    <div>
      <PageHeader
        title="My Requests"
        description="Track all the material requests you have submitted."
        action={
          <Link
            href="/requester/browse"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground
                       px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover
                       transition-colors"
          >
            Browse Materials
          </Link>
        }
      />

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-5 animate-pulse
                         flex items-center gap-4"
            >
              <div className="w-9 h-9 rounded-xl bg-muted shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-3.5 bg-muted rounded w-1/3" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
              <div className="h-6 w-16 bg-muted rounded-full" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <p
          className="text-sm text-destructive bg-destructive/10 border
                      border-destructive/20 px-4 py-3 rounded-xl"
        >
          {error.message}
        </p>
      )}

      {/* Empty */}
      {!isLoading && !error && requests?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
            <ClipboardList size={20} className="text-foreground-muted" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-display text-lg text-foreground">
              No requests yet.
            </p>
            <p className="text-sm text-foreground-muted">
              Browse available materials and submit your first request.
            </p>
          </div>
          <Link
            href="/requester/browse"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground
                       px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover
                       transition-colors"
          >
            Browse Materials
          </Link>
        </div>
      )}

      {/* List */}
      {!isLoading && requests && requests.length > 0 && (
        <div className="flex flex-col gap-3">
          {requests.map((req) => (
            <Link
              key={req.id}
              href={`/requester/requests/${req.id}`}
              className="group flex items-center gap-4 bg-card border border-border
                         rounded-2xl p-5 hover:shadow-card hover:-translate-y-0.5
                         transition-all duration-200"
            >
              <div
                className="w-9 h-9 rounded-xl bg-background-subtle
                              flex items-center justify-center shrink-0"
              >
                <ClipboardList size={16} className="text-accent" />
              </div>

              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <p className="text-sm font-medium text-foreground">
                  {req.fabric_type} — {req.quantity_needed}
                </p>
                <p className="text-xs text-foreground-muted truncate">
                  {STATUS_LABEL[req.status]}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <StatusBadge status={req.status} />
                <ArrowRight
                  size={14}
                  className="text-foreground-muted group-hover:text-foreground
                             group-hover:translate-x-0.5 transition-all"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
