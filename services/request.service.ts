import { apiClient, ApiError } from "@/lib/apiClient";
import { Request } from "@/types/request";

export interface CreateRequestPayload {
  fabric_type: string;
  quantity_needed: string;
  purpose: string;
}

export type UpdateRequestPayload = Partial<CreateRequestPayload>;

export async function createRequest(
  payload: CreateRequestPayload,
): Promise<Request> {
  try {
    return await apiClient.post<Request>("/requests", payload);
  } catch (err: any) {
    if (err instanceof ApiError) {
      if (err.status === 422)
        throw new Error("Please check the request details and try again.");
      if (err.status === 401)
        throw new Error("Unauthorized. Please sign in and try again.");
      throw new Error(err.message || "Could not create request.");
    }
    throw err;
  }
}

export async function getRequests(): Promise<Request[]> {
  try {
    return await apiClient.get<Request[]>("/requests");
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw new Error(err.message || "Could not fetch requests.");
    }
    throw err;
  }
}

export async function getAllRequests(): Promise<Request[]> {
  try {
    return await apiClient.get<Request[]>("/requests/all");
  } catch (err: any) {
    if (err instanceof ApiError) {
      if (err.status === 401)
        throw new Error("Unauthorized. Admin access required.");
      throw new Error(err.message || "Could not fetch requests.");
    }
    throw err;
  }
}

export async function getSingleRequest(request_id: string): Promise<Request> {
  try {
    return await apiClient.get<Request>(`/requests/${request_id}`);
  } catch (err: any) {
    if (err instanceof ApiError) {
      if (err.status === 404) throw new Error("Request not found.");
      throw new Error(err.message || "Could not fetch request.");
    }
    throw err;
  }
}

export async function updateRequest(
  request_id: string,
  payload: UpdateRequestPayload,
): Promise<Request> {
  try {
    return await apiClient.put<Request, UpdateRequestPayload>(
      `/requests/${request_id}`,
      payload,
    );
  } catch (err: any) {
    if (err instanceof ApiError) {
      if (err.status === 404) throw new Error("Request not found.");
      if (err.status === 401) throw new Error("Unauthorized. Please sign in.");
      if (err.status === 422)
        throw new Error("Please check the request details and try again.");
      throw new Error(err.message || "Could not update request.");
    }
    throw err;
  }
}

export async function deleteRequest(request_id: string): Promise<void> {
  try {
    await apiClient.delete<void>(`/requests/${request_id}`);
  } catch (err: any) {
    if (err instanceof ApiError) {
      if (err.status === 404) throw new Error("Request not found.");
      if (err.status === 401) throw new Error("Unauthorized. Please sign in.");
      throw new Error(err.message || "Could not delete request.");
    }
    throw err;
  }
}
