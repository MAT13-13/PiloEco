"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  name: string;
  savings: number;
  progress: number;
};

export default function PiloHero({
  name,
  savings,
  progress,
}: Props) {
  return (
    <section className="relative overflow-hidden rounded-[36px] border border-green-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950/40 p-10">

      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />

      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">

        <div>

          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-green-400">
            🪶 PILO VEILLE SUR TON PORTEFEUILLE
          </p>

          <h1 className="text-5xl font-black leading-tight">
            Bonjour {name} 👋
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Pendant ton absence, j'ai continué à comparer les offres
            disponibles afin de trouver les meilleures économies pour toi.
          </p>

          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-3">
              <span>✅</span>
              <span>43 offres comparées</span>
            </div>

            <div className="flex items-center gap-3">
              <span>💰</span>
              <span>{savings} €/an d'économies potentielles</span>
            </div>

            <div className="flex items-center gap-3">
              <span>🎯</span>
              <span>Objectif atteint à {progress}%</span>
            </div>

          </div>

          <Link
            href="/analyse"
            className="mt-10 inline-flex rounded-2xl bg-green-500 px-8 py-4 font-bold text-slate-950 transition hover:scale-105 hover:bg-green-400"
          >
            Voir mes découvertes
          </Link>

        </div>

        <div className="relative flex justify-center">

          <Image
            src="/pilo.png"
            alt="Pilo"
            width={420}
            height={420}
            priority
            className="drop-shadow-[0_25px_60px_rgba(34,197,94,.45)]"
          />

        </div>

      </div>

    </section>
  );
}