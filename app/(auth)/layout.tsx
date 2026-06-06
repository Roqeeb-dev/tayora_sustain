import type { Metadata } from "next";
import AuthBrandPanel from "@/components/auth/AuthBrandPanel";
import { QueryProvider } from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Authentication | Tayora Sustain",
  description:
    "Sign in or create an account to manage listings and requests on Tayora Sustain.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-row">
      <div className="flex-1 lg:w-1/2 flex flex-col bg-background">
        <div className="flex-1 flex items-center justify-center px-6 overflow-y-auto">
          <div className="w-full max-w-md">
            <QueryProvider>{children}</QueryProvider>
          </div>
        </div>
      </div>

      <AuthBrandPanel />
    </div>
  );
}
