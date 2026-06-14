"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "../ui/Logo";

const NAV_LINKS = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Products", href: "/#products" },
  { label: "Impact", href: "/#impact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <nav className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo size="lg" />

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-foreground-muted hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-foreground-muted hover:text-primary transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-hover transition-colors"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="md:hidden text-primary"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-card border-t border-border px-6 py-6 flex flex-col gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base text-foreground-muted hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-border">
            <Link
              href="login"
              onClick={() => setMenuOpen(false)}
              className="text-center py-2.5 rounded-md border border-primary text-primary text-sm hover:bg-muted transition-colors"
            >
              Log in
            </Link>
            <Link
              href="register"
              onClick={() => setMenuOpen(false)}
              className="text-center py-2.5 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary-hover transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
