// src/app/auth/register/RegisterClient.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Recycle, ShoppingBag, Check } from "lucide-react";
import Input from "@/components/ui/Input";

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
    icon: <Recycle size={20} />,
    label: "Supplier",
    description: "I have textile waste to donate",
  },
  {
    value: "requester",
    icon: <ShoppingBag size={20} />,
    label: "Requester",
    description: "I need fabric materials",
  },
];

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.fullName.trim()) errors.fullName = "Full name is required.";
  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address.";
  if (!form.password) errors.password = "Password is required.";
  else if (form.password.length < 8)
    errors.password = "Password must be at least 8 characters.";
  return errors;
}

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
    const errs = validate(form);
    if (Object.keys(errs).length) return setErrors(errs);

    setLoading(true);
    try {
      // Replace with your register service call
      // await authService.register(form);
      await new Promise((r) => setTimeout(r, 1200)); // placeholder
      router.push(
        form.role === "supplier"
          ? "/supplier/dashboard"
          : "/requester/dashboard",
      );
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Heading */}
      <div className="flex flex-col gap-1.5">
        <h1 className="font-display text-3xl text-foreground">
          Create your account.
        </h1>
        <p className="text-foreground-muted text-sm">
          Already have one?{" "}
          <Link
            href="/auth/login"
            className="text-accent font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>

      {/* Role selector */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-foreground">I am a —</span>
        <div className="grid grid-cols-2 gap-3">
          {ROLES.map(({ value, icon, label, description }) => {
            const active = form.role === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, role: value }))}
                className={`relative flex flex-col gap-2.5 p-4 rounded-2xl border-2
                            text-left transition-all duration-200 group
                            ${
                              active
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-background-subtle"
                            }`}
              >
                {/* Check mark */}
                <div
                  className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                              ${active ? "border-primary-foreground bg-primary-foreground/20" : "border-border"}`}
                >
                  {active && (
                    <Check size={11} className="text-primary-foreground" />
                  )}
                </div>

                {/* Icon */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200
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

                {/* Text */}
                <div className="flex flex-col gap-0.5 pr-4">
                  <span className="text-sm font-semibold">{label}</span>
                  <span
                    className={`text-xs leading-snug transition-colors ${
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label="Full name"
          type="text"
          placeholder="Amara Okafor"
          autoComplete="name"
          value={form.fullName}
          onChange={set("fullName")}
          error={errors.fullName}
        />

        <Input
          label="Email address"
          type="email"
          placeholder="amara@example.com"
          autoComplete="email"
          value={form.email}
          onChange={set("email")}
          error={errors.email}
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
        />

        {serverError && (
          <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 px-4 py-3 rounded-xl">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group mt-2 h-11 w-full flex items-center justify-center gap-2
                     bg-primary text-primary-foreground rounded-xl font-medium text-sm
                     hover:bg-primary-hover transition-all duration-200
                     hover:-translate-y-0.5 hover:shadow-lg
                     disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
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
          By creating an account you agree to our{" "}
          <Link href="/terms" className="underline hover:text-foreground">
            Terms of Use
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
