import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trouver un abonnement internet moins cher",
  description:
    "Comparez les offres internet et identifiez un abonnement plus adapté pour réduire votre facture box avec PiloEco.",
  alternates: {
    canonical: "/missions/internet",
  },
};

export default function InternetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}