"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Input from "@/components/ui/Input";
import { resetPassword } from "@/services/auth.service";

export default function ResetPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  if (!token) {
    return (
      <div className="flex flex-col justify-center h-full gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-2xl text-foreground">
            Invalid reset link.
          </h1>
          <p className="text-foreground-muted text-sm">
            This link is missing or has expired. Request a new one.
          </p>
        </div>
        <Link
          href="/auth/forgot-password"
          className="inline-flex items-center gap-2 text-sm bg-primary text-primary-foreground
                     px-4 py-2.5 rounded-xl font-medium hover:bg-primary-hover transition-colors w-fit"
        >
          Request new link <ArrowRight size={14} />
        </Link>
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} /> Back to login
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (password !== confirm) {
      setConfirmError("Passwords do not match.");
      return;
    }

    setConfirmError("");
    setLoading(true);
    try {
      await resetPassword({ token, new_password: password });
      router.push("/login?reset=success");
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
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl text-foreground">
          Set new password.
        </h1>
        <p className="text-foreground-muted text-sm">
          Choose a strong password for your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="New password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hint="Use a mix of letters, numbers and symbols."
          minLength={8}
          required
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="Repeat your password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value);
            if (confirmError) setConfirmError("");
          }}
          error={confirmError}
          required
        />

        {serverError && (
          <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 px-3 py-2.5 rounded-xl">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group h-11 w-full flex items-center justify-center gap-2
                     bg-primary text-primary-foreground rounded-xl font-medium text-sm
                     hover:bg-primary-hover transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <>
              Reset password
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </>
          )}
        </button>
      </form>

      <Link
        href="/auth/login"
        className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
      >
        <ArrowLeft size={14} /> Back to login
      </Link>
    </div>
  );
}
