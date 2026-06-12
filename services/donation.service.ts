import { apiClient, ApiError } from "@/lib/apiClient";
import { Donation } from "@/types/donation";

export interface CreateDonationPayload {
  image_url: string;
  fabric_type: string;
  description: string;
  quantity: string;
  location: string;
}

export type UpdateDonationPayload = Partial<CreateDonationPayload>;

function normalizePayload<T extends Partial<CreateDonationPayload>>(
  payload: T,
): T {
  const out = { ...payload } as T;
  if (out.fabric_type && typeof out.fabric_type === "string") {
    out.fabric_type = out.fabric_type.trim().toLowerCase() as any;
  }
  return out;
}

export async function createDonation(
  payload: CreateDonationPayload,
): Promise<Donation> {
  try {
    return await apiClient.post<Donation, CreateDonationPayload>(
      "/donations",
      normalizePayload(payload),
    );
  } catch (err: any) {
    if (err instanceof ApiError) {
      if (err.status === 413) throw new Error("Uploaded file is too large.");
      if (err.status === 422)
        throw new Error("Please check the donation details and try again.");
      if (err.status === 401) throw new Error("Unauthorized. Please sign in.");
      throw new Error(err.message || "Upload failed. Please try again.");
    }
    throw err;
  }
}

export async function getDonations(): Promise<Donation[]> {
  try {
    return await apiClient.get<Donation[]>("/donations");
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw new Error(err.message || "Could not fetch donations.");
    }
    throw err;
  }
}

// ── Get ALL donations (admin)
export async function getAllDonations(): Promise<Donation[]> {
  try {
    return await apiClient.get<Donation[]>("/donations/all");
  } catch (err: any) {
    if (err instanceof ApiError) {
      if (err.status === 401)
        throw new Error("Unauthorized. Admin access required.");
      throw new Error(err.message || "Could not fetch donations.");
    }
    throw err;
  }
}

export async function getSingleDonation(
  donation_id: string,
): Promise<Donation> {
  try {
    return await apiClient.get<Donation>(`/donations/${donation_id}`);
  } catch (err: any) {
    if (err instanceof ApiError) {
      if (err.status === 404) throw new Error("Donation not found.");
      throw new Error(err.message || "Failed to fetch donation.");
    }
    throw err;
  }
}

export async function updateDonation(
  donation_id: string,
  payload: UpdateDonationPayload,
): Promise<Donation> {
  try {
    return await apiClient.patch<Donation, UpdateDonationPayload>(
      `/donations/${donation_id}`,
      normalizePayload(payload),
    );
  } catch (err: any) {
    if (err instanceof ApiError) {
      if (err.status === 404) throw new Error("Donation not found.");
      if (err.status === 401) throw new Error("Unauthorized. Please sign in.");
      if (err.status === 422)
        throw new Error("Please check the donation details and try again.");
      throw new Error(err.message || "Could not update donation.");
    }
    throw err;
  }
}

export async function deleteDonation(donation_id: string): Promise<void> {
  try {
    await apiClient.delete<void>(`/donations/${donation_id}`);
  } catch (err: any) {
    if (err instanceof ApiError) {
      if (err.status === 404) throw new Error("Donation not found.");
      if (err.status === 401) throw new Error("Unauthorized. Please sign in.");
      throw new Error(err.message || "Could not delete donation.");
    }
    throw err;
  }
}
