import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trouver une mutuelle moins chère",
  description:
    "Comparez les solutions de mutuelle santé et trouvez une couverture adaptée à vos besoins et à votre budget avec PiloEco.",
  alternates: {
    canonical: "/missions/mutuelle",
  },
};

export default function MutuelleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}