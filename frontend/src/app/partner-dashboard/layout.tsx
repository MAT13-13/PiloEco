import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace partenaire",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PartnerDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}