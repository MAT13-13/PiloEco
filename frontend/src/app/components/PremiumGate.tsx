"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePremium } from "../hooks/usePremium";

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
};

export default function PremiumGate({
  children,
  title = "Fonctionnalité Premium",
  description = "Débloque cette fonctionnalité avec PiloEco Premium.",
}: Props) {
  const { premium, loading } = usePremium();

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 text-slate-300">
        Chargement...
      </div>
    );
  }

  if (!premium) {
    return (
      <div className="rounded-3xl border border-yellow-500/40 bg-slate-900 p-8 text-center shadow-lg">
        <div className="mb-4 text-5xl">🔒</div>

        <h2 className="text-2xl font-black text-white">{title}</h2>

        <p className="mx-auto mt-3 max-w-xl text-slate-400">
          {description}
        </p>

        <Link
          href="/premium"
          className="mt-6 inline-block rounded-xl bg-green-500 px-6 py-3 font-bold text-black transition hover:bg-green-400"
        >
          Passer Premium 🚀
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}