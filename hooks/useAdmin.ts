"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  approveDonation,
  rejectDonation,
  categorizeDonation,
  approveRequest,
  rejectRequest,
  getImpact,
} from "@/services/admin.service";
import { donorKeys } from "@/hooks/useDonor";
import { requesterKeys } from "@/hooks/useRequester";

export const adminKeys = {
  impact: ["admin", "impact"] as const,
};

export function useImpact() {
  return useQuery({
    queryKey: adminKeys.impact,
    queryFn: getImpact,
    staleTime: 1000 * 60 * 2,
  });
}

export function useApproveDonation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (donation_id: string) => approveDonation(donation_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: donorKeys.donations });
      queryClient.invalidateQueries({ queryKey: donorKeys.allDonations });
      queryClient.invalidateQueries({ queryKey: adminKeys.impact });
    },
  });
}

export function useRejectDonation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (donation_id: string) => rejectDonation(donation_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: donorKeys.donations });
      queryClient.invalidateQueries({ queryKey: donorKeys.allDonations });
    },
  });
}

export function useCategorizeDonation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      donation_id,
      category,
    }: {
      donation_id: string;
      category: "redistribution" | "upcycling" | "pickup";
    }) => categorizeDonation(donation_id, category),
    onSuccess: (_, { donation_id }) => {
      queryClient.invalidateQueries({ queryKey: donorKeys.allDonations });
      queryClient.invalidateQueries({
        queryKey: donorKeys.donation(donation_id),
      });
    },
  });
}

export function useApproveRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request_id: string) => approveRequest(request_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: requesterKeys.requests });
      queryClient.invalidateQueries({ queryKey: requesterKeys.allRequests });
      queryClient.invalidateQueries({ queryKey: adminKeys.impact });
    },
  });
}

export function useRejectRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request_id: string) => rejectRequest(request_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: requesterKeys.requests });
      queryClient.invalidateQueries({ queryKey: requesterKeys.allRequests });
    },
  });
}
