"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, FileText, MapPin } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useRequest } from "@/hooks/useRequester";

const TIMELINE: Record<string, { step: number; steps: string[] }> = {
  open: {
    step: 0,
    steps: ["Submitted", "Under Review", "Matched", "Fulfilled"],
  },
  matched: {
    step: 2,
    steps: ["Submitted", "Under Review", "Matched", "Fulfilled"],
  },
  fulfilled: {
    step: 3,
    steps: ["Submitted", "Under Review", "Matched", "Fulfilled"],
  },
  closed: {
    step: 3,
    steps: ["Submitted", "Under Review", "Matched", "Closed"],
  },
};

export default function RequestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: request, isLoading, error } = useRequest(id);

  if (isLoading) {
    return (
      <div className="max-w-2xl flex flex-col gap-4 animate-pulse">
        <div className="h-6 bg-muted rounded w-1/3" />
        <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
          <div className="h-4 bg-muted rounded w-1/4" />
          <div className="h-3 bg-muted rounded w-1/2" />
          <div className="h-3 bg-muted rounded w-1/3" />
        </div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <p className="font-display text-lg text-foreground">
          Request not found.
        </p>
        <Link
          href="/requester/requests"
          className="text-sm text-accent hover:underline"
        >
          Back to requests
        </Link>
      </div>
    );
  }

  const timeline = TIMELINE[request.status] ?? TIMELINE.open;

  return (
    <div className="max-w-2xl">
      <Link
        href="/requester/requests"
        className="inline-flex items-center gap-2 text-sm text-foreground-muted
                   hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={14} /> Back to requests
      </Link>

      <PageHeader
        title={`Request #${request.id}`}
        description="Full details and current status of your request."
      />

      {/* Status timeline */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-5">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">Status</p>
          <StatusBadge status={request.status} />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-0">
            {timeline.steps.map((step, i) => {
              const done = i <= timeline.step;
              const isLast = i === timeline.steps.length - 1;
              return (
                <div
                  key={step}
                  className="flex items-center flex-1 last:flex-none"
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-7 h-7 rounded-full border-2 flex items-center
                                  justify-center text-xs font-bold transition-colors
                                  ${
                                    done
                                      ? "bg-primary border-primary text-primary-foreground"
                                      : "bg-card border-border text-foreground-muted"
                                  }`}
                    >
                      {i + 1}
                    </div>
                    <span
                      className={`text-[10px] font-medium text-center leading-tight
                                      ${done ? "text-primary" : "text-foreground-muted"}`}
                    >
                      {step}
                    </span>
                  </div>
                  {!isLast && (
                    <div
                      className={`flex-1 h-0.5 mx-1 mb-4 transition-colors
                                  ${i < timeline.step ? "bg-primary" : "bg-border"}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Request details */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <p className="text-sm font-medium text-foreground">Details</p>
        </div>
        <div className="divide-y divide-border">
          <div className="flex items-center gap-3 px-5 py-3.5">
            <Package size={15} className="text-accent shrink-0" />
            <span className="text-xs text-foreground-muted w-28 shrink-0">
              Fabric type
            </span>
            <span className="text-sm text-foreground font-medium">
              {request.fabric_type}
            </span>
          </div>
          <div className="flex items-center gap-3 px-5 py-3.5">
            <MapPin size={15} className="text-accent shrink-0" />
            <span className="text-xs text-foreground-muted w-28 shrink-0">
              Quantity needed
            </span>
            <span className="text-sm text-foreground font-medium">
              {request.quantity_needed}
            </span>
          </div>
          <div className="flex items-start gap-3 px-5 py-3.5">
            <FileText size={15} className="text-accent shrink-0 mt-0.5" />
            <span className="text-xs text-foreground-muted w-28 shrink-0">
              Purpose
            </span>
            <span className="text-sm text-foreground">{request.purpose}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
