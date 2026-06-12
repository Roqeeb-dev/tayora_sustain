"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { queryKeys } from "@/lib/queryKeys";
import {
  getMe,
  login,
  register,
  logout,
  LoginPayload,
  RegisterPayload,
} from "@/services/auth.service";

const ROLE_REDIRECTS: Record<string, string> = {
  supplier: "/supplier/dashboard",
  requester: "/requester/dashboard",
  admin: "/admin/dashboard",
};

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: user,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: getMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const isAuthenticated = !!user;

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      const loggedInUser = (data as any)?.user ?? (data as any);
      queryClient.setQueryData(queryKeys.auth.me, loggedInUser);
      router.push(ROLE_REDIRECTS[loggedInUser?.role] ?? "/");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.me, user);
      router.push(ROLE_REDIRECTS[user.role] ?? "/");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: queryKeys.auth.me });
      router.push("/login");
    },
  });

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    isFetching,

    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: () => logoutMutation.mutate(),

    loginPending: loginMutation.isPending,
    registerPending: registerMutation.isPending,
    logoutPending: logoutMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
}
