import AuthBrandPanel from "@/components/auth/AuthBrandPanel";

export default function LoginPage() {
  return (
    <>
      <AuthBrandPanel />

      {/* Form goes here */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-3xl text-foreground">
            Good to see you.
          </h1>
          <p className="text-foreground-muted text-sm">
            Log in to your Tayora Sustain account.
          </p>
        </div>

        {/* form fields come next */}
      </div>
    </>
  );
}
