import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trouver une assurance habitation moins chère",
  description:
    "Comparez les solutions d'assurance habitation et trouvez une offre adaptée pour protéger votre logement tout en maîtrisant votre budget.",
  alternates: {
    canonical: "/missions/habitation",
  },
};

export default function HabitationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}