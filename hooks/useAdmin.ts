import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as adminService from "@/services/admin.service";
import type { ImpactResponse } from "@/services/admin.service";
import type { Donation } from "@/types/donation";
import type { Request as ReqType } from "@/types/request";

export function useAdmin() {
  const queryClient = useQueryClient();

  const impactQuery = useQuery<ImpactResponse, Error>(
    ["admin", "impact"],
    adminService.getImpact,
    {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );

  const approveDonationMutation = useMutation<Donation, Error, string>(
    (donationId: string) => adminService.approveDonation(donationId),
    {
      onSuccess: () => queryClient.invalidateQueries(["admin", "impact"]),
    },
  );

  const rejectDonationMutation = useMutation<Donation, Error, string>(
    (donationId: string) => adminService.rejectDonation(donationId),
    {
      onSuccess: () => queryClient.invalidateQueries(["admin", "impact"]),
    },
  );

  const categorizeDonationMutation = useMutation<Donation, Error, string>(
    (donationId: string) => adminService.categorizeDonation(donationId),
    {
      onSuccess: () => queryClient.invalidateQueries(["admin", "impact"]),
    },
  );

  const approveRequestMutation = useMutation<ReqType, Error, string>(
    (requestId: string) => adminService.approveRequest(requestId),
    {
      onSuccess: () => queryClient.invalidateQueries(["admin", "impact"]),
    },
  );

  const rejectRequestMutation = useMutation<ReqType, Error, string>(
    (requestId: string) => adminService.rejectRequest(requestId),
    {
      onSuccess: () => queryClient.invalidateQueries(["admin", "impact"]),
    },
  );

  return {
    impactQuery,
    approveDonationMutation,
    rejectDonationMutation,
    categorizeDonationMutation,
    approveRequestMutation,
    rejectRequestMutation,
  };
}
