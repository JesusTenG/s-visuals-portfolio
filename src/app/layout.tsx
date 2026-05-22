import type { Metadata } from "next";
import { Bebas_Neue, Geist_Mono, Inter, Orbitron } from "next/font/google";
import { headers } from "next/headers";

import { SmoothScrollHandler } from "@/components/layout/SmoothScrollHandler.client";
import { readLocaleFromHeaders } from "@/lib/locale-header";
import { siteUrl } from "@/lib/seo";

import "./globals.css";

/** UI / body — navbar, labels, buttons (replaces previous Geist Sans). */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Display — legacy condensed (available for other UI if needed). */
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

/** Hero headline — “VISUALS”. */
const orbitron = Orbitron({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Simon Saad Visuals",
    template: "%s",
  },
  description:
    "Premium video editing and production for brands and creators.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const lang = readLocaleFromHeaders(headerList.get("x-locale"));

  return (
    <html
      lang={lang}
      className={`dark ${inter.variable} ${bebasNeue.variable} ${orbitron.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrollHandler />
        {children}
      </body>
    </html>
  );
}
