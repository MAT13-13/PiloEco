import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

import { PremiumProvider } from "../premium/PremiumContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "PiloEco — Ton copilote d’économies",
  description:
    "Analyse tes dépenses, découvre des économies, surveille tes contrats et transforme chaque euro économisé en projet avec PiloLife.",
  applicationName: "PiloEco",
  keywords: [
    "économies",
    "budget",
    "contrats",
    "assurance",
    "électricité",
    "internet",
    "PiloLife",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title:
      "PiloEco — Ton copilote d’économies",
    description:
      "Pilo analyse tes dépenses et t’aide à transformer tes économies en projets concrets.",
    type: "website",
    locale: "fr_FR",
    siteName: "PiloEco",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <PremiumProvider>
          {children}
        </PremiumProvider>
      </body>
    </html>
  );
}