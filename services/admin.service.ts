import type { Donation } from "@/types/donation";
import type { Request } from "@/types/request";
import { apiClient, ApiError } from "@/lib/apiClient";

export interface ImpactResponse {
  total_users: number;
  total_donations: number;
  total_requests: number;
  approved_donations: number;
}

function handleApiError(
  err: unknown,
  resource = "resource",
  action = "process",
): never {
  if (err instanceof ApiError) {
    if (err.status === 401) throw new Error("Unauthorized. Please sign in.");
    if (err.status === 403)
      throw new Error("You do not have permission to perform this action.");
    if (err.status === 404) throw new Error(`${resource} not found.`);
    if (err.status === 409)
      throw new Error(`${resource} has already been ${action}d.`);
    if (err.status === 422)
      throw new Error(
        `Please check the ${resource.toLowerCase()} details and try again.`,
      );
    throw new Error(err.message || `Could not ${action} ${resource}.`);
  }
  throw err;
}

export async function approveDonation(donation_id: string): Promise<Donation> {
  try {
    return await apiClient.patch<Donation, undefined>(
      `/admin/donations/${donation_id}/approve`,
      undefined,
    );
  } catch (err) {
    handleApiError(err, "Donation", "approve");
  }
}

export async function rejectDonation(donation_id: string): Promise<Donation> {
  try {
    return await apiClient.patch<Donation, undefined>(
      `/admin/donations/${donation_id}/reject`,
      undefined,
    );
  } catch (err) {
    handleApiError(err, "Donation", "reject");
  }
}

export async function categorizeDonation(
  donation_id: string,
  category: "redistribution" | "upcycling" | "pickup",
): Promise<Donation> {
  try {
    return await apiClient.patch<Donation, { category: string }>(
      `/admin/donations/${donation_id}/categorize`,
      { category },
    );
  } catch (err) {
    handleApiError(err, "Donation", "categorize");
  }
}

export async function approveRequest(request_id: string): Promise<Request> {
  try {
    return await apiClient.patch<Request, undefined>(
      `/admin/requests/${request_id}/approve`,
      undefined,
    );
  } catch (err) {
    handleApiError(err, "Request", "approve");
  }
}

export async function rejectRequest(request_id: string): Promise<Request> {
  try {
    return await apiClient.patch<Request, undefined>(
      `/admin/requests/${request_id}/reject`,
      undefined,
    );
  } catch (err) {
    handleApiError(err, "Request", "reject");
  }
}

export async function getImpact(): Promise<ImpactResponse> {
  try {
    return await apiClient.get<ImpactResponse>("/admin/impact");
  } catch (err) {
    handleApiError(err, "Impact", "fetch");
  }
}
