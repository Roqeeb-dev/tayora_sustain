import { Suspense } from "react";
import AuthBrandPanel from "@/components/auth/AuthBrandPanel";
import ResetPasswordClient from "./Client";
import LoadingState from "@/components/ui/LoadingState";

export default function ResetPasswordPage() {
  return (
    <>
      <Suspense fallback={<LoadingState title="Loading..." />}>
        <ResetPasswordClient />
      </Suspense>
      <AuthBrandPanel />
    </>
  );
}
