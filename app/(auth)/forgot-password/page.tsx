import type { Metadata } from "next";
import ForgotPasswordClient from "./Client";

export const metadata: Metadata = {
  title: "Forgot password | Tayora Sustain",
  description: "Reset your Tayora Sustain account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
