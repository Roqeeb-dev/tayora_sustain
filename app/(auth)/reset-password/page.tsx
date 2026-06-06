import type { Metadata } from "next";
import ResetPasswordClient from "./Client";

export const metadata: Metadata = {
  title: "Reset password | Tayora Sustain",
  description: "Set a new password for your Tayora Sustain account.",
};

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
