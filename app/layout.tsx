import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tayora Sustain",
    template: "%s | Tayora Sustain",
  },
  description:
    "A circular economy platform connecting textile waste suppliers with material requesters — turning fashion waste into opportunity.",
  keywords: [
    "textile waste",
    "circular economy",
    "sustainable fashion",
    "upcycling",
    "fabric redistribution",
    "fashion sustainability",
    "Nigeria",
  ],
  authors: [{ name: "Tayora Sustain" }],
  creator: "Tayora Sustain",
  metadataBase: new URL("https://tayorasustain.com"),
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://tayorasustain.com",
    siteName: "Tayora Sustain",
    title: "Tayora Sustain — Turning waste into opportunities",
    description:
      "Submit textile waste, request materials, or track the full upcycling cycle — all in one platform.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tayora Sustain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tayora Sustain",
    description:
      "Connecting textile waste suppliers with material requesters. Fashion waste, reimagined.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-beige font-sans">
        <main className="flex-1">
          <QueryProvider>{children}</QueryProvider>
        </main>
      </body>
    </html>
  );
}
