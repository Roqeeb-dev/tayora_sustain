import type { Metadata } from "next";
import RegisterClient from "./Client";

export const metadata: Metadata = {
  title: "Create account | Tayora Sustain",
  description:
    "Create a Tayora Sustain account to donate or request textile materials.",
};

export default function RegisterPage() {
  return <RegisterClient />;
}
