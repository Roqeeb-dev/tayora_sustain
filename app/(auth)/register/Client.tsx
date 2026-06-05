"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Recycle, ShoppingBag, Check } from "lucide-react";
import Input from "@/components/ui/Input";
import { register } from "@/services/auth.service";

type Role = "supplier" | "requester";

interface FormState {
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
}

const ROLES: {
  value: Role;
  icon: React.ReactNode;
  label: string;
  description: string;
}[] = [
  {
    value: "supplier",
    icon: <Recycle size={18} />,
    label: "Supplier",
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
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    password: "",
    role: "supplier",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const set =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field as keyof FormErrors])
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    setLoading(true);
    try {
      await register({
        full_name: form.fullName,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      router.push(
        form.role === "supplier"
          ? "/supplier/dashboard"
          : "/requester/dashboard",
      );
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full gap-6">
      {/* Heading */}
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl text-foreground">
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
        <div className="grid grid-cols-2 gap-2.5">
          {ROLES.map(({ value, icon, label, description }) => {
            const active = form.role === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, role: value }))}
                className={`relative flex flex-col gap-2 p-3.5 rounded-xl border-2
                            text-left transition-all duration-200 group
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
                    className={`text-xs leading-snug ${
                      active
                        ? "text-primary-foreground/70"
                        : "text-foreground-muted"
                    }`}
                  >
                    {description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form fields */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          label="Full name"
          type="text"
          placeholder="Amara Okafor"
          autoComplete="name"
          value={form.fullName}
          onChange={set("fullName")}
          error={errors.fullName}
          required
        />
        <Input
          label="Email address"
          type="email"
          placeholder="amara@example.com"
          autoComplete="email"
          value={form.email}
          onChange={set("email")}
          error={errors.email}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          value={form.password}
          onChange={set("password")}
          error={errors.password}
          hint="Use a mix of letters, numbers and symbols."
          required
          minLength={8}
        />

        {serverError && (
          <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 px-3 py-2.5 rounded-xl">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group h-11 w-full flex items-center justify-center gap-2 mt-1 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary-hover transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
        >
          {loading ? (
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
    </div>
  );
}
