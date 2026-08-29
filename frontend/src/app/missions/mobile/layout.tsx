import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trouver un forfait mobile moins cher",
  description:
    "Comparez les forfaits mobiles et trouvez une offre plus adaptée à vos besoins pour réduire votre facture de téléphone avec PiloEco.",
  alternates: {
    canonical: "/missions/mobile",
  },
};

export default function MobileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}