import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

import { PremiumProvider } from "../premium/PremiumContext";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://piloeco.com"),

  title: {
    default:
      "PiloEco — Faire des économies et réduire ses factures",
    template: "%s | PiloEco",
  },

  description:
    "PiloEco vous aide à faire des économies, réduire vos factures, comparer vos contrats, optimiser votre budget et trouver des solutions pour l’énergie, les assurances, les télécoms, les travaux et les dépenses du quotidien.",

  applicationName: "PiloEco",

  keywords: [
    "faire des économies",
    "réduire ses factures",
    "économiser sur ses factures",
    "réduire ses dépenses",
    "économies au quotidien",
    "optimiser son budget",
    "comparateur contrats",
    "électricité moins chère",
    "gaz moins cher",
    "forfait mobile moins cher",
    "internet moins cher",
    "assurance moins chère",
    "aides travaux",
    "budget familial",
    "PiloEco",
    "PiloLife",
  ],

  authors: [
    {
      name: "PiloEco",
      url: "https://piloeco.com",
    },
  ],

  creator: "PiloEco",
  publisher: "PiloEco",


  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:
      "PiloEco — Faire des économies et réduire ses factures",
    description:
      "Analysez vos dépenses, réduisez vos factures, comparez vos contrats et trouvez de nouvelles économies avec PiloEco.",
    url: "https://piloeco.com",
    siteName: "PiloEco",
    type: "website",
    locale: "fr_FR",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "PiloEco — Faire des économies et réduire ses factures",
    description:
      "Réduisez vos factures, optimisez votre budget et découvrez de nouvelles économies avec PiloEco.",
  },

  category: "finance",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://piloeco.com/#organization",
      name: "PiloEco",
      url: "https://piloeco.com",
      description:
        "PiloEco aide les particuliers à réduire leurs dépenses, optimiser leur budget et trouver des solutions pour économiser sur leurs contrats et factures.",
    },
    {
      "@type": "WebSite",
      "@id": "https://piloeco.com/#website",
      url: "https://piloeco.com",
      name: "PiloEco",
      inLanguage: "fr-FR",
      publisher: {
        "@id": "https://piloeco.com/#organization",
      },
    },
    {
      "@type": "WebApplication",
      "@id": "https://piloeco.com/#application",
      name: "PiloEco",
      url: "https://piloeco.com",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "fr-FR",
      description:
        "Application permettant d'analyser ses dépenses, réduire ses factures, surveiller ses contrats et identifier des économies.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
    },
  ],
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
      <body className="min-h-full bg-slate-950 text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <PremiumProvider>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">
              {children}
            </main>

            <Footer />
          </div>
        </PremiumProvider>
      </body>
    </html>
  );
}