"use client";

import Link from "next/link";
import { usePremium } from "./usePremium";

type Props = {
  children: React.ReactNode;
};

export default function PremiumLock({ children }: Props) {
  const { premium } = usePremium();

  if (premium) {
    return <>{children}</>;
  }

  return (
    <div className="rounded-2xl border border-yellow-500/30 bg-slate-900 p-8 text-center">
      <div className="mb-4 text-5xl">🔒</div>

      <h2 className="mb-2 text-2xl font-bold text-white">
        Fonction Premium
      </h2>

      <p className="mb-6 text-slate-400">
        Débloque cette fonctionnalité avec Pilo Premium.
      </p>

      <Link
        href="/premium"
        className="inline-block rounded-xl bg-yellow-500 px-6 py-3 font-bold text-slate-900 transition hover:bg-yellow-400"
      >
        Découvrir Premium
      </Link>
    </div>
  );
}