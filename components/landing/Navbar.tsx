"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "For Suppliers", href: "/#suppliers" },
  { label: "For Requesters", href: "/#requesters" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-surf-border">
      <nav className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display font-semibold text-lg text-primary"
        >
          Tayora Sustain
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-ink-secondary hover:text-brown transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-sm text-ink-secondary hover:text-brown transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/auth/register"
            className="text-sm bg-brown text-white px-4 py-2 rounded-md hover:bg-brown-mid transition-colors"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="md:hidden text-brown"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-surf-border px-6 py-6 flex flex-col gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base text-ink-secondary hover:text-brown transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-surf-border">
            <Link
              href="/auth/login"
              onClick={() => setMenuOpen(false)}
              className="text-center py-2.5 rounded-md border border-brown text-brown text-sm hover:bg-beige-hover transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/auth/register"
              onClick={() => setMenuOpen(false)}
              className="text-center py-2.5 rounded-md bg-brown text-white text-sm hover:bg-brown-mid transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
