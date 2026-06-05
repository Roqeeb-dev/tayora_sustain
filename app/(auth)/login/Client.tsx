"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Input from "@/components/ui/Input";
import { login } from "@/services/auth.service";

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginClient() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const set =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    setLoading(true);
    try {
      const { user } = await login({
        email: form.email,
        password: form.password,
      });
      const destinations: Record<string, string> = {
        supplier: "/supplier/dashboard",
        requester: "/requester/dashboard",
        admin: "/admin/dashboard",
      };
      router.push(destinations[user.role] ?? "/");
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center h-full gap-8">
      {/* Heading */}
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl text-foreground">
          Good to see you.
        </h1>
        <p className="text-foreground-muted text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-accent font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <div className="flex flex-col gap-1.5">
          <Input
            label="Password"
            type="password"
            placeholder="Your password"
            autoComplete="current-password"
            value={form.password}
            onChange={set("password")}
            error={errors.password}
            required
          />
          <Link
            href="/forgot-password"
            className="text-xs text-foreground-muted hover:text-accent transition-colors self-end"
          >
            Forgot password?
          </Link>
        </div>

        {serverError && (
          <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 px-3 py-2.5 rounded-xl">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group h-11 w-full flex items-center justify-center gap-2 mt-1
                     bg-primary text-primary-foreground rounded-xl font-medium text-sm
                     hover:bg-primary-hover transition-all duration-200
                     hover:-translate-y-0.5 hover:shadow-lg
                     disabled:opacity-60 disabled:cursor-not-allowed
                     disabled:translate-y-0 disabled:shadow-none"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <>
              Log in
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
