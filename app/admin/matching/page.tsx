"use client";

import { useState } from "react";
import { Package, ClipboardList } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useAllDonations, donorKeys } from "@/hooks/useDonor";
import { useAllRequests, requesterKeys } from "@/hooks/useRequester";
import { updateDonation as apiUpdateDonation } from "@/services/donation.service";
import { updateRequest as apiUpdateRequest } from "@/services/request.service";
import { useQueryClient } from "@tanstack/react-query";

export default function AdminMatchingPage() {
  const {
    data: donations,
    isLoading: donationsLoading,
    error: donationsError,
  } = useAllDonations();
  const {
    data: requests,
    isLoading: requestsLoading,
    error: requestsError,
  } = useAllRequests();

  const [selectedDonation, setSelectedDonation] = useState<number | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [isMatching, setIsMatching] = useState(false);

  const queryClient = useQueryClient();

  const availableDonations = (donations ?? []).filter(
    (d) => d.status === "approved",
  );
  const openRequests = (requests ?? []).filter((r) => r.status === "open");

  async function handleMatch() {
    if (!selectedDonation || !selectedRequest) return;
    setIsMatching(true);
    try {
      await apiUpdateDonation(String(selectedDonation), {
        status: "redistributed",
        request_id: selectedRequest,
      } as any);

      await apiUpdateRequest(String(selectedRequest), {
        status: "matched",
        donation_id: selectedDonation,
      } as any);

      await queryClient.invalidateQueries({ queryKey: donorKeys.allDonations });
      await queryClient.invalidateQueries({
        queryKey: requesterKeys.allRequests,
      });

      setSelectedDonation(null);
      setSelectedRequest(null);
    } catch (err) {
      // swallow here; UI could show toast later
      console.error(err);
    } finally {
      setIsMatching(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Matching"
        description="Match open requests with approved donations across the platform."
      />

      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="text-sm text-foreground-muted">
          Select a donation and a request, then click Match selected.
        </div>
        <div>
          <button
            onClick={handleMatch}
            disabled={!selectedDonation || !selectedRequest || isMatching}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-60"
          >
            {isMatching ? "Matching..." : "Match selected"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <h2 className="font-medium text-sm text-foreground-muted mb-3">
            Available Donations
          </h2>

          {donationsLoading && <LoadingState title="Loading donations..." />}
          {donationsError && (
            <ErrorState
              title="Could not load donations"
              description={(donationsError as any).message}
            />
          )}

          {!donationsLoading &&
            !donationsError &&
            availableDonations.length === 0 && (
              <EmptyState
                icon={Package}
                title="No available donations"
                description="No approved donations are available for matching."
              />
            )}

          {!donationsLoading && availableDonations.length > 0 && (
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="divide-y divide-border">
                {availableDonations.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => setSelectedDonation(d.id)}
                    className={`flex items-center gap-4 px-5 py-3.5 cursor-pointer transition-colors ${selectedDonation === d.id ? "bg-primary/10" : "hover:bg-background-subtle"}`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-background-subtle flex items-center justify-center shrink-0">
                      <Package size={15} className="text-accent" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {d.fabric_type} — {d.quantity}
                      </p>
                      <p className="text-xs text-foreground-muted truncate">
                        {d.description} · {d.location}
                      </p>
                    </div>

                    <StatusBadge status={d.status} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section>
          <h2 className="font-medium text-sm text-foreground-muted mb-3">
            Open Requests
          </h2>

          {requestsLoading && <LoadingState title="Loading requests..." />}
          {requestsError && (
            <ErrorState
              title="Could not load requests"
              description={(requestsError as any).message}
            />
          )}

          {!requestsLoading && !requestsError && openRequests.length === 0 && (
            <EmptyState
              icon={ClipboardList}
              title="No open requests"
              description="No open material requests."
            />
          )}

          {!requestsLoading && openRequests.length > 0 && (
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="divide-y divide-border">
                {openRequests.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRequest(r.id)}
                    className={`flex items-center gap-4 px-5 py-3.5 cursor-pointer transition-colors ${selectedRequest === r.id ? "bg-primary/10" : "hover:bg-background-subtle"}`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-background-subtle flex items-center justify-center shrink-0">
                      <ClipboardList size={15} className="text-accent" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {r.fabric_type} — {r.quantity_needed}
                      </p>
                      <p className="text-xs text-foreground-muted truncate">
                        {r.purpose}
                      </p>
                      <p className="text-xs text-foreground-muted/70 mt-0.5">
                        Requester #{r.requester_id}
                      </p>
                    </div>

                    <StatusBadge status={r.status} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
