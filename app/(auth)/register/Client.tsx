"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Recycle, ShoppingBag, Check } from "lucide-react";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";

type Role = "donor" | "requester";

const ROLES: {
  value: Role;
  icon: React.ReactNode;
  label: string;
  description: string;
}[] = [
  {
    value: "donor",
    icon: <Recycle size={18} />,
    label: "Donor",
    description: "I have textile waste to donate",
  },
  {
    value: "requester",
    icon: <ShoppingBag size={18} />,
    label: "Requester",
    description: "I need fabric materials",
  },
];

export default function RegisterClient() {
  const { register, registerPending, registerError } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("donor");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ full_name: fullName, email, password, role });
      setShowSuccess(true);
    } catch {
      // error
    }
  };

  const router = useRouter();

  const handleDialogOk = () => {
    setShowSuccess(false);
    router.push(`/login?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen h-screen gap-4 p-4 overflow-hidden">
      {/* Heading */}
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-xl text-foreground">
          Create your account.
        </h1>
        <p className="text-foreground-muted text-sm">
          Already have one?{" "}
          <Link
            href="/login"
            className="text-accent font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>

      {/* Role selector */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-foreground">I am a —</span>
        <div className="grid grid-cols-2 gap-2">
          {ROLES.map(({ value, icon, label, description }) => {
            const active = role === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setRole(value)}
                className={`relative flex flex-col gap-2 p-3 rounded-xl border-2 text-left
                            transition-all duration-200 group
                            ${
                              active
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-card hover:border-primary/40 hover:bg-background-subtle"
                            }`}
              >
                <div
                  className={`absolute top-2.5 right-2.5 w-4 h-4 rounded-full border-2
                              flex items-center justify-center transition-all duration-200
                              ${active ? "border-primary-foreground bg-primary-foreground/20" : "border-border"}`}
                >
                  {active && (
                    <Check size={9} className="text-primary-foreground" />
                  )}
                </div>

                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                              ${active ? "bg-primary-foreground/15" : "bg-muted group-hover:bg-background"}`}
                >
                  <span
                    className={
                      active ? "text-primary-foreground" : "text-accent"
                    }
                  >
                    {icon}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5 pr-3">
                  <span className="text-sm font-semibold">{label}</span>
                  <span
                    className={`text-xs leading-snug ${active ? "text-primary-foreground/70" : "text-foreground-muted"}`}
                  >
                    {description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          label="Full name"
          type="text"
          placeholder="Amara Okafor"
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          minLength={2}
        />
        <Input
          label="Email address"
          type="email"
          placeholder="amara@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hint="Use a mix of letters, numbers and symbols."
          required
          minLength={8}
        />

        {registerError && (
          <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 px-3 py-2.5 rounded-xl">
            {registerError.message}
          </p>
        )}

        <button
          type="submit"
          disabled={registerPending}
          className="group h-10 w-full flex items-center justify-center gap-2 mt-0.5
                     bg-primary text-primary-foreground rounded-xl font-medium text-sm
                     hover:bg-primary-hover transition-all duration-200
                     hover:-translate-y-0.5 hover:shadow-lg
                    disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
        >
          {registerPending ? (
            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <>
              Create account
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </>
          )}
        </button>

        <p className="text-xs text-foreground-muted text-center leading-relaxed">
          By continuing you agree to our{" "}
          <Link href="/terms" className="underline hover:text-foreground">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
          .
        </p>
      </form>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative w-full max-w-md bg-card rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Account created</h3>
            <p className="text-sm text-foreground-muted mb-4">
              Your account has been created. Click OK to go to the login page
              and sign in.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSuccess(false)}
                className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/90"
              >
                Cancel
              </button>
              <button
                onClick={handleDialogOk}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
