import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon espace PiloLife",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PiloLifeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}