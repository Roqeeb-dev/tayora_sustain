import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    items: [
      {
        subtitle: "Account information",
        text: "When you register, we collect your full name, email address, and role (donor or requester). This information is necessary to operate your account and provide the service.",
      },
      {
        subtitle: "Donation information",
        text: "When you submit a textile donation, we collect images, fabric type, quantity, description, and pickup location. This information is used to process and match your donation.",
      },
      {
        subtitle: "Request information",
        text: "When you submit a material request, we collect fabric type, quantity needed, and purpose. This information is used to match you with available materials.",
      },
      {
        subtitle: "Usage information",
        text: "We may collect information about how you interact with the platform, including pages visited, actions taken, and device information. This helps us improve the platform.",
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    items: [
      {
        subtitle: "Service delivery",
        text: "To process donations, match materials, coordinate logistics, and manage your account.",
      },
      {
        subtitle: "Communication",
        text: "To send status updates, notifications, and important information about your account or activity on the platform.",
      },
      {
        subtitle: "Platform improvement",
        text: "To understand how users interact with the platform and make data-driven improvements to our service.",
      },
      {
        subtitle: "Impact reporting",
        text: "To generate anonymised aggregate statistics about the platform's environmental and social impact.",
      },
    ],
  },
  {
    title: "3. Information Sharing",
    items: [
      {
        subtitle: "Between users",
        text: "Donors and requesters do not have direct access to each other's personal information. Location details shared are limited to pickup area information necessary for logistics.",
      },
      {
        subtitle: "Service providers",
        text: "We may share information with trusted third-party service providers (such as cloud storage and email services) who assist us in operating the platform. These providers are contractually obligated to keep your information confidential.",
      },
      {
        subtitle: "Legal requirements",
        text: "We may disclose your information if required by law or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.",
      },
    ],
  },
  {
    title: "4. Data Security",
    items: [
      {
        subtitle: "Protection measures",
        text: "We implement industry-standard security measures including encrypted data transmission (HTTPS), secure authentication, and access controls to protect your personal information.",
      },
      {
        subtitle: "Breach notification",
        text: "In the event of a data breach that affects your personal information, we will notify you in accordance with applicable Nigerian data protection laws.",
      },
    ],
  },
  {
    title: "5. Your Rights",
    items: [
      {
        subtitle: "Access",
        text: "You have the right to request a copy of the personal information we hold about you.",
      },
      {
        subtitle: "Correction",
        text: "You have the right to request correction of any inaccurate or incomplete information.",
      },
      {
        subtitle: "Deletion",
        text: "You may request deletion of your account and associated personal data. Note that some information may be retained for legal or operational reasons.",
      },
      {
        subtitle: "Objection",
        text: "You may object to certain uses of your personal information, including use for marketing purposes.",
      },
    ],
  },
  {
    title: "6. Cookies",
    items: [
      {
        subtitle: "Session cookies",
        text: "We use HTTP-only session cookies to maintain your authentication state. These cookies are essential for the platform to function and cannot be disabled.",
      },
      {
        subtitle: "No tracking cookies",
        text: "We do not use advertising or third-party tracking cookies. We do not sell your data to advertisers.",
      },
    ],
  },
  {
    title: "7. Data Retention",
    items: [
      {
        subtitle: "Account data",
        text: "We retain your account information for as long as your account is active or as needed to provide services.",
      },
      {
        subtitle: "Donation and request data",
        text: "Records of donations and requests are retained for operational and impact reporting purposes, even after the transaction is complete.",
      },
    ],
  },
  {
    title: "8. Compliance",
    items: [
      {
        subtitle: "NDPR",
        text: "This policy is in accordance with the Nigeria Data Protection Regulation (NDPR) issued by the National Information Technology Development Agency (NITDA).",
      },
    ],
  },
  {
    title: "9. Contact",
    items: [
      {
        subtitle: "Data queries",
        text: "For any questions about this Privacy Policy or to exercise your rights, please contact our Data Protection Officer at privacy@tayorasustain.com.",
      },
    ],
  },
];

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-foreground-muted text-sm">
            Last updated: June 2025 · Compliant with the Nigeria Data Protection
            Regulation (NDPR)
          </p>
        </div>

        {/* Intro */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <p className="text-foreground-muted text-sm leading-relaxed">
            Tayora Sustain is committed to protecting your personal information.
            This Privacy Policy explains what data we collect, how we use it,
            and your rights regarding your information. We do not sell your
            data.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-5">
              <h2 className="font-display text-lg text-foreground">
                {section.title}
              </h2>
              <div className="flex flex-col gap-4">
                {section.items.map((item) => (
                  <div
                    key={item.subtitle}
                    className="flex flex-col gap-1 pl-4 border-l-2 border-border"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {item.subtitle}
                    </span>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-foreground-muted leading-relaxed">
            This policy was last reviewed in June 2026. We may update it
            periodically. Continued use of Tayora Sustain after changes
            constitutes acceptance of the revised policy. Contact us at{" "}
            <a
              href="mailto:privacy@tayorasustain.com"
              className="text-accent hover:underline"
            >
              privacy@tayorasustain.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
