import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réduire sa facture d'électricité",
  description:
    "Comparez les solutions disponibles pour réduire votre facture d'électricité et identifier des économies sur votre contrat d'énergie avec PiloEco.",
  alternates: {
    canonical: "/missions/electricite",
  },
};

export default function ElectriciteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}