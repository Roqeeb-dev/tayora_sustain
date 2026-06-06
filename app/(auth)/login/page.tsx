import type { Metadata } from "next";
import LoginClient from "./Client";

export const metadata: Metadata = {
  title: "Log in | Tayora Sustain",
  description:
    "Access your Tayora Sustain account to upload or request materials.",
};

export default function LoginPage() {
  return <LoginClient />;
}
