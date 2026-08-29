import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Résultats de mon analyse",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnalyseResultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}