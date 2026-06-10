"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createRequest,
  getRequests,
  getSingleRequest,
  CreateRequestPayload,
} from "@/services/request.service";

export const requesterKeys = {
  requests: ["requester", "requests"] as const,
  request: (id: string) => ["requester", "requests", id] as const,
};

export function useRequests() {
  return useQuery({
    queryKey: requesterKeys.requests,
    queryFn: getRequests,
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
    },
  });
}
