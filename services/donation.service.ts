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

function toFormData(payload: Partial<CreateDonationPayload>): FormData {
  const fd = new FormData();
  if (payload.fabric_type) fd.append("fabric_type", payload.fabric_type);
  if (payload.description) fd.append("description", payload.description);
  if (payload.location) fd.append("location", payload.location);
  if (payload.image_url) fd.append("image_url", payload.image_url);
  if (payload.quantity) fd.append("quantity", payload.quantity);
  return fd;
}

export async function createDonation(
  payload: CreateDonationPayload,
): Promise<Donation> {
  try {
    return await apiClient.postForm<Donation>(
      "/donations",
      toFormData(payload),
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
    return await apiClient.patchForm<Donation>(
      `/donations/${donation_id}`,
      toFormData(payload),
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
