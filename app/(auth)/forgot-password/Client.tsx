"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Input from "@/components/ui/Input";
import { forgotPassword } from "@/services/auth.service";

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    setLoading(true);
    try {
      await forgotPassword({ email });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col justify-center h-full gap-6">
        <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center">
          <ArrowRight size={20} className="text-success" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-2xl text-foreground">
            Check your inbox.
          </h1>
          <p className="text-foreground-muted text-sm leading-relaxed">
            We sent a password reset link to{" "}
            <span className="text-foreground font-medium">{email}</span>. It
            expires in 30 minutes.
          </p>
        </div>
        <p className="text-sm text-foreground-muted">
          Didn&apos;t receive it?{" "}
          <button
            onClick={() => setSubmitted(false)}
            className="text-accent font-medium hover:underline"
          >
            Try again
          </button>
        </p>
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center h-full gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl text-foreground">
          Forgot your password?
        </h1>
        <p className="text-foreground-muted text-sm">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email address"
          type="email"
          placeholder="amara@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          error={error}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="group h-11 w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary-hover transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <>
              Send reset link
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </>
          )}
        </button>
      </form>

      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
      >
        <ArrowLeft size={14} />
        Back to login
      </Link>
    </div>
  );
}
