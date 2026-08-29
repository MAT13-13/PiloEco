import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aides travaux et solutions pour rénover moins cher",
  description:
    "Découvrez des solutions pour réduire le coût de vos travaux, trouver des professionnels et identifier les aides disponibles pour vos projets de rénovation.",
  alternates: {
    canonical: "/missions/travaux",
  },
};

export default function TravauxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}