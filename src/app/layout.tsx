import type { Metadata } from "next";
import { Bebas_Neue, Geist_Mono, Inter } from "next/font/google";

import { SmoothScrollHandler } from "@/components/layout/SmoothScrollHandler.client";

import "./globals.css";

/** UI / body — navbar, labels, buttons (replaces previous Geist Sans). */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Display — large condensed hero word “VISUALS”. */
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "S-Visuals",
  description: "Premium short-form video editing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${bebasNeue.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrollHandler />
        {children}
      </body>
    </html>
  );
}
