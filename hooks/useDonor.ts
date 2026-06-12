"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createDonation,
  getDonations,
  getAllDonations,
  getSingleDonation,
  updateDonation,
  deleteDonation,
  CreateDonationPayload,
  UpdateDonationPayload,
} from "@/services/donation.service";

export const donorKeys = {
  donations: ["donor", "donations"] as const,
  allDonations: ["donor", "donations", "all"] as const,
  donation: (id: string) => ["donor", "donations", id] as const,
};

export function useDonations() {
  return useQuery({
    queryKey: donorKeys.donations,
    queryFn: getDonations,
  });
}

export function useAllDonations() {
  return useQuery({
    queryKey: donorKeys.allDonations,
    queryFn: getAllDonations,
  });
}

export function useDonation(id: string) {
  return useQuery({
    queryKey: donorKeys.donation(id),
    queryFn: () => getSingleDonation(id),
    enabled: !!id,
  });
}

export function useCreateDonation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateDonationPayload) => createDonation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: donorKeys.donations });
      queryClient.invalidateQueries({ queryKey: donorKeys.allDonations });
    },
  });
}

export function useUpdateDonation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateDonationPayload) => updateDonation(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: donorKeys.donations });
      queryClient.invalidateQueries({ queryKey: donorKeys.allDonations });
      queryClient.invalidateQueries({ queryKey: donorKeys.donation(id) });
    },
  });
}

export function useDeleteDonation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteDonation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: donorKeys.donations });
      queryClient.invalidateQueries({ queryKey: donorKeys.allDonations });
    },
  });
}
