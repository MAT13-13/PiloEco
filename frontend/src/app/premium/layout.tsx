import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PiloEco Premium - suivi des contrats et économies",
  description:
    "Découvre PiloEco Premium pour surveiller tes contrats, recevoir des alertes, suivre tes économies et faire avancer tes projets avec PiloLife.",
  alternates: {
    canonical: "/premium",
  },
};

export default function PremiumLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}