import { apiClient, ApiError } from "@/lib/apiClient";
import { Donation } from "@/types/donation";

export interface CreateDonationPayload {
  image_url: string;
  fabric_type: string;
  description: string;
  quantity: string;
  location: string;
}

function toFormData(payload: Partial<CreateDonationPayload>): FormData {
  const fd = new FormData();
  if (payload.fabric_type) fd.append("fabric_type", payload.fabric_type);
  if (payload.description) fd.append("description", payload.description);
  if (payload.location) fd.append("location", payload.location);
  if (payload.image_url) fd.append("image_url", payload.image_url);
  if (payload.quantity) fd.append("quantity", payload.quantity);
  return fd;
}

export async function createDonation(payload: CreateDonationPayload) {
  try {
    const res = await apiClient.postForm<Donation>(
      "/donations",
      toFormData(payload),
    );

    return res;
  } catch (err) {
    if (err instanceof ApiError) {
      throw new Error("Upload failed. Please try again!");
    }
  }
}

export async function getDonations() {
  try {
    const res = await apiClient.get<Donation[]>("/donations");

    return res;
  } catch (err) {
    if (err instanceof ApiError) {
      throw new Error("Something went wrong. Please try again!");
    }
  }
}

export async function getSingleDonation(donation_id: string) {
  try {
    const res = await apiClient.get<Donation>(`/donations/${donation_id}`);
    return res;
  } catch (err) {
    if (err instanceof ApiError) {
      throw new Error("Failed to fetch. Please try again!");
    }
  }
}
