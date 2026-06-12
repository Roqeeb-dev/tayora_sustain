import Link from "next/link";
import { Mail } from "lucide-react";
import { InstagramIcon, XIcon, LinkedInIcon } from "@/public/icons/SocialIcons";

const FOOTER_LINKS = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "For Donors", href: "/#donors" },
  { label: "For Requesters", href: "/#requesters" },
  { label: "About", href: "/#about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com/tayorasustain",
    icon: InstagramIcon,
  },
  { label: "Twitter", href: "https://twitter.com/tayorasustain", icon: XIcon },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/tayorasustain",
    icon: LinkedInIcon,
  },
  { label: "Email", href: "mailto:hello@tayorasustain.com", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Link
              href="/"
              className="font-display font-semibold text-lg text-primary-foreground"
            >
              Tayora Sustain
            </Link>
            <p className="text-secondary text-sm leading-relaxed">
              Closing the loop on fashion waste — connecting surplus with
              purpose across the supply chain.
            </p>
          </div>

          {/* Links */}
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-secondary text-sm hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom row */}
        <div className="mt-10 pt-6 border-t border-accent flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Tayora Sustain. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-secondary hover:text-primary-foreground transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
