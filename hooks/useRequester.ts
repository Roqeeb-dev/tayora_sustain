"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createRequest,
  getRequests,
  getAllRequests,
  getSingleRequest,
  updateRequest,
  deleteRequest,
  CreateRequestPayload,
  UpdateRequestPayload,
} from "@/services/request.service";

export const requesterKeys = {
  requests: ["requester", "requests"] as const,
  allRequests: ["requester", "requests", "all"] as const,
  request: (id: string) => ["requester", "requests", id] as const,
};

export function useRequests() {
  return useQuery({
    queryKey: requesterKeys.requests,
    queryFn: getRequests,
  });
}

export function useAllRequests() {
  return useQuery({
    queryKey: requesterKeys.allRequests,
    queryFn: getAllRequests,
  });
}

export function useRequest(id: string) {
  return useQuery({
    queryKey: requesterKeys.request(id),
    queryFn: () => getSingleRequest(id),
    enabled: !!id,
  });
}

export function useCreateRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateRequestPayload) => createRequest(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: requesterKeys.requests });
      queryClient.invalidateQueries({ queryKey: requesterKeys.allRequests });
    },
  });
}

export function useUpdateRequest(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateRequestPayload) => updateRequest(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: requesterKeys.requests });
      queryClient.invalidateQueries({ queryKey: requesterKeys.allRequests });
      queryClient.invalidateQueries({ queryKey: requesterKeys.request(id) });
    },
  });
}

export function useDeleteRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: requesterKeys.requests });
      queryClient.invalidateQueries({ queryKey: requesterKeys.allRequests });
    },
  });
}
