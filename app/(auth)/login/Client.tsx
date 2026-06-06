"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";

export default function LoginClient() {
  const { login, loginError, loginPending } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch {}
  };

  return (
    <div className="flex flex-col justify-center h-full gap-8">
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email address"
          type="email"
          placeholder="amara@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="flex flex-col gap-1.5">
          <Input
            label="Password"
            type="password"
            placeholder="Your password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Link
            href="/forgot-password"
            className="text-xs text-foreground-muted hover:text-accent transition-colors self-end"
          >
            Forgot password?
          </Link>
        </div>

        {loginError && (
          <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 px-3 py-2.5 rounded-xl">
            {loginError.message}
          </p>
        )}

        <button
          type="submit"
          disabled={loginPending}
          className="group h-11 w-full flex items-center justify-center gap-2 mt-1 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary-hover transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
        >
          {loginPending ? (
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
