import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monitoring de mes contrats",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MonitoringLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}