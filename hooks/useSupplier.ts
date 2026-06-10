"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createDonation,
  getDonations,
  getSingleDonation,
  CreateDonationPayload,
} from "@/services/donation.service";

export const supplierKeys = {
  donations: ["supplier", "donations"] as const,
  donation: (id: string) => ["supplier", "donations", id] as const,
};

export function useDonations() {
  return useQuery({
    queryKey: supplierKeys.donations,
    queryFn: getDonations,
  });
}

export function useDonation(id: string) {
  return useQuery({
    queryKey: supplierKeys.donation(id),
    queryFn: () => getSingleDonation(id),
    enabled: !!id,
  });
}

export function useCreateDonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDonationPayload) => createDonation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: supplierKeys.donations });
    },
  });
}
