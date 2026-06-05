import Link from "next/link";
import AuthBrandPanel from "@/components/auth/AuthBrandPanel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-row">
      <div className="flex-1 lg:w-1/2 flex flex-col bg-background">
        <div className="flex items-center px-6 py-5 border-b border-border lg:border-none">
          <Link
            href="/"
            className="font-display font-semibold text-lg text-primary"
          >
            Tayora Sustain
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 overflow-y-auto">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>

      <AuthBrandPanel />
    </div>
  );
}
