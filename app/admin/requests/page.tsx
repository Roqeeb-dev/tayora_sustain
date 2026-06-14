"use client";

import { useState } from "react";
import { ClipboardList, CheckCircle, XCircle, Trash2 } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { useAllRequests, useDeleteRequest } from "@/hooks/useRequester";
import { useApproveRequest, useRejectRequest } from "@/hooks/useAdmin";
import { Request, RequestStatus } from "@/types/request";

const FILTERS: { label: string; value: RequestStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "Matched", value: "matched" },
  { label: "Fulfilled", value: "fulfilled" },
  { label: "Closed", value: "closed" },
];

function RequestRow({ request }: { request: Request }) {
  const { mutate: approve, isPending: approving } = useApproveRequest();
  const { mutate: reject, isPending: rejecting } = useRejectRequest();
  const { mutate: remove, isPending: deleting } = useDeleteRequest();

  const busy = approving || rejecting || deleting;

  return (
    <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-background-subtle transition-colors">
      <div className="w-9 h-9 rounded-lg bg-background-subtle flex items-center justify-center shrink-0">
        <ClipboardList size={15} className="text-accent" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {request.fabric_type} — {request.quantity_needed}
        </p>
        <p className="text-xs text-foreground-muted truncate">
          {request.purpose}
        </p>
        <p className="text-xs text-foreground-muted/70 mt-0.5">
          Requester #{request.requester_id}
        </p>
      </div>

      <StatusBadge status={request.status} />

      <div className="flex items-center gap-2 shrink-0">
        {request.status === "open" && (
          <>
            <button
              onClick={() => approve(String(request.id))}
              disabled={busy}
              className="w-7 h-7 rounded-lg bg-success/10 text-success
                         hover:bg-success/20 flex items-center justify-center
                         transition-colors disabled:opacity-50"
              title="Approve"
            >
              {approving ? (
                <span className="w-3 h-3 border border-success/40 border-t-success rounded-full animate-spin" />
              ) : (
                <CheckCircle size={14} />
              )}
            </button>
            <button
              onClick={() => reject(String(request.id))}
              disabled={busy}
              className="w-7 h-7 rounded-lg bg-destructive/10 text-destructive
                         hover:bg-destructive/20 flex items-center justify-center
                         transition-colors disabled:opacity-50"
              title="Reject / Close"
            >
              {rejecting ? (
                <span className="w-3 h-3 border border-destructive/40 border-t-destructive rounded-full animate-spin" />
              ) : (
                <XCircle size={14} />
              )}
            </button>
          </>
        )}
        <button
          onClick={() => remove(String(request.id))}
          disabled={busy}
          className="w-7 h-7 rounded-lg bg-muted text-foreground-muted
                     hover:bg-destructive/10 hover:text-destructive
                     flex items-center justify-center transition-colors disabled:opacity-50"
          title="Delete"
        >
          {deleting ? (
            <span className="w-3 h-3 border border-foreground-muted/40 border-t-foreground-muted rounded-full animate-spin" />
          ) : (
            <Trash2 size={13} />
          )}
        </button>
      </div>
    </div>
  );
}

export default function AdminRequestsPage() {
  const { data: requests, isLoading, error } = useAllRequests();
  const [filter, setFilter] = useState<RequestStatus | "all">("all");

  const filtered =
    requests?.filter((r) => filter === "all" || r.status === filter) ?? [];

  return (
    <div>
      <PageHeader
        title="All Requests"
        description="Every material request submitted across the platform."
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3.5 py-1.5 rounded-xl text-sm border transition-all duration-150
                        ${
                          filter === f.value
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-foreground-muted border-border hover:border-primary/40 hover:text-foreground"
                        }`}
          >
            {f.label}
            {f.value !== "all" && requests && (
              <span className="ml-1.5 text-xs opacity-70">
                ({requests.filter((r) => r.status === f.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {isLoading && <LoadingState title="Loading requests..." />}
      {error && (
        <ErrorState
          title="Could not load requests."
          description={error.message}
        />
      )}
      {!isLoading && !error && filtered.length === 0 && (
        <EmptyState
          icon={ClipboardList}
          title="No requests found."
          description={
            filter === "all"
              ? "No requests have been submitted yet."
              : `No ${filter} requests.`
          }
        />
      )}
      {!isLoading && filtered.length > 0 && (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="divide-y divide-border">
            {filtered.map((request) => (
              <RequestRow key={request.id} request={request} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
