import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trouver une assurance moins chère",
  description:
    "Comparez les solutions d'assurance et trouvez une offre adaptée à vos besoins pour réduire vos dépenses avec PiloEco.",
  alternates: {
    canonical: "/missions/assurance",
  },
};

export default function AssuranceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}