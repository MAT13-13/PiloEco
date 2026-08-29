import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analyse gratuite pour réduire tes factures",
  description:
    "Analyse gratuitement tes dépenses avec PiloEco et découvre où tu peux réduire tes factures, contrats et abonnements.",
  alternates: {
    canonical: "/analyse",
  },
};

export default function AnalyseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}