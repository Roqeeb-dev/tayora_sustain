"use client";

import Input from "@/components/ui/Input";
import Link from "next/link";

export default function LoginClient() {
  return (
    <main>
      <div className="flex flex-col gap-1.5">
        <h1 className="font-display text-3xl text-foreground">Login</h1>
        <p className="text-foreground-muted text-sm">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-accent font-medium hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>

      <form className="flex flex-col gap-4">
        <Input
          label="Email address"
          type="email"
          placeholder="amara@example.com"
          autoComplete="email"
          //   value={form.fullName}
          //   onChange={set("fullName")}
          //   error={errors.fullName}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          //   value={form.password}
          //   onChange={set("password")}
          //   error={errors.password}
          hint="Use a mix of letters, numbers and symbols."
          required
        />

        <button
          type="submit"
          className="group mt-2 h-11 w-full flex items-center justify-center gap-2
                     bg-primary text-primary-foreground rounded-xl font-medium text-sm
                     hover:bg-primary-hover transition-all duration-200
                     hover:-translate-y-0.5 hover:shadow-lg
                     disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
        >
          Login
        </button>
      </form>
    </main>
  );
}
