"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LoadingState from "@/components/ui/LoadingState";

type Props = {
  children: React.ReactNode;
  allowedRole: string | string[];
};

export default function AuthGuard({ children, allowedRole }: Props) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    const allowed = Array.isArray(allowedRole) ? allowedRole : [allowedRole];
    if (!isAuthenticated || !user || !allowed.includes(user?.role)) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, user, allowedRole, router]);

  if (isLoading) return <LoadingState />;

  const allowed = Array.isArray(allowedRole) ? allowedRole : [allowedRole];
  if (!isAuthenticated || !user || !allowed.includes(user?.role)) return null;

  return <>{children}</>;
}
