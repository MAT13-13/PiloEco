import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réduire sa facture de gaz",
  description:
    "Comparez les solutions disponibles pour réduire votre facture de gaz et identifier des économies sur votre contrat d'énergie avec PiloEco.",
  alternates: {
    canonical: "/missions/gaz",
  },
};

export default function GazLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}