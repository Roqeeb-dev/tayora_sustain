import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using Tayora Sustain, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the platform. We reserve the right to update these terms at any time, and continued use of the platform constitutes acceptance of any changes.",
  },
  {
    title: "2. Platform Description",
    content:
      "Tayora Sustain is a circular economy platform that connects textile waste donors with individuals and organisations that need fabric materials. We also operate an in-house upcycling pipeline that transforms unmatched textile waste into finished products. The platform is available to users based in Nigeria.",
  },
  {
    title: "3. User Accounts",
    content:
      "You must register for an account to use the platform. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to provide accurate, current, and complete information during registration and to update such information as necessary.",
  },
  {
    title: "4. Donor Responsibilities",
    content:
      "As a donor, you agree to submit only textile materials that you own or have the legal right to donate. You agree to accurately describe the fabric type, quantity, and condition of materials submitted. Tayora Sustain reserves the right to reject any submission that does not meet our standards or that we are unable to process.",
  },
  {
    title: "5. Requester Responsibilities",
    content:
      "As a requester, you agree to use materials received through the platform for lawful purposes only. You agree not to resell materials obtained through Tayora Sustain without prior written consent. Requesters are responsible for arranging or accepting delivery in accordance with the logistics communicated by the platform.",
  },
  {
    title: "6. Platform Role",
    content:
      "Tayora Sustain acts as an intermediary between donors and requesters. We do not guarantee the quality, quantity, or availability of any materials listed on the platform. We reserve the right to approve, reject, or categorise any donation at our sole discretion.",
  },
  {
    title: "7. Intellectual Property",
    content:
      "All content on the Tayora Sustain platform — including but not limited to text, graphics, logos, and software — is the property of Tayora Sustain and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without express written permission.",
  },
  {
    title: "8. Limitation of Liability",
    content:
      "Tayora Sustain is not liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability for any claim arising out of or relating to these terms shall not exceed the amounts paid by you to us in the twelve months preceding the claim.",
  },
  {
    title: "9. Termination",
    content:
      "We reserve the right to suspend or terminate your account at any time if you violate these terms or engage in conduct that we determine to be harmful to the platform, other users, or third parties. You may also delete your account at any time by contacting us.",
  },
  {
    title: "10. Governing Law",
    content:
      "These Terms of Use are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Lagos State, Nigeria.",
  },
  {
    title: "11. Contact",
    content:
      "If you have any questions about these Terms of Use, please contact us at legal@tayorasustain.com.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-foreground-muted
                     hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Back to home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <span
            className="inline-flex items-center gap-2 text-xs font-medium
                           tracking-widest uppercase text-foreground-muted mb-4"
          >
            <span className="w-6 h-px bg-accent" />
            Legal
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-4">
            Terms of Use
          </h1>
          <p className="text-foreground-muted text-sm">
            Last updated: June 2025 · Effective immediately upon account
            creation
          </p>
        </div>

        {/* Intro */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <p className="text-foreground-muted text-sm leading-relaxed">
            These Terms of Use govern your access to and use of the Tayora
            Sustain platform, including our website, services, and any
            associated applications. Please read these terms carefully before
            using the platform.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-8">
          {SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h2 className="font-display text-lg text-foreground">
                {section.title}
              </h2>
              <p className="text-foreground-muted text-sm leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-foreground-muted leading-relaxed">
            By using Tayora Sustain, you acknowledge that you have read,
            understood, and agree to these Terms of Use. Questions? Email us at{" "}
            <a
              href="mailto:support@tayorasustain.com"
              className="text-accent hover:underline"
            >
              legal@tayorasustain.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
