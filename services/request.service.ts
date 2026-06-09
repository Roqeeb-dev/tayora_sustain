import { apiClient } from "@/lib/apiClient";
import { Request } from "@/types/request";
import { ApiError } from "@/lib/apiClient";

export interface CreateRequestPayload {
  fabric_type: string;
  quantity_needed: string;
  purpose: string;
}

export async function createRequest(payload: CreateRequestPayload) {
  try {
    const res = await apiClient.post<Request>("/requests", payload);
    return res;
  } catch (err) {
    if (err instanceof ApiError) {
      throw new Error("Something went wrong. Please try again!");
    }
  }
}

export async function getRequests() {
  try {
    const res = await apiClient.get<Request[]>("/requests");
    return res;
  } catch (err) {
    if (err instanceof ApiError) {
      throw new Error("Something went wrong. Please try again!");
    }
  }
}

export async function getSingleRequest() {}
